<template>
    <div class="fondo">
      <div class="container">
        <h1 class="title">Gestión de Resultados de Indicadores</h1>
        <p class="subtitle">Administra los resultados calculados para los indicadores.</p>
  
        <form @submit.prevent="guardar" class="form-group">
          <label>Indicador</label>
          <select v-model="nuevo.fkIdIndicador" required>
            <option disabled value="">Selecciona un indicador</option>
            <option v-for="i in indicadores" :key="i.id" :value="i.id">
              {{ i.nombre }}
            </option>
          </select>
  
          <label>Resultado</label>
          <input v-model.number="nuevo.resultado" type="number" step="0.01" placeholder="Resultado" required />
  
          <label>Fecha de Cálculo</label>
          <input v-model="nuevo.fechaCalculo" type="datetime-local" required />
  
          <button class="btn btn-primary" type="submit">
            {{ editando ? 'Actualizar' : 'Agregar' }}
          </button>
          <button v-if="editando" type="button" class="btn btn-secondary" @click="cancelarEdicion">
            Cancelar
          </button>
        </form>
  
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Indicador</th>
              <th>Resultado</th>
              <th>Fecha de Cálculo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in resultados" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ obtenerNombreIndicador(item.fkIdIndicador) }}</td>
              <td>{{ item.resultado }}</td>
              <td>{{ formatFecha(item.fechaCalculo) }}</td>
              <td>
                <button class="btn btn-warning" @click="editar(item)">Editar</button>
                <button class="btn btn-danger" @click="eliminar(item.id)">Eliminar</button>
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
    getResultadosIndicadores,
    createResultadoIndicador,
    updateResultadoIndicador,
    deleteResultadoIndicador,
    getIndicadores
  } from '@/api.js';
  
  const resultados = ref([]);
  const indicadores = ref([]);
  //const idAnterior = ref(null);
  
  const nuevo = ref({
    fkIdIndicador: '',
    resultado: 0,
    fechaCalculo: ''
  });
  
  const editando = ref(false);
  const idEditando = ref(null);
  
  const cargarDatos = async () => {
    resultados.value = (await getResultadosIndicadores()).data;
    indicadores.value = (await getIndicadores()).data;
  };
  
  const guardar = async () => {
  const data = { ...nuevo.value };

  if (!data.fechaCalculo.includes('T')) {
    alert('Formato de fecha inválido');
    return;
  }

  try {
    if (editando.value) {
      // Incluir el ID explícitamente en el cuerpo
      data.id = idEditando.value;
      await updateResultadoIndicador(idEditando.value, data);
    } else {
      await createResultadoIndicador(data);
    }
    cancelarEdicion();
    await cargarDatos();
  } catch (e) {
    console.error('Error al guardar:', e.response?.data || e);
  }
};

  
  const editar = (item) => {
    editando.value = true;
    idEditando.value = item.id;
    nuevo.value = {
      fkIdIndicador: item.fkIdIndicador,
      resultado: item.resultado,
      fechaCalculo: item.fechaCalculo.slice(0, 16) // para datetime-local
    };
  };
  
  const cancelarEdicion = () => {
    editando.value = false;
    idEditando.value = null;
    nuevo.value = { fkIdIndicador: '', resultado: 0, fechaCalculo: '' };
  };
  
  const eliminar = async (id) => {
    if (confirm('¿Estás seguro de eliminar este resultado?')) {
      await deleteResultadoIndicador(id);
      await cargarDatos();
    }
  };
  
  const obtenerNombreIndicador = (id) => {
    const ind = indicadores.value.find(i => i.id === id);
    return ind ? ind.nombre : id;
  };
  
  const formatFecha = (fecha) => new Date(fecha).toLocaleString();
  
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
  .btn-secondary {
    background-color: #6c757d;
  }
  .btn-warning {
    background-color: #ffc107;
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
  