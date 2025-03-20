<template>
    <div>
      <h2>Lista de Indicadores</h2>
      <ul v-if="indicadores && indicadores.length">
        <li v-for="indicador in indicadores" :key="indicador.id">
          {{ indicador.nombre }} - {{ indicador.valor }}
          <!-- Botón "Modificar" que emite el evento para cargar el formulario de edición -->
          <button @click="$emit('editar', indicador)">Modificar</button>
          <button @click="$emit('eliminar', indicador.id)">Eliminar</button>
        </li>
      </ul>
      <p v-else>No hay indicadores registrados.</p>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    indicadores: {
      type: Array,
      default: () => []
    }
  });
  const emit = defineEmits(['editar', 'eliminar']);
  </script>
  
  <style scoped>
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
  }
  button {
    margin-left: 5px;
    padding: 4px 8px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  button:first-of-type {
    background-color: #ffa500;
    color: white;
  }
  button:last-of-type {
    background-color: #e63946;
    color: white;
  }
  </style>
  