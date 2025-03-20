<template>
  <div class="fondo">
    <div class="container">
      <h1 class="title">Subsecciones</h1>
      <p class="subtitle">Administra las subsecciones. Agrega, actualiza y elimina registros.</p>

      <!-- Formulario -->
      <div class="form-group">
        <form @submit.prevent="guardar">
          <label for="id">ID:</label>
          <input
            v-model="nuevo.id"
            type="text"
            placeholder="ID"
            required
          />

          <label for="nombre">Nombre:</label>
          <input
            v-model="nuevo.nombre"
            type="text"
            placeholder="Nombre de la subsección"
            required
          />

          <div class="button-group">
            <button class="btn btn-primary" type="submit">
              {{ editando ? "Actualizar" : "Agregar" }}
            </button>
            <button v-if="editando" type="button" @click="cancelarEdicion" class="btn btn-cancel">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <!-- Tabla de subsecciones -->
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in subsecciones" :key="s.id">
            <td>{{ s.id }}</td>
            <td>{{ s.nombre }}</td>
            <td>
              <button @click="editarSubseccion(s)" class="btn btn-warning">Modificar</button>
              <button @click="eliminarSubseccion(s.id)" class="btn btn-danger">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getSubsecciones, createSubseccion, updateSubseccion, deleteSubseccion } from '@/api.js';

const subsecciones = ref([]);
const nuevo = ref({ id: '', nombre: '' });
const editando = ref(false);
const editId = ref('');

// Cargar subsecciones
const cargarSubsecciones = async () => {
  try {
    const response = await getSubsecciones();
    subsecciones.value = response.data;
  } catch (error) {
    console.error('Error al cargar subsecciones:', error);
  }
};

onMounted(() => {
  cargarSubsecciones();
});

// Guardar subsección
const guardar = async () => {
  try {
    if (editando.value) {
      await updateSubseccion(editId.value, nuevo.value);
      editando.value = false;
      editId.value = '';
    } else {
      await createSubseccion(nuevo.value);
    }
    nuevo.value = { id: '', nombre: '' };
    await cargarSubsecciones();
  } catch (error) {
    console.error('Error al guardar subsección:', error);
  }
};

// Editar subsección
const editarSubseccion = (s) => {
  editando.value = true;
  editId.value = s.id;
  nuevo.value = { ...s };
};

// Eliminar subsección
const eliminarSubseccion = async (id) => {
  try {
    await deleteSubseccion(id);
    await cargarSubsecciones();
  } catch (error) {
    console.error('Error al eliminar subsección:', error);
  }
};

// Cancelar edición
const cancelarEdicion = () => {
  editando.value = false;
  editId.value = '';
  nuevo.value = { id: '', nombre: '' };
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

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #555;
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

.button-group {
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