import { defineStore } from "pinia";
import { posadminApi} from '../api/index';

export const useHomeCategoryStore = defineStore("girlsWomen", {
  state: () => ({
    homeCategories: [],
    sliders: [],
    loading: false,
    error: null,

    categoryProductsMap: {}, // <-- holds products per category
    // loadingMore: false,
    loadingMoreMap: {}, // categoryId => true/false
    productsCountMap: {}, // <-- track total per category
  }),

  actions: {
    // async fetchCategories(page = 1) {
    //   this.loading = true;
    //   this.error = null;

    //   try {
    //     const res = await posadminApi.get(`/home?page=${page}`);
    //     console.log(res.data);
        
    //     if (res.data.success) {
    //       const filteredCategories = (res.data.categoriesProducts || []).filter(
    //         (cat) => cat.products_count > 0
    //       );
    //       this.homeCategories = filteredCategories;
    //       this.sliders = res.data.sliders || [];

    //       filteredCategories.forEach((cat) => {
    //         this.categoryProductsMap[cat.id] = cat.products?.length
    //           ? cat.products
    //           : [];
    //         this.productsCountMap[cat.id] = cat.products_count || 0;
    //       });
    //     } else {
    //       this.error = "Failed to load data from server";
    //     }
    //   } catch (err) {
    //     console.error("Fetch Error:", err);
    //     this.error = err.message || "Network error occurred";
    //   } finally {
    //     this.loading = false;
    //   }
    // },
async fetchCategories(page = 1) {
  this.loading = true;
  this.error = null;

  try {
    const res = await posadminApi.get(`/home?page=${page}`);
    // console.log('API Response:', res.data);
    
    if (res.data.success) {
      // First filter out categories with no products
      const filteredCategories = (res.data.categoriesProducts || []).filter(
        (cat) => cat.products_count > 0
      );
      
      // Store all categories in homeCategories
      this.homeCategories = filteredCategories;
      this.sliders = res.data.sliders || [];

      // Initialize empty arrays for all categories
      filteredCategories.forEach((cat) => {
        this.categoryProductsMap[cat.id] = [];
        this.productsCountMap[cat.id] = cat.products_count || 0;
      });

      // Now load products for each category
      await Promise.all(
        filteredCategories.map(async (cat) => {
          try {
            const productsRes = await posadminApi.get(
              `/category-products/${cat.id}?offset=0`
            );
            if (productsRes.data.success) {
              this.categoryProductsMap[cat.id] = productsRes.data.products || [];
            }
          } catch (err) {
            console.error(`Error loading products for category ${cat.id}:`, err);
          }
        })
      );
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



    async loadMore(categoryId) {
      if (this.loadingMoreMap[categoryId]) return;
      this.loadingMoreMap[categoryId] = true;
      this.error = null;

      try {
        const currentProducts = this.categoryProductsMap[categoryId] || [];
        const offset = currentProducts.length;

        const res = await posadminApi.get(
          `/category-products/${categoryId}?offset=${offset}`
        );

        if (res.data.success) {
          const newProducts = res.data.products || [];

          // Filter out duplicates just in case
          const existingIds = new Set(currentProducts.map((p) => p.id));
          const filteredNew = newProducts.filter((p) => !existingIds.has(p.id));

          this.categoryProductsMap[categoryId] = [
            ...currentProducts,
            ...filteredNew,
          ];

          if (typeof res.data.total === "number") {
            this.productsCountMap[categoryId] = res.data.total;
          }
        } else {
          this.error = "Failed to load more products";
        }
      } catch (err) {
        console.error("Load More Error:", err);
        this.error = err.message || "Failed to load more products";
      } finally {
        this.loadingMoreMap[categoryId] = false;
      }
    },
  },

  getters: {
    categories: (state) => state.homeCategories,

    getCategoryProducts: (state) => {
      return (categoryId) => state.categoryProductsMap[categoryId] || [];
    },

    hasMoreProducts: (state) => {
      return (categoryId) => {
        const current = state.categoryProductsMap[categoryId]?.length || 0;
        const total = state.productsCountMap[categoryId] || 0;
        return current < total;
      };
    },
  },
});

