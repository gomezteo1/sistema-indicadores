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