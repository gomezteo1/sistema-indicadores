<template>
  <div class="fondo">
    <div class="about-container">
      <h1 class="title">Acerca de Sistema de Gestión de Indicadores</h1>
      <p>
        Este proyecto fue desarrollado como una solución para la gestión de indicadores basados en el Decreto 1330 de 2019. Su objetivo es ayudar a las instituciones a monitorizar y mejorar la calidad académica, ofreciendo herramientas para crear, actualizar y eliminar registros de indicadores de forma sencilla y eficaz.
      </p>
      <p>
        La aplicación utiliza <strong>Vue 3</strong> en el frontend, aprovechando la potencia de Vue CLI para una experiencia de desarrollo rápida y moderna, y se conecta a un backend en <strong>C# (ASP.NET Core)</strong> que expone una API REST para la manipulación de datos.
      </p>
      <p>
        Además, el sistema ha sido diseñado con una interfaz responsiva y amigable, facilitando su uso en diversos dispositivos. La integración entre frontend y backend se realiza mediante llamadas HTTP usando Axios, lo que permite una comunicación fluida y actualizaciones en tiempo real.
      </p>
      <p>
        ¡Esperamos que esta solución contribuya a mejorar la gestión y el análisis de indicadores en las instituciones educativas!
      </p>
    </div>
  </div>
</template>

<script setup>
// No es necesario código adicional en el script si solo mostramos contenido estático.
</script>

<style scoped>
/* Fondo de la página (miel o café claro) */
.fondo {
  background-color: #f4e7d3; /* Color miel claro */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

/* Contenedor principal */
.about-container {
  max-width: 800px;
  width: 100%;
  padding: 20px;
  background: #ffffff; /* Fondo blanco para la tarjeta */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

/* Título */
.title {
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: #2e7d32; /* Verde oscuro para el título */
  font-weight: bold;
  text-align: center;
}

/* Párrafos */
.about-container p {
  margin-bottom: 15px;
  font-size: 1.1rem;
  color: #555;
}

/* Texto en negrita */
.about-container strong {
  color: #2e7d32; /* Verde oscuro para resaltar */
}
</style>