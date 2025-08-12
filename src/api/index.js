import axios from 'axios';

//  This only affects `axios` default instance — not custom ones.
axios.defaults.withCredentials = true
axios.defaults.xsrfCookieName = 'XSRF-TOKEN'
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN'

//  Best practice: also include these in custom instances
export const posadminApi = axios.create({
  baseURL: 'https://vue.softitglobalbd.xyz/posadmin/api/vue',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN'
});


export const csrfApi = axios.create({
  baseURL: 'https://vue.softitglobalbd.xyz/posadmin',
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN', 
  xsrfHeaderName: 'X-XSRF-TOKEN'
});

//  Export image base URLs
export const IMAGE_BASE_URL = 'https://vue.softitglobalbd.xyz/posadmin/';
export const SITE_IMAGE_BASE_URL = 'https://vue.softitglobalbd.xyz/posadmin/public/ecommerce_settings/';
