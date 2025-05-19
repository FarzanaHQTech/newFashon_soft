
<script setup>
import { onMounted, ref } from 'vue'

import slider1 from '../../assets/image/sliders/banner21747333118.jpg';
import mobliSlider1 from '../../assets/image/sliders/banner2a1747333118.jpg';
import mobliSlider2 from '../../assets/image/sliders/s21747487695.jpg';
import slider2 from '../../assets/image/sliders/s11747487509.jpg';
// import slider2 from '../../assets/image/images/category/';
import imgGirlsFashion from '../../assets/image/images/category/girls-fashion-2025-05-06-11-31-49-7280.jpeg';
import imgSaree from '../../assets/image/images/category/saree-2024-11-14-11-57-40-8691.jpg';
import imageTop from '../../assets/image/images/category/tops-2025-05-16-12-03-45-3100.jpg';
import womenFashion from '../../assets/image/images/category/women-fashion-2025-03-05-08-09-45-2322.png';
import imageBaby from '../../assets/image/images/category/baby-collection-2025-03-05-08-09-29-1500.jpg';
import imagePanjabi from '../../assets/image/images/category/panjabi-2025-03-05-08-24-49-7755.jpg';
import imageshirt from '../../assets/image/images/category/polo-shirt-2025-03-05-08-24-28-4878.jpg';


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
    
    <!-- Flash Sale Section -->
    <div class="category_products flash-sale-container">
      <div class="banner rounded-2">
        <div class="text-center w-100">
          <div class="title">Flash Sell</div>
          <!-- <img src="assets/pt.svg" style="width: 200px;"> -->
          <span class="promo-count mx-2" id="promoCountdown2" data-date="2025-05-31"></span>
        </div>
      </div>
    </div>
    
    <!-- Flash Sale Products -->
    <div class="products mt-3 flash-sale-products">
      <div class="product" v-for="product in flashSaleProducts" :key="product.id">
        <!-- Product structure here -->
      </div>
    </div>
    
    <!-- Category Products Sections -->
    <div v-for="category in featuredCategories" :key="category.id" class="category_products" :data-category-id="category.id">
      <div class="banner rounded-2">
        <div class="text-center w-100">
          <div class="title">{{ category.name }}</div>
          <!-- <img src="assets/pt.svg" style="width: 200px;"> -->
          <div class="small" v-if="category.description">{{ category.description }}</div>
        </div>
      </div>
      
      <div class="products mt-3">
        <div class="product" v-for="product in category.products" :key="product.id">
          <!-- Product structure here -->
        </div>
      </div>
      
      <div class="text-center mt-3" v-if="category.hasMore">
        <button class="btn btn-danger load-more-products" :data-category-id="category.id" data-page="2">
          Load More
        </button>
      </div>
    </div>

    
  </div>
</template>

<style scoped>
/* Mobile slider styles */
/* .mobile-slider {
    display: flex;
    overflow-x: auto;
    gap: 15px;
    padding: 10px 0;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
}

.mobile-slider .product-item {
    scroll-snap-align: start;
    min-width: 150px;
    flex: 0 0 auto;
    background: white;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.mobile-slider .product-item img {
    border-radius: 6px;
    aspect-ratio: 1/1;
    object-fit: cover;
}

.mobile-slider .product-item .ctgName {
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    margin-top: 8px;
    color: #333;
} */




/* Home specific styles from original HTML */
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

.ctgName {
    color: #000;
    text-align: center;
    font-weight: bold;
    width: 100%;
    font-size: 13px;
    overflow: hidden;
    max-width: 100%;
    display: block;
    text-wrap: nowrap;
    text-overflow: ellipsis;
}

.countdown_box{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 8px;
}

.countdown_box .count_item{
    height: 50px;
    width: 50px;
    display: grid;
    place-content: center;
    border-radius: 5px;
    border: 3px solid black;
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
}

@media (max-width: 769px){
    .countdown_box .count_item{
        height: 50px;
        width: 50px;
        font-size: 16px;
    }
}

.countdown_box2{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    padding: 8px;
}

