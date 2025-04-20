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
  