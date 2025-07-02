<script setup>
import { computed, ref, watch } from 'vue'
import { useShopPage } from '../../../../stores/shopPage'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { frontendApi, IMAGE_BASE_URL, posadminApi } from '../../../../api'
import { useRoute, useRouter } from 'vue-router'
import { useCartCheckoutStore } from '../../../../stores/cartCheckout'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Thumbs, Pagination, Zoom } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/zoom'
import 'swiper/css/navigation'
import { useToast } from 'vue-toast-notification'

import ptsv from '../../../../../src/assets/image/size.png'


// Initialize toast
const $toast = useToast()
const modules = [Navigation, Thumbs, Pagination, Zoom]

const shopPage = useShopPage();
const { shopPages, relatedProducts } = storeToRefs(shopPage);
const route = useRoute();
const router = useRouter();
const store = useCartCheckoutStore();

// State management
const isLoading = ref(false);
const activeIndex = ref(0);
const defaultSize = 'https:/https://vue.softitglobalbd.xyz//assets/image/size.png'
const thumbsSwiper = ref(null);
const mainSwiper = ref(null);
const selectedVariants = ref({})
const quantity = ref(1)

// Immediately clear data when component mounts to prevent stale data
onMounted(async () => {
  shopPage.shopPages = null;
  shopPage.relatedProducts = [];
  await loadProductData();
  // console.log("ShopPage details", shopPage.shopPages);

})

watch(selectedVariants, async (newVal) => {
  if (!hasVariants.value || !shopPages.value) return;

  try {
    const variantNames = Object.values(newVal);
    if (variantNames.length < variantOptions.value.length) return;

    const productId = shopPages.value.id;
    const variant_1 = variantNames[0] || '';
    const variant_2 = variantNames[1] || '';

    const response = await posadminApi.get('/get-variant-price', {
      params: {
        productId,
        variant_1,
        variant_2
      }
    });

    // console.log(' Variant price API response:', response.data);

  
    if (response.data.status) {
  shopPages.value = {
    ...shopPages.value,
    variant_id: response.data.variant_id,
    price: response.data.variantPrice
    // Do not override is_promotion or promotion_price!
  };



      // Replace the entire object
      shopPages.value = updatedShopPage;

      // console.log('Updated price:', updatedShopPage.price);
    }

  } catch (error) {
    console.error(' Error fetching variant price:', error);
  }
}, { deep: true });


const displayPrice = computed(() => {
  if (shopPages.value?.promotion == 1 && shopPages.value?.promotion_price) {
    return shopPages.value.promotion_price
  }
  return shopPages.value?.price
})
  async function loadProductData() {
    isLoading.value = true;
    try {
      // Clear previous data
      shopPage.shopPages = null;
      shopPage.relatedProducts = [];

      // Load new data
      await shopPage.fetchShopPage({ slug: route.params.slug });

      const product = shopPage.shopPages;
      if (product && product.promosion_price && !product.promotion_price) {
        product.promotion_price = product.promosion_price;
      }
      
      activeIndex.value = 0;
    } catch (error) {
      console.error('Error loading product:', error);
      router.push('/404');
    } finally {
      isLoading.value = false;
    }
  }

watch(() => route.params.slug, async (newSlug) => {
  if (newSlug) {
    await loadProductData();
  }
}, { immediate: true });
// async function loadProductData() {
//   isLoading.value = true;
//   try {
//     // Clear previous data immediately
//     shopPage.shopPages = null;
//     shopPage.relatedProducts = [];

//     await shopPage.fetchShopPage({ slug: route.params.slug });

//     const product = shopPage.shopPages;
// if (product && product.promosion_price && !product.promotion_price) {
//   product.promotion_price = product.promosion_price;
// }
// // console.log(' product data:', shopPage.shopPages);
//     activeIndex.value = 0;
//   } catch (error) {
//     console.error('Error loading product:', error);
//     router.push('/404');
//   } finally {
//     isLoading.value = false;
//   }
// }

// Combine main image and additional images for gallery
const allImages = computed(() => {
  if (!shopPages.value) return [];

  const images = [];

  // Add main image first
  if (shopPages.value.main_image) {
    images.push({
      id: 'main',
      image: shopPages.value.main_image,
      color: null
    });
  }

  // Add other images
  if (shopPages.value.images && shopPages.value.images.length) {
    images.push(...shopPages.value.images);
  }

  return images;
});

