import { defineStore } from "pinia";
import { posadminApi } from "../api";

export const useShopPage = defineStore('shopPage', {
  state: () => ({
    shopPages: [],
    relatedProducts: [],
    pagination: null,
    currentPage: 1,
    loading: false,
    error: null,
    slug: '',
    productReviews:[],
    reviewForm: {
      review: 0,
      name: '',
      message: '',
      product_id: null,
      image: null
    },
    reviewError: null,
    submittingReview: false,
  }),

  actions: {
    async fetchShopPage({ slug = "", page = 1 } = {}) {
      this.loading = true;
      this.error = null;
      try {
        const res = await posadminApi.get(`/product-show/${slug}?page=${page}`);
        this.shopPages = res.data.product;
        this.reviewForm.product_id = res.data.product.id; // ✅ assign product_id
        this.relatedProducts = res.data.related_products;
        this.pagination = res.data.pagination || null;
        this.currentPage = page;
        this.slug = slug;
        //  fetch product reviews after product is loaded
        await this.fetchProductReview(res.data.product.id);

      } catch (error) {
        console.error("Fetch error", error);
        this.error = error.message || "Network Error";
      } finally {
        this.loading = false;
      }
    },

    async submitReview() {
      if (!this.reviewForm.product_id) {
        this.reviewError = "Product ID is missing";
        return false;
      }

      this.submittingReview = true;
      this.reviewError = null;

      try {
        const formData = new FormData();
        formData.append('review', this.reviewForm.review);
        formData.append('name', this.reviewForm.name);
        formData.append('message', this.reviewForm.message);
        formData.append('product_id', this.reviewForm.product_id);

        if (this.reviewForm.image) {
          formData.append('image', this.reviewForm.image);
        }

        const res = await posadminApi.post('/product-review', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
         console.log("Submitting review for product_id:", this.reviewForm.product_id);

        if (res.data.status) {
          // await this.fetchShopPage({ slug: this.slug, page: this.currentPage });
           await this.fetchProductReview(this.reviewForm.product_id); 

          // Reset form
          this.reviewForm.review = 0;
          this.reviewForm.name = '';
          this.reviewForm.message = '';
          this.reviewForm.image = null;

          return true;
        } else {
          this.reviewError = res.data.message || "Failed to submit review";
          return false;
        }
      } catch (error) {
        this.reviewError = error.response?.data?.message || error.message || "Network error";
        return false;
      } finally {
        this.submittingReview = false;
      }
    },
  


    async fetchProductReview(productId){
      try {
        const res = await posadminApi.get(`/product-reviews/${productId}`);
        this.productReviews = res.data.reviews;
      } catch (error) {
         console.error("Review fetch error", error);
        this.productReviews = [];
      }
    }
  }
});
