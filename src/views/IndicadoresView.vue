<script setup>
import { ref, onMounted } from 'vue';
import IndicadorForm from '../components/IndicadorForm.vue';
import IndicadorList from '../components/IndicadorList.vue';
import { obtenerIndicadores, crearIndicador, eliminarIndicador } from '@/api.js';

// Estado
const indicadores = ref([]);
const editando = ref(false);
const indicadorEdit = ref(null);

// Cargar indicadores al inicio
onMounted(async () => {
  await actualizarListaIndicadores();
});

// Función para obtener indicadores
const actualizarListaIndicadores = async () => {
  try {
    const response = await obtenerIndicadores();
    indicadores.value = response.data;
  } catch (error) {
    console.error('Error al actualizar la lista de indicadores:', error);
  }
};

// Guardar o actualizar un indicador
const guardarIndicador = async (data) => {
  try {
    if (editando.value && indicadorEdit.value) {
      await crearIndicador(data); // Usamos la API para actualizar/crear
      editando.value = false;
    } else {
      await crearIndicador(data);
    }
    
    indicadorEdit.value = null;
    await actualizarListaIndicadores();
  } catch (error) {
    console.error('Error al guardar indicador:', error);
  }
};

// Editar indicador
const editarIndicador = (indicador) => {
  editando.value = true;
  indicadorEdit.value = { ...indicador };
};

// Eliminar indicador
const borrarIndicador = async (id) => {
  try {
    await eliminarIndicador(id);
    await actualizarListaIndicadores();
  } catch (error) {
    console.error('Error al eliminar indicador:', error);
  }
};
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">📊 Indicadores</h1>
    <p class="mt-2 text-gray-600">Lista de indicadores registrados.</p>

    <!-- Formulario de Indicador -->
    <IndicadorForm :indicadorEdit="indicadorEdit || {}" @guardar="guardarIndicador" />
    
    <!-- Lista de Indicadores -->
    <IndicadorList :indicadores="indicadores" @editar="editarIndicador" @eliminar="borrarIndicador" />
  </div>
</template>
