import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import axios from 'axios';

// CSS Imports
import 'swiper/swiper-bundle.css';
import 'bootstrap/dist/css//bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'toastr/build/toastr.min.css';

// Custom CSS
import './assets/css/style.css';
import './assets/css/header.css';
import './assets/css/home.css';
import './assets/css/homeAdjust.css';
import './assets/css/product.css';
import './assets/css/media.css';

// JS Dependencies
import 'bootstrap';
import 'slick-carousel';
import toastr from 'toastr';

// FontAwesome
import { FontAwesomeIcon } from './plugins/fontawesome.js';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { useLoadingStore } from './stores/loadingStore.js';

const app = createApp(App);
const pinia = createPinia();

// Use plugins - Note: Pinia is only used once here
app.use(pinia);
app.use(router);

// Register global components
app.component('font-awesome-icon', FontAwesomeIcon);

// Configure axios
axios.defaults.withCredentials = true;

// Configure toast
const toast = useToast();
app.config.globalProperties.$toast = toast;
app.provide('toast', toast); // Provide for Composition API

// Initialize loading store after Pinia is set up
const loadingStore = pinia.state.value.loadingStore || useLoadingStore(pinia);

router.beforeEach((to, from, next) => {
  loadingStore.startLoading();
  next();
});

router.afterEach(() => {
  setTimeout(() => {
    loadingStore.stopLoading();
  }, 500); // simulate delay
});

// Mount the app
app.mount('#app');