<template>
  <div class="fondo">
    <div class="container">
      <h1 class="title">Gestión de Indicadores</h1>
      <p class="subtitle">Administra los indicadores del sistema.</p>

      <!-- Formulario -->
      <form @submit.prevent="guardar" class="form-group">
        <input v-model="nuevo.codigo" type="text" placeholder="Código" required />
        <input v-model="nuevo.nombre" type="text" placeholder="Nombre" required />
        <input v-model="nuevo.objetivo" type="text" placeholder="Objetivo" required />
        <input v-model="nuevo.alcance" type="text" placeholder="Alcance" required />
        <input v-model="nuevo.formula" type="text" placeholder="Fórmula" required />
        <input v-model="nuevo.meta" type="text" placeholder="Meta" required />

        <!-- Selects -->
        <select v-model="nuevo.fkIdTipoIndicador" required>
          <option disabled value="">Tipo Indicador</option>
          <option v-for="item in tipoIndicadores" :key="item.id" :value="item.id">{{ item.nombre }}</option>
        </select>

        <select v-model="nuevo.fkIdUnidadMedicion" required>
          <option disabled value="">Unidad Medición</option>
          <option v-for="item in unidadMediciones" :key="item.id" :value="item.id">{{ item.descripcion }}</option>
        </select>

        <select v-model="nuevo.fkIdSentido" required>
          <option disabled value="">Sentido</option>
          <option v-for="item in sentidos" :key="item.id" :value="item.id">{{ item.nombre }}</option>
        </select>

        <select v-model="nuevo.fkIdFrecuencia" required>
          <option disabled value="">Frecuencia</option>
          <option v-for="item in frecuencias" :key="item.id" :value="item.id">{{ item.nombre }}</option>
        </select>

        <select v-model="nuevo.fkIdArticulo">
          <option disabled value="">Artículo</option>
          <option v-for="item in articulos" :key="item.id" :value="item.id">{{ item.nombre }}</option>
        </select>

        <select v-model="nuevo.fkIdLiteral">
          <option disabled value="">Literal</option>
          <option v-for="item in literales" :key="item.id" :value="item.id">{{ item.descripcion }}</option>
        </select>

        <select v-model="nuevo.fkIdNumeral">
          <option disabled value="">Numeral</option>
          <option v-for="item in numerales" :key="item.id" :value="item.id">{{ item.descripcion }}</option>
        </select>

        <select v-model="nuevo.fkIdParagrafo">
          <option disabled value="">Parágrafo</option>
          <option v-for="item in paragrafos" :key="item.id" :value="item.id">{{ item.descripcion }}</option>
        </select>

        <div class="button-group">
          <button class="btn btn-primary" type="submit">{{ editando ? "Actualizar" : "Agregar" }}</button>
          <button v-if="editando" type="button" class="btn btn-cancel" @click="cancelarEdicion">Cancelar</button>
        </div>
      </form>

      <!-- Tabla -->
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Fórmula</th>
            <th>Frecuencia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in indicadores" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.nombre }}</td>
            <td>{{ item.formula }}</td>
            
            <td>
              <button class="btn btn-warning" @click="editar(item)">Modificar</button>
              <button class="btn btn-danger" @click="eliminar(item.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import {
  getIndicadores, createIndicador, updateIndicador, deleteIndicador,
  getTipoIndicadores, getUnidadMediciones, getSentidos,
  getFrecuencias, getArticulos, getLiterales, getNumerales, getParagrafos
} from "@/api.js";

export default { 
  setup() {
    const indicadores = ref([]);
    const tipoIndicadores = ref([]);
    const unidadMediciones = ref([]);
    const sentidos = ref([]);
    const frecuencias = ref([]);
    const articulos = ref([]);
    const literales = ref([]);
    const numerales = ref([]);
    const paragrafos = ref([]);

    const nuevo = ref({
      codigo: '', nombre: '', objetivo: '', alcance: '', formula: '', meta: '',
      fkIdTipoIndicador: '', fkIdUnidadMedicion: '', fkIdSentido: '', fkIdFrecuencia: '',
      fkIdArticulo: '', fkIdLiteral: '', fkIdNumeral: '', fkIdParagrafo: ''
    });

    const editando = ref(false);
    const idAnterior = ref("");

    const cargarDatos = async () => {
      indicadores.value = (await getIndicadores()).data;
      tipoIndicadores.value = (await getTipoIndicadores()).data;
      unidadMediciones.value = (await getUnidadMediciones()).data;
      sentidos.value   = (await getSentidos()).data;
      frecuencias.value = (await getFrecuencias()).data;
      articulos.value = (await getArticulos()).data;
      literales.value = (await getLiterales()).data;
      numerales.value = (await getNumerales()).data;
      paragrafos.value = (await getParagrafos()).data;
    };

    const guardar = async () => {
      if (editando.value) {
        await updateIndicador(idAnterior.value, nuevo.value);
        editando.value = false;
        idAnterior.value = "";
      } else {
        await createIndicador(nuevo.value);
      }
      nuevo.value = {
        codigo: '', nombre: '', objetivo: '', alcance: '', formula: '', meta: '',
        fkIdTipoIndicador: '', fkIdUnidadMedicion: '', fkIdSentido: '', fkIdFrecuencia: '',
        fkIdArticulo: '', fkIdLiteral: '', fkIdNumeral: '', fkIdParagrafo: ''
      };
      await cargarDatos();
    };

    const editar = (item) => {
      editando.value = true;
      idAnterior.value = item.id;
      nuevo.value = { ...item };
    };

    const eliminar = async (id) => {
      await deleteIndicador(id);
      await cargarDatos();
    };

    const cancelarEdicion = () => {
      editando.value = false;
      idAnterior.value = "";
      nuevo.value = {
        codigo: '', nombre: '', objetivo: '', alcance: '', formula: '', meta: '',
        fkIdTipoIndicador: '', fkIdUnidadMedicion: '', fkIdSentido: '', fkIdFrecuencia: '',
        fkIdArticulo: '', fkIdLiteral: '', fkIdNumeral: '', fkIdParagrafo: ''
      };
    };

  
    onMounted(() => {
      cargarDatos();
    });

    return {
      indicadores, tipoIndicadores, unidadMediciones, sentidos,
      frecuencias, articulos, literales, numerales, paragrafos,
      nuevo, editando, guardar, editar, eliminar, cancelarEdicion,
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
