<script setup>
import { onMounted, ref } from 'vue'
import ecomLogo from '../../assets/image/ecommerce_settings/ecom3logo17441769441747306879.png'
import c1 from '../../assets/image/c1.png'
import login from '../../assets/image/login.png'

import { useCategoryStore } from '../../stores/categoryStore'
import { storeToRefs } from 'pinia'
import { IMAGE_BASE_URL } from '../../api'
// const navbar = useNavberStore()

const showMenu = useCategoryStore()
const { categoryMenu } = storeToRefs(showMenu)

onMounted(() => {
  showMenu.fetchCategoriesMenu()
})


// Mobile menu toggle state
const showMobileMenu = ref(false)
// Toggle function
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

// Close function
const closeMobileMenu = () => {
  showMobileMenu.value = false
}
</script>

<template>
  <header class="header">
    <!-- Top Navigation -->
    <nav class="navbar navbar-expand-lg top_nav navbar-dark" style="background-color: #fafcff;">
      <div class="container-fluid align-items-center">
        <!-- <button class="navbar-toggler border-0 p-0" 
          style="font-size: 26px; color: navy;">
          <i class="fa fa-bars"></i>
        </button> -->
        <!-- <button class="menu-button mb-3" @click="toggleMobileMenu">
          <i class="fa fa-bars"></i>
        </button> -->


        <a class="navbar-brand" href="index.htm">
          <img :src="ecomLogo" alt="Ecom Logo" />
        </a>

        <div class="icon_cart semi btn p-0 me-lg-0 pe-lg-0 display_sm">
          <div class="btn badge2 px-0">
            <img :src="c1" width="40" alt="" style="filter: invert(1);" />
            <span class="badge text-light" style="background-color: navy;">0</span>
          </div>
        </div>
        <!-- Mobile login icon only -->
        <router-link to="/login" class="btn px-0 d-lg-none" style="color: navy;">
          <img :src="login" style="width: 30px; filter: invert(1);" alt="Login" />
        </router-link>

        <form class="d-flex header_search col-lg-6 m-auto" action="shop.html">
          <select name="cat_id" class="form-select d-lg-block d-none"
            style="width: 70px; font-size: 14px; border-radius: 5px 0 0 5px; font-weight: 600; background-color: #d5d5d5;">
            <option value="">All</option>
            <option v-for="(item, index) in categoryMenu" :key="item.index" :value="item.id">{{ item.name }}</option>
          </select>
          <input class="form-control" type="text" placeholder="Search" name="q" />
        </form>

        <div class="display_lg">
          <div class="d-lg-flex d-none align-items-center gap-2 ps-lg-3">
            <a href="tel:01615597820" class="font-22" style="font-size: 20px;color: #000">
              <i class="fa fa-phone"></i> 01615597820
            </a>

            <!-- Desktop login icon -->
            <router-link to="/login" class="btn px-0" style="color: navy;">
              <img :src="login" style="width: 30px; filter: invert(1);" alt="Login" />
            </router-link>

            <div class="icon_cart semi btn p-0">
              <div class="btn badge2 px-0">
                <img :src="c1" width="40" alt="" style="filter: invert(1);" />
                <span class="badge text-light bg-dark">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Bottom Navigation -->
    <nav class="navbar navbar-expand-lg bottom_nav navbar-light orange-bg2 border-bottom">
      <div class="container-fluid display_lg">
        <div class="d-lg-flex align-items-center">
          <div class="dropdown category_dropdown_box">
            <div class="category_dropdown text-dark btn rounded-0 ">
              <i class="fa fa-bars mx-3"></i>
              <span class="text-cap medium font-13 mx-2 nato">Browse Categories</span>
              <i class="fa fa-angle-down ms-auto"></i>
            </div>
            <div class="categories dp_content">
              <li class="nav-item" :class="{ 'has_menu': item.sub_categories && item.sub_categories.length }"
                v-for="(item, index) in categoryMenu" :key="item.id">
                <router-link :to="{ path: '/shop-page', query: { cat_id: item.id } }" class="nav-link">
                  <img :src="`${IMAGE_BASE_URL}/images/category/${item.image}`" :alt="item.name" width="20" />
                  {{ item.name }}
                </router-link>

                <!-- Sub Categories -->
                <ul v-if="item.sub_categories && item.sub_categories.length" class="inner_menu">
                  <li class="nav-item" v-for="subItem in item.sub_categories" :key="subItem.id">
                    <a :href="`/shop-page?cat_id=${item.id}&sub_cat_id=${subItem.id}`" class="nav-link">
                      {{ subItem.name }}
                    </a>

                    <!-- Sub-sub categories -->
                    <ul v-if="subItem.sub_categories && subItem.sub_categories.length" class="inner_menu_child">
                      <li class="nav-item" v-for="child in subItem.sub_categories" :key="child.id">
                        <a :href="`/shop-page?cat_id=${item.id}&sub_cat_id=${subItem.id}&child_cat_id=${child.id}`"
                          class="nav-link">
                          {{ child.name }}
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </div>
          </div>

          <ul class="navbar-nav ms-2">
            <li class="nav-item"><a href="shop-8.html" class="nav-link text-dark font-14 text-cap">Top Selling</a></li>
            <li class="nav-item"><a href="new-product.html" class="nav-link text-dark font-14">NEW PRODUCT</a></li>
            <li class="nav-item"><a href="flash-product.html" class="nav-link text-dark font-14">FLASH SELL</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <a href="../index.htm" class="cart-dropdown-btn">
      <div class="fixed-cart-bottom">
        <p style="background: #00276C;border-top-left-radius: 12px;border-top-right-radius: 12px;margin-bottom: 0px;">
          <i class="fas fa-shopping-cart" style="color: #ffffff !important;"></i>
        </p>
        <p style="color: white;font-size: 12px;background: #00276C;margin-bottom: 0px;">

          <span id="cart_number">0</span> items
        </p>
        <p id="total_amount"
          style="color: white;font-size: 12px;background: #f14705;border-bottom-left-radius: 12px;border-bottom-right-radius: 12px;margin-top: 0px;">
          ৳ 0</p>
      </div>
    </a>
  </header>

  <!-- Mobile Menu Sidebar from here -->

  <!-- Mobile Menu Sidebar -->
  <div :class="['menu_sidebar', { 'menu_sidebar--show': showMobileMenu }]">
    <div class="p-3">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <strong>Menu</strong>
        <button class="btn-close" @click="closeMobileMenu">×</button>
      </div>
      <ul class="list-unstyled">
        <!-- <li v-for="item in navItems" :key="item.id" class="mb-2">
            <a :href="item.link" class="text-dark">{{ item.name }}</a>
          </li> -->
      </ul>
    </div>
  </div>
  <!-- Background Overlay -->
  <div v-if="showMobileMenu" class="overlay" @click="closeMobileMenu"></div>
