<template>
  <div class="fondo">
    <div class="container">
      <h1 class="title">Representaciones Visuales</h1>
      <p class="subtitle">Administra los tipos de representaciones visuales. Agrega, actualiza y elimina registros.</p>

      <!-- Formulario -->
      <div class="form-group">
        <form @submit.prevent="guardar">
          <label for="nombre">Nombre:</label>
          <input
            v-model="nuevo.nombre"
            type="text"
            placeholder="Nombre del tipo de representación visual"
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

      <!-- Tabla de tipo Representaciones Visuales -->
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in represenvisuales" :key="r.id">
            <td>{{ r.id }}</td>
            <td>{{ r.nombre }}</td>
            <td>
              <button @click="editarRepresenVisual(r)" class="btn btn-warning">Modificar</button>
              <button @click="eliminarRepresenVisual(r.id)" class="btn btn-danger">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getRepresenVisuales, createRepresenVisual, updateRepresenVisual, deleteRepresenVisual } from '@/api.js';

const represenvisuales = ref([]);
const nuevo = ref({ nombre: '' });
const editando = ref(false);
const editId = ref(null);

// Cargar Representaciones Visuales
const cargarRepresenVisuales = async () => {
  try {
    const response = await getRepresenVisuales();
    represenvisuales.value = response.data;
  } catch (error) {
    console.error('Error al cargar tipo Representación Visual:', error);
  }
};

onMounted(() => {
  cargarRepresenVisuales();
});

// Guardar tipo Representación Visual
const guardar = async () => {
  try {
    if (editando.value) {
      await updateRepresenVisual(editId.value, nuevo.value);
      editando.value = false;
      editId.value = null;
    } else {
      await createRepresenVisual(nuevo.value);
    }
    nuevo.value = { nombre: '' };
    await cargarRepresenVisuales();
  } catch (error) {
    console.error('Error al guardar tipo Representación Visual:', error);
  }
};

// Editar tipo Representación Visual
const editarRepresenVisual = (r) => {
  editando.value = true;
  editId.value = r.id;
  nuevo.value = { ...r };
};

// Eliminar tipo Representación Visual
const eliminarRepresenVisual = async (id) => {
  try {
    await deleteRepresenVisual(id);
    await cargarRepresenVisuales();
  } catch (error) {
    console.error('Error al eliminar tipo Representación Visual:', error);
  }
};

// Cancelar edición
const cancelarEdicion = () => {
  editando.value = false;
  editId.value = null;
  nuevo.value = { nombre: '' };
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