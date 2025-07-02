import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/layouts/Home.vue'
import { posadminApi } from '../api'
import FAQ404 from '../components/pages/frontend/FAQ404.vue'
import { useAuthStore } from '../stores/Auth/customer_reg'
import { useCustomerStore } from '../stores/Auth/customerDash'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      preload: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/pages/frontend/loginRegistration/Login.vue'),
    meta: {
      preload: true
    }
  },

  {
    path: '/registration',
    name: 'Registration',
    component: () => import('../components/pages/frontend/loginRegistration/Registration.vue'),
    meta: {
      preload: true
    }
  },
  {
    path: '/customer/dashboard',
    name: 'Customer-Dashboard',
    component: () => import('../components/backend/dashboard/CustomerDashboard.vue'),
    meta: {
      preload: true
    }
  },
  {
    path: '/customer/my-orders',
    name: 'MyOrders',
    component: () => import('../components/backend/dashboard/CustomerOrder.vue'),
    meta: {
      preload: true
    }
  },
{
  path: '/customer/profile-edit/:id',
  name: 'Profile-Edit',
  component: () => import('../components/backend/dashboard/ProfileUpdate.vue'),
  props: true, // important!
  meta: {
    preload: true
  }
},
{
  path: '/customer/changePassword/:id',
  name: 'Change-Password',
  component: () => import('../components/backend/dashboard/ChangePassword.vue'),
  props: true, // important!
  meta: {
    preload: true
  }
},


  {
    path: '/product-show/:slug',
    name: 'ProductDetail',
    component: () => import('../components/pages/frontend/productsDetailsView/ShopPageDetails.vue'),
    meta: {
      preload: true
    }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../components/frontend/checkOutPage/CheckOutCart.vue'),
    meta: {
      preload: true
    }
  },
  {
    path: '/new-product',
    name: 'NewProducts',
    component: () => import('../components/frontend/navPages/NewProductShop.vue'),
    meta: {
      preload: true
    }
  },
  {
    path: '/flash-product',
    name: 'FlashSellProduct',
    component: () => import('../components/frontend/navPages/FlashSellShop.vue'),
    meta: {
      preload: true
    }
  },
  {
    path: '/shop',
    name: 'TopSellProducts',
    component: () => import('../components/frontend/navPages/TopSellProduct.vue'),
    meta: {
      preload: true
    }
  },
  {
    path: '/thank-you/:order_id',
    name: 'ThankYou',
    component: () => import('../components/frontend/thankyouPage/ThankyouPage.vue'),
    meta: {
      preload: true
    }
  },
  {
    path: '/cart-count-store',
    name: 'CartCountStore',
    component: () => import('../components/frontend/CartSidebarStore.vue'),
    meta: {
      preload: true
    }
  },
   {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: FAQ404,
  },
]

const router = createRouter({
  // history: createWebHistory(import.meta.env.VITE_BASE_URL || '/vue.softitglobalbd.xyz/'),
  history: createWebHistory(import.meta.env.VITE_BASE_URL || '/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0, behavior: 'smooth' }
  }
})
router.beforeEach(async (to, from, next) => {
  const auth = useCustomerStore()

 if (!auth.token) {
    auth.restoreAuth()
  }

  //  Protect dashboard routes
  if (to.path.startsWith('/customer') && !auth.token) {
    return next('/login')
  }

  // Preload dynamic component if needed
  if (typeof to.matched[0]?.components?.default === 'function') {
    await to.matched[0].components.default()
  }

  // Prefetch API data
  if (to.name === 'ProductDetail') {
    const slug = to.params.slug
    await prefetchProductData(slug)
  }

  next()
})
async function prefetchProductData(slug) {
  try {
    await posadminApi.get(`/product/${slug}`)
  } catch (error) {
    console.error('Prefetch failed:', error)
  }
}


// Call this in your main app initialization
// preloadImportantRoutes()

export default router