// Swiper controls


const setMainSwiper = (swiper) => {
  mainSwiper.value = swiper;
};

const onThumbClick = (index) => {
  if (mainSwiper.value) {
    mainSwiper.value.slideTo(index);
  }
};

const findImageIndexByColor = (color) => {
  if (!color || !allImages.value.length) return 0;
  const index = allImages.value.findIndex(img => img.color === color);
  return index >= 0 ? index : 0;
};

const updateImageByColor = (color) => {
  const index = findImageIndexByColor(color);
  if (mainSwiper.value) {
    mainSwiper.value.slideTo(index);
  }
};

// Variant handling
const variantOptions = computed(() => {
  try {
    if (!shopPages.value?.variant_option) return []
    const options = JSON.parse(shopPages.value.variant_option)
    return Array.isArray(options) ? options : []
  } catch {
    return []
  }
})

const variantValues = computed(() => {
  try {
    if (!shopPages.value?.variant_value) return []
    const values = JSON.parse(shopPages.value.variant_value)
    return Array.isArray(values) ? values : []
  } catch {
    return []
  }
})

const hasVariants = computed(() => {
  return shopPages.value?.is_variant == 1 && variantOptions.value.length > 0
})



const increaseQuantity = () => {
  if (quantity.value < 12) quantity.value++
}

const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--
}

// Cart functions
const addToCart = async () => {
  try {
    // selectedVariants.value = {}
    const variantInputs = document.querySelectorAll('.burmanRadio__input:checked')

    // Collect selected variants
    variantInputs.forEach(el => {
      const variantNum = el.name.split('_')[1]
      selectedVariants.value[`variant_${variantNum}`] = el.value
    })

    // Validate variants if product has variants
    if (hasVariants.value) {
      const selectedCount = Object.keys(selectedVariants.value).length
      if (selectedCount !== variantOptions.value.length) {
        throw new Error('Please select all required variants')
      }
    }

    // Prepare product data
    const product = {
      product_id: shopPages.value.id,
      slug: shopPages.value.slug,
      name: shopPages.value.name,
      image: allImages.value[0]?.image || shopPages.value.main_image,
      price: displayPrice.value,
      quantity: quantity.value,
      discount: shopPages.value.price - displayPrice.value,
      ...(shopPages.value.is_variant == 1 && {
        variant_1: selectedVariants.value.variant_1 || null,
        variant_2: selectedVariants.value.variant_2 || null,
        variant_3: selectedVariants.value.variant_3 || null
      })
    }

    // Add to cart
    await store.addToCart(product)

    // Show success toast
    $toast.success('পণ্য কার্টে যোগ করা হয়েছে!', {
      position: 'top-right',
      duration: 3000
    })

  } catch (error) {
    console.error('Error adding to cart:', error)
    $toast.error(error.message || 'কার্টে যোগ করতে ব্যর্থ হয়েছে', {
      position: 'top-right',
      duration: 4000
    })
  }
}

async function orderNow() {
  try {
    // selectedVariants.value = {};
    const variantInputs = document.querySelectorAll('.burmanRadio__input:checked');

    // Clear existing variants first
    Object.keys(selectedVariants.value).forEach(key => {
      delete selectedVariants.value[key]
    })

    // Collect selected variants
    variantInputs.forEach(el => {
      const variantNum = el.name.split('_')[1]
      selectedVariants.value[`variant_${variantNum}`] = el.value
    })



    if (hasVariants.value) {
      variantInputs.forEach(el => {
        const variantNum = el.name.split('_')[1];
        selectedVariants.value[`variant_${variantNum}`] = el.value;
      });

      const selectedCount = Object.keys(selectedVariants.value).length;
      if (selectedCount !== variantOptions.value.length) {
        throw new Error(`Please select all required options (${variantOptions.value.join(', ')})`);
      }
    }

    const product = {
      product_id: shopPages.value.id,
      slug: shopPages.value.slug,
      name: shopPages.value.name,
      image: allImages.value[0]?.image || shopPages.value.main_image,
      price: displayPrice.value,
      quantity: quantity.value,
      discount: shopPages.value.price - displayPrice.value,
      ...(shopPages.value.is_variant == 1 && {
        variant_1: selectedVariants.value.variant_1 || null,
        variant_2: selectedVariants.value.variant_2 || null,
        variant_3: selectedVariants.value.variant_3 || null
      })
    };

    await store.addToCart(product);

    if (store.cartItems.length > 0) {
      router.push('/checkout');
    } else {
      $toast.error('কার্টে কোন পণ্য নেই', {
        position: 'top-right',
        duration: 3000
      });
    }
  } catch (error) {
    console.error('Error in orderNow:', error);
    $toast.error(error.message || 'কার্টে যোগ করতে ব্যর্থ হয়েছে', {
      position: 'top-right',
      duration: 4000
    });
  }
}
</script>

