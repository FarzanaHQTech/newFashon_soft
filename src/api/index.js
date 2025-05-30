// src/api/index.js
import axios from 'axios';

// Axios instance for posadmin APIs
export const posadminApi = axios.create({
  baseURL: 'https://newfashion.softitglobal.com/posadmin/api/vue',
  // This is crucial for session cookies

  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios instance for Laravel backend API (e.g. /api/cart)
export const frontendApi = axios.create({
  baseURL: 'https://newfashion.softitglobal.com/api',
    withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// ✅ Export base URL for image path reuse
export const IMAGE_BASE_URL = 'https://newfashion.softitglobal.com/posadmin/';
