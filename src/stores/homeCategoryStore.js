// stores/homeCategoryStore.js
import { defineStore } from "pinia";
import api from "../api";

export const useHomeCategoryStore = defineStore("homeCategory", {
  state: () => ({
    homeCategories: [],
    sliders: [],
    loading: false,
    error: false,
    categoryProducts: [],
    currentPage: 1,
    lastPage: 1,
    loadingMore: false,
    productsCount: 0,  // total products count for first category
  }),

  actions: {
    async fetchHomeCategories(page = 1) {
      this.loading = true;
      try {
        const res = await api.get(`/home?page=${page}`);
        console.log(res.data);

        if (res.data.success) {
          this.homeCategories = res.data.categoriesProducts;
          this.sliders = res.data.sliders;

          this.currentPage = res.data.pagination.current_page || 1;
          this.lastPage = res.data.pagination.last_page || 1;

          const firstCategory = this.homeCategories[0];
    console.log("products_count",firstCategory.firstCategory);

          if (firstCategory && firstCategory.products) {
            this.categoryProducts = firstCategory.products;
            this.productsCount = firstCategory.products_count || firstCategory.products.length;
          }
        } else {
          this.error = true;
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },

async loadMoreProducts() {
  if (this.loadingMore) return;

  if (this.categoryProducts.length >= this.productsCount) return;
  if (this.currentPage >= this.lastPage) return;

  this.loadingMore = true;
  try {
    const nextPage = this.currentPage + 1;
    const res = await api.get(`/home?page=${nextPage}`);
    if (res.data.success) {
      const newCategories = res.data.categoriesProducts;

      const firstCategoryId = this.homeCategories[0]?.id;
      const newFirstCategory = newCategories.find(c => c.id === firstCategoryId);

      if (newFirstCategory && newFirstCategory.products) {
        this.categoryProducts.push(...newFirstCategory.products);
        this.productsCount = newFirstCategory.products_count ?? this.productsCount;
      }

      this.currentPage = res.data.pagination?.current_page ?? nextPage;
      this.lastPage = res.data.pagination?.last_page ?? this.lastPage;
    }
  } catch (err) {
    console.error("Load More Error:", err);
  } finally {
    this.loadingMore = false;
  }
}

  },

  getters: {
    visibleProducts(state) {
      return state.categoryProducts;
    },
    firstCategory(state) {
      return state.homeCategories[0] || {};
    },
  },
});
