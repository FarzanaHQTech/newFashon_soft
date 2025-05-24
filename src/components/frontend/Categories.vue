<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import { onMounted } from 'vue'
import { useCategoryStore } from '../../stores/categoryStore'
import { storeToRefs } from 'pinia'
import { IMAGE_BASE_URL } from '../../api/index' 

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)

onMounted(() => {
  categoryStore.fetchCategories()
})
</script>


<template>
  <div class="container-fluid p-0">
    <div class="text-center py-2">
      <div class="popular_product">
        <b></b>
        <span>Popular Categories</span>
        <b></b>
      </div>
    </div>

    <div class="position-relative px-4">
      <!-- Custom navigation buttons -->
      <button class="swiper-button-prev custom-swiper-nav" aria-label="Previous"></button>
      <button class="swiper-button-next custom-swiper-nav" aria-label="Next"></button>

      <Swiper :modules="[Navigation]" :slides-per-view="'auto'" :space-between="15"
        :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }" class="mobile-category-swiper">
        <SwiperSlide v-for="category in categories" :key="category.id" style="width: 150px;">
          <div class="product-item mx-2 p-1 text-center">
            <a :href="`shop.html?cat_id=${category.id}`">
            <img :src="`${IMAGE_BASE_URL}images/category/${category.image}`"  style="width: 133px; box-shadow: 3px 4px 6px 0px #504f4e80;"  />
            
              <p class="ctgName mt-2">{{ category.name }}</p>
            </a>
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  </div>
</template>

<style scoped>
.popular_product {
  font-size: 22px;
  font-weight: 600;
  color: #333;
}

/* Custom navigation arrow style */
.custom-swiper-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: transparent;
  border: none;
  font-size: 24px;
  color: black;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Hide Swiper default arrows */
.swiper-button-prev::after,
.swiper-button-next::after {
  display: none;
}

/* Use only Font Awesome icons */
.swiper-button-prev::before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: "\f104";
  /* Left chevron */
  color: black;
}

.swiper-button-next::before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: "\f105";
  /* Right chevron */
  color: black;
}
</style>
