<script setup lang="ts">
import Layout from './components/layouts/Layout.vue';
import { onMounted } from 'vue'
import { useLoadingStore } from './stores/loadingStore'

const loadingStore = useLoadingStore()

onMounted(() => {
  setTimeout(() => {
    loadingStore.isInitialLoading = false
  }, 1000) // optional delay for smooth loader
})
</script>

<template>
  <div id="app" v-cloak>
   <Layout>
    <router-view v-slot="{ Component }">
        <keep-alive include="Home,TopSellProducts">
          <component :is="Component" />
        </keep-alive>
      </router-view>
  </Layout>
  </div>
</template>

<style>
[v-cloak] { display: none; }
#app { min-height: 100vh; display: flex; flex-direction: column; }
</style>
