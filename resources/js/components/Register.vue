<template>
  <div>
    <form @submit.prevent="registerUser" class="form">
      <div class="mb-3">
        <h1 class="form-label"> Ingresa tus datos </h1>
        <br>
        <label class="form-label">Nombre:</label>
        <input type="text" class="form-control" v-model="name" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Apellido:</label>
        <input type="text" class="form-control" v-model="apellido" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Email:</label>
        <input type="email" class="form-control" v-model="email" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Contraseña:</label>
        <input type="password" class="form-control" v-model="password" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Confirmar Contraseña:</label>
        <input type="password" class="form-control" v-model="confirmPassword" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Foto de Perfil:</label>
        <input type="file" class="form-control" @change="onFileChange">
      </div>
      <button type="submit" class="btn btn-success">Registrar</button>
      <button type="button" class="btn btn-danger" @click="$router.push('/')">Cancelar</button>
    </form>
  </div>
</template>

<script>
import axios from '@/axios-config';

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      apellido: '',
      email: '',
      password: '',
      confirmPassword: '',
      profilePicture: null
    };
  },
  methods: {
    onFileChange(event) {
      this.profilePicture = event.target.files[0];
    },
   async registerUser() {
  if (this.password !== this.confirmPassword) {
    console.log('Las contraseñas no coinciden');
    return;
  }

  const formData = new FormData();
  formData.append('name', this.name);
  formData.append('apellido', this.apellido);
  formData.append('email', this.email);
  formData.append('password', this.password);
  formData.append('password_confirmation', this.confirmPassword);
  formData.append('profilePicture', this.profilePicture);

  try {
    const response = await apiClient.post('/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Registro exitoso:', response.data);
    alert('Usuario registrado correctamente');
    this.$router.push('/');
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error('Error de validación:', error.response.data);
      alert('Error de validación: ' + JSON.stringify(error.response.data));
    } else {
      console.error('Error registrando usuario:', error);
      alert('Error al registrar usuario');
    }
  }
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
