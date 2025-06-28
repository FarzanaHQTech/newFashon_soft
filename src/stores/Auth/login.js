// import { defineStore } from "pinia";
// import { csrfApi, posadminApi } from "../../api";
// import axios from "axios";

// export const useLoginStore = defineStore("login", {
//   state: () => ({
//     user: null,
//     token: null,
//     error: null,
//     loading: false,
//   }),

//   actions: {
//     async fetchLoginUser(form) {
//       this.error = null;
//       this.loading = true;

//       try {
//         // Step 1: Get CSRF cookie from Sanctum (using root URL)
//                await csrfApi.get('/sanctum/csrf-cookie');
//         // await axios.get(
//         //   "https://vue.softitglobalbd.xyz/posadmin/sanctum/csrf-cookie",
//         //   {
//         //     withCredentials: true,
//         //     headers: {
//         //       'Accept': 'application/json',
//         //     }
//         //   }
//         // );

//         // Step 2: Send login request to your API endpoint
//         const response = await posadminApi.post("/login", form);

//       if (response.data.access_token) { // Changed from response.data.token
//   this.token = response.data.access_token;
//   this.user = response.data.user;
  
//   // Store in localStorage
//   localStorage.setItem('auth_token', this.token);
//   localStorage.setItem('auth_user', JSON.stringify(this.user));
  
//   // Also store in the auth store if needed
//   const authStore = useAuthStore();
//   authStore.user = this.user;
//   authStore.token = this.token;
  
//   return true;
// }
//       } catch (error) {
//         console.error("Login error:", error);
//         this.error = error.response?.data?.message || 'Login failed. Check console for details.';
//         return false;
//       } finally {
//         this.loading = false;
//       }
//     }
//   }
// });





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

      localStorage.setItem('auth_token', this.token);
      localStorage.setItem('auth_user', JSON.stringify(this.user));

      const authStore = useAuthStore();
      authStore.user = this.user;
      authStore.token = this.token;

      return true;
    }
  } catch (error) {
    console.error("Login error:", error);
    this.error = error.response?.data?.message || 'Login failed.';
    return false;
  } finally {
    this.loading = false;
  }
}


  },
});