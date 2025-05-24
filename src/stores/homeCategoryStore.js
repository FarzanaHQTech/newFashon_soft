import { defineStore } from "pinia";
import api from "../api";

export const useHomeCategoryStore = defineStore('homeCategory', {
    state:()=>({
        homeCategories: [],
         sliders: [],
        loading : false,
        error: false
    }),
    actions:{
        async fetchHomeCategories(){
            try {
                this.loading= true
               const res = await api.get('/home') 
               this.homeCategories=res.data.categories
               this.sliders=res.data.sliders
            //    console.log("Categories from home", res.data);
               

            } catch (error) {
                 console.error(error);
                 this.error = true;
            }finally{
                this.loading= false
            }
        }
    }


})