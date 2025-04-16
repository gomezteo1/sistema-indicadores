<template>
  <div class="fondo">
    <div class="container">
      <h1 class="title">Gestión de Frecuencias</h1>
      <p class="subtitle">Administra las frecuencias disponibles en el sistema.</p>

      <!-- Formulario para agregar frecuencia -->
      <div class="form-group">
        <label for="frecuencia">Frecuencia</label>
        <input
          v-model="nuevoFrecuencia"
          type="text"
          name="frecuencia"
          placeholder="Nombre de la frecuencia"
          class="form-control"
        />
        <button @click="agregarFrecuencia" class="btn btn-primary">Agregar</button>
      </div>

      <!-- Tabla de frecuencias -->
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="frecuencia in frecuencias" :key="frecuencia.id">
            <td>{{ frecuencia.id }}</td>
            <td v-if="frecuenciaEditando !== frecuencia.id">{{ frecuencia.nombre }}</td>
            <td v-else>
              <input v-model="frecuenciaEditado" type="text" class="form-control" />
            </td>
            <td>
              <button
                v-if="frecuenciaEditando !== frecuencia.id"
                @click="editarFrecuencia(frecuencia)"
                class="btn btn-warning"
              >
                Modificar
              </button>
              <button
                v-else
                @click="guardarEdicion(frecuencia.id)"
                class="btn btn-success"
              >
                Guardar
              </button>
              <button @click="eliminarFrecuencia(frecuencia.id)" class="btn btn-danger">
                Eliminar
              </button>
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
    const apiUrl = "https://localhost:7222/api/frecuencia"; // URL base del API
    const frecuencias = ref([]);
    const nuevoFrecuencia = ref("");
    const frecuenciaEditando = ref(null);
    const frecuenciaEditado = ref("");

    const cargarFrecuencias = async () => {
      try {
        const response = await axios.get(apiUrl);
        frecuencias.value = response.data;
      } catch (error) {
        console.error("Error al cargar las frecuencias:", error);
      }
    };

    const agregarFrecuencia = async () => {
      if (!nuevoFrecuencia.value.trim()) return;
      try {
        await axios.post(apiUrl, { nombre: nuevoFrecuencia.value });
        nuevoFrecuencia.value = "";
        cargarFrecuencias();
      } catch (error) {
        console.error("Error al agregar la frecuencia:", error);
      }
    };

    const editarFrecuencia = (frecuencia) => {
      frecuenciaEditando.value = frecuencia.id;
      frecuenciaEditado.value = frecuencia.nombre;
    };

    const guardarEdicion = async (id) => {
      if (!frecuenciaEditado.value.trim()) return;

      try {
        await axios.put(`${apiUrl}/${id}`, { id: id, nombre: frecuenciaEditado.value });

        // Resetear valores después de la edición
        frecuenciaEditando.value = null;
        frecuenciaEditado.value = "";
        cargarFrecuencias();
      } catch (error) {
        console.error("Error al modificar la frecuencia:", error);
      }
    };

    const eliminarFrecuencia = async (id) => {
      try {
        await axios.delete(`${apiUrl}/${id}`);
        cargarFrecuencias();
      } catch (error) {
        console.error("Error al eliminar la frecuencia:", error);
      }
    };

    onMounted(cargarFrecuencias);

    return {
      frecuencias,
      nuevoFrecuencia,
      frecuenciaEditando,
      frecuenciaEditado,
      agregarFrecuencia,
      editarFrecuencia,
      guardarEdicion,
      eliminarFrecuencia,
    };
  },
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
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

input {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 700px;
  margin-bottom: 15px;
  transition: border-color 0.3s ease;
}

input:focus {
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