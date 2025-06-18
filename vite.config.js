
// import { defineConfig, loadEnv } from 'vite'
// import vue from '@vitejs/plugin-vue'

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), '') // Load all env variables
//   return {
//     base: env.VITE_BASE_URL, // Use the variable
//     plugins: [vue()],
//   }
// })
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') // loads all env vars from .env files
  return {
    base: env.VITE_BASE_URL, // dynamically use base from .env
    plugins: [vue()],
  }
})

