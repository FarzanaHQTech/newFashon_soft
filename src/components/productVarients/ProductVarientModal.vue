<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount, nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Thumbs, Pagination, Zoom } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/zoom'
import { Modal } from 'bootstrap'
import { useToast } from 'vue-toast-notification'
import { useCartCheckoutStore } from '../../stores/cartCheckout'
import { frontendApi, IMAGE_BASE_URL, posadminApi } from '../../api'
import { useRouter } from 'vue-router'
import { useShopPage } from '../../stores/shopPage'
import { storeToRefs } from 'pinia'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const $toast = useToast()
const router = useRouter()
const store = useCartCheckoutStore()
const shopPage = useShopPage()
const { shopPages, relatedProducts } = storeToRefs(shopPage)

const modules = [Navigation, Thumbs, Pagination, Zoom]
const mainSwiper = ref(null)
const activeIndex = ref(0)
const selectedVariants = ref({})
const quantity = ref(1)
const modal = ref(null)
const isLoading = ref(false)
const variantPrice = ref(null)

//  Load product data on prop change
watch(() => props.product.slug, async (newSlug, oldSlug) => {
  if (newSlug !== oldSlug) {
    await loadProductData()
    resetModalState()
  }


})

const resetModalState = () => {
  selectedVariants.value = {}
  quantity.value = 1
  activeIndex.value = 0
  if (mainSwiper.value) {
    mainSwiper.value.slideTo(0, 0)
  }
}

//  Load product on mount
onMounted(async () => {
  await loadProductData()
  const modalElement = document.getElementById(`productModal-${props.product.slug}`)
  if (modalElement && !modal.value) {
    modal.value = new Modal(modalElement)
  }
})

// ✅ Cleanup modal
onBeforeUnmount(() => {
  if (modal.value) {
    modal.value.hide()
    modal.value.dispose()
    modal.value = null
  }
  document.querySelectorAll('.modal-backdrop').forEach(el => el.remove())
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
})

// ✅ Fetch product info
async function loadProductData() {
  isLoading.value = true
  try {
    shopPage.shopPages = null
    shopPage.relatedProducts = []
    await shopPage.fetchShopPage({ slug: props.product.slug })
  } catch (error) {
    console.error('Error loading product:', error)
    $toast.error('Failed to load product details')
  } finally {
    isLoading.value = false
  }
}

// ✅ All images from main + variant
const allImages = computed(() => {
  if (!shopPages.value) return []
  const images = []
  if (shopPages.value.main_image) {
    images.push({ id: 'main', image: shopPages.value.main_image, color: null, normalizedColor: null })
  }
  if (shopPages.value.images?.length) {
    images.push(...shopPages.value.images.map(img => ({
      ...img,
      normalizedColor: img.color ? img.color.trim().toLowerCase() : null
    })))
  }
  return images
})

const variantOptions = computed(() => {
  try {
    if (!shopPages.value?.variant_option) return []
    const options = JSON.parse(shopPages.value.variant_option)
    return Array.isArray(options) ? options : []
  } catch { return [] }
})

const variantValues = computed(() => {
  try {
    if (!shopPages.value?.variant_value) return []
    const values = JSON.parse(shopPages.value.variant_value)
    return Array.isArray(values) ? values : []
  } catch { return [] }
})

const hasVariants = computed(() => {
  return shopPages.value?.is_variant == 1 && variantOptions.value.length > 0
})

//  Updated: prefer variant price if available
const displayPrice = computed(() => {
  if (variantPrice.value !== null) {
    return variantPrice.value
  }
  if (!shopPages.value) return 0
  if (shopPages.value.is_promotion && shopPages.value.promotion_price) {
    return shopPages.value.promotion_price
  }
  return shopPages.value.price
})


//  Variant change watcher: call API
watch(selectedVariants, async (newVal) => {
  console.log('🎯 Variants selected:', newVal)

  if (!hasVariants.value || !shopPages.value) return
  const variantNames = Object.values(newVal)
  if (variantNames.length < variantOptions.value.length) return

  try {
    const response = await posadminApi.get('/get-variant-price', {
      params: {
        productId: shopPages.value.id,
        variant_1: variantNames[0] || '',
        variant_2: variantNames[1] || ''
      }
    })

    console.log('🔍 Variant price API response:', response.data)

    if (response.data.status) {
      variantPrice.value = response.data.variantPrice
      shopPages.value.variant_id = response.data.variant_id
    }
  } catch (error) {
    console.error('❌ Variant price fetch error:', error)
  }
}, { deep: true })

const setMainSwiper = (swiper) => {
  mainSwiper.value = swiper
  swiper?.navigation?.init()
  swiper?.navigation?.update()
}

const findImageIndexByColor = (color) => {
  const normalizedColor = color?.trim().toLowerCase()
  return allImages.value.findIndex(img =>
    img.normalizedColor === normalizedColor || img.normalizedColor?.includes(normalizedColor)
  ) || 0
}

