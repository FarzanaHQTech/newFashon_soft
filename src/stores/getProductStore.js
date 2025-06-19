import { defineStore } from "pinia";
import { posadminApi } from '../api/index';

export const useCategoryStore = defineStore("products", {
  state: () => ({
    pproductCategories: [],
    loading: false,
    error: null,

    categoryProducts: [],
    currentPage: 1,
    lastPage: 1,
    loadingMore: false,
    productsCount: 0,
    categoryId: null
  }),

  actions: {


    async fetchProduct(categoryId, page = 1) {
  try {
    const res = await posadminApi.get(`/category-products2/${categoryId}?page=${page}`);
    if (page === 1) {
      this.categoryProducts = res.data.products.data;
    } else {
      this.categoryProducts = [...this.categoryProducts, ...res.data.products.data];
    }
    this.currentPage = res.data.products.current_page;
    this.lastPage = res.data.products.last_page;
    this.productsCount = res.data.products.total;
    // console.log("products with id", res);
  } catch (error) {
    console.error("Fetch failed:", error);
    this.error = error;
  }
}

  },

  getters: {
    visibleProducts: (state) => state.categoryProducts,
    firstCategory: (state) => state.pproductCategories[0] || {}
  }
});
