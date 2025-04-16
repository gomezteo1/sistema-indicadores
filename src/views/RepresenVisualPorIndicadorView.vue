<template>
    <div class="fondo">
      <div class="container">
        <h1 class="title">Visualizaciones por Indicador</h1>
        <p class="subtitle">Asocia visualizaciones con indicadores.</p>
  
        <form @submit.prevent="guardar" class="form-group">
          <label>Indicador</label>
          <select v-model="nuevo.fkIdIndicador" required>
            <option disabled value="">Selecciona un indicador</option>
            <option v-for="i in indicadores" :key="i.id" :value="i.id">{{ i.nombre }}</option>
          </select>
  
          <label>Representación Visual</label>
          <select v-model="nuevo.fkIdRepresenVisual" required>
            <option disabled value="">Selecciona una visualización</option>
            <option v-for="r in represenVisuales" :key="r.id" :value="r.id">{{ r.nombre }}</option>
          </select>
  
          <button type="submit" class="btn btn-primary">Agregar</button>
        </form>
  
        <table class="table">
          <thead>
            <tr>
              <th>Indicador</th>
              <th>Representación Visual</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in asociaciones" :key="`${item.fkIdIndicador}-${item.fkIdRepresenVisual}`">
              <td>{{ obtenerNombreIndicador(item.fkIdIndicador) }}</td>
              <td>{{ obtenerNombreVisual(item.fkIdRepresenVisual) }}</td>
              <td>
                <button @click="eliminar(item.fkIdIndicador, item.fkIdRepresenVisual)" class="btn btn-danger">Eliminar</button>
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
    getRepresenVisualesPorIndicadores,
    createRepresenVisualPorIndicador,
    deleteRepresenVisualesPorIndicador,
    getIndicadores,
    getRepresenVisuales
  } from '@/api.js';
  
  const asociaciones = ref([]);
  const indicadores = ref([]);
  const represenVisuales = ref([]);
  
  const nuevo = ref({
    fkIdIndicador: '',
    fkIdRepresenVisual: ''
  });
  
  const cargarDatos = async () => {
    asociaciones.value = (await getRepresenVisualesPorIndicadores()).data;
    indicadores.value = (await getIndicadores()).data;
    represenVisuales.value = (await getRepresenVisuales()).data;
  };
  
  const guardar = async () => {
    try {
      await createRepresenVisualPorIndicador(nuevo.value);
      await cargarDatos();
      nuevo.value = { fkIdIndicador: '', fkIdRepresenVisual: '' };
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };
  
  const eliminar = async (idIndicador, idRepresenVisual) => {
    try {
      await deleteRepresenVisualesPorIndicador(`${idIndicador}/${idRepresenVisual}`);
      await cargarDatos();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };
  
  const obtenerNombreIndicador = (id) => {
    const encontrado = indicadores.value.find(i => i.id === id);
    return encontrado ? encontrado.nombre : id;
  };
  
  const obtenerNombreVisual = (id) => {
    const encontrado = represenVisuales.value.find(v => v.id === id);
    return encontrado ? encontrado.nombre : id;
  };
  
  onMounted(() => {
    cargarDatos();
  });
  </script>
  
  <style scoped>
  /* Reutiliza estilos que tengas para formularios y tablas */
  </style>
  