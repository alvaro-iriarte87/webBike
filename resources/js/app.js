import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '../App.vue';
import router from './router';
import axios from './axios-config';

// Crear instancia de Pinia
const pinia = createPinia();

// Crear la aplicación y usar Pinia junto con el router
const app = createApp(App);

app.use(pinia);   // Usar Pinia para la gestión de estado
app.use(router);
app.provide('$axios', axios);
app.mount('#app');
