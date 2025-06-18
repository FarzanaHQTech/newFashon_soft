<template>
  <div id="app" v-cloak>
    <Layout>
      <router-view v-slot="{ Component }">
        <keep-alive :include="['Home', 'TopSellProducts', 'CartCountStore']">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </Layout>
  </div>
</template>

<script setup>
import Layout from './components/layouts/Layout.vue'
import { onMounted } from 'vue'
import { useCartCheckoutStore } from './stores/cartCheckout'

const cartStore = useCartCheckoutStore()

onMounted(async () => {
  try {
    await cartStore.initializeCart();
  } catch (error) {
    console.error("Failed to initialize cart:", error);
  }
});
</script>

<style>
[v-cloak] { 
  display: none; 
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
