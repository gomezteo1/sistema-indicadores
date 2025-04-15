<template>
    <div class="fondo">
      <div class="container">
        <h1 class="title">Gestión de Numerales</h1>
        <p class="subtitle">Administra numerales legales y sus relaciones con literales.</p>
  
        <!-- Formulario -->
        <form @submit.prevent="guardar" class="form-group">
          <label for="id">ID</label>
          <input v-model="nuevo.id" type="text" required placeholder="ID del numeral" />
  
          <label for="descripcion">Descripción</label>
          <input v-model="nuevo.descripcion" type="text" required placeholder="Descripción" />
  
          <label for="fkIdLiteral">Literal</label>
          <select v-model="nuevo.fkIdLiteral" required>
            <option disabled value="">Seleccione un literal</option>
            <option v-for="l in literales" :key="l.id" :value="l.id">
              {{ l.id }} - {{ l.descripcion }}
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
              <th>Literal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="n in numerales" :key="n.id">
              <td>{{ n.id }}</td>
              <td>{{ n.descripcion }}</td>
              <td>{{ obtenerLiteral(n.fkIdLiteral) }}</td>
              <td>
                <button @click="editar(n)" class="btn btn-warning">Modificar</button>
                <button @click="eliminar(n.id)" class="btn btn-danger">Eliminar</button>
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
    getNumerales,
    createNumeral,
    updateNumeral,
    deleteNumeral
  } from "@/api.js";
  
  export default {
    setup() {
      const numerales = ref([]);
      const literales = ref([]);
      const editando = ref(false);
      const idAnterior = ref("");
  
      const nuevo = ref({
        id: "",
        descripcion: "",
        fkIdLiteral: ""
      });
  
      const cargarNumerales = async () => {
        const res = await getNumerales();
        numerales.value = res.data;
      };
  
      const cargarLiterales = async () => {
        const res = await axios.get("https://localhost:7222/api/literal");
        literales.value = res.data;
      };
  
      const obtenerLiteral = (id) => {
        const literal = literales.value.find((l) => l.id === id);
        return literal ? literal.descripcion : "Desconocido";
      };
  
      const guardar = async () => {
        if (editando.value) {
          if (nuevo.value.id !== idAnterior.value) {
            await deleteNumeral(idAnterior.value); // Borra el anterior
            await createNumeral(nuevo.value);      // Crea el nuevo con el nuevo ID
          } else {
            await updateNumeral(nuevo.value.id, nuevo.value);
          }
          editando.value = false;
          idAnterior.value = "";
        } else {
          await createNumeral(nuevo.value);
        }
        nuevo.value = { id: "", descripcion: "", fkIdLiteral: "" };
        await cargarNumerales();
      };
  
      const editar = (n) => {
        editando.value = true;
        idAnterior.value = n.id;
        nuevo.value = { ...n };
      };
  
      const eliminar = async (id) => {
        await deleteNumeral(id);
        await cargarNumerales();
      };
  
      const cancelarEdicion = () => {
        editando.value = false;
        idAnterior.value = "";
        nuevo.value = { id: "", descripcion: "", fkIdLiteral: "" };
      };
  
      onMounted(() => {
        cargarNumerales();
        cargarLiterales();
      });
  
      return {
        numerales,
        literales,
        nuevo,
        editando,
        guardar,
        editar,
        eliminar,
        cancelarEdicion,
        obtenerLiteral
      };
    }
  };
  </script>
  
  <style scoped>
  /* Usa los mismos estilos de frecuencias o actores */
  </style>
  