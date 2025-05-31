<script setup>
import { onMounted, ref } from 'vue'
import ecomLogo from '../../assets/image/ecommerce_settings/ecom3logo17441769441747306879.png'
import c1 from '../../assets/image/c1.png'
import login from '../../assets/image/login.png'
import { useCategoryStore } from '../../stores/categoryStore'
import { IMAGE_BASE_URL } from '../../api'
import { storeToRefs } from 'pinia'
import { useCartCheckoutStore } from '../../stores/cartCheckout'

// Stores
const categoryStore = useCategoryStore()
const cartStore = useCartCheckoutStore()

// Refs
const { categoryMenu } = storeToRefs(categoryStore)
const { cartCount, grandTotal, cartItems, subtotal } = storeToRefs(cartStore)
const showMobileMenu = ref(false)
const showCartSidebar = ref(false)

// Methods
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const toggleCartSidebar = () => {
  showCartSidebar.value = !showCartSidebar.value
}

const getImageUrl = (imagePath) => {
  if (!imagePath) return '/path/to/placeholder.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.includes('images/product/')) {
    return `${IMAGE_BASE_URL}/${imagePath}`;
  }
  return `${IMAGE_BASE_URL}/images/product/large/${imagePath}`;
}


// Initialize on component mount
onMounted(async () => {
  await cartStore.fetchCart()
  await categoryStore.fetchCategoriesMenu()
})
</script>

