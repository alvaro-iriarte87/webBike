import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost/api',  // Asegúrate de que esta URL es la correcta para tu API
  withCredentials: true,  // Esto es importante para permitir cookies con credenciales
});

export default instance;