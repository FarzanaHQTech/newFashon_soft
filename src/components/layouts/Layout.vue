<template>
  <div class="main-wrapper">
    <Header/>
    <main>
    <router-view /> 
    </main>
    <Footer />
  </div>
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