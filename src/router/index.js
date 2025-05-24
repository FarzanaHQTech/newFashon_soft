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
  },
  {
   path: '/product',
  name: 'ProductDetail',
  component: () => import('../components/pages/productsDetailsView/GirlFashionDetails.vue')

},
{
  path:'/checkout',
  name:'Checkout',
  component:()=>import('../components/pages/checkOutPage/CheckOutPage.vue')
},
{
  path:'/shop-page',
  name:'GirlsShopPage',
  component:()=>import('../components/pages/shopPages/GirlsShop-page.vue')
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


// router.beforeEach((to, from, next) => {
//   console.log('Navigating to:', to.fullPath)
//   next()
// })
export default router
