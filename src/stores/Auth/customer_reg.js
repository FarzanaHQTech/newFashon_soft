import { defineStore } from 'pinia'
import axios from 'axios'

  import { posadminApi } from '../../api'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    errors: null,
  }),

  actions: {
    async register(formData) {
      try {
        const response = await posadminApi.post('/register', formData)
        this.user = response.data.user
        this.token = response.data.token
        this.errors = null

        // Save token to localStorage for later use
        localStorage.setItem('auth_token', this.token)
        localStorage.setItem('auth_user', JSON.stringify(this.user))

        return true
      } catch (error) {
        if (error.response && error.response.data.errors) {
          this.errors = error.response.data.errors
        } else {
          this.errors = { general: ['Something went wrong.'] }
        }
        return false
      }
    },
    //   async customer(formData) {
    //      if(!this.token) return
    //   try {
       
    //     const response = await posadminApi.post('/user', {
    //       headers:{
    //          Authorization:`Bearer${this.toke}`
    //       }
         
    //     })
    //      this.token = null
    //     this.user = null
    //     localStorage.removeItem('token')
    //   } catch (error) {
    //     if (error.response && error.response.data.errors) {
    //       this.errors = error.response.data.errors
    //     } else {
    //       this.errors = { general: ['Something went wrong.'] }
    //     }
    //     return false
    //   }
    // }
  }
})