const updateImageByColor = (color) => {
  const index = findImageIndexByColor(color)
  mainSwiper.value?.slideTo(index, 500)
  activeIndex.value = index
}

const increaseQuantity = () => { if (quantity.value < 12) quantity.value++ }
const decreaseQuantity = () => { if (quantity.value > 1) quantity.value-- }

const addToCart = async () => {
  try {
    document.querySelectorAll('.burmanRadio__input:checked').forEach(el => {
      const variantNum = el.name.split('_')[1]
      selectedVariants.value[`variant_${variantNum}`] = el.value
    })

    if (hasVariants.value && Object.keys(selectedVariants.value).length !== variantOptions.value.length) {
      throw new Error('Please select all required variants')
    }


    const product = {
      product_id: shopPages.value.id,
      slug: shopPages.value.slug,
      name: shopPages.value.name,
      image: allImages.value[0]?.image || shopPages.value.main_image,
      price: variantPrice.value !== null ? variantPrice.value : displayPrice.value,
      quantity: quantity.value,
      discount: shopPages.value.price - (variantPrice.value !== null ? variantPrice.value : displayPrice.value),
      ...(shopPages.value.is_variant == 1 && {
        variant_1: selectedVariants.value.variant_1 || null,
        variant_2: selectedVariants.value.variant_2 || null,
        variant_id: shopPages.value.variant_id || null
      })
    }


    console.log('Adding to cart with price:', displayPrice.value)
    await store.addToCart(product)

    $toast.success('পণ্য কার্টে যোগ করা হয়েছে!', { position: 'top-right', duration: 3000 })
    hideModal()
  } catch (error) {
    console.error('Add to cart failed:', error)
    $toast.error(error.message || 'কার্টে যোগ করতে ব্যর্থ হয়েছে', { position: 'top-right', duration: 4000 })
  }
}

const orderNow = async () => {
  await addToCart()
  if (store.cartItems.length > 0) {
    hideModal()
    await nextTick()
    router.push('/checkout')
  }
}

const showModal = async () => {
  if (!modal.value) {
    const modalElement = document.getElementById(`productModal-${props.product.slug}`)
    if (modalElement) {
      modal.value = new Modal(modalElement)
    }
  }
  resetModalState()
  await loadProductData()
  modal.value?.show()
  variantPrice.value = null
}

