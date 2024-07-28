<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Master Bike <i class="fas fa-bicycle"></i></router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Inicio <i class="fas fa-bolt"></i></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/bicicleteria">Bicicletería Cercana <i class="fas fa-map-marker-alt"></i></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/avisos">Avisos de Venta <i class="fas fa-shopping-cart"></i></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/amigos">Amigos <i class="fas fa-users"></i></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/grupos">Grupos <i class="fas fa-network-wired"></i></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/carreras">Carreras <i class="fas fa-flag-checkered"></i></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/consejos">Consejos <i class="fas fa-hard-hat"></i></router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <template v-if="user">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img :src="'/images/' + user.profile_picture" class="rounded-circle me-2" alt="Perfil" width="30" height="30">
                <i class="fas fa-user"></i>{{ user.name }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><router-link class="dropdown-item" :to="'/perfil/' + user.id">Perfil</router-link></li>
                <li><router-link class="dropdown-item" to="/configuracion">Configuración</router-link></li>
                <li><router-link class="dropdown-item" to="/mis-anuncios">Mis Anuncios</router-link></li>
                <li><a @click="logout" class="dropdown-item" href="#">Cerrar sesión</a></li>
              </ul>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link class="nav-link" to="/register">Registrar</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Iniciar Sesión</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { watch } from 'vue';

export default {
  name: 'Navbar',
  computed: {
    user() {
      const authStore = useAuthStore();
      return authStore.user;
    }
  },
  methods: {
    async logout() {
      const authStore = useAuthStore();
      await authStore.logout();
    },
    async getUser() {
      const authStore = useAuthStore();
      await authStore.fetchUser();
    }
  },
  created() {
    this.getUser(); // Fetch initial user data
  },
  watch: {
    user(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getUser();
      }
    }
  }
};
</script>

<style scoped>
.navbar-nav .nav-link {
  color: #39ff14 !important;
}

.navbar-nav .nav-link:hover {
  color: #32cd32 !important;
}

.navbar-nav .nav-item.dropdown .dropdown-menu {
  background-color: #333;
}

.navbar-nav .nav-item.dropdown .dropdown-menu .dropdown-item {
  color: #39ff14;
}

.navbar-nav .nav-item.dropdown .dropdown-menu .dropdown-item:hover {
  background-color: #444;
  color: #fff;
}
</style>
