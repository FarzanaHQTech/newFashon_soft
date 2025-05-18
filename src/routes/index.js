import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/layouts/Home.vue' // ✅ Correct import

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


 // {
  //   path: '/shop',
  //   name: 'Shop',
  //   component: () => import('../components/Shop.vue')
  // },
  // {
  //   path: '/product/:id',
  //   name: 'Product',
  //   component: () => import('../components/Product.vue')
  // },
  // {
  //   path: '/category/:id',
  //   name: 'Category',
  //   component: () => import('../components/Category.vue')
  // },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import('../components/Login.vue')
  // }