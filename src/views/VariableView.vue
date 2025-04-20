<template>
    <div class="fondo">
      <div class="container">
        <h1 class="title">Gestión de Variables</h1>
        <p class="subtitle">Administra las variables asociadas a usuarios.</p>
  
        <!-- Formulario -->
        <form @submit.prevent="guardar" class="form-group">
          <label>Nombre</label>
          <input v-model="nuevo.nombre" type="text" placeholder="Nombre de la variable" required />
  
          <label>Usuario</label>
          <select v-model="nuevo.fkEmailUsuario" required>
            <option disabled value="">Selecciona un usuario</option>
            <option v-for="u in usuarios" :key="u.email" :value="u.email">
              {{ u.email }}
            </option>
          </select>
  
          <button class="btn btn-primary" type="submit">{{ editando ? "Actualizar" : "Agregar" }}</button>
          <button v-if="editando" class="btn btn-secondary" type="button" @click="cancelar">Cancelar</button>
        </form>
  
        <!-- Tabla -->
        <table class="table">
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
              <td>{{ v.id }}</td>
              <td>{{ v.nombre }}</td>
              <td>{{ v.fkEmailUsuario }}</td>
              <td>{{ new Date(v.fechaCreacion).toLocaleString() }}</td>
              <td>
                <button class="btn btn-warning" @click="editar(v)">Editar</button>
                <button class="btn btn-danger" @click="eliminar(v.id)">Eliminar</button>
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
    variables.value = (await getVariables()).data;
    usuarios.value = (await getUsuarios()).data;
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
      await deleteVariable(id);
      await cargarDatos();
    }
  };
  
  onMounted(cargarDatos);
  </script>
  
  <style scoped>
  .fondo {
    background-color: #f9f9f9;
    padding: 2rem;
  }
  .container {
    background: #fff;
    padding: 2rem;
    border-radius: 10px;
    max-width: 900px;
    margin: auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .title {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  .subtitle {
    margin-bottom: 1.5rem;
  }
  input, select {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  button.btn {
    margin-right: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    color: white;
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
    margin-top: 2rem;
    border-collapse: collapse;
  }
  .table th, .table td {
    padding: 0.75rem;
    border-bottom: 1px solid #ddd;
  }
  </style>
  