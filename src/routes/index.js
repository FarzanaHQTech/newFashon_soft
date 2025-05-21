import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/layouts/Home.vue' 
import Login from '../components/pages/loginRegistration/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component:Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  console.log('Navigating to:', to.fullPath)
  next()
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