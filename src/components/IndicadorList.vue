<template>
    <form @submit.prevent="guardar">
      <div>
        <label for="nombre">Nombre:</label>
        <input v-model="indicadorLocal.nombre" type="text" id="nombre" required />
      </div>
  
      <div>
        <label for="valor">Valor:</label>
        <input v-model="indicadorLocal.valor" type="number" id="valor" required />
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
    indicadorEdit: Object,
  });
  
  const emit = defineEmits(["guardar"]);
  
  const indicadorLocal = ref({ nombre: "", valor: "" });
  
  // Si se recibe un indicador a editar, se llena el formulario
  watch(
    () => props.indicadorEdit,
    (nuevoValor) => {
      if (nuevoValor) {
        indicadorLocal.value = { ...nuevoValor };
      }
    },
    { immediate: true }
  );
  
  const guardar = () => {
    emit("guardar", { ...indicadorLocal.value });
    indicadorLocal.value = { nombre: "", valor: "" }; // Reiniciar formulario
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
  