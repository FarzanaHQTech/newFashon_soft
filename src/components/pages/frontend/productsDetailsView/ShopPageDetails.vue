<script setup>
import { computed, ref, watch } from 'vue'
// import { useShopPage } from '../../../stores/shopPage'
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





// Initialize toast
const $toast = useToast()
// Initialize Swiper modules
const modules = [Navigation, Thumbs, Pagination, Zoom]

const shopPage = useShopPage();
const { shopPages, relatedProducts } = storeToRefs(shopPage);
const route = useRoute();
const slug = route.params.slug
const activeIndex = ref(0);
const defaultSize = 'https://newfashion.softitglobal.com/assets/image/size.png'
const thumbsSwiper = ref(null);
const mainSwiper = ref(null);

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

// Set thumbs swiper instance
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

// Set main swiper instance
const setMainSwiper = (swiper) => {
  mainSwiper.value = swiper;
};

// Handle thumbnail click
const onThumbClick = (index) => {
  if (mainSwiper.value) {
    mainSwiper.value.slideTo(index);
  }
};

// Find image index by color
const findImageIndexByColor = (color) => {
  if (!color || !allImages.value.length) return 0;

  const index = allImages.value.findIndex(img => img.color === color);
  return index >= 0 ? index : 0;
};

// Update main image when color variant changes
const updateImageByColor = (color) => {
  const index = findImageIndexByColor(color);
  if (mainSwiper.value) {
    mainSwiper.value.slideTo(index);
  }
};

