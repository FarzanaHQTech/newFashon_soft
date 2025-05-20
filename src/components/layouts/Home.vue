
<script setup>
import { onMounted, ref } from 'vue'

import slider1 from '../../assets/image/sliders/banner21747333118.jpg';
import mobliSlider1 from '../../assets/image/sliders/banner2a1747333118.jpg';
import mobliSlider2 from '../../assets/image/sliders/s21747487695.jpg';
import slider2 from '../../assets/image/sliders/s11747487509.jpg';
// import slider2 from '../../assets/image/images/category/';
import '../../assets/css/product.css'
import imgGirlsFashion from '../../assets/image/images/category/girls-fashion-2025-05-06-11-31-49-7280.jpeg';
import imgSaree from '../../assets/image/images/category/saree-2024-11-14-11-57-40-8691.jpg';
import imageTop from '../../assets/image/images/category/tops-2025-05-16-12-03-45-3100.jpg';
import womenFashion from '../../assets/image/images/category/women-fashion-2025-03-05-08-09-45-2322.png';
import imageBaby from '../../assets/image/images/category/baby-collection-2025-03-05-08-09-29-1500.jpg';
import imagePanjabi from '../../assets/image/images/category/panjabi-2025-03-05-08-24-49-7755.jpg';
import imageshirt from '../../assets/image/images/category/polo-shirt-2025-03-05-08-24-28-4878.jpg';
import FlashSell from '../productVarients/FlashSell.vue';


//  Run on component mount
onMounted(() => {
  initCarousel()
  initCountdown()
})

// Carousel initializer
function initCarousel() {
  const carouselElement = document.getElementById('main_carousel')
  if (carouselElement) {
    new Carousel(carouselElement, {
      interval: 2000
    })
  }
}

// Countdown setup
function initCountdown() {
  const countdownElement = document.querySelector(".promo-count")
  if (countdownElement) {
    const endDate = countdownElement.dataset.date
    startCountdown("promoCountdown2", endDate)
  }
}

const categories = [
  {
    id: 73,
    name: 'Girls Fashion',
    image: imgGirlsFashion
  },
  {
    id: 48,
    name: 'Saree',
    image: imgSaree
  },
  {
    id: 72,
    name: 'Tops',
    image: imageTop
  },
  {
    id: 47,
    name: 'Women Fashion',
    image: womenFashion
  },
  {
    id: 39,
    name: 'Baby Collection',
    image:imageBaby
  },
  {
    id: 40,
    name: 'Panjabi',
    image:imagePanjabi
  },
  {
    id: 42,
    name: 'Polo Shirt',
    image: imageshirt 
  }
]

// Countdown logic (you can complete it later)
function startCountdown(elementId, endDate, design = false) {
  // Your countdown timer logic here...
}
</script>

<template>
   <div class="container-fluid">
    <!-- Carousel Section -->
    <div class="row">
      <div class="col-lg-12 flex-grow-1 min-h-430">
        <div id="main_carousel" class="carousel slide pt-2 h-100" data-bs-ride="carousel">
          <ol class="carousel-indicators">
            <li data-bs-target="#main_carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="second Title"></li>
            <li data-bs-target="#main_carousel" data-bs-slide-to="1" class="" aria-current="true" aria-label="3rd slider"></li>
          </ol>
          <div class="carousel-inner h-100" role="listbox">
            <div class="carousel-item active h-100" data-bs-interval="2000">
              <a href="">
             <div class="bg_image mobileHide" :style="{ backgroundImage: `url(${slider1})` }"></div>

                <div class="bg_image mobileShow" :style="{backgroundImage: `url(${mobliSlider1})`}"></div>
              </a>
            </div>
            <div class="carousel-item h-100" data-bs-interval="2000">
              <a href="">
    
                <div class="bg_image mobileHide" :style="{backgroundImage:`url(${slider2})`}"></div>

                 <div class="bg_image mobileShow" :style="{backgroundImage:`url(${mobliSlider2})`}"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Categories Section -->
    <section class="my-lg-3" style="">
      <div class="container-fluid p-0">
        <div class="text-center py-0">
          <div class="popular_product" bis_skin_checked="1">   
            <b></b>    
            <span>Popular Categories</span>    
            <b></b>    
          </div>
        </div>
      <div class="grid_content">
   <div class="mobile-slider product-box">
      <div
        class="product-item mx-2 p-1"
        v-for="category in categories"
        :key="category.id"
      >
        <a :href="`shop.html?cat_id=${category.id}`">
          <img
            :src="category.image"
            class="rounded-1 mb-2"
            style="width: 133px; box-shadow: 3px 4px 6px 0px #504f4e80;"
          />
          <p class="ctgName">{{ category.name }}</p>
        </a>
      </div>
    </div>
  </div>
      </div>
    </section>
    <FlashSell></FlashSell>
   

    
  </div>
</template>

<style scoped>



</style>