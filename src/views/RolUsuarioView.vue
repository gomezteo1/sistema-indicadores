<template>
    <div class="fondo">
      <div class="container">
        <h1 class="title">Asignación de Roles a Usuarios</h1>
        <p class="subtitle">Administra los roles asignados a los usuarios.</p>
  
        <form @submit.prevent="guardar" class="form-group">
          <label>Usuario</label>
          <select v-model="nuevo.fkEmail" required>
            <option disabled value="">Selecciona un usuario</option>
            <option v-for="u in usuarios" :key="u.email" :value="u.email">
              {{ u.email }}
            </option>
          </select>
  
          <label>Rol</label>
          <select v-model="nuevo.fkIdRol" required>
            <option disabled value="">Selecciona un rol</option>
            <option v-for="r in roles" :key="r.id" :value="r.id">
              {{ r.nombre }}
            </option>
          </select>
  
          <button class="btn btn-primary" type="submit">Asignar</button>
        </form>
  
        <table class="table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in relaciones" :key="`${item.fkEmail}-${item.fkIdRol}`">
              <td>{{ item.fkEmail }}</td>
              <td>{{ obtenerNombreRol(item.fkIdRol) }}</td>
              <td>
                <button class="btn btn-danger" @click="eliminar(item.fkEmail, item.fkIdRol)">Eliminar</button>
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
    getRolesUsuarios,
    createRolUsuario,
    deleteRolUsuario,
    getUsuarios,
    getRoles
  } from '@/api.js';
  
  const relaciones = ref([]);
  const usuarios = ref([]);
  const roles = ref([]);
  
  const nuevo = ref({
    fkEmail: '',
    fkIdRol: ''
  });
  
  const cargarDatos = async () => {
    relaciones.value = (await getRolesUsuarios()).data;
    usuarios.value = (await getUsuarios()).data;
    roles.value = (await getRoles()).data;
  };
  
  const guardar = async () => {
    try {
      const yaExiste = relaciones.value.some(
        r => r.fkEmail === nuevo.value.fkEmail && r.fkIdRol === nuevo.value.fkIdRol
      );
  
      if (yaExiste) {
        alert('Este usuario ya tiene asignado ese rol.');
        return;
      }
  
      await createRolUsuario(nuevo.value);
      await cargarDatos();
      nuevo.value = { fkEmail: '', fkIdRol: '' };
    } catch (err) {
      console.error('Error al asignar rol:', err);
    }
  };
  
  const eliminar = async (email, idRol) => {
    if (confirm('¿Estás seguro de eliminar esta asignación?')) {
      await deleteRolUsuario(`${email}/${idRol}`);
      await cargarDatos();
    }
  };
  
  const obtenerNombreRol = (id) => {
    const r = roles.value.find(r => r.id === id);
    return r ? r.nombre : id;
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
  