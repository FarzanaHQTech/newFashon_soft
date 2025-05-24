<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useHomeCategoryStore } from '../../stores/homeCategoryStore'


import '../../assets/css/product.css'

// Components
import Categories from '../frontend/Categories.vue'
import FlashSell from '../productVarients/FlashSell.vue'
import GirlFashion from '../productVarients/GirlFashion.vue'
import WomenFashion from '../productVarients/WomenFashion.vue'
import { IMAGE_BASE_URL } from '../../api'
// sliders/s11747487509.jpg
// Initialize store
const homeCategoryStore = useHomeCategoryStore()
const { homeCategories, sliders } = storeToRefs(homeCategoryStore)

// Run on mount
onMounted(() => {
  homeCategoryStore.fetchHomeCategories()
  initCountdown()
})

// Countdown setup
function initCountdown() {
  const countdownElement = document.querySelector(".promo-count")
  if (countdownElement) {
    const endDate = countdownElement.dataset.date
    startCountdown("promoCountdown2", endDate)
  }
}

// Countdown logic
function startCountdown(elementId, endDate, design = false) {
  
}
</script>


<template>
  <div class="container-fluid">
    <!-- Carousel Section -->
    <div class="row">
      <div class="col-lg-12 flex-grow-1 min-h-430">
        <div id="main_carousel" class="carousel slide pt-2 h-100" data-bs-ride="carousel">
          <!-- Carousel Indicators (dots only) -->
          <ol class="carousel-indicators">
            <li 
              v-for="(slider, index) in sliders"
              :key="index"
              :data-bs-target="'#main_carousel'"
              :data-bs-slide-to="index"
              :class="{ active: index === 0 }"
            ></li>
          </ol>

          <!-- Carousel Images -->
          <div class="carousel-inner h-100" role="listbox">
            <div 
              v-for="(slider, index) in sliders"
              :key="slider.id"
              :class="['carousel-item', 'h-100', { active: index === 0 }]"
              data-bs-interval="2000"
            >
              <a href="#">
                <div class="bg_image mobileHide" :style="{ backgroundImage: `url(${IMAGE_BASE_URL}/sliders/${slider.image})` }"></div>
                <div class="bg_image mobileShow" :style="{ backgroundImage: `url(${IMAGE_BASE_URL}/sliders/${slider.mobile_image})` }"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Categories Section -->
    <Categories />
    <FlashSell />
    <GirlFashion />
    <WomenFashion/>
  </div>
</template>

<style scoped>


.bg_image {
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 400px;
}

/* Responsive display for desktop and mobile */
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
}
</style>