.countdown_box2 .count_item {
    height: 100px;
    width: 100px;
    display: grid;
    place-content: center;
    border-radius: 5px;
    border: 3px solid white;
    font-size: 40px;
    font-weight: 700;
    text-transform: uppercase;
}

@media (max-width: 769px){
    .countdown_box2 .count_item{
        height: 70px;
        width: 70px;
        font-size: 20px;
    }
}

@media(min-width: 1200px){
    .min-h-430{
        min-height: 430px;
    }
}

.service-support-box a {
    color: #000;
}

.divide {
    padding-top: 16px;
}

.feature-cat {
    box-shadow: 1px 1px 4px 0px #bbbbbb;
}

.col-lg-feaCat {
    flex: 0 0 auto;
    width: 10.3%;
}

.col-lg-feaCat .category img:hover{
    scale: 1.1;
}

p.featureItem {
    color: #000;
    font-weight: 600;
    font-size: 12px;
    margin: 6px 0;
}

.img-fluid {
    max-width: 85%;
    height: auto;
    clip-path: polygon(50% 0, 100% 25%, 100% 80%, 50% 101%, 0 80%, 0 25%);
}

.promo-v1{
    font-size: 26px;
    font-weight: bold;
    border-bottom: 1px solid #000;
}

.category_products .banner .left, .category_products .banner .right{
    padding-left: 1rem;
}

@media (min-width: 320px) and (max-width: 768px) {
    .col-lg-feaCat {
        flex: 0 0 auto;
        width: 30%;
    }
    .category_products .banner .title {
        font-size: 40px;
    }
    .category_products .banner {
        flex-wrap: wrap;
        padding: 10px 5px;
        justify-content: center;
    }
}

@media (min-width: 320px) and (max-width: 350px) {
    .ctgName{
        white-space: nowrap;
    }
}

@media (min-width: 351px) and (max-width: 390px) {
    .ctgName{
        white-space: nowrap;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .col-lg-feaCat {
        flex: 0 0 auto;
        width: 23%;
    }
    p.featureItem {
       font-size: 14px; 
       margin-top: -24px;
    }
}

@media (min-width: 1200px) and (max-width: 2600px) {
    .category_dropdown_box .categories{
        height: 452px;
    }
    .heightFixed{
        height: 445px;
    }
}

.bg_image{
    aspect-ratio: 3/1;
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.date_title{
    font-size: 30px;
}

.date_see_all{
    white-space: nowrap;
}

.promo-count{
    padding: 2px 10px;
    color: #000;
    border-radius: 2px;
    /* vertical-align: middle; */
    font-size: 20px;
    display: block;
}

.mobileShow{
    display: none;
}

@media(max-width: 1200px){
    .date_title{
        font-size: 25px;
    }
}

@media(max-width: 768px){
    .date_title{
        font-size: 20px;
    }
    .date_see_all {
        font-size: 25px;
        margin-top: 10px;
    }
    
    .category_products .banner .title {
        font-size: 40px;
    }
    
    .mobileShow{
        display: block;
    }
    .mobileHide{
        display: none;
    }
    .bg_image {
        aspect-ratio: 3 / 2;
    }
}

@media (max-width: 420px) {
    .category_products .banner .title {
        font-size: 24px;
        overflow: hidden;
        white-space: nowrap;
    }
    .category_products .banner .left, .category_products .banner .right{
        padding-left: 0;
    }
}

@media (min-width: 450px) and (max-width: 649px){
    .category_products .banner .title {
        font-size: 45px;
    }
}

@media (min-width: 650px) and (max-width: 768px){
    .category_products .banner .title {
        font-size: 60px;
    }
    .date_see_all {
        font-size: 40px;
        margin-top: 20px;
    }
}

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

.popular_product b {
    background-color: currentColor;
    display: block;
    flex: 1;
    height: 2px;
    opacity: .1;
}

.popular_product span {
    font-size: 24px;
    font-family: 'Hind Siliguri', sans-serif;
    margin-bottom: 0px;
    color: #000;
    font-weight: 600;
}

.load-more-products {
    transition: all 0.3s ease;
    padding: 8px 25px;
    font-weight: 500;
}

.load-more-products:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.load-more-products:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
}

.loaded-products {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
}


</style>