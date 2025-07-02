import { defineStore } from "pinia"
import { csrfApi, posadminApi } from "../../api"

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customer: '',
    error: null,
    order: { 
      data: [] 
    }, 
    updateStatus: null,
    updateMessage: null,
    loading: false,
       user: null,
    token: sessionStorage.getItem('auth_token') || null,

  }),
  actions: {

     restoreAuth() {
      const token = sessionStorage.getItem('auth_token');
      const user = sessionStorage.getItem('auth_user');

      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
      }
    },

async updateProfile(data, id) {
  try {
    this.loading = true;

    await csrfApi.get('/sanctum/csrf-cookie');

    const res = await posadminApi.post(`/profile-update/${id}`, data);

    this.customer = res.data.user;
    this.updateStatus = 'success';
    this.updateMessage = res.data.message;

    // Optional: Update sessionStorage
    sessionStorage.setItem('auth_user', JSON.stringify(res.data.user));

  } catch (error) {
    this.updateStatus = 'error';
    if (error.response && error.response.data.errors) {
      this.updateMessage = error.response.data.errors;
    } else {
      this.updateMessage = 'Something went wrong.';
    }
  } finally {
    this.loading = false;
  }
},
 getUserFromStorage() {
      const storedUser = sessionStorage.getItem('auth_user')
      if (storedUser) {
        this.user = JSON.parse(storedUser)
        // console.log('Loaded user from sessionStorage:', this.user)
      } else {
        this.user = null
      }
    },


   async updatePassword(data, id) {
  this.loading = true
  try {
    await csrfApi.get('/sanctum/csrf-cookie')
    const token = sessionStorage.getItem('auth_token')
    if (!token) {
      return { status: 'error', message: 'Token not found. Please login again.' }
    }

    const res = await posadminApi.post(`/update-password/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    this.customer = res.data.user
    return { status: 'success', message: res.data.message }

  }
   catch (error) {
    if (error.response?.data?.error) {
      return { status: 'error', message: error.response.data.error }
    } else {
      return { status: 'error', message: 'Something went wrong.' }
    }
  } finally {
    this.loading = false
  }
},

  async myOrders(){
       this.loading = true
    try {
      await csrfApi.get('sanctum/csrf-cookie')
      const token = sessionStorage.getItem('auth_token')
      if(!token){
           return { status: 'error', message: 'Token not found. Please login again.' }
      }
    const res = await posadminApi.get('/myOrders', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

      this.order = res.data.orders
      console.log(res.data);
      

    }
     catch (error) {
    if (error.response?.data?.error) {
      return { status: 'error', message: error.response.data.error }
    } else {
      return { status: 'error', message: 'Something went wrong.' }
    }
  } finally {
    this.loading = false
  }
     
  }
  }

  

});



  // async updatePassword(data, id){
  //   this.loading=true
  //   try {
  //     await csrfApi.get('/sanctum/csrf-cookie')
  //     const token = sessionStorage.getItem('auth_token')
  //       if (!token) {
  //         this.updateStatus = 'error';
  //         this.updateMessage = 'Token not found. Please login again.';
  //         return;
  //       }
  //     const res = await posadminApi.post(`/update-password/${id}`,data,{
  //       headers:{
  //            Authorization: `Bearer ${token}`
  //       }
  //     })
  //     this.customer = res.data.user;
  //   this.updateStatus = 'success';
  //   this.updateMessage = res.data.message;
  //   } 
  //   catch (error) {
  //   this.updateStatus = 'error';
  //   if (error.response && error.response.data.errors) {
  //     this.updateMessage = error.response.data.errors;
  //   } else {
  //     this.updateMessage = 'Something went wrong.';
  //   }
  // } finally {
  //   this.loading = false;
  // }
  // }
    
//         async updateProfile(data) {
//       try {
//         this.loading = true;

//         // 1. Get CSRF cookie
//         await csrfApi.get('/sanctum/csrf-cookie');

//         // 2. Get auth_token from sessionStorage
//         const token = localStorage.getItem('auth_token');
//         if (!token) {
//           this.updateStatus = 'error';
//           this.updateMessage = 'Token not found. Please login again.';
//           return;
//         }

//         // 3. Send update request
//         const res = await posadminApi.post('/profile-update', data, {
//         //   headers: {
//         //     Authorization: `Bearer ${token}`
//         //   }
//         });
//         console.log(error.response.data); 


//         this.customer = res.data.user;
//         this.updateStatus = 'success';
//         this.updateMessage = res.data.message;
//       }  catch (error) {
//   this.updateStatus = 'error';
//   if (error.response && error.response.data.errors) {
//     console.log(error.response.data) // ✅ Now it's valid
//     this.updateMessage = error.response.data.errors;
//   } else {
//     this.updateMessage = 'Something went wrong.';
//   }
// }

//     }
