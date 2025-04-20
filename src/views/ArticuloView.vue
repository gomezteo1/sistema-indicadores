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
  