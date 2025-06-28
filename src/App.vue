<script setup lang="ts">
import { onMounted } from 'vue'
import { useLoadingStore } from './stores/loadingStore'
import { useRoute } from 'vue-router'
import Header from './components/layouts/Header.vue'
import Footer from './components/layouts/Footer.vue'

const loadingStore = useLoadingStore()

onMounted(() => {
  setTimeout(() => {
    loadingStore.isInitialLoading = false
  }, 1000)
})
</script>

<template>
  <div id="app" v-cloak>
    <Header />
    <main class="main-wrapper">
      <router-view v-slot="{ Component }">
        <keep-alive include="Home,TopSellProducts">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>
    <Footer />
  </div>
</template>
