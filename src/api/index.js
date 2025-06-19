
import axios from 'axios';

// Axios instance for posadmin APIs
export const posadminApi = axios.create({
  baseURL: 'https://vue.softitglobalbd.xyz/posadmin/api/vue',
  headers: { 'Content-Type': 'application/json' },
});

export const frontendApi = axios.create({
  baseURL: 'https://vue.softitglobalbd.xyz/posadmin/api/vue',
  withCredentials: true, // <-- this is critical for CORS & cookies
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});



// Export base URL for image path reuse
export const IMAGE_BASE_URL = 'https://newfashion.softitglobal.com/posadmin/';
export const SITE_IMAGE_BASE_URL = 'https://vue.softitglobalbd.xyz/posadmin/public/ecommerce_settings/';
