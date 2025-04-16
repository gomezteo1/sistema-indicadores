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
/* Reutiliza el estilo limpio y responsivo que tienes */
</style>
