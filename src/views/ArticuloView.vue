<template>
    <div class="fondo">
      <div class="container">
        <h1 class="title">Gestión de Artículos</h1>
        <p class="subtitle">Administra los artículos del sistema: crea, edita y elimina.</p>
  
        <!-- Formulario -->
        <div class="form-group">
          <form @submit.prevent="guardar">
            <label for="id">ID:</label>
            <input v-model="nuevo.id" type="text" placeholder="ID del artículo" required />
  
            <label for="nombre">Nombre:</label>
            <input v-model="nuevo.nombre" type="text" placeholder="Nombre del artículo" required />
  
            <label for="descripcion">Descripción:</label>
            <input v-model="nuevo.descripcion" type="text" placeholder="Descripción" required />
  
            <label for="seccion">Sección:</label>
            <select v-model="nuevo.fkIdSeccion" required>
              <option disabled value="">Seleccione una sección</option>
              <option v-for="sec in secciones" :key="sec.id" :value="sec.id">
                {{ sec.nombre }}
              </option>
            </select>
  
            <label for="subseccion">Subsección:</label>
            <select v-model="nuevo.fkIdSubseccion" required>
              <option disabled value="">Seleccione una subsección</option>
              <option v-for="sub in subsecciones" :key="sub.id" :value="sub.id">
                {{ sub.nombre }}
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
        </div>
  
        <!-- Tabla -->
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Sección</th>
              <th>Subsección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="a in articulos" :key="a.id">
              <td>{{ a.id }}</td>
              <td>{{ a.nombre }}</td>
              <td>{{ a.descripcion }}</td>
              <td>{{ obtenerNombreSeccion(a.fkIdSeccion) }}</td>
              <td>{{ obtenerNombreSubseccion(a.fkIdSubseccion) }}</td>
              <td>
                <button class="btn btn-warning" @click="editarArticulo(a)">Modificar</button>
                <button class="btn btn-danger" @click="eliminarArticulo(a.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { ref, onMounted } from "vue";
  
  export default {
    setup() {
      const apiArticulo = "https://localhost:7222/api/articulo";
      const apiSeccion = "https://localhost:7222/api/seccion";
      const apiSubseccion = "https://localhost:7222/api/subseccion";
  
      const articulos = ref([]);
      const secciones = ref([]);
      const subsecciones = ref([]);
      const nuevo = ref({
        id: "",
        nombre: "",
        descripcion: "",
        fkIdSeccion: "",
        fkIdSubseccion: ""
      });
  
      const editando = ref(false);
      const editId = ref("");
  
      const cargarDatos = async () => {
        try {
          const [art, sec, sub] = await Promise.all([
            axios.get(apiArticulo),
            axios.get(apiSeccion),
            axios.get(apiSubseccion)
          ]);
          articulos.value = art.data;
          secciones.value = sec.data;
          subsecciones.value = sub.data;
        } catch (error) {
          console.error("Error al cargar datos:", error);
        }
      };
  
      const guardar = async () => {
        try {
          if (editando.value) {
            await axios.put(`${apiArticulo}/${editId.value}`, nuevo.value);
          } else {
            await axios.post(apiArticulo, nuevo.value);
          }
          cancelarEdicion();
          await cargarDatos();
        } catch (error) {
          console.error("Error al guardar:", error);
        }
      };
  
      const editarArticulo = (articulo) => {
        nuevo.value = { ...articulo };
        editando.value = true;
        editId.value = articulo.id;
      };
  
      const eliminarArticulo = async (id) => {
        try {
          await axios.delete(`${apiArticulo}/${id}`);
          await cargarDatos();
        } catch (error) {
          console.error("Error al eliminar artículo:", error);
        }
      };
  
      const cancelarEdicion = () => {
        editando.value = false;
        editId.value = "";
        nuevo.value = {
          id: "",
          nombre: "",
          descripcion: "",
          fkIdSeccion: "",
          fkIdSubseccion: ""
        };
      };
  
      const obtenerNombreSeccion = (id) => {
        const s = secciones.value.find((s) => s.id === id);
        return s ? s.nombre : "Desconocido";
      };
  
      const obtenerNombreSubseccion = (id) => {
        const s = subsecciones.value.find((s) => s.id === id);
        return s ? s.nombre : "Desconocido";
      };
  
      onMounted(cargarDatos);
  
      return {
        articulos,
        secciones,
        subsecciones,
        nuevo,
        editando,
        guardar,
        editarArticulo,
        eliminarArticulo,
        cancelarEdicion,
        obtenerNombreSeccion,
        obtenerNombreSubseccion
      };
    }
  };
  </script>
  
  <style scoped>
  /* Copiar estilos de Frecuencia o ActorView, o aplicar un estilo limpio */
  </style>
  