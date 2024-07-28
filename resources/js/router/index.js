import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Register from '../components/Register.vue';
import Bicicleteria from '../components/Bicicleteria.vue';
import Avisos from '../components/Avisos.vue';
import Amigos from '../components/Amigos.vue';
import Login from '../components/Login.vue';  
import Perfil from '../components/Perfil.vue'; 
import Configuracion from '../components/Configuracion.vue'; 
import MisAnuncios from '../components/MisAnuncios.vue'; 
import Grupos from '../components/Grupos.vue';
import Carreras from '../components/Carreras.vue';
import Consejos from '../components/Consejos.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/register', component: Register },
  { path: '/bicicleteria', component: Bicicleteria },
  { path: '/avisos', component: Avisos },
  { path: '/amigos', component: Amigos },
  { path: '/login', component: Login },
  { path: '/perfil/:id', component: Perfil },  
  { path: '/configuracion', component: Configuracion },
  { path: '/mis-anuncios', component: MisAnuncios },
  { path: '/grupos', component: Grupos },
  { path: '/carreras', component: Carreras },
  { path: '/consejos', component: Consejos }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
