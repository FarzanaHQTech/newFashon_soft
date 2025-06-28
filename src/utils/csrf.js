// utils/csrf.js
export function getXsrfToken() {
  const name = 'XSRF-TOKEN=';
  const cookies = decodeURIComponent(document.cookie).split(';');
  for (let cookie of cookies) {
    while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length);
    }
  }
  return null;
}
