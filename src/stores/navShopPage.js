import { defineStore } from "pinia";
import  { posadminApi } from "../api";

export const useFlashNewStore = defineStore('navShopNewPage', {
  state: () => ({
    flashShops: [],
    newProductsShops: [],
    flashProductsShops: [],
    topProductsShops: [],
    pagination: null,
    currentPage: 1,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchNavShopPage(page = 1) {
      this.loading = true;
      this.error = null;
      try {
        const res = await posadminApi.get(`/newProductNav?page=${page}`);
        this.newProductsShops = res.data.New_products;
        this.pagination = res.data.pagination;
        this.currentPage = page;
        // console.log("this is new shop page data", res.data);
        
      } catch (error) {
        console.error("Fetch error", error);
        this.error = error.message || "Network Error";
      } finally {
        this.loading = false;
      }
    },

    async fetchFlashShopPage(page = 1) {
      this.loading = true;
      this.error = null;
      try {
        const res = await posadminApi.get(`/flashProductNav?page=${page}`);
        this.flashProductsShops = res.data.Flash_products;
        this.pagination = res.data.pagination;
        this.currentPage = page;
        // console.log("this is new flash sell page data", res.data);
        
      } catch (error) {
        console.error("Fetch error", error);
        this.error = error.message || "Network Error";
      } finally {
        this.loading = false;
      }
    },
    // async fetchTopSellPage(page = 1, cat_id = null) {
    //   this.loadlashing = true;
    //   this.error = null;
    //   try {
    //     const res = await posadminApi.get(`/shop?page=${page}`);
    //     this.topProductsShops = res.data.data;
    //     this.pagination = res.data.pagination;
    //     this.currentPage = page;
    //     // console.log("this is Top sell sell page data", res.data);
        
    //   } catch (error) {
    //     console.error("Fetch error", error);
    //     this.error = error.message || "Network Error";
    //   } finally {
    //     this.loading = false;
    //   }
    // },
  async fetchTopSellPage(page = 1, cat_id = null , q='') {
  this.loading = true;
  this.error = null;
  try {
    let url = `/shop?page=${page}`;
    if (cat_id) {
      url += `&cat_id=${cat_id}`;
    }
    const res = await posadminApi.get(url);
    this.topProductsShops = res.data.data;
    this.pagination = res.data.pagination;
    this.currentPage = page;
  } catch (error) {
    console.error("Fetch error", error);
    this.error = error.message || "Network Error";
  } finally {
    this.loading = false;
  }
}
,

async fetchTopSellPage(page = 1, cat_id = null, q = '') {
      this.loading = true;
      this.error = null;

      try {
        let url = `/shop?page=${page}`;
        if (cat_id !== null && cat_id !== '') {
          url += `&cat_id=${encodeURIComponent(cat_id)}`;
        }
        if (q && q.trim()) {
          url += `&q=${encodeURIComponent(q.trim())}`;
        }

        const res = await posadminApi.get(url);
        console.log(" Fetched:", res.data);
        this.topProductsShops = res.data.data;
        this.pagination = res.data.pagination;
        this.currentPage = page;
      } catch (error) {
        console.error(" Fetch error:", error);
        this.error = error.message || "Network Error";
      } finally {
        this.loading = false;
      }
    },

    
  }
});
