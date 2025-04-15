<template>
  <div class="fondo">
    <div class="container">
      <h1 class="title">Actores</h1>
      <p class="subtitle">Administra los Actores. Agrega, actualiza y elimina registros.</p>

      <!-- Formulario -->
      <div class="form-group">
        <form @submit.prevent="guardar">
          <label>ID:</label>
          <input v-model="nuevo.id" type="text" class="form-control" placeholder="ID" required />

          <label>Nombre:</label>
          <input v-model="nuevo.nombre" type="text" class="form-control" placeholder="Nombre del actor" required />

          <label>Tipo de Actor:</label>
          <select v-model="nuevo.fkIdTipoActor" class="form-control" required>
            <option disabled value="">Seleccione un tipo</option>
            <option v-for="tipo in tiposActor" :key="tipo.id" :value="tipo.id">
              {{ tipo.nombre }}
            </option>
          </select>

          <div class="button-group">
            <button class="btn btn-primary" type="submit">
              {{ editando ? "Actualizar" : "Agregar" }}
            </button>
            <button v-if="editando" type="button" @click="cancelarEdicion" class="btn btn-secondary">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <!-- Tabla de actores -->
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo Actor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="actor in actores" :key="actor.id">
            <td>{{ actor.id }}</td>
            <td>{{ actor.nombre }}</td>
            <td>{{ obtenerNombreTipo(actor.fkIdTipoActor) }}</td>
            <td>
              <button @click="editarActor(actor)" class="btn btn-warning">Modificar</button>
              <button @click="eliminarActor(actor.id)" class="btn btn-danger">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { getActores, createActor, updateActor, deleteActor } from '@/api.js';

const apiTipoUrl = "https://localhost:7222/api/tipoactor";

const actores = ref([]);
const tiposActor = ref([]);
const nuevo = ref({ id: '', nombre: '', fkIdTipoActor: '' });
const editando = ref(false);
const editId = ref('');

// Cargar Actores
const cargarActores = async () => {
  try {
    const response = await getActores();
    actores.value = response.data;
  } catch (error) {
    console.error('Error al cargar actores:', error);
    alert('Error al cargar actores: ' + error.message);
  }
};

// Cargar Tipos de Actor
const cargarTiposActor = async () => {
  try {
    const response = await axios.get(apiTipoUrl);
    tiposActor.value = response.data;
  } catch (error) {
    console.error("Error al cargar tipos de actor:", error);
    alert('Error al cargar tipos de actor: ' + error.message);
  }
};

// Obtener nombre del tipo desde el ID
const obtenerNombreTipo = (fkId) => {
  const tipo = tiposActor.value.find(t => t.id === fkId);
  return tipo ? tipo.nombre : 'Desconocido';
};

onMounted(() => {
  cargarActores();
  cargarTiposActor();
});

// Guardar actor (Crear o Actualizar)
const guardar = async () => {
  try {
    // Validación básica
    if (!nuevo.value.id.trim()) {
      return alert('El ID es requerido');
    }
    if (!nuevo.value.nombre.trim()) {
      return alert('El nombre es requerido');
    }
    if (!nuevo.value.fkIdTipoActor) {
      return alert('Debe seleccionar un tipo de actor');
    }

    // Preparar payload
    const payload = {
      id: nuevo.value.id.trim(),
      nombre: nuevo.value.nombre.trim(),
      fkIdTipoActor: parseInt(nuevo.value.fkIdTipoActor)
    };

    if (editando.value) {
      await updateActor(editId.value, payload);
    } else {
      await createActor(payload);
    }

    // Resetear estado
    nuevo.value = { id: '', nombre: '', fkIdTipoActor: '' };
    editando.value = false;
    editId.value = '';
    
    await cargarActores();
  } catch (error) {
    console.error('Error al guardar actor:', error);
    alert('Error: ' + (error.response?.data?.message || error.message));
  }
};

// Editar actor
const editarActor = (actor) => {
  editando.value = true;
  editId.value = actor.id;
  nuevo.value = { 
    id: actor.id,
    nombre: actor.nombre,
    fkIdTipoActor: actor.fkIdTipoActor.toString()
  };
};

// Eliminar actor
const eliminarActor = async (id) => {
  try {
    if (confirm('¿Está seguro de eliminar este actor?')) {
      await deleteActor(id);
      await cargarActores();
    }
  } catch (error) {
    console.error('Error al eliminar actor:', error);
    alert('Error al eliminar: ' + error.message);
  }
};

// Cancelar edición
const cancelarEdicion = () => {
  editando.value = false;
  editId.value = '';
  nuevo.value = { id: '', nombre: '', fkIdTipoActor: '' };
};
</script>

<style scoped>
/* Fondo de la página (miel o café claro) */
.fondo {
  background-color: #f4e7d3;
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
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #2e7d32;
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
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.form-control {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 15px;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: #2e7d32;
  outline: none;
}

select.form-control {
  height: 40px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
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
  background-color: #4caf50;
  color: white;
}

.btn-primary:hover {
  background-color: #388e3c;
}

.btn-secondary {
  background-color: #757575;
  color: white;
}

.btn-secondary:hover {
  background-color: #616161;
}

.btn-warning {
  background-color: #ffa000;
  color: white;
}

.btn-warning:hover {
  background-color: #ff8f00;
}

.btn-danger {
  background-color: #d32f2f;
  color: white;
}

.btn-danger:hover {
  background-color: #c62828;
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
  text-align: center;
}

.table th {
  background-color: #4caf50;
  color: white;
  font-weight: bold;
}

.table tr:hover {
  background-color: #f5f5f5;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 15px;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .button-group {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    margin-bottom: 5px;
  }
}
</style>