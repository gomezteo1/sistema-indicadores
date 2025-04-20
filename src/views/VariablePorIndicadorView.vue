<template>
    <div class="fondo">
      <div class="container">
        <h1 class="title">Gestión de Variables por Indicador</h1>
        <form @submit.prevent="guardar" class="form-group">
          <label>Variable</label>
          <select v-model="nuevo.fkIdVariable" required>
            <option disabled value="">Selecciona una variable</option>
            <option v-for="v in variables" :key="v.id" :value="v.id">{{ v.nombre }}</option>
          </select>
  
          <label>Indicador</label>
          <select v-model="nuevo.fkIdIndicador" required>
            <option disabled value="">Selecciona un indicador</option>
            <option v-for="i in indicadores" :key="i.id" :value="i.id">{{ i.nombre }}</option>
          </select>
  
          <label>Dato</label>
          <input v-model.number="nuevo.dato" type="number" step="0.01" required />
  
          <label>Usuario</label>
          <select v-model="nuevo.fkEmailUsuario" required>
            <option disabled value="">Selecciona un usuario</option>
            <option v-for="u in usuarios" :key="u.email" :value="u.email">{{ u.email }}</option>
          </select>
  
          <label>Fecha del Dato</label>
          <input v-model="nuevo.fechaDato" type="datetime-local" required />
  
          <div class="buttons">
            <button type="submit" class="btn btn-primary">{{ editando ? 'Actualizar' : 'Agregar' }}</button>
            <button v-if="editando" @click="cancelarEdicion" type="button" class="btn btn-secondary">Cancelar</button>
          </div>
        </form>
  
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Variable</th>
              <th>Indicador</th>
              <th>Dato</th>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in registros" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ obtenerNombreVariable(item.fkIdVariable) }}</td>
              <td>{{ obtenerNombreIndicador(item.fkIdIndicador) }}</td>
              <td>{{ item.dato }}</td>
              <td>{{ item.fkEmailUsuario }}</td>
              <td>{{ formatFecha(item.fechaDato) }}</td>
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
    getVariablesPorIndicadores,
    createVariablePorIndicador,
    updateVariablePorIndicador,
    deleteVariablePorIndicador,
    getVariables,
    getIndicadores,
    getUsuarios
  } from '@/api.js';
  
  const registros = ref([]);
  const variables = ref([]);
  const indicadores = ref([]);
  const usuarios = ref([]);
  
  const nuevo = ref({
    fkIdVariable: '',
    fkIdIndicador: '',
    dato: 0,
    fkEmailUsuario: '',
    fechaDato: ''
  });
  
  const editando = ref(false);
  const idEditando = ref(null);
  
  const cargarDatos = async () => {
    registros.value = (await getVariablesPorIndicadores()).data;
    variables.value = (await getVariables()).data;
    indicadores.value = (await getIndicadores()).data;
    usuarios.value = (await getUsuarios()).data;
  };
  
  const guardar = async () => {
    const data = { ...nuevo.value };
  
    if (!data.fechaDato.includes('T')) {
      alert('La fecha debe estar en formato correcto');
      return;
    }
  
    try {
      if (editando.value) {
        await updateVariablePorIndicador(idEditando.value, data);
      } else {
        await createVariablePorIndicador(data);
      }
      cancelarEdicion();
      await cargarDatos();
    } catch (e) {
      console.error('Error al guardar:', e);
    }
  };
  
  const editar = (item) => {
    editando.value = true;
    idEditando.value = item.id;
    nuevo.value = {
      id: item.id,
      fkIdVariable: item.fkIdVariable,
      fkIdIndicador: item.fkIdIndicador,
      dato: item.dato,
      fkEmailUsuario: item.fkEmailUsuario,
      fechaDato: item.fechaDato.slice(0, 16)
    };
  };
  
  const eliminar = async (id) => {
    if (confirm('¿Deseas eliminar este registro?')) {
      await deleteVariablePorIndicador(id);
      await cargarDatos();
    }
  };
  
  const cancelarEdicion = () => {
    editando.value = false;
    idEditando.value = null;
    nuevo.value = {
      fkIdVariable: '',
      fkIdIndicador: '',
      dato: 0,
      fkEmailUsuario: '',
      fechaDato: ''
    };
  };
  
  const obtenerNombreVariable = (id) => {
    const variable = variables.value.find(v => v.id === id);
    return variable ? variable.nombre : id;
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
    max-width: 1000px;
    margin: auto;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  .title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  select, input {
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  button {
    margin-right: 0.5rem;
  }
  .table {
    width: 100%;
    margin-top: 2rem;
    border-collapse: collapse;
  }
  .table th, .table td {
    padding: 0.75rem;
    border-bottom: 1px solid #ddd;
  }
  .btn-primary {
    background-color: #007bff;
    color: white;
  }
  .btn-secondary {
    background-color: #6c757d;
    color: white;
  }
  .btn-warning {
    background-color: #ffc107;
    color: black;
  }
  .btn-danger {
    background-color: #dc3545;
    color: white;
  }
  </style>
  