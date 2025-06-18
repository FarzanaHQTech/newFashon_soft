// stores/loadingStore.js
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    isRouteLoading: false
  }),
  actions: {
    startLoading() {
      this.isRouteLoading = true
    },
    stopLoading() {
      this.isRouteLoading = false
    }
  }
})
