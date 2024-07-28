import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', // Cambia esto si tu base URL es diferente
  withCredentials: true // Esto asegura que las cookies, incluyendo el CSRF token, se envíen
});

apiClient.interceptors.request.use((config) => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  if (csrfToken) {
    config.headers['X-CSRF-TOKEN'] = csrfToken;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
