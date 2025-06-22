// stores/loadingStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  const isInitialLoading = ref(true)

  function finishInitialLoad() {
    isInitialLoading.value = false
  }

  return {
    isInitialLoading,
    finishInitialLoad //  expose method
  }
})
