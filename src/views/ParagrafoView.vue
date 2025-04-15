<template>
    <div class="fondo">
      <div class="container">
        <h1 class="title">Gestión de Parárafos</h1>
        <p class="subtitle">Administra los parárafos legales asociados a artículos.</p>
  
        <!-- Formulario -->
        <form @submit.prevent="guardar" class="form-group">
          <label>ID</label>
          <input v-model="nuevo.id" type="text" placeholder="ID" required />
  
          <label>Descripción</label>
          <input v-model="nuevo.descripcion" type="text" placeholder="Descripción" required />
  
          <label>Artículo</label>
          <select v-model="nuevo.fkIdArticulo" required>
            <option disabled value="">Seleccione un artículo</option>
            <option v-for="art in articulos" :key="art.id" :value="art.id">
              {{ art.id }} - {{ art.nombre }}
            </option>
          </select>
  
          <div class="button-group">
            <button class="btn btn-primary" type="submit">
              {{ editando ? "Actualizar" : "Agregar" }}
            </button>
            <button v-if="editando" type="button" @click="cancelarEdicion" class="btn btn-cancel">
              Cancelar
            </button>
          </div>
        </form>
  
        <!-- Tabla -->
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
            <tr v-for="p in paragrafos" :key="p.id">
              <td>{{ p.id }}</td>
              <td>{{ p.descripcion }}</td>
              <td>{{ obtenerArticulo(p.fkIdArticulo) }}</td>
              <td>
                <button @click="editar(p)" class="btn btn-warning">Modificar</button>
                <button @click="eliminar(p.id)" class="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { ref, onMounted } from 'vue'
  import {
    getParagrafos,
    createParagrafo,
    updateParagrafo,
    deleteParagrafo,
  } from "@/api.js";
  
  export default {
    setup() {
      const paragrafos = ref([]);
      const articulos = ref([]);
      const nuevo = ref({ id: "", descripcion: "", fkIdArticulo: "" });
      const editando = ref(false);
      const idAnterior = ref("");
  
      const cargarParagrafos = async () => {
        const res = await getParagrafos();
        paragrafos.value = res.data;
      };
  
      const cargarArticulos = async () => {
        const res = await axios.get("https://localhost:7222/api/articulo");
        articulos.value = res.data;
      };
  
      const obtenerArticulo = (id) => {
        const art = articulos.value.find((a) => a.id === id);
        return art ? art.nombre : "Desconocido";
      };
  
      const guardar = async () => {
        if (editando.value) {
          if (idAnterior.value !== nuevo.value.id) {
            await deleteParagrafo(idAnterior.value);
            await createParagrafo(nuevo.value);
          } else {
            await updateParagrafo(nuevo.value.id, nuevo.value);
          }
          editando.value = false;
          idAnterior.value = "";
        } else {
          await createParagrafo(nuevo.value);
        }
        nuevo.value = { id: "", descripcion: "", fkIdArticulo: "" };
        await cargarParagrafos();
      };
  
      const editar = (p) => {
        editando.value = true;
        idAnterior.value = p.id;
        nuevo.value = { ...p };
      };
  
      const eliminar = async (id) => {
        await deleteParagrafo(id);
        await cargarParagrafos();
      };
  
      const cancelarEdicion = () => {
        editando.value = false;
        idAnterior.value = "";
        nuevo.value = { id: "", descripcion: "", fkIdArticulo: "" };
      };
  
      onMounted(() => {
        cargarParagrafos();
        cargarArticulos();
      });
  
      return {
        paragrafos,
        articulos,
        nuevo,
        editando,
        guardar,
        editar,
        eliminar,
        cancelarEdicion,
        obtenerArticulo,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Puedes reutilizar el estilo del CRUD de frecuencias/actores */
  </style>
  