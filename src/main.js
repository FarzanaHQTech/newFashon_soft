import { createApp } from 'vue'
import App from './App.vue'
import router from '../src/routes/index.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './assets/css/style.css'
import './assets/css/header.css'
import './assets/css/home.css'
import './assets/css/product.css'
import './assets/css/media.css'

import 'bootstrap'

const app = createApp(App)
app.use(router)
app.mount('#app')
