<template>
  <div class="fondo">
    <div class="container">
      <h1 class="title">Gestión de Variables</h1>
      <p class="subtitle">Administra las variables asociadas a usuarios</p>

      <!-- Formulario con diseño mejorado -->
      <div class="card form-container">
        <form @submit.prevent="guardar">
          <div class="form-grid">
            <div class="form-group">
              <label>Nombre:</label>
              <input v-model="nuevo.nombre" type="text" class="form-control" 
                     placeholder="Nombre de la variable" required />
            </div>

            <div class="form-group">
              <label>Usuario:</label>
              <select v-model="nuevo.fkEmailUsuario" class="form-control" required>
                <option disabled value="">Selecciona un usuario</option>
                <option v-for="u in usuarios" :key="u.email" :value="u.email">
                  {{ u.email }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn primary">
              <i class="fas" :class="editando ? 'fa-save' : 'fa-plus'"></i>
              {{ editando ? "Actualizar" : "Agregar" }}
            </button>
            <button v-if="editando" type="button" @click="cancelar" class="btn secondary">
              <i class="fas fa-times"></i> Cancelar
            </button>
          </div>
        </form>
      </div>

      <!-- Tabla con diseño mejorado -->
      <div class="card table-container">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Fecha de Creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="v in variables" :key="v.id">
                <td class="monospace">{{ v.id }}</td>
                <td>{{ v.nombre }}</td>
                <td>{{ v.fkEmailUsuario }}</td>
                <td>{{ formatFecha(v.fechaCreacion) }}</td>
                <td class="actions">
                  <button @click="editar(v)" class="btn icon edit" title="Editar">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button @click="eliminar(v.id)" class="btn icon delete" title="Eliminar">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  getVariables,
  createVariable,
  updateVariable,
  deleteVariable,
  getUsuarios
} from '@/api.js';

const variables = ref([]);
const usuarios = ref([]);
const editando = ref(false);
const idEditando = ref(null);

const nuevo = ref({
  nombre: '',
  fkEmailUsuario: ''
});

const cargarDatos = async () => {
  try {
    const [vars, users] = await Promise.all([
      getVariables(),
      getUsuarios()
    ]);
    variables.value = vars.data;
    usuarios.value = users.data;
  } catch (error) {
    console.error('Error cargando datos:', error);
  }
};

const formatFecha = (fecha) => {
  return new Date(fecha).toLocaleString();
};

const guardar = async () => {
  const data = {
    nombre: nuevo.value.nombre,
    fkEmailUsuario: nuevo.value.fkEmailUsuario,
    fechaCreacion: new Date().toISOString()
  };

  try {
    if (editando.value) {
      data.id = idEditando.value;
      await updateVariable(idEditando.value, data);
    } else {
      await createVariable(data);
    }
    cancelar();
    await cargarDatos();
  } catch (err) {
    console.error('Error al guardar:', err);
  }
};

const editar = (v) => {
  editando.value = true;
  idEditando.value = v.id;
  nuevo.value = {
    nombre: v.nombre,
    fkEmailUsuario: v.fkEmailUsuario
  };
};

const cancelar = () => {
  editando.value = false;
  idEditando.value = null;
  nuevo.value = {
    nombre: '',
    fkEmailUsuario: ''
  };
};

const eliminar = async (id) => {
  if (confirm('¿Estás seguro de eliminar esta variable?')) {
    try {
      await deleteVariable(id);
      await cargarDatos();
    } catch (error) {
      console.error('Error eliminando:', error);
    }
  }
};

onMounted(cargarDatos);
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