<template>
  <div class="container-fluid px-1 mt-2 mt-lg-4">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-placeholder d-flex justify-content-center align-items-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="row justify-content-between">
      <!-- Product Images Section -->
      <div class="col-lg-6 col-md-8  col-12 img_section">
        <div class="row">
          <!-- Desktop Thumbnail: left side (hidden on mobile) -->
          <div class="col-md-2 d-none d-md-block nav_image1 pe-0">
            <div class="image mb-2" v-for="(img, index) in allImages" :key="img.id || index">
              <img :src="`${IMAGE_BASE_URL}/images/product/xsmall/${img.image}`" width="100"
                :class="{ 'border border-primary': activeIndex === index }" @click="onThumbClick(index)"
                class="cursor-pointer" />
            </div>
          </div>

          <!-- Main image slider -->
          <div class="col-md-10 col-12">
            <swiper @swiper="setMainSwiper" :modules="modules" :spaceBetween="10" :navigation="true"
              :pagination="{ clickable: true }" :zoom="true" @slideChange="(swiper) => activeIndex = swiper.activeIndex"
              class="main-swiper">
              <swiper-slide v-for="(img, index) in allImages" :key="img.id || index" :virtualIndex="index">
                <div class="swiper-zoom-container">
                  <img :src="`${IMAGE_BASE_URL}/images/product/large/${img.image}`" class="d-block w-100"
                    :alt="`Product Image ${index + 1}`" />
                </div>
              </swiper-slide>
            </swiper>

            <!-- Mobile Thumbnail: below main image -->
            <div class="d-block d-md-none nav_images mt-3 mb-3">
              <swiper :modules="modules" :slidesPerView="4" :freeMode="true" class="mobile-thumb-swiper">
                <swiper-slide v-for="(img, index) in allImages" :key="img.id || index" @click="onThumbClick(index)">
                  <img :src="`${IMAGE_BASE_URL}/images/product/xsmall/${img.image}`"
                    :class="{ 'border border-primary': activeIndex === index }" class="img-fluid cursor-pointer" />
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Details Section -->
      <div class="col-lg-6 col-md-6 col-sm-8 col-12">
        <div class="product_view_content">
          <h2 class="title light">
            {{ shopPages.name }}
          </h2>
          <span><i class="fa fa-eye"></i> {{ shopPages.view_count }} </span>
       

       <h4 class="pop bold">

  <!-- Show promotion price if it's valid -->
<template v-if="shopPages.promotion == 1 && shopPages.promotion_price">

  <span class="me-2"> {{ shopPages.promotion_price }} Tk</span>
<del class="text-danger">{{ shopPages.price }} Tk</del>
  </template>

  <!-- Show normal price if no promotion -->
  <template v-else>
    <span class="text-dark">{{ shopPages.price }} Tk</span>
  </template>

