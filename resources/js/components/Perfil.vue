<template>
  <div class="profile-container">
    <h1>Perfil de Usuario</h1>
    <div v-if="isLoading">
      Cargando perfil...
    </div>
    <div v-else>
      <form @submit.prevent="guardarCambios" class="form">
        <div class="mb-3">
          <label class="form-label">Nombre de Usuario:</label>
          <input type="text" class="form-control" v-model="editedUser.name">
        </div>
        <div class="mb-3">
          <label class="form-label">Foto de Perfil:</label>
          <input type="file" class="form-control" @change="handleFileUpload">
          <img v-if="editedUser.profile_picture" :src="`/images/${editedUser.profile_picture}`" alt="Foto de perfil" width="100">
        </div>
        <div class="mb-3">
          <label class="form-label">Número Celular:</label>
          <input type="text" class="form-control" v-model="editedUser.phone">
        </div>
        <div class="mb-3">
          <label class="form-label">Strava:</label>
          <input type="text" class="form-control" v-model="editedUser.strava">
        </div>
        <div class="mb-3">
          <label class="form-label">Facebook:</label>
          <input type="text" class="form-control" v-model="editedUser.facebook">
        </div>
        <div class="mb-3">
          <label class="form-label">Instagram:</label>
          <input type="text" class="form-control" v-model="editedUser.instagram">
        </div>
        <div class="mb-3">
          <label class="form-label">Telegram:</label>
          <input type="text" class="form-control" v-model="editedUser.telegram">
        </div>
        <button type="submit" class="btn btn-primary">Guardar Cambios</button>
        <div class="mb-3">
          <h2>Mis Publicaciones en el Home</h2>
          <p><strong>Mis Publicaciones:</strong> {{ user.Publicaciones }}</p>
          <p><strong>1:</strong> {{ user.Publublic1 }}</p>
          <p><strong>2:</strong> {{ user.Publublic2 }}</p>
        </div>

        <div class="mb-3">
          <h2>Mis Avisos de Compra Venta</h2>
          <p><strong>Mis Avisos:</strong> {{ user.Avisos }}</p>
          <p><strong>1:</strong> {{ user.Aviso1 }}</p>
          <p><strong>2:</strong> {{ user.Aviso2 }}</p>
        </div>

        <div class="mb-3">
          <h2>Mis Amigos</h2>
          <p><strong>Mis Amigos:</strong> {{ user.Amigos }}</p>
          <p><strong>Amigo 1:</strong> {{ user.Amigo1 }}</p>
          <p><strong>Amigo 2:</strong> {{ user.Amigo2 }}</p>
        </div>

        <div class="mb-3">
          <h2>Mis Grupos</h2>
          <p><strong>Mis Grupos:</strong> {{ user.Grupos }}</p>
          <p><strong>Grupo 1:</strong> {{ user.grupo1 }}</p>
          <p><strong>Grupo 2:</strong> {{ user.grupo2 }}</p>
        </div>

        
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import apiClient from '@/apiClient';

export default {
  name: 'Perfil',
  data() {
    return {
      editedUser: {
        name: '',
        profile_picture: '',
        phone: '',
        strava: '',
        facebook: '',
        instagram: '',
        telegram: ''
      },
      isLoading: true
    };
  },
  computed: {
    user() {
      const authStore = useAuthStore();
      return authStore.user;
    }
  },
  methods: {
    async cargarPerfil() {
      const authStore = useAuthStore();
      try {
        await authStore.fetchUser();
        this.editedUser = { ...authStore.user }; // Copiamos los datos del usuario para editar
      } catch (error) {
        console.error('Error al cargar el perfil:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async guardarCambios() {
      const authStore = useAuthStore();
      try {
        // Simular envío de datos al servidor (adaptar según tu backend)
        const response = await apiClient.put(`/user/${this.editedUser.id}`, this.editedUser);
        console.log('Perfil actualizado:', response.data);
        alert('Perfil actualizado correctamente');
        authStore.setUser(this.editedUser); // Actualizar datos en el estado global
      } catch (error) {
        console.error('Error al guardar cambios:', error);
        alert('Error al guardar cambios');
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.editedUser.profile_picture = file;
    }
  },
  created() {
    this.cargarPerfil();
  }
};
</script>

<style scoped>
.profile-container {
  max-width: 100%;
  margin: auto;
  padding: 20px;
  background-color: #333;
  color: #fff;
  border-radius: 8px;
  border: 1px solid #39ff14;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.form-label {
  color: #39ff14;
}

.form-control {
  background-color: #444;
  color: #fff;
  border: 1px solid #39ff14;
  margin-top: 5px;
}

.form-control:focus {
  border-color: #32cd32;
}

.btn-primary {
  background-color: #39ff14;
  border-color: #32cd32;
  color: #000;
  margin-top: 10px;
}

.btn-primary:hover {
  background-color: #32cd32;
}

h2 {
  color: #39ff14;
  margin-top: 20px;
}
</style>
