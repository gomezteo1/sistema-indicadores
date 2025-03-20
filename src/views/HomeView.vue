<template>
  <div class="fondo">
    <div class="home-container">
      <!-- Encabezado principal -->
      <h1 class="title">¡Bienvenido al Sistema de Gestión de Indicadores!</h1>
      <p class="subtitle">Aquí puedes gestionar y visualizar los indicadores clave de una forma divertida y sencilla.</p>

      <!-- Secciones CRUDs -->
      <div class="comic-row">
        <div class="comic-panel">
          <h2>Subsección</h2>
          <p>Administra las subsecciones para una mejor categorización de datos.</p>
        </div>
        <div class="comic-panel">
          <h2>Tipo de Actor</h2>
          <p>Gestiona los diferentes tipos de actores involucrados en el sistema.</p>
        </div>
      </div>

      <div class="comic-row">
        <div class="comic-panel">
          <h2>Tipo de Indicador</h2>
          <p>Administra los distintos tipos de indicadores de forma eficiente.</p>
        </div>
        <div class="comic-panel">
          <h2>Unidad de Medición</h2>
          <p>Configura y edita las unidades de medición utilizadas en los indicadores.</p>
        </div>
      </div>

      <div class="comic-row">
        <div class="comic-panel">
          <h2>Usuario</h2>
          <p>Administra los usuarios y sus roles dentro del sistema.</p>
        </div>
        <div class="comic-panel">
          <h2>Sentido</h2>
          <p>Define el sentido de los indicadores para su correcta interpretación.</p>
        </div>
      </div>

      <div class="comic-row">
        <div class="comic-panel">
          <h2>Frecuencia</h2>
          <p>Configura la periodicidad de las mediciones de los indicadores.</p>
        </div>
        <div class="comic-panel">
          <h2>Sección</h2>
          <p>Gestiona las secciones en las que se organizan los indicadores.</p>
        </div>
      </div>

      <div class="comic-row">
        <div class="comic-panel">
          <h2>Rol</h2>
          <p>Define y administra los roles del sistema.</p>
        </div>
        <div class="comic-panel">
          <h2>Fuente</h2>
          <p>Administra las fuentes de información utilizadas en los indicadores.</p>
        </div>
      </div>

      <div class="comic-row">
        <div class="comic-panel">
          <h2>Representación Visual</h2>
          <p>Gestiona la manera en que se presentan visualmente los indicadores.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No se necesita lógica adicional si es contenido estático
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

/* Contenedor principal */
.home-container {
  max-width: 1200px;
  width: 100%;
  padding: 20px;
  background: #ffffff; /* Fondo blanco para la tarjeta */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-family: Arial, sans-serif;
}

/* Título y subtítulo centrados */
.title {
  font-weight: bold;
  color: #2e7d32; /* Verde oscuro para el título */
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.subtitle {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: #555;
}

/* Fila con dos columnas tipo cómic */
.comic-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

/* Panel con estilo cómic */
.comic-panel {
  flex: 1;
  background-color: #f9f9f9;
  border: 3px solid #000;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 2px 2px 0 #000;
  text-align: center;
  min-width: 250px; /* Asegura que los paneles no sean demasiado pequeños */
}

.comic-panel h2 {
  margin-bottom: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #2e7d32; /* Verde oscuro para los títulos */
}

.comic-panel p {
  line-height: 1.6;
  color: #555;
}
</style>