<template>
  <form @submit.prevent="guardar">
    <div>
      <label for="nombre">Nombre:</label>
      <input v-model="indicadorLocal.nombre" type="text" id="nombre" required />
    </div>

    <div>
      <label for="valor">Valor:</label>
      <input v-model.number="indicadorLocal.valor" type="number" id="valor" required min="0" />
    </div>

    <button type="submit">
      {{ indicadorEdit?.id ? "Actualizar" : "Agregar" }} Indicador
    </button>
  </form>
</template>

<script setup>
import { ref, watch } from "vue";
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  indicadorEdit: {
    type: Object,
    default: () => ({ nombre: "", valor: 0 }) // Evita valores undefined
  }
});

const emit = defineEmits(["guardar"]);

// Sincroniza el estado local con el prop de edición
const indicadorLocal = ref({ ...props.indicadorEdit });

watch(
  () => props.indicadorEdit,
  (nuevoValor) => {
    indicadorLocal.value = { ...nuevoValor };
  },
  { immediate: true, deep: true }
);

const guardar = () => {
  emit("guardar", { ...indicadorLocal.value });

  // Solo limpiar el formulario si es un nuevo indicador
  if (!props.indicadorEdit?.id) { 
    indicadorLocal.value = { nombre: "", valor: 0 };
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background: #4caf50;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
