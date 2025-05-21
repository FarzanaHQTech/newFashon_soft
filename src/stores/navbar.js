import { defineStore } from "pinia";

export const useNavberStore = defineStore('navBar',{
state: ()=>({

}),
  actions: {
    openMenu() {
      this.isMenuActive = true
    },
    closeMenu() {
      this.isMenuActive = false
    },
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive
    }
  }
})