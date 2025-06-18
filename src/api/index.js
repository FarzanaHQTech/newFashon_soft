
import axios from 'axios';

// Axios instance for posadmin APIs
export const posadminApi = axios.create({
  baseURL: 'https://vue.softitglobalbd.xyz/posadmin/api/vue',
  // baseURL: 'https://newfashion.softitglobal.com/posadmin/api/vue',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios instance for Laravel backend API
export const frontendApi = axios.create({
  baseURL: 'https://vue.softitglobalbd.xyz/posadmin/api/vue',
  // baseURL: 'https://newfashion.softitglobal.com//api/',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Export base URL for image path reuse
export const IMAGE_BASE_URL = 'https://newfashion.softitglobal.com/posadmin/';