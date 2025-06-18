// utils/apiCache.js
export function useApiCache() {
  const cache = new Map()
  
  return {
    get(key) {
      return cache.get(key)
    },
    set(key, value) {
      cache.set(key, value)
    },
    delete(key) {
      cache.delete(key)
    }
  }
}