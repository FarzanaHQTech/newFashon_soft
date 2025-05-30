// src/stores/categoryStore.js
import { defineStore } from 'pinia';
import { posadminApi } from '../api/index';
export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
    categoryMenu:[],
    laoding:false,
    error:false,
  }),
  actions: {
    async fetchCategories() {
      try {
        const res = await posadminApi.get('/categories');
        this.categories = res.data.categories;
        // console.log(' Categories fetched:', this.categories);
      } catch (error) {
        console.error(' Failed to fetch categories:', error);
      }
    },

    async fetchCategoriesMenu(){
      try {
        this.laoding=true
        const res= await posadminApi.get('getMenuCategories')
        this.categoryMenu=res.data.menus
        // console.log("Get Menus",res.data);
        
      } catch (error) {
          this.error = true
          console.error('failed',error);
          
      }finally{
        this.laoding=false
      }
    }
  },
});
