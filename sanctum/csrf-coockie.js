//vue/sanctum/csrf-coockie.js
import axios from 'axios';

await axios.get('https://newfashion.softitglobal.com/sanctum/csrf-cookie');

// Now you can make your frontendApi requests with CSRF token
await frontendApi.post('/cart', data);