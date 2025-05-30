// stores/useCheckoutStore.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { useCartStore } from './useCartStore'
import { frontendApi } from '../api'

export const useCheckoutStore = defineStore('checkout', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart')) || [],
    checkoutData: {
      name: '',
      mobile: '',
      address: '',
      shipping_charge: 0,
      paying_method: 'cash_on_delivery',
     
    },
    loading: false,
    error: null,
    success: null,
  }),

  actions: {
     persistCart() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    },
    async submitCheckout() {
      this.loading = true
      this.error = null
      this.success = null
      const cartStore = useCartStore()

      try {
        const response = await frontendApi.post('/checkout', {
          ...this.checkoutData,
        })

        if (response.data.bkash_url) {
          window.location.href = response.data.bkash_url
        } else if (response.data.ssl_url) {
          window.location.href = response.data.ssl_url
        } else {
          this.success = response.data.message
        }

        // Clear cart after successful checkout
        cartStore.clearCart()

      } catch (error) {
        this.error = error.response?.data?.message || 'Checkout failed'
      } finally {
        this.loading = false
      }
    },

    setCheckoutField(field, value) {
      this.checkoutData[field] = value
    }
  }
})


import { defineStore } from 'pinia'
import axios from 'axios'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    loading: false,
    error: null
  }),

  getters: {
    itemCount: (state) => state.items.reduce((sum, item) => sum + item.qty, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.qty * item.price, 0),
  },

  actions: {
    async loadCart() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get('/cart/show')
        this.items = response.data.cart || []
      } catch (error) {
        this.error = 'Failed to load cart'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async addToCart(product,productId, qty = 1) {
       const existingIndex = this.items.findIndex(item => 
        item.product_id === product.product_id && 
        item.variant_id === product.variant_id
      );
       if (existingIndex >= 0) {
        // Update quantity if exists
        this.items[existingIndex].quantity += product.quantity;
      } else {
        // Add new item
        this.items.push(product);
      }
      
      
      try {

        const response = await axios.post('/cart/add', { product_id: productId, qty })
        this.items = response.data.cart || []
      } catch (error) {
        this.error = 'Failed to add item to cart'
        console.error(error)
      }
    },

    async removeFromCart(productId) {
      try {
        const response = await axios.post('/cart/remove', { product_id: productId })
        this.items = response.data.cart || []
      } catch (error) {
        this.error = 'Failed to remove item'
        console.error(error)
      }
    },

    async clearCart() {
      try {
        const response = await axios.post('/cart/clear')
        this.items = []
      } catch (error) {
        this.error = 'Failed to clear cart'
        console.error(error)
      }
    },
  }
})
