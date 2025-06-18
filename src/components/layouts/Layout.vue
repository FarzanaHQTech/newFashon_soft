<template>
  <div class="app-wrapper">
    <Header />

    <main class="main-wrapper">
      <!-- Loader only for main content -->
      <div v-if="isRouteLoading" class="main-loader-container">
        <FullPageLoader/>
      </div>

      <div v-else>
        <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in">
            <component :is="Component" :key="route.fullPath" />
          </transition>
        </router-view>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from './Header.vue'
import Footer from './Footer.vue'

import { storeToRefs } from 'pinia'
import { useLoadingStore } from '../../stores/loadingStore'
import FullPageLoader from '../FullPageLoader.vue'

const loadingStore = useLoadingStore()
const { isRouteLoading } = storeToRefs(loadingStore)
</script>

<style scoped>
.main-loader-container {
  min-height: 400px; /* depends on your layout */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>



<!-- <script setup>
import { ref, onMounted } from 'vue'

import { useRouter } from 'vue-router';

import Header from './Header.vue';
import Footer from './Footer.vue';
import FullPageLoader from '../FullPageLoader.vue';

const isLoading = ref(true)

onMounted(async () => {
  // Simulate data loading from backend (adjust time or use real API checks)
  await new Promise(resolve => setTimeout(resolve, 1500)) // ⏳ simulate loading
  isLoading.value = false
})

const router = useRouter();
const currentComponent = ref(null);
const nextComponent = ref(null);
const showCurrent = ref(true);
const showNext = ref(false);

router.beforeEach((to, from, next) => {
  showNext.value = false;
  next();
});

router.afterEach(() => {
  showCurrent.value = false;
  setTimeout(() => {
    showNext.value = true;
  }, 50);
});
</script> -->

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

