<template>
  <div class="fondo">
    <div class="container">
      <h1 class="title">Gestión de Usuarios</h1>

      <!-- Formulario para crear/actualizar -->
      <form @submit.prevent="guardar">
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            v-model="nuevo.email"
            type="email"
            id="email"
            placeholder="email@ejemplo.com"
            required
            :disabled="editando"
          />
        </div>
        <div class="form-group">
          <label for="contrasena">Contraseña:</label>
          <input
            v-model="nuevo.contrasena"
            type="password"
            id="contrasena"
            placeholder="******"
            required
          />
        </div>
        <div class="form-actions">
          <button class="btn btn-primary" type="submit">
            {{ editando ? "Actualizar" : "Agregar" }}
          </button>
          <button v-if="editando" type="button" @click="cancelarEdicion" class="btn btn-cancel">
            Cancelar
          </button>
        </div>
      </form>

      <!-- Lista de usuarios -->
      <table class="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.email">
            <td>{{ usuario.email }}</td>
            <td>
              <button @click="editarUsuario(usuario)" class="btn btn-warning">Editar</button>
              <button @click="eliminarUsuario(usuario.email)" class="btn btn-danger">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from '@/api.js';

const usuarios = ref([]);
const nuevo = ref({ email: '', contrasena: '' });
const editando = ref(false);

const cargarUsuarios = async () => {
  try {
    const response = await getUsuarios();
    usuarios.value = response.data;
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
  }
};

onMounted(() => {
  cargarUsuarios();
});

const guardar = async () => {
  try {
    if (editando.value) {
      await updateUsuario(nuevo.value.email, { ...nuevo.value });
      editando.value = false;
    } else {
      await createUsuario({ ...nuevo.value });
    }
    nuevo.value = { email: '', contrasena: '' };
    await cargarUsuarios();
  } catch (error) {
    console.error('Error al guardar el usuario:', error);
  }
};

const editarUsuario = (usuario) => {
  editando.value = true;
  nuevo.value = { ...usuario };
};

const eliminarUsuario = async (email) => {
  try {
    await deleteUsuario(email);
    await cargarUsuarios();
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
  }
};

const cancelarEdicion = () => {
  editando.value = false;
  nuevo.value = { email: '', contrasena: '' };
};
</script>

<style scoped>
/* Fondo de la página (miel o café claro) */
.fondo {
  background-color: #f4e7d3; /* Color miel claro */
  min-height: 100vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Tarjeta principal */
.container {
  max-width: 1000px;
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

/* Formulario */
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

input {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 700px;
  margin-bottom: 15px;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #2e7d32; /* Verde oscuro al enfocar */
  outline: none;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}

/* Botones */
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

.btn-cancel {
  background-color: #757575; /* Gris para cancelar */
  color: white;
}

.btn-cancel:hover {
  background-color: #616161; /* Gris más oscuro al pasar el mouse */
}

.btn-warning {
  background-color: #ffa000; /* Amarillo cálido */
  color: white;
}

.btn-warning:hover {
  background-color: #ff8f00; /* Amarillo más oscuro al pasar el mouse */
}

.btn-danger {
  background-color: #d32f2f; /* Rojo */
  color: white;
}

.btn-danger:hover {
  background-color: #c62828; /* Rojo más oscuro al pasar el mouse */
}

/* Tabla */
.table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.table th,
.table td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #4caf50; /* Verde para el encabezado */
  color: white;
  font-weight: bold;
}

.table td {
  text-align: center;
}

.table tr:hover {
  background-color: #f5f5f5; /* Fondo gris claro al pasar el mouse */
}
</style>