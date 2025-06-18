<script setup>
import { onMounted, ref } from 'vue'
import ecomLogo from '../../assets/image/ecommerce_settings/ecom3logo17441769441747306879.png'
import c1 from '../../assets/image/c1.png'
import login from '../../assets/image/login.png'
import { useCategoryStore } from '../../stores/categoryStore'
import { IMAGE_BASE_URL } from '../../api'
import { storeToRefs } from 'pinia'
import { useCartCheckoutStore } from '../../stores/cartCheckout'
import { useFlashNewStore } from '../../stores/navShopPage'
import { useRoute, useRouter } from 'vue-router'
import { watch } from 'vue'
import CartSidebarStore from '../frontend/CartSidebarStore.vue'

//browse Categories menues
const browseCategories = useFlashNewStore()
const { topProductsShops } = storeToRefs(browseCategories)
const route = useRoute()
// Function to load data based on cat_id
const loadTopProducts = () => {
  const catId = route.query.cat_id || null;
  browseCategories.fetchTopSellPage(1, catId);
};

const selectedCategoryId = ref('')
// category Stores in search bar

const categoryStore = useCategoryStore()
const cartStore = useCartCheckoutStore()

// Refs
const { categoryMenu } = storeToRefs(categoryStore)
const { cartCount, grandTotal, cartItems, subtotal } = storeToRefs(cartStore)

const showCartSidebar = ref(false)
const showMobileMenu = ref(false)

// Methods
const toggleCartSidebar = () => {
  showCartSidebar.value = !showCartSidebar.value
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}


const toggleSubmenu = (event) => {
  event.preventDefault()
  const button = event.currentTarget
  const submenu = button.closest('.has-submenu').querySelector('.mobile-submenu')
  button.classList.toggle('active')
  submenu.classList.toggle('show')
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
  loadTopProducts();
  await cartStore.fetchCart()
  await categoryStore.fetchCategoriesMenu()

})
// Re-run when cat_id changes and match search category
watch(() => route.query.cat_id, (newVal) => {
  selectedCategoryId.value = newVal || '';
  loadTopProducts();
})
const onCategoryChange = () => {
  route.push({ path: '/shop', query: { cat_id: selectedCategoryId.value } });
};


