<template>
  <div class="fondo">
    <div class="container">
      <h1 class="title">Unidades de Medición</h1>
      <p class="subtitle">Administra las unidades de medición. Agrega, actualiza y elimina registros.</p>

      <!-- Formulario -->
      <div class="form-group">
        <input
          v-model="nuevo.descripcion"
          type="text"
          placeholder="Descripción de la unidad"
          class="form-control"
          required
        />
        <button @click="guardar" class="btn btn-primary">
          {{ editando ? "Actualizar" : "Agregar" }}
        </button>
        <button v-if="editando" @click="cancelarEdicion" class="btn btn-cancel">Cancelar</button>
      </div>

      <!-- Tabla de unidades de medición -->
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="um in unidadMediciones" :key="um.id">
            <td>{{ um.id }}</td>
            <td v-if="editId !== um.id">{{ um.descripcion }}</td>
            <td v-else>
              <input v-model="nuevo.descripcion" type="text" class="form-control" />
            </td>
            <td>
              <button
                v-if="editId !== um.id"
                @click="editarUnidadMedicion(um)"
                class="btn btn-warning"
              >
                Modificar
              </button>
              <button v-else @click="guardar" class="btn btn-success">Guardar</button>
              <button @click="eliminarUnidadMedicion(um.id)" class="btn btn-danger">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getUnidadMediciones, createUnidadMedicion, updateUnidadMedicion, deleteUnidadMedicion } from '@/api.js';

const unidadMediciones = ref([]);
const nuevo = ref({ descripcion: '' });
const editando = ref(false);
const editId = ref(null);

const cargarUnidadMediciones = async () => {
  try {
    const response = await getUnidadMediciones();
    unidadMediciones.value = response.data;
  } catch (error) {
    console.error('Error al cargar unidades de medición:', error);
  }
};

onMounted(() => {
  cargarUnidadMediciones();
});

const guardar = async () => {
  try {
    if (editando.value) {
      await updateUnidadMedicion(editId.value, nuevo.value);
      editando.value = false;
      editId.value = null;
    } else {
      await createUnidadMedicion(nuevo.value);
    }
    nuevo.value = { descripcion: '' };
    await cargarUnidadMediciones();
  } catch (error) {
    console.error('Error al guardar unidad de medición:', error);
  }
};

const editarUnidadMedicion = (um) => {
  editando.value = true;
  editId.value = um.id;
  nuevo.value = { ...um };
};

const eliminarUnidadMedicion = async (id) => {
  try {
    await deleteUnidadMedicion(id);
    await cargarUnidadMediciones();
  } catch (error) {
    console.error('Error al eliminar unidad de medición:', error);
  }
};

const cancelarEdicion = () => {
  editando.value = false;
  editId.value = null;
  nuevo.value = { descripcion: '' };
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
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.form-control {
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: #2e7d32; /* Verde oscuro al enfocar */
  outline: none;
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

.btn-success {
  background-color: #2e7d32; /* Verde oscuro */
  color: white;
}

.btn-success:hover {
  background-color: #1b5e20; /* Verde más oscuro al pasar el mouse */
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