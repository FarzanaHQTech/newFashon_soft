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
   path: '/product-show/:slug',
  name: 'ProductDetail',
  component: () => import('../components/pages/productsDetailsView/ShopPageDetails.vue')
},

{
  path:'/checkout',
  name:'Checkout',
  component:()=>import('../components/frontend/checkOutPage/CheckOutCart.vue')
},
{
  path:'/shop-page',
  name:'GirlsShopPage',
  component:()=>import('../components/pages/shopPages/ShopPage.vue')
},
{
  path:'/new-product',
  name:'NewProducts',
  component:()=>import('../components/frontend/navPages/NewProductShop.vue')
},
{
  path:'/flash-product',
  name:'FlashSellProduct',
  component:()=>import('../components/frontend/navPages/FlashSellShop.vue')
},
{
  path:'/shop',
  name:'TopSellProducts',
  component:()=>import('../components/frontend/navPages/TopSellProduct.vue')
},

{
  path: '/thank-you/:order_id',
  name: 'ThankYou',
  component: () => import('../components/frontend/thankyouPage/ThankyouPage.vue')
},
{
  path: '/cart-count-store',
  name: 'CartCountStore',
  component: () => import('../components/frontend/CartSidebarStore.vue')
},
]
const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return { ...savedPosition, behavior: 'auto' } 
    } else {
      return { top: 0, behavior: 'auto' } 
    }
  }
  });
export default router
