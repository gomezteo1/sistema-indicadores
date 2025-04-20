<template>
    <div class="fondo">
      <div class="container">
        <h1 class="title">Gestión de Literales</h1>
        <p class="subtitle">Administra los literales asociados a artículos.</p>
  
        <form @submit.prevent="guardar" class="form-group">
          <label>ID:</label>
          <input v-model="nuevo.id" type="text" required placeholder="ID del literal" />
  
          <label>Descripción:</label>
          <input v-model="nuevo.descripcion" type="text" required placeholder="Descripción" />
  
          <label>Artículo:</label>
          <select v-model="nuevo.fkIdArticulo" required>
            <option disabled value="">Seleccione un artículo</option>
            <option v-for="art in articulos" :key="art.id" :value="art.id">
              {{ art.nombre }}
            </option>
          </select>
  
          <div class="button-group">
            <button type="submit" class="btn btn-primary">
              {{ editando ? "Actualizar" : "Agregar" }}
            </button>
            <button v-if="editando" type="button" @click="cancelarEdicion" class="btn btn-cancel">
              Cancelar
            </button>
          </div>
        </form>
  
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Artículo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="literal in literales" :key="literal.id">
              <td>{{ literal.id }}</td>
              <td>{{ literal.descripcion }}</td>
              <td>{{ obtenerNombreArticulo(literal.fkIdArticulo) }}</td>
              <td>
                <button class="btn btn-warning" @click="editarLiteral(literal)">Modificar</button>
                <button class="btn btn-danger" @click="eliminarLiteral(literal.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import {
    getLiterales,
    createLiteral,
    updateLiteral,
    deleteLiteral
  } from '@/api.js'
  
  const apiArticuloUrl = "https://localhost:7222/api/articulo"
  
  const literales = ref([])
  const articulos = ref([])
  
  const nuevo = ref({ id: '', descripcion: '', fkIdArticulo: '' })
  const editando = ref(false)
  const editId = ref('')
  
  const cargarLiterales = async () => {
    try {
      const res = await getLiterales()
      literales.value = res.data
    } catch (e) {
      console.error('Error al cargar literales', e)
    }
  }
  
  const cargarArticulos = async () => {
    try {
      const res = await axios.get(apiArticuloUrl)
      articulos.value = res.data
    } catch (e) {
      console.error('Error al cargar artículos', e)
    }
  }
  
  const obtenerNombreArticulo = (id) => {
    const art = articulos.value.find(a => a.id === id)
    return art ? art.nombre : 'No encontrado'
  }
  
  const guardar = async () => {
    try {
      if (editando.value) {
        await updateLiteral(editId.value, nuevo.value)
        editando.value = false
        editId.value = ''
      } else {
        await createLiteral(nuevo.value)
      }
      nuevo.value = { id: '', descripcion: '', fkIdArticulo: '' }
      cargarLiterales()
    } catch (e) {
      console.error('Error al guardar literal', e)
    }
  }
  
  const editarLiteral = (literal) => {
    editando.value = true
    editId.value = literal.id
    nuevo.value = { ...literal }
  }
  
  const eliminarLiteral = async (id) => {
    try {
      await deleteLiteral(id)
      cargarLiterales()
    } catch (e) {
      console.error('Error al eliminar literal', e)
    }
  }
  
  const cancelarEdicion = () => {
    editando.value = false
    editId.value = ''
    nuevo.value = { id: '', descripcion: '', fkIdArticulo: '' }
  }
  
  onMounted(() => {
    cargarLiterales()
    cargarArticulos()
  })
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
  /* .form-group {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: center;
  } */
  
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