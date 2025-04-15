<template>
  <div class="fondo">
    <div class="container">
      <h1 class="title">Gestión de Actores</h1>
      <p class="subtitle">Administra los actores disponibles en el sistema.</p>

      <!-- Formulario para agregar actor -->
      <div class="form-group">
        <label>ID del actor</label>
        <input v-model="nuevoActor.id" type="text" class="form-control" placeholder="ID" />

        <label>Nombre del actor</label>
        <input v-model="nuevoActor.nombre" type="text" class="form-control" placeholder="Nombre" />

        <label>Tipo de actor</label>
        <select v-model="nuevoActor.fkIdTipoActor" class="form-control">
          <option disabled value="">Selecciona un tipo</option>
          <option v-for="tipo in tiposActor" :key="tipo.id" :value="tipo.id">
            {{ tipo.nombre }}
          </option>
        </select>

        <button @click="agregarActor" class="btn btn-primary mt-2">Agregar</button>
      </div>

      <!-- Tabla de actores -->
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo de Actor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="actor in actores" :key="actor.id">
            <td>{{ actor.id }}</td>

            <!-- Campo nombre -->
            <td v-if="actorEditando !== actor.id">{{ actor.nombre }}</td>
            <td v-else>
              <input v-model="actorEditado.nombre" type="text" class="form-control" />
            </td>

            <!-- Campo tipo -->
            <td v-if="actorEditando !== actor.id">
              {{ actor.tipoActor?.nombre || "Desconocido" }}
            </td>
            <td v-else>
              <select v-model="actorEditado.fkIdTipoActor" class="form-control">
                <option v-for="tipo in tiposActor" :key="tipo.id" :value="tipo.id">
                  {{ tipo.nombre }}
                </option>
              </select>
            </td>

            <!-- Botones -->
            <td>
              <button
                v-if="actorEditando !== actor.id"
                @click="editarActor(actor)"
                class="btn btn-warning"
              >
                Modificar
              </button>
              <button
                v-else
                @click="guardarEdicion(actor.id)"
                class="btn btn-success"
              >
                Guardar
              </button>
              <button @click="eliminarActor(actor.id)" class="btn btn-danger">
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
    const apiUrl = "https://localhost:7222/api/actor";
    const apiTipoUrl = "https://localhost:7222/api/tipoactor";

    const actores = ref([]);
    const tiposActor = ref([]);

    const nuevoActor = ref({
      id: "",
      nombre: "",
      fkIdTipoActor: ""
    });

    const actorEditando = ref(null);
    const actorEditado = ref({
      nombre: "",
      fkIdTipoActor: ""
    });

    const cargarActores = async () => {
      try {
        const response = await axios.get(apiUrl);
        actores.value = response.data;
      } catch (error) {
        console.error("Error al cargar actores:", error);
      }
    };

    const cargarTiposActor = async () => {
      try {
        const response = await axios.get(apiTipoUrl);
        tiposActor.value = response.data;
      } catch (error) {
        console.error("Error al cargar tipos de actor:", error);
      }
    };

    const agregarActor = async () => {
      try {
        const payload = {
          id: parseInt(nuevoActor.value.id),
          nombre: nuevoActor.value.nombre,
          fkIdTipoActor: parseInt(nuevoActor.value.fkIdTipoActor)
        };

        await axios.post(apiUrl, payload);

        nuevoActor.value = { id: "", nombre: "", fkIdTipoActor: "" };
        cargarActores();
      } catch (error) {
        console.error("Error al agregar actor:", error);
      }
    };

    const editarActor = (actor) => {
      actorEditando.value = actor.id;
      actorEditado.value = {
        nombre: actor.nombre,
        fkIdTipoActor: actor.fkIdTipoActor
      };
    };

    const guardarEdicion = async (id) => {
      try {
        await axios.put(`${apiUrl}/${id}`, {
          id: id,
          nombre: actorEditado.value.nombre,
          fkIdTipoActor: actorEditado.value.fkIdTipoActor
        });

        actorEditando.value = null;
        actorEditado.value = { nombre: "", fkIdTipoActor: "" };
        cargarActores();
      } catch (error) {
        console.error("Error al editar actor:", error);
      }
    };

    const eliminarActor = async (id) => {
      try {
        await axios.delete(`${apiUrl}/${id}`);
        cargarActores();
      } catch (error) {
        console.error("Error al eliminar actor:", error);
      }
    };

    onMounted(() => {
      cargarTiposActor();
      cargarActores();
    });

    return {
      actores,
      tiposActor,
      nuevoActor,
      actorEditando,
      actorEditado,
      agregarActor,
      editarActor,
      guardarEdicion,
      eliminarActor
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
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

input, select {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 700px;
  margin-bottom: 15px;
  transition: border-color 0.3s ease;
}

input:focus, select:focus {
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
  margin-right: 5px;
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
  text-align: center;
}

.table th {
  background-color: #4caf50; /* Verde para el encabezado */
  color: white;
  font-weight: bold;
}

.table tr:hover {
  background-color: #f5f5f5; /* Fondo gris claro al pasar el mouse */
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.mt-2 {
  margin-top: 0.5rem;
}
</style>