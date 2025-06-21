// stores/loadingStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  const isInitialLoading = ref(true) // only true on first full load
  return { isInitialLoading }
})
