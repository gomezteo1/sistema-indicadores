<template>
  <div class="fondo">
    <div class="container">
      <h1 class="title">Iniciar Sesión</h1>
      <p class="subtitle">Accede a tu cuenta para administrar el sistema.</p>

      <!-- Formulario de inicio de sesión -->
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="email@ejemplo.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input
            v-model="contrasena"
            type="password"
            id="password"
            placeholder="********"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
      </form>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>
<script>
import { login } from '@/api.js';

export default {
  data() {
    return {
      email: '',
      contrasena: '',
      error: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await login(this.email, this.contrasena);
        const { token, rol } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('rol', rol); // Guarda el rol (ej: "1")
        console.log(localStorage);
        this.$router.push('/inicio');
      } catch (err) {
        console.error(err);
        this.error = 'Correo o contraseña incorrectos';
      }
    },
  },
};
</script>


<style scoped>
/* Fondo de la página (miel o café claro) */
.fondo {
  background-color: #f4e7d3; /* Color miel claro */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Tarjeta principal */
.container {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background: #ffffff; /* Fondo blanco para la tarjeta */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #2e7d32; /* Verde oscuro para el título */
  font-weight: bold;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #555;
}

/* Formulario */
.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  border-color: #2e7d32; /* Verde oscuro al enfocar */
  outline: none;
}

/* Botón de inicio de sesión */
.btn {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #4caf50; /* Verde */
  color: white;
}

.btn-primary:hover {
  background-color: #388e3c; /* Verde más oscuro al pasar el mouse */
}

/* Mensaje de error */
.error {
  color: #d32f2f; /* Rojo */
  margin-top: 10px;
  font-size: 0.9rem;
}
</style>