const hideModal = () => {
  modal.value?.hide()
  resetModalState()
  document.querySelectorAll('.modal-backdrop').forEach(el => el.remove())
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

defineExpose({ showModal, hideModal })
</script>


<template>
  <div class="modal-body product_modal">
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <!-- <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true" data-bs-backdrop="static"> -->
    <div class="modal fade" :id="`productModal-${product.slug}`">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header orange-bg">
            <h5 class="modal-title text-white" id="productModalLabel">
              Choose Options
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
              @click="hideModal"></button>
          </div>
          <div class="modal-body product_modal">
            <div class="row">
              <!-- Product Images -->
              <div class="col-lg-5 col-md-6 col-12">
                <swiper @swiper="setMainSwiper" :modules="modules" :spaceBetween="10" :navigation="{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }" :pagination="{ clickable: true }" :zoom="true" class="main-swiper"
                  @slideChange="swiper => activeIndex = swiper.activeIndex">
                  <swiper-slide v-for="(img, index) in allImages" :key="img.id || index" :virtualIndex="index">
                    <div class="swiper-zoom-container">
                      <img :src="`${IMAGE_BASE_URL}/images/product/large/${img.image}`" class="d-block w-100"
                        :alt="`Product Image ${index + 1}`" />
                    </div>
                  </swiper-slide>
                  <div class="swiper-button-next"></div>
                  <div class="swiper-button-prev"></div>
                </swiper>
              </div>

              <!-- Product Details and Variants -->
              <div class="col-lg-7 col-md-6 col-12">
                <h2 class="title light">{{ shopPages?.name }}</h2>
                <h4 class="pop bold">
                  <span v-if="shopPages?.is_promotion && shopPages?.promotion_price"
                    class="text-decoration-line-through text-muted me-2">
                    {{ shopPages?.price }} Tk
                  </span>
                  <span id="pro_price">
                    {{ displayPrice }} Tk
                  </span>
                </h4>

                <div id="alertDanger" class="alert alert-danger alert-dismissible fade show p-2 small d-none"
                  role="alert">
                </div>

                <form method="POST" id="cart_form">
                  <!-- Variant Options -->
                  <div v-for="(option, index) in variantOptions" :key="index" class="d-flex mt-3" v-if="hasVariants">
                    <h4 class="pop medium me-2">{{ option }}:</h4>
                    <div class="sizes d-flex flex-wrap align-items-center">
                      <div v-for="(value, i) in variantValues[index]?.split(',')" :key="i" class="burmanRadio me-2"
                        :class="{ 'required-highlight': hasVariants && !selectedVariants[`variant_${index + 1}`] }">
                        <!-- <input 
                        type="radio" 
                        class="burmanRadio__input" 
                        :id="`modal_variant_${index + 1}_${value.trim()}`"
                        :name="`variant_${index + 1}`" 
                        :value="value.trim()" 
                        required
                        @change="option.toLowerCase() === 'color' ? updateImageByColor(value.trim()) : null" 
                      /> -->
                        <input type="radio" class="burmanRadio__input"
                          :id="`modal_variant_${index + 1}_${value.trim()}`" :name="`variant_${index + 1}`"
                          :value="value.trim()" v-model="selectedVariants[`variant_${index + 1}`]"
                          @change="option.toLowerCase() === 'color' ? updateImageByColor(value.trim()) : null" />



                        <label :for="`modal_variant_${index + 1}_${value.trim()}`" class="burmanRadio__label">
                          {{ value.trim() }}
                        </label>
                      </div>
                    </div>
                  </div>

                  <!-- Quantity and Buttons -->
                  <div class="d-flex align-items-center mt-4 col-lg-12">
                    <input type="hidden" name="product_id" :value="shopPages?.id">
                    <input type="hidden" name="product_name" :value="shopPages?.name">

                    <div class="quantity_box">
                      <button type="button" class="minus btn" @click="decreaseQuantity">-</button>
                      <input type="text" class="quantity_value placeholder_black form-control" v-model="quantity"
                        min="1" max="12" readonly>
                      <button type="button" class="plus btn" @click="increaseQuantity">+</button>
                    </div>

                    <button type="button" class="btn btn-dark orange-bg ms-3 semi text-cap btn_design rounded-5"
                      @click="orderNow" style="border:none;">
                      অর্ডার করুন
                    </button>
                    <button type="button" class="btn btn-dark orange-bg ms-3 semi text-cap btn_design rounded-5"
                      @click="addToCart" style="border:none;">
                      কার্টে রাখুন
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Your existing styles remain exactly the same */
.modal-content {
  border-radius: 15px;
  overflow: hidden;
}

.orange-bg {
  background-color: #FF6B00;
}

.product_modal {
  padding: 20px;
}

.main-swiper {
  height: 400px;
  position: relative;
}

.swiper-zoom-container img {
  object-fit: contain;
  height: 100%;
  width: 100%;
}

.swiper-button-next,
.swiper-button-prev {
  color: #FF6B00;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  background: #FF6B00;
  color: white;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 18px;
  font-weight: bold;
}

.btn_design {
  border: 1px solid red;
  background: red;
  color: white;
  box-shadow: 2px 4px 5px #00000040;
  position: relative;
  top: -5px;
  left: -5px;
  transition: 0.3s;
  font-family: sans-serif;
  font-weight: 600;
}

.btn_design:hover {
  background: red;
  color: white;
  top: 0;
  left: 0;
  box-shadow: 0px 0px 0px #00000040;
}

.quantity_box {
  display: inline-flex;
  vertical-align: top;
  white-space: nowrap;
  font-size: 0;
}

.quantity_box button[type="button"] {
  padding: 0 5px;
  min-width: 25px;
  min-height: unset;
  height: 42px;
  border: 2px solid rgb(211, 211, 211);
  background: white;
  box-shadow: none;
  color: black;
  border-radius: 0;
}

.quantity_box button[type="button"]:hover {
  color: #fff;
  background-color: orange;
  border-color: orange;
}

.quantity_box input[type="text"] {
  width: 40px;
  color: black;
  border-radius: 0;
  border: 2px solid rgb(211, 211, 211);
  border-right: none;
  border-left: none;
}

.quantity_box button[type="button"].minus {
  border-radius: 50px 0 0 50px;
  border-right: 0;
}

.quantity_box button[type="button"].plus {
  border-radius: 0 50px 50px 0;
  border-left: 0;
}

.burmanRadio {
  margin-bottom: 10px;
}

.burmanRadio__input {
  display: none;
}

.burmanRadio__input:checked~.burmanRadio__label::after {
  opacity: 1;
  transform: scale(1);
}

.burmanRadio__label {
  cursor: pointer;
  line-height: 30px;
  position: relative;
  margin-left: 35px;
}

.burmanRadio__label::before,
.burmanRadio__label::after {
  border-radius: 50%;
  position: absolute;
  top: 5px;
  left: -30px;
  transition: all 0.3s ease-out;
  z-index: 2;
}

.burmanRadio__label::before {
  content: "";
  border: 1.5px solid #9d9d9d;
  width: 20px;
  height: 20px;
}

.burmanRadio__label::after {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: "\f00c";
  background: #ffc107;
  border: 1.5px solid #ffc107;
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  width: 20px;
  height: 20px;
  transform: scale(0);
}

.burmanRadio__label:hover::before {
  border-color: #7BC4CA;
}

.required-highlight .burmanRadio__label::before {
  border-color: #dc3545;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.4);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(220, 53, 69, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(220, 53, 69, 0);
  }
}
</style>

<style>
.modal-backdrop {
  z-index: 1040 !important;
}

.modal {
  z-index: 1050 !important;
}

body.modal-open {
  overflow: auto;
  padding-right: 0 !important;
}
</style>