<template>
  <header class="header">
    <!-- Top Navigation -->
    <nav class="navbar navbar-expand-lg top_nav navbar-dark" style="background-color: #fafcff;">
      <div class="container-fluid align-items-center">
        <router-link :to="`/`" class="navbar-brand">
          <img :src="ecomLogo" alt="Ecom Logo" />
        </router-link>

        <!-- Mobile cart icon -->
        <div class="icon_cart semi btn p-0 me-lg-0 pe-lg-0 display_sm" @click="toggleCartSidebar">
          <div class="btn badge2 px-0">
            <img :src="c1" width="40" alt="" style="filter: invert(1);" />
            <span class="badge text-light" style="background-color: navy;">{{ cartCount }}</span>
          </div>
        </div>
        
        <!-- Mobile login icon -->
        <router-link to="/login" class="btn px-0 d-lg-none" style="color: navy;">
          <img :src="login" style="width: 30px; filter: invert(1);" alt="Login" />
        </router-link>

        <!-- Search form -->
        <form class="d-flex header_search col-lg-6 m-auto" action="shop.html">
          <select name="cat_id" class="form-select d-lg-block d-none"
            style="width: 70px; font-size: 14px; border-radius: 5px 0 0 5px; font-weight: 600; background-color: #d5d5d5;">
            <option value="">All</option>
            <option v-for="(item, index) in categoryMenu" :key="item.index" :value="item.id">{{ item.name }}</option>
          </select>
          <input class="form-control" type="text" placeholder="Search" name="q" />
        </form>

        <!-- Desktop icons -->
        <div class="display_lg">
          <div class="d-lg-flex d-none align-items-center gap-2 ps-lg-3">
            <a href="tel:01615597820" class="font-22" style="font-size: 20px;color: #000">
              <i class="fa fa-phone"></i> 01615597820
            </a>

            <!-- Desktop login icon -->
            <router-link to="/login" class="btn px-0" style="color: navy;">
              <img :src="login" style="width: 30px; filter: invert(1);" alt="Login" />
            </router-link>

            <!-- Desktop cart icon -->
            <div class="icon_cart semi btn p-0" @click="toggleCartSidebar">
              <div class="btn badge2 px-0">
                <img :src="c1" width="40" alt="" style="filter: invert(1);" />
                <span class="badge text-light bg-dark">{{ cartCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Cart Sidebar -->
    <div class="cart-sidebar" :class="{ 'open': showCartSidebar }">
      <div class="cart-sidebar-header">
        <h5>Shopping Cart</h5>
        <button class="close-btn" @click="toggleCartSidebar">
          <i class="fa fa-times"></i>
        </button>
      </div>
      
      <div class="cart-sidebar-body">
        <div v-if="cartItems.length > 0">
          <div v-for="item in cartItems" :key="cartStore.generateCartItemKey(item)" class="cart-item">
            <!-- <img :src="getImageUrl(item.image)" :alt="item.name" class="cart-item-image" /> -->
              <img :src="getImageUrl(item.image)" :alt="item.name" class="cart-item-image" />
            <div class="cart-item-details">
              <h6>{{ item.name }}</h6>
              <div class="d-flex justify-content-between">
                <span>{{ item.quantity }} × {{ item.price.toFixed(2) }}৳</span>
                <span>{{ (item.price * item.quantity).toFixed(2) }}৳</span>
              </div>
            </div>
            <button class="cart-item-remove" @click="cartStore.removeItem(cartStore.generateCartItemKey(item))">
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>
        <div v-else class="empty-cart">
          <i class="fa fa-shopping-cart"></i>
          <p>Your cart is empty</p>
        </div>
      </div>
      
      <div class="cart-sidebar-footer">
        <div class="cart-total">
          <span>Subtotal:</span>
          <span>{{ subtotal.toFixed(2) }}৳</span>
        </div>
        <router-link to="/checkout" class="btn btn-primary w-100" @click="toggleCartSidebar">
          Checkout
        </router-link>
      </div>
    </div>
    
    <!-- Overlay for cart sidebar -->
    <div class="cart-overlay" :class="{ 'active': showCartSidebar }" @click="toggleCartSidebar"></div>

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
                    <router-link :to="`/shop-page?cat_id=${item.id}&sub_cat_id=${subItem.id}`" class="nav-link">
                      {{ subItem.name }}
                    </router-link>

                    <!-- Sub-sub categories -->
                    <ul v-if="subItem.sub_categories && subItem.sub_categories.length" class="inner_menu_child">
                      <li class="nav-item" v-for="child in subItem.sub_categories" :key="child.id">
                        <router-link :to="`/shop-page?cat_id=${item.id}&sub_cat_id=${subItem.id}&child_cat_id=${child.id}`"
                          class="nav-link">
                          {{ child.name }}
                        </router-link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </div>
          </div>

          <ul class="navbar-nav ms-2">
            <li class="nav-item">
              <router-link to="/shop" class="nav-link text-dark font-14 text-cap">Top Selling</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="`/new-product`" class="nav-link text-dark font-14">NEW PRODUCT</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="`/flash-product`" class="nav-link text-dark font-14">FLASH SELL</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
    <!-- Floating cart button -->
    <div class="fixed-cart-bottom" @click="toggleCartSidebar">
      <p style="background: #00276C;border-top-left-radius: 12px;border-top-right-radius: 12px;margin-bottom: 0px;">
        <i class="fas fa-shopping-cart" style="color: #ffffff !important;"></i>
      </p>
      <p style="color: white;font-size: 12px;background: #00276C;margin-bottom: 0px;">
        <span id="cart_number">{{ cartCount }}</span> items
      </p>
      <p id="total_amount"
        style="color: white;font-size: 12px;background: #f14705;border-bottom-left-radius: 12px;border-bottom-right-radius: 12px;margin-top: 0px;">
        ৳ {{ grandTotal }}
      </p>
    </div>
  </header>

  <!-- Mobile Menu Sidebar -->
  <div :class="['menu_sidebar', { 'menu_sidebar--show': showMobileMenu }]">
    <div class="p-3">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <strong>Menu</strong>
        <button class="btn-close" @click="closeMobileMenu">×</button>
      </div>
      <ul class="list-unstyled">
        <!-- Menu items would go here -->
      </ul>
    </div>
  </div>
  
  <!-- Mobile menu overlay -->
  <div v-if="showMobileMenu" class="overlay" @click="closeMobileMenu"></div>
</template>

<style scoped>
/* Cart Sidebar Styles */
.cart-sidebar {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 10px rgba(0,0,0,0.1);
  z-index: 1050;
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
}

.cart-sidebar.open {
  right: 0;
}

.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 1040;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.cart-overlay.active {
  opacity: 1;
  visibility: visible;
}

.cart-sidebar-header {
  padding: 15px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-sidebar-body {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
}

.cart-item {
  display: flex;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f5f5f5;
}

.cart-item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 15px;
}

.cart-item-details {
  flex: 1;
}

.cart-item-remove {
  background: none;
  border: none;
  color: #dc3545;
  align-self: flex-start;
}

.empty-cart {
  text-align: center;
  padding: 40px 0;
  color: #777;
}

.cart-sidebar-footer {
  padding: 15px;
  border-top: 1px solid #eee;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-weight: bold;
}

@media (max-width: 576px) {
  .cart-sidebar {
    width: 100%;
    right: -100%;
  }
}

/* Existing styles */
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

.nav-link img {
  margin-right: 8px;
}

.inner_menu {
  padding-left: 20px;
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