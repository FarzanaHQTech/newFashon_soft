<script setup>
import { useMobileMenuStore } from '../../stores/mobileMenu'
import { useCategoryStore } from '../../stores/categoryStore'
import { storeToRefs } from 'pinia'
import { IMAGE_BASE_URL } from '../../api'

const mobileMenuStore = useMobileMenuStore()
const { showMobileMenu } = storeToRefs(mobileMenuStore)
const { closeMobileMenu } = mobileMenuStore

const categoryStore = useCategoryStore()
const { categoryMenu } = storeToRefs(categoryStore)

const toggleSubmenu = (event) => {
  event.preventDefault()
  const button = event.currentTarget
  const submenu = button.closest('.has-submenu').querySelector('.mobile-submenu')
  button.classList.toggle('active')
  submenu.classList.toggle('show')
}

const stopPropagation = (e) => {
  e.stopPropagation()
}
</script>

<template>
  <!-- Mobile Menu Sidebar -->
  <div 
    :class="['mobile-menu-sidebar', { 'mobile-menu-sidebar--show': showMobileMenu }]"
    @click="stopPropagation"
  >
    <div class="mobile-menu-header p-3">
      <div class="d-flex justify-content-between align-items-center">
        <router-link to="/" class="nav-link fw-semibold" style="color: #f14705;" @click="closeMobileMenu">
          Home
        </router-link>
        <button class="btn-close" @click.stop="closeMobileMenu">×</button>
      </div>
    </div>

    <div class="mobile-menu-content nav_mobile">
      <ul class="navbar-nav">
        <li 
          v-for="item in categoryMenu" 
          :key="item.id" 
          class="nav-item mobile-category-item"
          :class="{ 'has-submenu': item.sub_categories && item.sub_categories.length }"
        >
          <div class="d-flex justify-content-between align-items-center">
            <router-link 
              :to="{ path: '/shop', query: { cat_id: item.id } }" 
              class="nav-link d-flex align-items-center" 
              @click="closeMobileMenu"
            >
              <img 
                :src="`${IMAGE_BASE_URL}/images/category/${item.image}`" 
                :alt="item.name" 
                width="20" 
                height="20"
                class="me-2" 
                style="object-fit: contain;" 
                v-if="item.image" 
              />
              <span class="fw-semibold">{{ item.name }}</span>
            </router-link>
            <button 
              v-if="item.sub_categories && item.sub_categories.length" 
              class="btn btn-sm submenu-toggle"
              @click="toggleSubmenu($event)"
            >
              <i class="fa fa-chevron-down"></i>
            </button>
          </div>

          <ul v-if="item.sub_categories && item.sub_categories.length" class="mobile-submenu">
            <li 
              v-for="subItem in item.sub_categories" 
              :key="subItem.id" 
              class="nav-item"
              :class="{ 'has-submenu': subItem.sub_categories && subItem.sub_categories.length }"
            >
              <div class="d-flex justify-content-between align-items-center">
                <router-link 
                  :to="`/shop?cat_id=${item.id}&sub_cat_id=${subItem.id}`"
                  class="nav-link d-flex align-items-center" 
                  @click="closeMobileMenu"
                >
                  <img 
                    :src="`${IMAGE_BASE_URL}/images/category/${subItem.image}`" 
                    :alt="subItem.name" 
                    width="20"
                    height="20" 
                    class="me-2" 
                    style="object-fit: contain;" 
                    v-if="subItem.image" 
                  />
                  {{ subItem.name }}
                </router-link>
                <button 
                  v-if="subItem.sub_categories && subItem.sub_categories.length" 
                  class="btn btn-sm submenu-toggle"
                  @click="toggleSubmenu($event)"
                >
                  <i class="fa fa-chevron-down"></i>
                </button>
              </div>

              <ul v-if="subItem.sub_categories && subItem.sub_categories.length" class="mobile-submenu">
                <li v-for="child in subItem.sub_categories" :key="child.id" class="nav-item">
                  <router-link 
                    :to="`/shop?cat_id=${item.id}&sub_cat_id=${subItem.id}&child_cat_id=${child.id}`"
                    class="nav-link d-flex align-items-center" 
                    @click="closeMobileMenu"
                  >
                    <img 
                      :src="`${IMAGE_BASE_URL}/images/category/${child.image}`" 
                      :alt="child.name" 
                      width="20"
                      height="20" 
                      class="me-2" 
                      style="object-fit: contain;" 
                      v-if="child.image" 
                    />
                    {{ child.name }}
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <div class="ms-3">
          <li class="nav-item">
            <router-link to="/shop" class="nav-link fw-bold" @click="closeMobileMenu">Shop Products</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/new-product" class="nav-link fw-bold" @click="closeMobileMenu">New Products</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/flash-sell" class="nav-link fw-bold" @click="closeMobileMenu">Flash Sell</router-link>
          </li>
        </div>
      </ul>
    </div>
  </div>

  <!-- Mobile menu overlay -->
  <div 
    v-if="showMobileMenu" 
    class="mobile-menu-overlay" 
    @click="closeMobileMenu"
  ></div>
</template>

<style scoped>
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1040;
  pointer-events: auto;
}

.mobile-menu-sidebar {
  position: fixed;
  top: 0;
  left: -100%;
  width: 280px;
  height: 100vh;
  background: white;
  z-index: 1050;
  pointer-events: auto;
  transition: left 0.3s ease;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.mobile-menu-sidebar--show {
  left: 0;
}

.mobile-menu-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.mobile-menu-content {
  overflow-y: auto;
  height: calc(100vh - 50px);
  padding-bottom: 20px;
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

.btn-close {
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
}

@media (max-width: 991.98px) {
  .bottom_nav {
    display: none;
  }
}
</style>