</script>
<template>
  <header class="header">
    <!-- Top Navigation -->
    <nav class="navbar navbar-expand-lg top_nav navbar-dark" style="background-color: #fafcff;">

      <div class="container-fluid align-items-center">
        <!-- Mobile Menu Toggle Button (visible only on mobile) -->
        <!-- Mobile Menu Toggle Button -->
        <button class="navbar-toggler d-lg-none mobile-menu-btn" type="button" @click="toggleMobileMenu">
          <i class="fa fa-bars"></i>
        </button>

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

        <!-- category Search form -->
        <form class="d-flex header_search col-lg-6 m-auto" action="shop.html">
          <select name="cat_id" class="form-select d-lg-block d-none" v-model="selectedCategoryId"
            @change="onCategoryChange" :name="cat_id"
            style="width: 70px; font-size: 14px; border-radius: 5px 0 0 5px; font-weight: 600; background-color: #d5d5d5;">
            <option value="">All</option>
            <option v-for="(item, index) in categoryMenu" :key="item.index" :value="item.id">{{ item.name }}</option>
          </select>
          <input class="form-control" type="text" placeholder="Search" name="q" />
        </form>

        <!-- Desktop icons -->
        <div class="display_lg">
          <div class="d-lg-flex d-none align-items-center gap-2 ps-lg-3">
            <router-link to="tel:01615597820" class="font-22" style="font-size: 20px;color: #000">
              <i class="fa fa-phone"></i> 01615597820
            </router-link>

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

    <!-- Cart Sidebar component  -->
  <CartSidebarStore 
    :show="showCartSidebar" 
    @close="toggleCartSidebar"
  />
    <!-- Bottom Navigation -->
    <nav class="navbar navbar-expand-lg bottom_nav navbar-light orange-bg2 border-bottom ">
      <div class="container-fluid display_lg">
        <div class="d-lg-flex align-items-center">
          <div class="dropdown category_dropdown_box">
            <div class="category_dropdown text-dark btn rounded-0 ">
              <i class="fa fa-bars mx-3"></i>
              <span class="text-cap medium text-dark font-15 mx-2 nato">Browse Categories</span>
              <i class="fa fa-angle-down ms-auto"></i>
            </div>
            <!-- Browse Category  -->
            <div class="categories dp_content">
              <li class="nav-item" :class="{ 'has_menu': item.sub_categories && item.sub_categories.length }"
                v-for="(item, index) in categoryMenu" :key="item.id">
                <router-link :to="{ path: '/shop', query: { cat_id: item.id } }" class="nav-link">
                  <img :src="`${IMAGE_BASE_URL}/images/category/${item.image}`" :alt="item.name" width="20" />
                  {{ item.name }}
                </router-link>

                <!-- Sub Categories -->
                <ul v-if="item.sub_categories && item.sub_categories.length" class="inner_menu">
                  <li class="nav-item" v-for="subItem in item.sub_categories" :key="subItem.id">
                    <router-link :to="`/shop`" class="nav-link">
                      {{ subItem.name }}
                    </router-link>

                    <!-- Sub-sub categories -->
                    <ul v-if="subItem.sub_categories && subItem.sub_categories.length" class="inner_menu_child">
                      <li class="nav-item" v-for="child in subItem.sub_categories" :key="child.id">
                        <router-link :to="`/shop`" class="nav-link">
                          {{ child.name }}
                        </router-link>
                        <!-- ?cat_id=${item.id}&sub_cat_id=${subItem.id}&child_cat_id=${child.id} -->
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </div>
          </div>

          <ul class="navbar-nav ms-2">
            <li class="nav-item">
              <router-link to="/shop" class="nav-link fw-semibold text-cap medium font-15 text-cap">Top Selling</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/new-product" class="nav-link fw-semibold text-cap medium font-15">NEW PRODUCT</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/flash-product" class="nav-link fw-semibold text-cap medium font-15">FLASH SELL</router-link>
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
  <!-- Mobile Menu Sidebar -->
  <div :class="['mobile-menu-sidebar', { 'mobile-menu-sidebar--show': showMobileMenu }]">
    <div class="mobile-menu-header p-3">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <strong>Menu</strong>
        <button class="btn-close" @click="closeMobileMenu">×</button>
      </div>
    </div>

    <div class="mobile-menu-content nav_mobile">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link" @click="closeMobileMenu">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/shop" class="nav-link" @click="closeMobileMenu">Shop Products</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/new-product" class="nav-link" @click="closeMobileMenu">New Products</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/flash-sell" class="nav-link" @click="closeMobileMenu">Flash Sell</router-link>
        </li>

        <!-- Dynamic Categories with Images -->
        <li v-for="item in categoryMenu" :key="item.id" class="nav-item mobile-category-item"
          :class="{ 'has-submenu': item.sub_categories && item.sub_categories.length }">
          <div class="d-flex justify-content-between align-items-center">
            <router-link :to="{ path: '/shop', query: { cat_id: item.id } }" class="nav-link d-flex align-items-center"
              @click="closeMobileMenu">
              <!-- Category Image -->
              <img :src="`${IMAGE_BASE_URL}/images/category/${item.image}`" :alt="item.name" width="20" height="20"
                class="me-2" style="object-fit: contain;" v-if="item.image" />
              {{ item.name }}
            </router-link>
            <button v-if="item.sub_categories && item.sub_categories.length" class="btn btn-sm submenu-toggle"
              @click="toggleSubmenu($event)">
              <i class="fa fa-chevron-down"></i>
            </button>
          </div>

          <!-- Sub Categories (with same image treatment) -->
          <ul v-if="item.sub_categories && item.sub_categories.length" class="mobile-submenu">
            <li v-for="subItem in item.sub_categories" :key="subItem.id" class="nav-item"
              :class="{ 'has-submenu': subItem.sub_categories && subItem.sub_categories.length }">
              <div class="d-flex justify-content-between align-items-center">
                <router-link :to="`/shop?cat_id=${item.id}&sub_cat_id=${subItem.id}`"
                  class="nav-link d-flex align-items-center" @click="closeMobileMenu">
                  <img :src="`${IMAGE_BASE_URL}/images/category/${subItem.image}`" :alt="subItem.name" width="20"
                    height="20" class="me-2" style="object-fit: contain;" v-if="subItem.image" />
                  {{ subItem.name }}
                </router-link>
                <button v-if="subItem.sub_categories && subItem.sub_categories.length" class="btn btn-sm submenu-toggle"
                  @click="toggleSubmenu($event)">
                  <i class="fa fa-chevron-down"></i>
                </button>
              </div>

              <!-- Sub-sub categories (with same image treatment) -->
              <ul v-if="subItem.sub_categories && subItem.sub_categories.length" class="mobile-submenu">
                <li v-for="child in subItem.sub_categories" :key="child.id" class="nav-item">
                  <router-link :to="`/shop?cat_id=${item.id}&sub_cat_id=${subItem.id}&child_cat_id=${child.id}`"
                    class="nav-link d-flex align-items-center" @click="closeMobileMenu">
                    <img :src="`${IMAGE_BASE_URL}/images/category/${child.image}`" :alt="child.name" width="20"
                      height="20" class="me-2" style="object-fit: contain;" v-if="child.image" />
                    {{ child.name }}
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>

  <!-- Mobile menu overlay -->
  <div v-if="showMobileMenu" class="mobile-menu-overlay" @click="closeMobileMenu"></div>

