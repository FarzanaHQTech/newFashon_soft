<template>
 <Layout>
  </Layout>
</template>

<script>
import Layout from './components/layouts/Layout.vue';
document.documentElement.classList.add('loading');
window.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.remove('loading');
});
export default {
  components: {
    Layout
  }
}
</script>
<style>
[v-cloak] { display: none; }
html.loading * {
  transition: none !important;
  animation: none !important;
}
</style>