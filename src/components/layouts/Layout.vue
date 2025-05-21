<template>
  <Header />
  <main>
    <div class="main-wrapper">
      <router-view />
    </div>
  </main>
  <Footer />
</template>

<script>
import Footer from './Footer.vue'
import Header from './Header.vue';

export default {
  components: {
    Header,
    Footer
  }
}
</script>