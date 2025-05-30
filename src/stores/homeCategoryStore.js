import { defineStore } from "pinia";
import { posadminApi} from '../api/index';

export const useHomeCategoryStore = defineStore("homeCategory", {
  state: () => ({
    homeCategories: [],
    sliders: [],
    loading: false,
    error: null,

    categoryProducts: [],
    currentPage: 1,
    lastPage: 1,
    loadingMore: false,
    productsCount: 0,
    currentCategoryId: null
  }),

  
  actions: {
    // Fetch homepage categories, sliders, and products
    async fetchHomeCategories(page = 1) {
      this.loading = true;
      this.error = null;

      try {
        const res = await posadminApi.get((`/home?page=${page}`));

        if (res.data.success) {
          // Assign homepage categories and sliders
          this.homeCategories = res.data.categoriesProducts || [];
          this.sliders = res.data.sliders || [];

          // Handle pagination
          this.currentPage = res.data.pagination?.current_page || 1;
          this.lastPage = res.data.pagination?.last_page || 1;

          // Set first category as default
          const firstCategory = this.homeCategories[0];
          if (firstCategory) {
            this.currentCategoryId = firstCategory.id;
            this.categoryProducts = firstCategory.products || [];
            this.productsCount =
              firstCategory.products_count || firstCategory.products?.length || 0;
          }

          // Optional: top-level products count (if provided)
          if (res.data.products_count) {
            this.productsCount = res.data.products_count;
          }
        } else {
          this.error = "Failed to load data from server";
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        this.error = err.message || "Network error occurred";
      } finally {
        this.loading = false;
      }
    },

    // Load more products for the current category (infinite scroll)
    async loadMoreProducts() {
  if (this.loadingMore || !this.currentCategoryId) return;

  this.loadingMore = true;
  this.error = null;

  try {
    const offset = this.categoryProducts.length;

    const res = await posadminApi.get(`/category-products/${this.currentCategoryId}?offset=${offset}`);

    if (res.data.success) {
      const newProducts = res.data.products || [];

      if (newProducts.length > 0) {
        this.categoryProducts.push(...newProducts);
      }

      // // ✅ Update total product count from server
      // if (res.data.total !== undefined) {
      //   this.productsCount = res.data.total;
      // }
      if (typeof res.data.total === 'number' && res.data.total > 0) {
  this.productsCount = res.data.total;
}
    } else {
      this.error = "Failed to load more products";
    }
  } catch (err) {
    console.error("Load More Error:", err);
    this.error = err.message || "Failed to load more products";
  } finally {
    this.loadingMore = false;
  }
}

  },

  getters: {
    visibleProducts: (state) => state.categoryProducts,
    firstCategory: (state) => state.homeCategories[0] || {}
  }
});
