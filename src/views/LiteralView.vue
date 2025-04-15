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
  /* puedes reutilizar el mismo estilo del módulo de frecuencias o actores */
  </style>
  