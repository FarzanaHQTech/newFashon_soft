import { defineStore } from "pinia";
import  { posadminApi } from "../api";

export const useShopPage = defineStore('shopPage', {
  state: () => ({
    shopPages:[],
    relatedProducts:[],
    pagination: null,
    currentPage: 1,
    loading: false,
    error: null,
    slug:[],
    
  }),
  

  actions: {
async fetchShopPage({ slug = "", page = 1 } = {}) {
  this.loading = true;
  this.error = null;
  try {
    const res = await posadminApi.get(`/product-show/${slug}?page=${page}`);
    this.shopPages = res.data.product; // product details
    this.relatedProducts = res.data.related_products; // product details
    this.pagination = res.data.pagination || null; // optional
    this.currentPage = page;
    console.log("Shop Product  Data:", res.data);
  } catch (error) {
    console.error("Fetch error", error);
    this.error = error.message || "Network Error";
  } finally {
    this.loading = false;
  }
},



}
})