</template>

<style scoped>
/* mobile menu  */
/* Mobile Menu Toggle Button Styles */
.mobile-menu-btn {
  border: none;
  padding: 0.5rem;
  font-size: 1.25rem;
  color: #000;
  /* Change color to match your design */
  background: transparent;
  margin-right: 0.5rem;
  display: block;
  /* Show by default */
}

/* Hide on desktop */
@media (min-width: 992px) {
  .mobile-menu-btn {
    display: none !important;
  }
}

/* Ensure the navbar brand doesn't get squeezed */
.navbar-brand {
  margin-right: auto;
}

/* Adjust the layout for mobile */
@media (max-width: 991.98px) {
  .container-fluid.align-items-center {
    flex-wrap: wrap;
  }

  /* Make sure search bar appears below */
  .header_search {
    order: 2;
    width: 100%;
    margin-top: 0.5rem;
  }
}

/* Mobile Menu Styles */
.mobile-menu-sidebar {
  position: fixed;
  top: 0;
  left: -100%;
  width: 280px;
  height: 100vh;
  background: white;
  z-index: 1050;
  transition: left 0.3s ease;
  overflow-y: auto;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.mobile-menu-sidebar--show {
  left: 0;
}

.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}

.mobile-menu-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.mobile-menu-content {
  padding: 15px;
}

.mobile-category-item {
  border-bottom: 1px solid #eee;
}

.mobile-category-item .nav-link {
  padding: 10px 15px;
  color: #333;
}

.mobile-submenu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  padding-left: 20px;
  background-color: #f9f9f9;
}

.mobile-submenu.show {
  max-height: 1000px;
  /* Adjust based on your content */
}

.submenu-toggle {
  background: none;
  border: none;
  color: #666;
  padding: 5px 10px;
}

.submenu-toggle i {
  transition: transform 0.3s ease;
}

.submenu-toggle.active i {
  transform: rotate(180deg);
}

/* Responsive adjustments */
@media (max-width: 991.98px) {
  .bottom_nav {
    display: none;
  }
}



/* Cart Sidebar Styles */
.cart-sidebar {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
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
  background: rgba(0, 0, 0, 0.5);
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