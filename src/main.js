import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import 'swiper/swiper-bundle.css'
// Core CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

// Custom CSS
import './assets/css/style.css'
import './assets/css/header.css'
import './assets/css/home.css'
import './assets/css/homeAdjust.css'
import './assets/css/product.css'
import './assets/css/media.css'

// Slick carousel CSS (from node_modules)
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// Toastr CSS
import 'toastr/build/toastr.min.css'
// JS dependencies
import 'bootstrap'
import 'slick-carousel' // slick jQuery plugin
import $ from 'jquery'
import toastr from 'toastr'
import { createPinia } from 'pinia'

// FontAwesome setup
import { FontAwesomeIcon } from './plugins/fontawesome.js'

const app = createApp(App)
const pinia = createPinia()
app.component('font-awesome-icon', FontAwesomeIcon)

// app.use(pinia)
// app.use(router)
// app.mount('#app')
createApp(App).use(router).use(pinia).mount('#app')
