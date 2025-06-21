<template>
  <div>
    <FullPageLoader v-if="isInitialLoading" />
    <div v-else class="app-wrapper">
      <Header />
      <main class="main-wrapper">
        <transition name="fade" mode="out-in">
          <router-view :key="$route.fullPath" />
        </transition>
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import Header from './Header.vue'
import Footer from './Footer.vue'
import FullPageLoader from '../FullPageLoader.vue'
import { useLoadingStore } from '../../stores/loadingStore'
import { storeToRefs } from 'pinia'

const loadingStore = useLoadingStore()
const { isInitialLoading } = storeToRefs(loadingStore)
</script>
