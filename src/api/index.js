// src/api/index.js
import axios from 'axios';

// Axios instance for API calls
const api = axios.create({
  baseURL: 'https://newfashion.softitglobal.com/posadmin/api/vue',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Export the base URL for image path reuse
export const IMAGE_BASE_URL = 'https://newfashion.softitglobal.com/posadmin/';

export default api;


