// src/stores/categoryStore.js
import { defineStore } from 'pinia';
import api from '../api/index'; // Make sure this path is correct

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
  }),
  actions: {
    async fetchCategories() {
      try {
        const res = await api.get('/categories');
        this.categories = res.data.categories;
        // console.log(' Categories fetched:', this.categories);
      } catch (error) {
        console.error(' Failed to fetch categories:', error);
      }
    },
  },
});
