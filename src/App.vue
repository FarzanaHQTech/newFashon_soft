<template>
 <Layout>
   <router-view></router-view>
  </Layout>
</template>

<script>
import Layout from './components/layouts/Layout.vue';

export default {
  components: {
    Layout
  }
}
</script>