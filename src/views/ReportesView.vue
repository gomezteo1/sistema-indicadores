<template>
  <div class="home-container">
    <!-- Encabezado a todo el ancho -->
    <div class="header">
      <h1>Bienvenido al Sistema de Gestión de Indicadores</h1>
      <p>Aquí puedes gestionar y visualizar los indicadores clave.</p>
    </div>

    <!-- Tarjetas en columnas -->
    <div class="cards">
      <div class="card">
        <h2>Sección</h2>
        <p>
          Aquí podrás administrar las diferentes Secciones, creando, actualizando y
          eliminando registros según lo necesites.
        </p>
      </div>

      <div class="card">
        <h2>Tipo de Indicador</h2>
        <p>
          Aquí podrás administrar los diferentes tipos de indicadores, creando,
          actualizando y eliminando registros según lo necesites.
        </p>
      </div>

      <div class="card">
        <h2>Futuros Trabajos</h2>
        <p>
          Se implementarán nuevas funcionalidades y mejoras en el diseño para optimizar
          la gestión y el análisis de indicadores.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// No se necesita lógica adicional si solo mostramos contenido estático
</script>

<style scoped>
.home-container {
  max-width: 1200px; /* Ancho máximo del contenedor */
  margin: 0 auto;    /* Centrar horizontalmente */
  padding: 20px;
}

/* Encabezado que ocupa todo el ancho */
.header {
  width: 100%;
  margin-bottom: 40px;
  text-align: center; /* Centrar el texto */
}

/* Contenedor de las tarjetas */
.cards {
  display: flex;
  flex-wrap: wrap;       /* Permite que las tarjetas se acomoden en varias filas si es necesario */
  gap: 20px;             /* Espacio entre tarjetas */
  justify-content: center; /* Centra horizontalmente las tarjetas */
}

/* Cada tarjeta ocupa la mitad del ancho (menos el gap) */
.card {
  flex: 0 0 calc(50% - 20px); 
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center; 
}
</style>