</h4>



          <div class="size_chart mt-3 d-none">
            <img :src="defaultSize" alt="" class="" />
          </div>

          <div id="alertDanger" class="alert alert-danger alert-dismissible fade show p-2 small d-none" role="alert">
          </div>

          <form method="POST" id="order_submit">
            <!-- size and color -->


            <div v-for="(option, index) in variantOptions" :key="index" class="d-flex" v-if="shopPages.is_variant == 1">
              <h4 class="pop medium">{{ option }}:</h4>
              <div class="sizes d-flex flex-wrap align-items-center">
                <div v-for="(value, i) in variantValues[index]?.split(',')" :key="i" class="burmanRadio me-2"
                  :class="{ 'required-highlight': hasVariants && !selectedVariants[`variant_${index + 1}`] }">
                  <!-- <input type="radio" class="burmanRadio__input" :id="`variant_${index + 1}_${value.trim()}`"
                    :name="`variant_${index + 1}`" :value="value.trim()" required
                    @change="option.toLowerCase() === 'color' ? updateImageByColor(value.trim()) : null" /> -->
                  <!-- In your template, modify the radio inputs: -->
                  <input type="radio" class="burmanRadio__input" :id="`variant_${index + 1}_${value.trim()}`"
                    :name="`variant_${index + 1}`" :value="value.trim()" required
                    v-model="selectedVariants[`variant_${index + 1}`]"
                    @change="option.toLowerCase() === 'color' ? updateImageByColor(value.trim()) : null" />
                  <label :for="`variant_${index + 1}_${value.trim()}`" class="burmanRadio__label">
                    {{ value.trim() }}
                  </label>
                </div>
              </div>
            </div>

            <div class="align-items-center flex-wrap mt-2 col-lg-8">
              <input type="hidden" name="product_id" :value="shopPages.id">
              <div class="d-flex justify-content-between align-items-start mb-1" style="width: 100%;">
                <!-- Quantity controls -->
                <div class="quantity_box mb-2 quantityBtnDesign me-2" style="overflow: hidden;">
                  <button type="button" class="minus btn" @click="decreaseQuantity">-</button>
                  <input type="text" class="quantity_value placeholder_black form-control" v-model="quantity" min="1"
                    max="12" readonly>
                  <button type="button" class="plus btn" @click="increaseQuantity">+</button>
                </div>

                <button class="btn rounded-5 flex-fill ord_btn orderBtnDesign btn_design" @click.prevent="orderNow">
                  <div class="cart_btn bangali bold ord_bt">
                    <i class="fa fa-cart-shopping"></i>
                    <span>অর্ডার করুন</span>
                  </div>
                </button>
              </div>

              <div class="btn_submit">
                <button class="btn mt-lg-2 semi text-cap col-12 add_to_cart btn_design rounded-5 mb-2"
                  @click.prevent="addToCart">
                  <i class="fa-solid fa-cart-plus text-white mx-2"></i> কার্টে রাখুন
                </button>
              </div>
              <div class="call_now">
                <router-link to="tel:01615597820"
                  class="btn btn-warning mt-lg-1 semi text-cap col-12 add_to_cart rounded-5 btn_design"
                  style="background: #00276C;color: #ffffff;border: none;">
                  <i class="fas fa-phone" style="padding-right: 7px;"></i> 01615597820
                </router-link>
              </div>
            </div>
          </form>

          <!-- Product Details Accordion -->
          <div class="accordion accordion-flush mt-3" id="accordionFlushExample">
            <div class="accordion-item rounded-3 border-0 shadow mb-2">
              <h2 class="accordion-header">
                <button class="accordion-button border-bottom collapsed fw-semibold" type="button"
                  data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false"
                  aria-controls="flush-collapseOne">
                  Description
                </button>
              </h2>
              <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body apni" v-html="shopPages.product_details"></div>
              </div>
            </div>

            <div class="accordion-item rounded-3 border-0 shadow mb-2">
              <h2 class="accordion-header">
                <button class="accordion-button border-bottom collapsed fw-semibold" type="button"
                  data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo1" aria-expanded="false"
                  aria-controls="flush-collapseTwo1">
                  Size Guid
                </button>
              </h2>
              <div id="flush-collapseTwo1" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                  <img :src="shopPages.size_chart ?? ptsv" alt="size">
                </div>
              </div>
            </div>

            <div class="accordion-item rounded-3 border-0 shadow mb-2">
              <h2 class="accordion-header">
                <button class="accordion-button border-bottom collapsed fw-semibold" type="button"
                  data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false"
                  aria-controls="flush-collapseTwo">
                  Terms & Conditions
                </button>
              </h2>
              <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                  <p>Terms &amp; Condition</p>
                </div>
              </div>
            </div>
            <div class="accordion-item rounded-3 border-0 mb-2 shadow">
              <h2 class="accordion-header">
                <button class="accordion-button border-bottom collapsed fw-semibold" type="button"
                  data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false"
                  aria-controls="flush-collapseThree">
                  Reviews
                </button>
              </h2>
              <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                  <div class="wc-tab-inner">
                    <div class="woocommerce-tabs wc-tabs-wrapper" style="background: #dbd3d39e;">
                      <div class="container">
                        <div class="reviews-wrapper pt-4">
                          <div class="row">
                            <div class="col-lg-6 mb--20">
                              <div class="axil-comment-area pro-desc-commnet-area pt-3">
                                <h5 class="title">(<span class="reviewCount">0</span>) Relative Product</h5>
                                <ul class="comment-list">
                                  <!-- Reviews content -->
                                </ul>
                              </div>
                            </div>
                            <div class="col-lg-6 mb--20">
                              <div class="comment-respond pro-des-commend-respond mt--0">
                                <!-- Review form content -->
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />

    <!-- Related Products Section -->
    <div class="container-fluid mt-4">
      <div class="banner rounded-2">
        <div class="ps-lg-5 text-center w-100">
          <div class="title">Related Products</div>
          <!-- <img :src="ptsv" style="width: 200px" /> -->
        </div>
      </div>
      <div class="products mt-3">
        <div class="product" v-for="item in relatedProducts" :key="item.index">
          <div class="image">
            <router-link :to="{ name: 'ProductDetail', params: { slug: item.slug } }" id="product_show"
              :data-productid="item.id" :data-categoryid="item.id" :data-productname="item.name">
              <img :src="`${IMAGE_BASE_URL}/images/product/small/${item.main_image}`" alt="" class="first" />
              <img :src="`${IMAGE_BASE_URL}/images/product/small/${item.main_image}`" alt="" class="second" />
            </router-link>
            <div class="product_btn_position content">
              <router-link :to="{ name: 'ProductDetail', params: { slug: item.slug } }">
                <button class="submit_button btn btn-light d-block">
                  <div class="cart_btn bangali bold ord_bt">
                    <i class="fa fa-cart-shopping"></i>
                    <span>অর্ডার করুন</span>
                  </div>
                </button>
              </router-link>
            </div>
          </div>

          <div class="labels d-none">
            <div class="tag bg-dark text-light">-39%</div>
            <div class="tag bg-danger text-light">Sold Out</div>
          </div>

          <div class="content px-2 text-center">
            <router-link :to="{ name: 'ProductDetail', params: { slug: item.slug } }">
              <div class="title">
                {{ item.name }}
              </div>
            </router-link>
            <div class="price">
              <span class="current_price" style="color: #00276c">{{ item.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="product_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    </div>
  </div>
</template>

<style scoped>
/* Loading State */
.loading-placeholder {
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Swiper Navigation */
.swiper-button-next,
.swiper-button-prev {
  width: 24px;
  height: 24px;
  background: rgba(128, 128, 128, 0.5);
  border-radius: 50%;
  color: #fff;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 12px;
  font-weight: bold;
}

.nav_image1 {
  max-width: 100px;
  max-height: 682px;
  overflow-x: hidden;
  overflow-y: auto;
}

.nav_image1::-webkit-scrollbar {
  display: none;
}

@media (max-width: 992px) {
  .nav_image1 {
    display: none;
  }
}

/* Product View Content */
.product_view_content {
  transition: opacity 0.2s;
  background-color: ghostwhite;
  padding: 20px;
  border-radius: 40px;
  box-shadow: inset 0px 0px 0 2px #000000;
}

/* Accordion Styles */
.accordion-button:not(.collapsed),
.accordion-button:focus {
  outline: none;
  border-color: transparent;
  box-shadow: none;
  background-color: transparent;
}

.accordion-button::after {
  width: 11px;
  height: 11px;
  border-radius: 100%;
  background-color: var(--bs-danger);
  background-image: none !important;
}

.accordion-button.collapsed::after {
  background-color: var(--bs-gray-300);
}

/* Button Styles */
.btn_design {
  border: 1px solid red;
  background: red;
  color: white;
  box-shadow: 2px 6px 7px #0000005e;
  position: relative;
  top: -5px;
  left: -5px;
  transition: 0.3s;
  font-family: sans-serif;
  font-weight: 600;
  height: 42px;
}

.btn_design:hover {
  background: red;
  color: white;
  top: 0;
  left: 0;
  box-shadow: 0px 0px 0px #00000040;
}

@media (max-width: 700px) {
  .orderBtnDesign {
    width: 80%;
    flex-grow: 1;
    margin-left: auto;
  }
}

/* Banner Styles */
.banner .title {
  font-size: 34px;
  text-transform: uppercase;
  font-family: "poppins";
  color: #043c32;
  font-weight: 700;
}

@media (max-width: 400px) {
  .banner .title {
    font-size: 25px;
  }
}

/* Quantity Box */
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

/* Radio Button Styles */
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
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  width: 20px;
  height: 20px;
  transform: scale(0);
}

.burmanRadio__label:hover::before {
  border-color: #7bc4ca;
}

/* Required Field Highlight */
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