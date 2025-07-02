// stores/mobileMenu.js
import { defineStore } from "pinia";
import { ref } from 'vue';

export const useMobileMenuStore = defineStore('mobileMenu', () => {
    const showMobileMenu = ref(false);
    
    const toggleMobileMenu = () => {
        showMobileMenu.value = !showMobileMenu.value;
    };
    
    const closeMobileMenu = () => {
        showMobileMenu.value = false;
    };
    
    return {
        showMobileMenu,
        toggleMobileMenu,
        closeMobileMenu
    };
});