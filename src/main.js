import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import axios from 'axios';
import { createHead } from '@vueuse/head';
import 'swiper/swiper-bundle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'toastr/build/toastr.min.css';
import './assets/css/style.css';
import './assets/css/header.css';
import './assets/css/home.css';
import './assets/css/media.css';
import 'bootstrap';
import 'slick-carousel';
import toastr from 'toastr';
import { FontAwesomeIcon } from './plugins/fontawesome.js';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const app = createApp(App);
const pinia = createPinia();
const head = createHead();

app.use(pinia);
app.use(router);
app.use(head);
app.component('font-awesome-icon', FontAwesomeIcon);

axios.defaults.withCredentials = true;
const toast = useToast();
app.config.globalProperties.$toast = toast;
app.provide('toast', toast);

router.beforeEach((to, from, next) => {
  pinia.use(async ({ store }) => {
    const load = store.$id === 'loadingStore';
    if (load) store.startLoading();
  });
  next();
});

router.afterEach(() => {
  setTimeout(() => {
    const loadingStore = pinia.state.value.loadingStore;
    loadingStore && loadingStore.stopLoading();
  }, 200);
});

app.mount('#app');
