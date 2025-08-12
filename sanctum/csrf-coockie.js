//vue/sanctum/csrf-coockie.js
import axios from 'axios';

await axios.get('https://newfashion.softitglobal.com/sanctum/csrf-cookie');

// Now you can make your posadminApi requests with CSRF token
await posadminApi.post('/cart', data);