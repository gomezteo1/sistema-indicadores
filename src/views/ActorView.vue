<template>
  <div class="fondo">
    <div class="container">
      <h1 class="title">Actores</h1>
      <p class="subtitle">Administra los Actores. Agrega, actualiza y elimina registros.</p>

      <!-- Formulario -->
      <div class="form-group">
        <form @submit.prevent="guardar">
          <label for="id">ID:</label>
          <input v-model="nuevo.id" type="text" placeholder="ID" required />

          <label for="nombre">Nombre:</label>
          <input v-model="nuevo.nombre" type="text" placeholder="Nombre del actor" required />

          <label for="tipo">Tipo de Actor:</label>
          <select v-model="nuevo.fkIdTipoActor" required>
            <option disabled value="">Seleccione un tipo</option>
            <option v-for="tipo in tiposActor" :key="tipo.id" :value="tipo.id">
              {{ tipo.nombre }}
            </option>
          </select>

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
    fkIdTipoActor: actor.fkIdTipoActor.toString() // Convertir a string para el select
  };
};

// Eliminar actor
const eliminarActor = async (id) => {
  try {
    if (confirm('¿Está seguro de eliminar este actor?')) {
      await deleteActor(id); // Enviar ID original (sin parsear)
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
/* Reutiliza tus estilos de frecuencias aquí */
</style>
