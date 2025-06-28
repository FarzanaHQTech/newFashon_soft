<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useHead } from '@vueuse/head'
import { useHomeCategoryStore } from '../../stores/homeCategoryStore'
import { IMAGE_BASE_URL } from '../../api'

import Categories from '../frontend/Categories.vue'
import FlashSell from '../productVarients/FlashSell.vue'
import CategoryProducts from '../productVarients/CategoryProducts.vue'
import Skeleton from '../ui/Skeleton.vue'

import '../../assets/css/product.css'
import { useLoadingStore } from '../../stores/loadingStore'

const homeCategoryStore = useHomeCategoryStore()
const { homeCategories, sliders } = storeToRefs(homeCategoryStore)
const isLoading = ref(true)
const loadingStore = useLoadingStore()
onMounted(async () => {
  await homeCategoryStore.fetchHomeCategories()
  isLoading.value = false
  loadingStore.finishInitialLoad()
  initCountdown()
})
onMounted(async () => {
  await homeCategoryStore.fetchHomeCategories()
   // ✅ clean and explicit
})


function initCountdown() {
  const countdownElement = document.querySelector(".promo-count")
  if (countdownElement) {
    const endDate = countdownElement.dataset.date
    startCountdown("promoCountdown2", endDate)
  }
}

function startCountdown(elementId, endDate, design = false) {}

useHead({
  title: 'Home - SoftITGlobal Fashion',
  meta: [
    { name: 'description', content: 'Discover the latest fashion categories and deals.' },
    { property: 'og:title', content: 'SoftITGlobal - Home' },
    { property: 'og:image', content: 'https://example.com/og-image.jpg' },
  ]
})
</script>


<template>
 <div class="container-fluid p-0 m-0">
  
    <Skeleton v-if="isLoading" />

    <template v-else>
<div class="row g-0">
        <div class="col-lg-12 flex-grow-1 min-h-430">
          <div id="main_carousel" class="carousel slide pt-2 h-100" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button v-for="(slider, index) in sliders" :key="index" type="button"
                :data-bs-target="'#main_carousel'" :data-bs-slide-to="index"
                :class="{ active: index === 0 }" aria-current="true"
                :aria-label="'Slide ' + (index + 1)"></button>
            </div>

            <div class="carousel-inner h-100" role="listbox">
              <div v-for="(slider, index) in sliders" :key="slider.id"
                :class="['carousel-item', 'h-100', { active: index === 0 }]" data-bs-interval="2000">
                <router-link to="/">
                <img class="bg_image mobileHide" :src="`${IMAGE_BASE_URL}/sliders/${slider.image}`" alt="slider image" loading="lazy" decoding="async" />
<img class="bg_image mobileShow" :src="`${IMAGE_BASE_URL}/sliders/${slider.mobile_image}`" alt="slider image" loading="lazy" decoding="async" />

                </router-link>
              </div>
            </div>

            <button class="carousel-control-prev" type="button" data-bs-target="#main_carousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#main_carousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      <Categories />
      <FlashSell />
      <CategoryProducts />
    </template>
  </div>
</template>


<style>
.bg_image {
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  object-fit: cover;
  display: block;
}

/* ✅ Large Desktop: width ≥ 1200px */
@media (min-width: 1200px) {
  .carousel-item {
    min-height: 430px;
  }

  .bg_image {
    height: 100%;
    aspect-ratio: 3 / 1;
  }

  .mobileHide {
    display: block;
  }

  .mobileShow {
    display: none;
  }
}

/* ✅ Standard Tablet/Desktop: 1000px–1199.98px */
@media (min-width: 1000px) and (max-width: 1199.98px) {
  .carousel-item {
    min-height: 430px;
  }

  .bg_image {
    height: 100%;
    width: 100%;
    aspect-ratio: 3 / 1;
  }

  .mobileHide {
    display: block;
  }

  .mobileShow {
    display: none;
  }
}

/* ✅ Tablet/iPad: 768px–999.98px */
@media (min-width: 768px) and (max-width: 999.98px) {
  .carousel-item {
    min-height: 400px;
  }

  .bg_image {
    height: 100%;
    aspect-ratio: 3 / 1;
  }

  .mobileHide {
    display: none;
  }

  .mobileShow {
    display: block;
  }
}

/* ✅ Mobile: width ≤ 767.98px */
@media (max-width: 767.98px) {
  .carousel-item {
    min-height: auto;
  }

  .bg_image {
    height: 100%;
    aspect-ratio: 3 / 2;
  }

  .mobileHide {
    display: none;
  }

  .mobileShow {
    display: block;
  }
}


</style>
