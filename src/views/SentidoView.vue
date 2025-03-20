<template>
  <div class="fondo">
    <div class="container">
      <h1 class="title">Gestión de Sentidos</h1>
      <p class="subtitle">Administra los sentidos disponibles en el sistema.</p>

      <!-- Formulario para agregar sentido -->
      <div class="form-group">
        <input
          v-model="nuevoSentido"
          type="text"
          placeholder="Nombre del sentido"
          class="form-control"
        />
        <button @click="agregarSentido" class="btn btn-primary">Agregar</button>
      </div>

      <!-- Tabla de sentidos -->
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sentido in sentidos" :key="sentido.id">
            <td>{{ sentido.id }}</td>
            <td v-if="sentidoEditando !== sentido.id">{{ sentido.nombre }}</td>
            <td v-else>
              <input v-model="sentidoEditado" type="text" class="form-control" />
            </td>
            <td>
              <button
                v-if="sentidoEditando !== sentido.id"
                @click="editarSentido(sentido)"
                class="btn btn-warning"
              >
                Modificar
              </button>
              <button
                v-else
                @click="guardarEdicion(sentido.id)"
                class="btn btn-success"
              >
                Guardar
              </button>
              <button @click="eliminarSentido(sentido.id)" class="btn btn-danger">
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
    const apiUrl = "https://localhost:7222/api/sentido"; // URL base del API
    const sentidos = ref([]);
    const nuevoSentido = ref("");
    const sentidoEditando = ref(null);
    const sentidoEditado = ref("");

    const cargarSentidos = async () => {
      try {
        const response = await axios.get(apiUrl);
        sentidos.value = response.data;
      } catch (error) {
        console.error("Error al cargar los sentidos:", error);
      }
    };

    const agregarSentido = async () => {
      if (!nuevoSentido.value.trim()) return;
      try {
        await axios.post(apiUrl, { nombre: nuevoSentido.value });
        nuevoSentido.value = "";
        cargarSentidos();
      } catch (error) {
        console.error("Error al agregar el sentido:", error);
      }
    };

    const editarSentido = (sentido) => {
      sentidoEditando.value = sentido.id;
      sentidoEditado.value = sentido.nombre;
    };

    const guardarEdicion = async (id) => {
      if (!sentidoEditado.value.trim()) return;

      try {
        await axios.put(`${apiUrl}/${id}`, { id: id, nombre: sentidoEditado.value });

        // Resetear valores después de la edición
        sentidoEditando.value = null;
        sentidoEditado.value = "";
        cargarSentidos();
      } catch (error) {
        console.error("Error al modificar el sentido:", error);
      }
    };

    const eliminarSentido = async (id) => {
      try {
        await axios.delete(`${apiUrl}/${id}`);
        cargarSentidos();
      } catch (error) {
        console.error("Error al eliminar el sentido:", error);
      }
    };

    onMounted(cargarSentidos);

    return {
      sentidos,
      nuevoSentido,
      sentidoEditando,
      sentidoEditado,
      agregarSentido,
      editarSentido,
      guardarEdicion,
      eliminarSentido,
    };
  },
};
</script>

<style scoped>
/* Fondo de la página (miel o café claro) */
.fondo {
  background-color: #f4e7d3; /* Color miel claro */
  min-height: 100vh;
  padding: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Tarjeta principal */
.container {
  max-width: 1000px;
  width: 100%;
  padding: 10px;
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
  margin-bottom: 1px;
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