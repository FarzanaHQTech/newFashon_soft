<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import { computed, onMounted, ref, watch } from 'vue'
import { useCategoryStore } from '../../stores/categoryStore'
import { storeToRefs } from 'pinia'
import { IMAGE_BASE_URL } from '../../api/index'
import { useFlashNewStore } from '../../stores/navShopPage'
import { useRoute } from 'vue-router'
import Skeleton from '../ui/Skeleton.vue'
import { useLoadingStore } from '../../stores/loadingStore'

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)
const isLoading = ref(true) 

const route = useRoute()
const categorySearch = useFlashNewStore()
const { topProductsShops } = storeToRefs(categorySearch)

const loadPopularProducts = () => {
  const catId = route.query.cat_id || null
  categorySearch.fetchTopSellPage(1, catId)
}

const loadingStore = useLoadingStore()
onMounted(async () => {
  loadPopularProducts()

  //  Wait for fetchCategories to complete, then set isLoading to false
  await categoryStore.fetchCategories()
  isLoading.value = false
  loadingStore.finishInitialLoad()
})

watch(() => route.query.cat_id, () => {
  loadPopularProducts()
})

const failedImages = ref(new Set())

function handleImageError(event, id) {
  console.warn(`Image not found for category ID ${id}:`, event.target.src)
  failedImages.value.add(id)
}
// computed: {
//   loopedCategories() {
//     const base = categories.filter(...)
//     return base.length < 5 ? [...base, ...base] : base;
//   }
// }

</script>

<template>
  <div class="container-fluid p-0">
    <div class="row">
      <Skeleton v-if="isLoading" />

      <template v-else>
        <div class="popular_product text-center py-2" bis_skin_checked="1">   
                    <b></b>    
                   <h4><span class="fw-bold ">Popular Categories</span>    </h4> 
                    <b></b>    
                </div>
        <!-- <div class="text-center py-2">
          <div class="popular_product">
            <b></b>
            <span>Popular Categories</span>
            <b></b>
          </div>
        </div> -->

        <div class="category-swiper-wrapper">
          <!-- Arrows -->
          <button class="swiper-button-prev custom-swiper-nav" aria-label="Previous"></button>

          <div class="swiper-slide-area">
            <!-- <Swiper 
              :modules="[Navigation]" 
              :slides-per-view="'auto'"
             
              :navigation="{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              }" 
              class="mobile-category-swiper"
            
            > -->
            <Swiper :modules="[Navigation]" :slides-per-view="'auto'"  :loop="true" 
           
              :navigation="{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
              }"
              class="mobile-category-swiper"
              >

              <SwiperSlide
                v-for="category in categories.filter(cat => cat.image && cat.image.trim() !== '' && !failedImages.has(cat.id))"
                :key="category.id" class="category-slide">
                <div class="product-item text-center">
                  <router-link :to="{ path: '/shop', query: { cat_id: category.id } }">
                    <img :src="`${IMAGE_BASE_URL}images/category/${category.image}`"
                      :srcset="`${IMAGE_BASE_URL}images/category/${category.image} 480w, ${IMAGE_BASE_URL}images/category/${category.image} 800w`"
                      sizes="(max-width: 600px) 100px, 100px" @error="handleImageError($event, category.id)"
                      :alt="category.name" class="category-img" />
                    <p class="ctgName">{{ category.name }}</p>
                  </router-link>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          <button class="swiper-button-next custom-swiper-nav" aria-label="Next"></button>
        </div>
      </template>
    </div>
  </div>
</template>


<style scoped>
.popular_product {
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    position: relative;
    width: 100%;
    margin-top: 5px;
    margin-bottom: 2%;
    color: #000;
}



.category-swiper-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  padding: 0 10px;
  position: relative;
}

.swiper-slide-area {
  width: 100%;
  overflow: hidden;
}

.mobile-category-swiper {
  padding: 0 20px;
}

/* Slide Width - Responsive */
.category-slide {
  width: 145px !important;
}

.category-img {
  width: 100%;
  max-width: 130px;
  height: auto;
  border-radius: 10px;
  box-shadow: 3px 4px 6px 0px #504f4e80;
  object-fit: cover;
  margin: 0 auto;
}

.product-item {
  padding: 0 5px;
}

.ctgName {
  margin-top: 6px;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #111;
}

/* Custom Arrows */
.custom-swiper-nav {
  background: white;
  border: none;
  width: 36px;
  height: 36px;
  font-size: 22px;
  color: #333;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.swiper-button-prev::before,
.swiper-button-next::before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: #333;
}

.swiper-button-prev::before {
  content: "\f104";
}

.swiper-button-next::before {
  content: "\f105";
}

.swiper-button-prev::after,
.swiper-button-next::after {
  display: none;
}

/* Mobile Optimization */
@media (max-width: 768px) {
  .category-slide {
    width: 32.333% !important;
    /* Show 3 items */
  }

  .category-img {
    max-width: 100px;
  }

  .custom-swiper-nav {
    width: 30px;
    height: 30px;
    font-size: 18px;
  }

  .ctgName {
    font-size: 12px;
  }

  .mobile-category-swiper {
    padding: 0 8px;
  }
}
</style>