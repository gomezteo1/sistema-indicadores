<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Iniciar Sesión xd</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700">Correo electrónico</label>
          <input
            v-model="email"
            type="email"
            class="w-full p-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700">Contraseña</label>
          <input
            v-model="contrasena"
            type="password"
            class="w-full p-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-2xl hover:bg-blue-600 transition duration-200"
        >
          Ingresar
        </button>
        <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api.js'; // ajusta la ruta según dónde esté tu archivo api.js

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
        // Aquí llamas a tu función login del api.js
        const response = await login(this.email, this.contrasena);
        
        // Suponiendo que el token viene en data.token
        const token = response.data.token;

        // Guarda el token
        localStorage.setItem('token', token);

        // Redirecciona, por ejemplo, al dashboard
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
/* Opcional: estilos adicionales si no usas Tailwind */
</style>
