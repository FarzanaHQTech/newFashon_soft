
import { defineStore } from "pinia";
import { csrfApi, posadminApi } from "../../api";
import axios from "axios";
import { useAuthStore } from "./customer_reg";
// import { getCsrfTokenFromCookie } from "../../utils/csrf";

export const useLoginStore = defineStore("login", {
  state: () => ({
    user: null,
    token: null,
    error: null,
    loading: false,
  }),

  actions: {

async fetchLoginUser(form) {
  this.error = null;
  this.loading = true;

  try {
    // 1. Request CSRF cookie first (sets XSRF-TOKEN cookie)
    await csrfApi.get('/sanctum/csrf-cookie');

    // 2. Send login request, do NOT manually add X-XSRF-TOKEN header!
    const response = await posadminApi.post('/login', form);

    if (response.data.token) {
      this.token = response.data.token;
      this.user = response.data.user;

      // localStorage.setItem('auth_token', this.token);
      // localStorage.setItem('auth_user', JSON.stringify(this.user));

   sessionStorage.setItem('auth_token', this.token);
    sessionStorage.setItem('auth_user', JSON.stringify(this.user));


      const authStore = useAuthStore();
      authStore.user = this.user;
      authStore.token = this.token;

      setTimeout(()=>{
        this.autoLogout()
      },24*60*60*1000)

      return true;
    }
  } catch (error) {
    console.error("Login error:", error);
    this.error = error.response?.data?.message || 'Login failed.';
    return false;
  } finally {
    this.loading = false;
  }
},

async autoLogout() {
  try {
    await posadminApi.post('/logout');

    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_user');
    this.user = null;
    this.token = null;

    const authStore = useAuthStore();
    authStore.user = null;
    authStore.token = null;

    //  Fixed redirect
    window.location.href = '/';
  } catch (error) {
    this.error = true;
    console.error('Logout Failed', error);
  }
}



  },
});