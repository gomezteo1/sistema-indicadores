<template>
  <div class="fondo">
    <div class="container">
      <h1 class="title">Asignación de Responsables</h1>
      <p class="subtitle">Asocia responsables a indicadores.</p>

      <!-- Formulario -->
      <form @submit.prevent="guardar" class="form-group">
        <label>Responsable (Actor)</label>
        <select v-model="nuevo.fkIdResponsable" required>
          <option disabled value="">Selecciona un actor</option>
          <option v-for="u in actores" :key="u.nombre" :value="u.id">
            {{ u.nombre }}
          </option>
        </select>

        <label>Indicador</label>
        <select v-model="nuevo.fkIdIndicador" required>
          <option disabled value="">Selecciona un indicador</option>
          <option v-for="i in indicadores" :key="i.id" :value="i.id">
            {{ i.nombre }}
          </option>
        </select>

        <button class="btn btn-primary" type="submit">Asignar</button>
      </form>

      <!-- Tabla -->
      <table class="table">
        <thead>
          <tr>
            <th>Responsable</th>
            <th>Indicador</th>
            <th>Fecha Asignación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in relaciones" :key="`${r.fkIdResponsable}-${r.fkIdIndicador}`">
            <td>{{ obtenerNombreUsuario(r.fkIdResponsable) }}</td>
            <td>{{ obtenerNombreIndicador(r.fkIdIndicador) }}</td>
            <td>{{ formatFechaLocal(r.fechaAsignacion) }}</td>
            <td>
              <button class="btn btn-danger" @click="eliminar(r.fkIdResponsable, r.fkIdIndicador)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  getResponsablesPorIndicadores,
  createResponsablesPorIndicador,
  deleteResponsablesPorindicador,
  getActores,
  getIndicadores
} from '@/api.js';

const relaciones = ref([]);
const actores = ref([]);
const indicadores = ref([]);

const nuevo = ref({
  fkIdResponsable: '',
  fkIdIndicador: ''
});

const cargarDatos = async () => {
  relaciones.value = (await getResponsablesPorIndicadores()).data;
  actores.value = (await getActores()).data;
  indicadores.value = (await getIndicadores()).data;
};

const guardar = async () => {
  try {
    const yaExiste = relaciones.value.some(
      r => r.fkIdResponsable === nuevo.value.fkIdResponsable && r.fkIdIndicador === nuevo.value.fkIdIndicador
    );

    if (yaExiste) {
      alert("Ya existe esa asignación.");
      return;
    }

    const data = {
      fkIdResponsable: nuevo.value.fkIdResponsable,
      fkIdIndicador: nuevo.value.fkIdIndicador,
      fechaAsignacion: new Date().toISOString()
    };

    await createResponsablesPorIndicador(data);
    await cargarDatos();
    nuevo.value = { fkIdResponsable: '', fkIdIndicador: '' };
  } catch (err) {
    console.error("Error al asignar:", err);
    alert("No se pudo asignar. Verifica que el usuario exista como actor y no esté repetido.");
  }
};

const eliminar = async (responsable, indicador) => {
  try {
    await deleteResponsablesPorindicador(`${responsable}/${indicador}`);
    await cargarDatos();
  } catch (err) {
    console.error("Error al eliminar asignación:", err);
  }
};

const obtenerNombreUsuario = (id) => {
  const u = actores.value.find(u => u.id === id );
  return u ? u.nombre : id;
};

const obtenerNombreIndicador = (id) => {
  const i = indicadores.value.find(i => i.id === id);
  return i ? i.nombre : id;
};

const formatFechaLocal = (fecha) => {
  return new Date(fecha).toLocaleString();
};

onMounted(cargarDatos);
</script>

<style scoped>
.fondo {
  background-color: #f4f4f4;
  padding: 2rem;
  min-height: 100vh;
}

.container {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  max-width: 900px;
  margin: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 2rem;
}

select,
input {
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button.btn {
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
}

.btn-danger {
  background-color: #dc3545;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
}

.table th,
.table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
</style>
