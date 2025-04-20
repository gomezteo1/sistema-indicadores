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