</template>

<style scoped>
.menu-button {
  font-size: 24px;
  background: none;
  border: none;
  color: #000;
}

.menu_sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100%;
  background: #fff;
  z-index: 9999;
  overflow-y: auto;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
}

.menu_sidebar--show {
  transform: translateX(0);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9998;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}



.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9998;
}

.nav-link img {
  margin-right: 8px;
}

.inner_menu {
  padding-left: 20px;
}

.fixed-cart-whats {
  position: fixed;
  bottom: 14rem;
  right: 35px;
  border-radius: 12px;
  cursor: pointer;
  text-align: center;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
  z-index: 9999;
}

.fixed-cart-bottom {
  position: fixed;
  bottom: 9rem;
  right: 35px;
  background: #000000;
  border-radius: 12px;
  height: 54px;
  width: 60px;
  cursor: pointer;
  box-shadow: 2px 2px 8px gray;
  text-align: center;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
  z-index: 9999;
}

@media(max-width: 768px) {
  .navbar-brand {
    width: auto;
  }
}

@media(min-width: 1600px) {
  .fixed-cart-bottom {
    right: calc(13% - 55px);
  }
}

.cart_button {
  background: #00276C !important;
}

.cart_icon {
  color: #000000 !important;
}

.products {
  align-content: flex-start;
}

@media(max-width: 769px) {
  .navbar-brand img.logo {
    width: 160px !important;
    height: 50px;
    margin-left: 10px;
  }
}

@media(min-width: 1600px) {
  .container-fluid {
    max-width: 1600px !important;
    margin: 0 auto !important;
  }
}

.category_dropdown_box .categories li.has_menu .inner_menu_child {
  left: 95%;
  top: 0;
  list-style: none;
  background: white;
  padding: 0;
  margin-left: 30px;
  opacity: 1;
  transition: 0.5s;
}
</style>
