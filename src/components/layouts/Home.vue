// Home.vue
<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useHead } from '@vueuse/head'
import { useHomeCategoryStore } from '../../stores/homeCategoryStore'

import '../../assets/css/product.css'

import Categories from '../frontend/Categories.vue'
import FlashSell from '../productVarients/FlashSell.vue'
import CategoryProducts from '../productVarients/CategoryProducts.vue'
import { IMAGE_BASE_URL } from '../../api'

const homeCategoryStore = useHomeCategoryStore()
const { homeCategories, sliders } = storeToRefs(homeCategoryStore)

onMounted(() => {
  homeCategoryStore.fetchHomeCategories()
  initCountdown()
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
  <div class="container-fluid">
    <div class="row">
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
                <img class="bg_image mobileHide" :src="`${IMAGE_BASE_URL}/sliders/${slider.image}`" alt="slider image"
                  width="1200" height="400" loading="lazy" decoding="async" />
                <img class="bg_image mobileShow" :src="`${IMAGE_BASE_URL}/sliders/${slider.mobile_image}`" alt="slider image"
                  width="600" loading="lazy" decoding="async" />
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
  </div>
</template>

<style>
.bg_image {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  aspect-ratio: 3 / 1;
  object-fit: cover;
}

.mobileHide {
  display: block;
}

.mobileShow {
  display: none;
}

@media (max-width: 768px) {
  .mobileHide {
    display: none;
  }
  .mobileShow {
    display: block;
  }
  .bg_image {
    aspect-ratio: 3 / 2;
  }
}
</style>
