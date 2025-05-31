// stores/useCartStore.js
import { defineStore } from 'pinia'
import { frontendApi } from '../api';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: {},
    total: 0,
    count: 0,
    loading: false
  }),
  getters: {
    cartList: (state) => Object.values(state.items),
  },
  actions: {
    async fetchCart() {
      try {
        const res = await frontendApi.get('/cartGet');
        this.items = res.data.cart || {};
        this.total = res.data.total_amount;
        this.count = res.data.item;
      } catch (err) {
        console.error('Fetch cart failed:', err);
      }
    },
    async addToCart(payload) {
      try {
        const res = await frontendApi.post('/cart/store', payload);
        this.items = res.data.cart;
        this.total = res.data.total_amount;
        this.count = res.data.item;
      } catch (err) {
        console.error('Add to cart failed:', err);
      }
    },
    async removeFromCart(id) {
      try {
        await frontendApi.delete(`/cart/delete/${id}`);
        await this.fetchCart(); // re-fetch cart
      } catch (err) {
        console.error('Remove from cart failed:', err);
      }
    },
    async updateQuantity(id, quantity) {
      try {
        await frontendApi.put(`/cart/update/${id}`, { quantity });
        await this.fetchCart();
      } catch (err) {
        console.error('Update quantity failed:', err);
      }
    }
  }
});