// for cart e rakhun button
// Add to cart function
const addToCart = async () => {
  try {
    selectedVariants.value = {}
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

//for checkout page
const router = useRouter()
const store = useCartCheckoutStore()
const selectedVariants = ref({})
const quantity = ref(1)

// Parse variants
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

const increaseQuantity = () => {
  if (quantity.value < 12) quantity.value++
}

const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--
}

// Check if product has variants
const hasVariants = computed(() => {
  return shopPages.value?.is_variant == 1 && variantOptions.value.length > 0
})


async function orderNow() {
  try {
    selectedVariants.value = {};
    const variantInputs = document.querySelectorAll('.burmanRadio__input:checked');

    // Check if product has variants
    if (hasVariants.value) {
      // Collect selected variants
      variantInputs.forEach(el => {
        const variantNum = el.name.split('_')[1];
        selectedVariants.value[`variant_${variantNum}`] = el.value;
      });

      // Validate that all required variants are selected
      const selectedCount = Object.keys(selectedVariants.value).length;
      if (selectedCount !== variantOptions.value.length) {
        throw new Error(`Please select all required options (${variantOptions.value.join(', ')})`);
      }
    }

    // Prepare product data for cart
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

    // Add to cart
    await store.addToCart(product);

    // Only redirect if cart is not empty
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
onMounted(async () => {
  await shopPage.fetchShopPage({ slug })
  // console.log('shopPages:', shopPages.value)
  activeIndex.value = 0;

})


const displayPrice = computed(() => {
  if (!shopPages.value) return 0;

  if (shopPages.value.is_promotion && shopPages.value.promotion_price) {
    return shopPages.value.promotion_price;
  }
  return shopPages.value.price;
});

// Watch for variant changes and update price
watch(selectedVariants, async (newVal) => {
  if (!hasVariants.value || !shopPages.value) return;

  try {
    const variantNames = Object.values(newVal);
    if (variantNames.length !== variantOptions.value.length) return;

    const response = await frontendApi.post('/variable-price', {
      productId: shopPages.value.id,
      variant_1: variantNames[0] || null,
      variant_2: variantNames[1] || null,
      variant_3: variantNames[2] || null
    });

    // Update the displayed price
    shopPages.value.price = response.data.variantPrice;
    shopPages.value.promotion_price = response.data.promotional_price;
  } catch (error) {
    console.error('Error updating variant price:', error);
  }
}, { deep: true });
// initial fetch

onMounted(async () => {
  await shopPage.fetchShopPage({ slug })
  // console.log('shopPages:', shopPages.value)
  activeIndex.value = 0;
})

// Watch for slug change
watch(
  () => route.params.slug,
  async (newSlug, oldSlug) => {
    if (newSlug !== oldSlug) {
      await shopPage.fetchShopPage({ slug: newSlug })
      // console.log('Updated slug:', newSlug)
    }
  }
)

watch(
  () => store.cartItems,
  (newVal) => {
    console.log('Cart items changed:', newVal);
  },
  { deep: true }
)



// Add a computed property to check if xsmall products exist
const hasXsmallProducts = computed(() => {
  if (!shopPages.value || !shopPages.value.variant_value) return false;

  try {
    const variantValues = JSON.parse(shopPages.value.variant_value);
    return variantValues.some(variant =>
      variant.variant_name.toLowerCase() === 'xsmall' &&
      variant.variant_items.some(item => item.stock > 0)
    );
  } catch {
    return false;
  }
});
</script>

<template>

  <div class="container-fluid px-1 mt-2 mt-lg-4">
    <div class="row justify-content-between">

      <div class="col-lg-6 col-md-6 col-sm-8 col-12 img_section">
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
          <div class="col-md-10 col-12 ">
            <swiper @swiper="setMainSwiper" :modules="modules" :spaceBetween="10" :navigation="true"
              :pagination="{ clickable: true }" :zoom="true" @slideChange="(swiper) => activeIndex = swiper.activeIndex"
              class="main-swiper ">
              <swiper-slide v-for="(img, index) in allImages" :key="img.id || index" :virtualIndex="index">
                <div class="swiper-zoom-container">
                  <img :src="`${IMAGE_BASE_URL}/images/product/large/${img.image}`" class="d-block w-100"
                    :alt="`Product Image ${index + 1}`" />
                </div>
              </swiper-slide>
            </swiper>

            <!-- Mobile Thumbnail: below main image -->
            <div class="d-block d-md-none nav_images mt-3">
              <swiper :modules="modules" :spaceBetween="10" :slidesPerView="4" :freeMode="true"
                class="mobile-thumb-swiper">
                <swiper-slide v-for="(img, index) in allImages" :key="img.id || index" @click="onThumbClick(index)">
                  <img :src="`${IMAGE_BASE_URL}/images/product/xsmall/${img.image}`"
                    :class="{ 'border border-primary': activeIndex === index }" class="img-fluid cursor-pointer" />
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
      </div>

      <!-- details products  -->
      <div class="col-lg-6 col-md-6 col-sm-8 col-12">
        <div class="product_view_content">
          <h2 class="title light">
            {{ shopPages.name }}
          </h2>
          <span><i class="fa fa-eye"></i> {{ shopPages.view_count }} </span>
          <!-- <h4 class="pop bold"><span id="pro_price">{{ shopPages.price }}</span> Tk</h4> -->
          <h4 class="pop bold">
            <span v-if="shopPages.is_promotion && shopPages.promotion_price"
              class="text-decoration-line-through text-muted me-2">
              {{ shopPages.price }} Tk
            </span>
            <span id="pro_price">
              {{ shopPages.is_promotion && shopPages.promotion_price ? shopPages.promotion_price : shopPages.price }} Tk
            </span>
          </h4>
          <div class="size_chart mt-3 d-none">
            <img :src="size" alt="" class="" />
          </div>

          <div id="alertDanger" class="alert alert-danger alert-dismissible fade show p-2 small d-none" role="alert">
          </div>

          <form method="POST" action="https://newfashion.softitglobal.com/carts" id="order_submit">
            <input type="hidden" name="_token" value="xsED4Nne1eihR0J1Q2QMZ66RViuU99odXVearmOw" autocomplete="off">


            <!-- size and color -->
            <div v-for="(option, index) in variantOptions" :key="index" class="d-flex" v-if="shopPages.is_variant == 1">
              <h4 class="pop medium">{{ option }}:</h4>
              <div class="sizes d-flex flex-wrap align-items-center">
                <div v-for="(value, i) in variantValues[index]?.split(',')" :key="i" class="burmanRadio me-2"
                  :class="{ 'required-highlight': hasVariants && !selectedVariants[`variant_${index + 1}`] }">
                  <input type="radio" class="burmanRadio__input" :id="`variant_${index + 1}_${value.trim()}`"
                    :name="`variant_${index + 1}`" :value="value.trim()" required
                    @change="option.toLowerCase() === 'color' ? updateImageByColor(value.trim()) : null" />
                  <label :for="`variant_${index + 1}_${value.trim()}`" class="burmanRadio__label">
                    {{ value.trim() }}
                  </label>
                </div>
              </div>
            </div>


            <div class="align-items-center flex-wrap mt-2 col-lg-6">
              <input type="hidden" name="product_id" value="122">
              <div class="d-flex justify-content-between align-items-start mb-1" style="width: 100%;">


                <!-- // Update the quantity input in template: -->
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

              <!-- <div class="btn_submit">
                <button class="btn mt-lg-2 semi text-cap col-12 add_to_cart btn_design rounded-5"> <i
                    class="fa-solid fa-cart-plus text-white mx-2"></i> কার্টে রাখুন</button>
              </div> -->
              <div class="btn_submit">
                <button class="btn mt-lg-2 semi text-cap col-12 add_to_cart btn_design rounded-5"
                  @click.prevent="addToCart">
                  <i class="fa-solid fa-cart-plus text-white mx-2"></i> কার্টে রাখুন
                </button>
              </div>
              <div class="call_now">
                <router-link to="tel: 01615597820"
                  class="btn btn-warning mt-lg-1 semi text-cap col-12 add_to_cart rounded-5 btn_design"
                  style="background: #00276C;color: #ffffff;border: none;"><i class="fas fa-phone"
                    style="padding-right: 7px;"></i> 01615597820</router-link>
              </div>
            </div>
          </form>

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

            <!-- //size -->
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
                  <img :src="shopPages.size_chart ?? defaultSize" alt="size">
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
              <!-- related products -->
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
                                  <!-- Start Single Comment  -->
                                  <!-- End Single Comment  -->
                                </ul>
                              </div>
                            </div>
                            <!-- End .col -->
                            <div class="col-lg-6 mb--20">
                              <div class="comment-respond pro-des-commend-respond mt--0">
                                <h5 class="title mb--10">Add a Review</h5>
                                <div class="rating-wrapper d-flex-center mb--10">
                                  <div class="wrapper">
                                    <div class="master">
                                      <div class="rating-component">
                                        <div class="status-msg">
                                          <label>
                                            <input class="rating_msg" type="hidden" name="rating_msg" value="">
                                          </label>
                                        </div>
                                        <div class="stars-box">
                                          <i class="star fa fa-star" title="1 star" data-message="Poor"
                                            data-value="1"></i>
                                          <i class="star fa fa-star" title="2 stars" data-message="Too bad"
                                            data-value="2"></i>
                                          <i class="star fa fa-star" title="3 stars" data-message="Average quality"
                                            data-value="3"></i>
                                          <i class="star fa fa-star" title="4 stars" data-message="Nice"
                                            data-value="4"></i>
                                          <i class="star fa fa-star" title="5 stars" data-message="very good qality"
                                            data-value="5"></i>
                                        </div>
                                        <div class="starrate">
                                          <label>
                                            <input class="ratevalue" type="hidden" name="rate_value" value="">
                                          </label>
                                        </div>
                                      </div>

                                      <div class="feedback-tags">
                                        <div class="tags-container" data-tag-set="1">
                                          <div class="question-tag">
                                            Why was your experience so bad?
                                          </div>
                                        </div>
                                        <div class="tags-container" data-tag-set="2">
                                          <div class="question-tag">
                                            Why was your experience so bad?
                                          </div>
                                        </div>

                                        <div class="tags-container" data-tag-set="3">
                                          <div class="question-tag">
                                            Why was your average rating experience ?
                                          </div>
                                        </div>
                                        <div class="tags-container" data-tag-set="4">
                                          <div class="question-tag">
                                            Why was your experience good?
                                          </div>
                                        </div>

                                        <div class="tags-container" data-tag-set="5">
                                          <div class="make-compliment">
                                            <div class="compliment-container">
                                              Give a compliment
                                              <i class="far fa-smile-wink"></i>
                                            </div>
                                          </div>
                                        </div>

                                        <div class="tags-box">
                                          <form action="https://newfashion.softitglobal.com/review/store" method="POST"
                                            id="ajax_form2">
                                            <input type="hidden" name="_token"
                                              value="oN9xjmAtiQaCg5xRsWVpbpzU5Vt4sA3CtDJjHsHx" autocomplete="off">
                                            <input type="hidden" name="product_id" value="143">
                                            <input type="hidden" name="review" id="review" value="">

                                            <div class="row">
                                              <div class="col-12">
                                                <div class="form-group">
                                                  <label>Review Notes (Mandatory)</label>
                                                  <textarea name="message" placeholder="Your Comment"
                                                    class="form-control"></textarea>
                                                </div>
                                              </div>
                                              <div class="col-lg-6 col-md-6 col-12 m-0">
                                                <div class="form-group">
                                                  <label>Name <span class="require">*</span></label>
                                                  <input id="name" type="text" name="name" placeholder="Your Name"
                                                    class="form-control">
                                                </div>
                                              </div>
                                              <div class="col-lg-6 col-md-6 col-12 m-0">
                                                <div class="form-group">
                                                  <label>Image <span class="require">*</span></label>
                                                  <input type="file" form="ajax_form2" class="form-control" name="image"
                                                    style="padding-top: 12px;">
                                                </div>
                                              </div>
                                              <div class="col-lg-12 mt-2 pb-4">
                                                <div class="button-box form-submit">
                                                  <button type="submit" class="axil-btn btn-bg-primary w-auto">Submit
                                                    Review</button>
                                                </div>
                                                <div class="submited-box">
                                                  <div class="loader"></div>
                                                  <div class="success-message">
                                                    Thank you!
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </form>
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
                      <!--  second woocomerce -->
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



    <br /><br />
    <!-- Related Product  -->
    <div class="container-fluid mt-4">
      <div class="banner rounded-2" bis_skin_checked="1">
        <div class="ps-lg-5 text-center w-100" bis_skin_checked="1">
          <div class="title" bis_skin_checked="1">Related Products</div>
          <img :src="ptsv" style="width: 200px" />
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

              <!-- No need for <form>, use Vue methods instead -->
              <router-link :to="{ name: 'ProductDetail', params: { slug: item.slug } }">
                <button @click="goToCheckout" class="submit_button btn btn-light d-block">

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
            <!--<router-link to="andaaz-luxury-lawn-vol-08-by-ramsha-12.html" id="product_show" :data-productid="item.id" -->
            <router-link :to="{ name: 'ProductDetail', params: { slug: item.slug } }">
              <!-- :data-categoryid="item.id" :data-productname="item.name"> -->
              <div class="title">
                <!-- Andaaz Luxury Lawn vol-08 by Ramsha-12 -->
                {{ item.name }}
              </div>
            </router-link>
            <!-- </a> -->
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
/*  */
.swiper-button-next,
.swiper-button-prev {
  width: 24px;
  /* smaller size */
  height: 24px;
  background: rgba(128, 128, 128, 0.5);
  /* gray background */
  border-radius: 50%;
  color: #fff;
  /* arrow (icon) color */
}

/* Make the arrow icons smaller */
.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 12px;
  /* smaller arrow icon */
  font-weight: bold;
}

.nav_image1 {
  max-width: 100px;
}

/* //first style */
.rating-component .stars-box .star.selected {
  color: #ff5a49;
}

.rating-component .stars-box .star.hover {
  color: #ff5a49;
}

.feedback-tags .tags-container {
  display: none;
}

.submited-box .loader {
  border: 5px solid transparent;
  border-top: 5px solid #4dc7b7;
  border-bottom: 5px solid #ff5a49;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  -webkit-animation: spin 0.8s linear infinite;
  animation: spin 0.8s linear infinite;
}

.submited-box .loader,
.submited-box .success-message {
  display: none;
}

.submited-box .loader,
.submited-box .success-message {
  display: none;
}

a.axil-btn,
button.axil-btn {
  border-radius: 6px;
  font-size: var(--font-size-b1);
  line-height: var(--line-height-b1);
  font-weight: 700;
  display: inline-block;
  padding: 10px 38px;
  position: relative;
  transition: all 0.3s ease-in-out;
  z-index: 1;
}

.comment-inner {
  margin-left: 15px;
  margin-top: 6px;
}

.single-comment {
  display: flex;
}

ul.comment-list {
  margin: 0;
  padding: 0;
}

li.comment {
  list-style: none;
  margin-bottom: 15px;
}

.comment-text {
  margin-bottom: 10px;
}

.pro-desc-commnet-area .comment-list .comment .commenter .hover-flip-item-wrapper a i:not(.empty-rating),
.pro-desc-commnet-area .comment-list .comment .commenter .commenter-rating a i:not(.empty-rating) {
  color: #ffca0f;
}

p.noticText {
  background: #b2eeb8;
  padding: 5px 14px;
  width: 67%;
  margin-top: 12px;
  border-radius: 5px;
}

@media only screen and (max-width: 1199px) {
  p.noticText {
    background: #b2eeb8;
    padding: 5px 17px;
    width: 100%;
  }
}

/* second style  */
.quantity_box {
  display: inline-flex;
  vertical-align: top;
  white-space: nowrap;
  font-size: 0;
}

div.quantity_box button[type="button"] {
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

div.quantity_box button[type="button"]:hover {
  color: #fff;
  background-color: orange;
  border-color: orange;
}

div.quantity_box input[type="text"] {
  width: 40px;
  color: black;
  border-radius: 0;
  border: 2px solid rgb(211, 211, 211);
  border-right: none;
  border-left: none;
}

div.quantity_box button[type="button"].minus {
  border-radius: 50px 0 0 50px;
  border-right: 0;
}

div.quantity_box button[type="button"].plus {
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

.main-wrapper {
  background: #f8f9fa;
}

.carousel-inner {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.slider-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 10px 0px;
  /* Leave room for arrows */
}

.nav_images {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  gap: 10px;
}

.nav_images::-webkit-scrollbar {
  display: none;
}

.nav_images img {
  flex: 0 0 auto;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 6px;
  transition: border 0.3s;
}

.nav_images img.active {
  border-color: #007bff;
}

.arrow {
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  background: rgb(244 67 54);
  color: white;
  border: none;
  padding: 7px;
  height: 31px;
  font-size: 10px;
  border-radius: 53%;
  cursor: pointer;
  z-index: 10;
}

.left-arrow {
  left: 5px;
}

.right-arrow {
  right: 5px;
}

.nav_images [data-bs-target] {
  height: 100px;
  width: 81px;
  box-shadow: 0px 0px 3px 0px gray;
  padding: 5px;
}

.nav_images img {
  margin-bottom: 5px;
}

.nav_images .active {
  height: 100px;
  width: 81px;
}

.carousel-indicators [data-bs-target] {
  border: 0;
}

.wc-tab-inner iframe {
  width: 100%;
  height: 600px;
}

.quantityBtnDesign {
  width: 90px;
}

@media screen and (min-width: 320px) and (max-width: 340px) {
  .nav_images [data-bs-target] {
    height: 100px;
    width: 26.5%;
  }

  .nav_images .active {
    height: 100px;
    width: 26.5%;
  }
}

@media screen and (min-width: 320px) and (max-width: 390px) {
  #product_des li button {
    font-size: 16px;
  }

  .nav_images [data-bs-target] {
    height: 100px;
    width: 27%;
  }

  .nav_images .active {
    height: 100px;
    width: 27%;
  }

  .quantityBtnDesign {
    width: 36%;
  }
}

@media screen and (min-width: 391px) and (max-width: 449px) {
  #product_des li button {
    font-size: 20px;
  }

  .nav_images [data-bs-target] {
    height: 85px;
    width: 19.7%;
  }

  .nav_images .active {
    height: 85px;
    width: 19.7%;
  }
}

@media screen and (min-width: 450px) and (max-width: 500px) {
  #product_des li button {
    font-size: 20px;
  }

  .nav_images [data-bs-target] {
    height: 85px;
    width: 20.4% !important;
  }

  .nav_images .active {
    height: 85px;
    width: 20.4% !important;
  }
}

@media screen and (min-width: 501px) and (max-width: 575px) {
  .nav_images [data-bs-target] {
    height: 85px;
    width: 15.9%;
  }

  .nav_images .active {
    height: 85px;
    width: 15.9%;
  }
}

@media screen and (min-width: 576px) and (max-width: 604px) {
  .nav_images [data-bs-target] {
    height: 85px;
    width: 19.5%;
  }

  .nav_images .active {
    height: 85px;
    width: 19.5%;
  }
}

@media screen and (min-width: 605px) and (max-width: 767px) {
  .nav_images [data-bs-target] {
    height: 85px;
    width: 19.9%;
  }

  .nav_images .active {
    height: 85px;
    width: 19.9%;
  }
}

@media screen and (min-width: 1400px) and (max-width: 1700px) {
  .nav_images [data-bs-target] {
    height: 100px;
    width: 16.6%;
  }

  .nav_images .active {
    height: 100px;
    width: 16.6%;
  }
}

@media screen and (min-width: 320px) and (max-width: 767px) {
  .btn_submit {
    display: inline !important;
  }

  .wc-tab-inner img {
    width: 100%;
  }

  .ord_btn {
    font-size: 16px;
    padding: 8px;
  }
}

.call_now button {
  width: 100%;
}

.call_now {
  margin-top: 10px;
}

.add_to_cart {
  font-size: 19px;
}

.nav-tabs {
  border: 1px solid #000 !important;
  padding: 0px;
  border-radius: 5px;
}

.nav-tabs .nav-link.active {
  background: #000;
  border-radius: 5px;
}

.burmanRadio.disabled {
  position: relative;
  background: #e1dede8a;
  border-radius: 5px;
  cursor: no-drop;
  border: 1px solid #d9d7d7;
  padding: 0 5px;
}

.burmanRadio.disabled::after {
  content: "";
  border-bottom: 1px solid #d1d1d1;
  width: 100%;
  position: absolute;
  left: 4px;
  right: 0;
  top: -13px;
  z-index: 9;
  height: 30px;
  transform: rotate(15deg);
}

.burmanRadio.disabled::before {
  content: "";
  border-top: 1px solid #d5d5d5;
  width: 100%;
  position: absolute;
  left: 6px;
  right: 0;
  bottom: -15px;
  z-index: 9;
  height: 30px;
  transform: rotate(344deg);
}

.nav_image1 {
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

@media (min-width: 992px) {
  .nav_images2 {
    display: none;
  }
}

.product_view_content {
  transition: opacity 0.2s;
  background-color: ghostwhite;
  padding: 20px;
  border-radius: 40px;
  box-shadow: inset 0px 0px 0 2px #000000;
}

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
    width: 65%;
    flex-grow: 1;
    margin-left: auto;
  }
}


/* style end  */
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
    text-transform: uppercase;
    font-family: "poppins";
    color: #043c32;
    font-weight: 700;
  }
}
</style>