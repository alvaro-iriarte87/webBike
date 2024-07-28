<template>
  <div>
    <form @submit.prevent="iniciarSesion" class="form">
      <h1 class="form-label">Login</h1>
      <div class="mb-3">
        <label class="form-label">Email:</label>
        <input type="email" class="form-control" v-model="email" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Contraseña:</label>
        <input type="password" class="form-control" v-model="password" required>
      </div>
      <button type="submit" class="btn btn-success">Iniciar Sesión</button>
      <button type="button" class="btn btn-danger" @click="cancelar">Cancelar</button>
    </form>
  </div>
</template>

<script>
import apiClient from '@/apiClient';
import { useAuthStore } from '@/stores/auth';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async iniciarSesion() {
      try {
        const response = await apiClient.post('/login', {
          email: this.email,
          password: this.password
        });

        const authStore = useAuthStore();
        authStore.setUser(response.data.user); // Actualizar usuario en el almacenamiento

        alert('Inicio de sesión exitoso');
        await authStore.fetchUser(); // Asegurar que el usuario esté actualizado
        this.$router.push('/'); // Redirigir a la página principal

      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Error al iniciar sesión: ' + (error.response?.data?.message || error.message));
      }
    },
    cancelar() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #333;
  color: #fff;
  border-radius: 8px;
}
.form-label {
  color: #39ff14;
}
.form-control {
  background-color: #444;
  color: #fff;
  border: 1px solid #39ff14;
}
.form-control:focus {
  border-color: #32cd32;
}
.btn-success {
  background-color: #39ff14;
  border-color: #32cd32;
}
.btn-success:hover {
  background-color: #32cd32;
}
.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}
.btn-danger:hover {
  background-color: #c82333;
}
</style>
