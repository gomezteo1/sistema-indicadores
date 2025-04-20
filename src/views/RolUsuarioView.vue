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
  