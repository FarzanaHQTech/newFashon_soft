import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import { createPinia } from 'pinia';

// CSS Imports
import 'swiper/swiper-bundle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import 'slick-carousel'; // jQuery plugin
import $ from 'jquery';
import toastr from 'toastr'; // If you're using it in components

// FontAwesome setup
import { FontAwesomeIcon } from './plugins/fontawesome.js';

const app = createApp(App);

// Register global components
app.component('font-awesome-icon', FontAwesomeIcon);

// Use plugins
app.use(createPinia());
app.use(router);

// Mount the app
app.mount('#app');
