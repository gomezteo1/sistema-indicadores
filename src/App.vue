<template>
  <div>
    <header class="header">
      <!-- Menú para móviles (hamburguesa) -->
      <button class="menu-toggle" @click="toggleMenu">
        <span class="hamburger"></span>
      </button>
      
      <!-- Menú de navegación principal -->
      <nav :class="['nav-container', { 'mobile-active': isMenuOpen }]">
        <div class="nav-column">
          <h3 class="nav-title">Menú Principal</h3>
          <ul class="nav-list">
            <li><RouterLink to="/" @click="closeMenu">Home</RouterLink></li>
            <li><RouterLink to="/about" @click="closeMenu">About</RouterLink></li>
            <li><RouterLink to="/frecuencia" @click="closeMenu">Frecuencia</RouterLink></li>
            <li><RouterLink to="/fuente" @click="closeMenu">Fuente</RouterLink></li>
            <li><RouterLink to="/represenvisual" @click="closeMenu">Represen. visual</RouterLink></li>
            <li><RouterLink to="/usuario" @click="closeMenu">Registra Usuario</RouterLink></li>
            <li><RouterLink to="/rol" @click="closeMenu">Rol</RouterLink></li>
          </ul>
        </div>
        
        <div class="nav-column">
          <h3 class="nav-title">Configuraciones</h3>
          <ul class="nav-list">
            <li><RouterLink to="/sentido" @click="closeMenu">Sentido</RouterLink></li>
            <li><RouterLink to="/seccion" @click="closeMenu">Sección</RouterLink></li>
            <li><RouterLink to="/subseccion" @click="closeMenu">SubSección</RouterLink></li>
            <li><RouterLink to="/tipoactor" @click="closeMenu">Tipo Actor</RouterLink></li>
            <li><RouterLink to="/tipoindicador" @click="closeMenu">Tipo Indicador</RouterLink></li>
            <li><RouterLink to="/unidadmedicion" @click="closeMenu">Unidad de Mediciones</RouterLink></li>
          </ul>
        </div>
        
        <div class="nav-column">
          <h3 class="nav-title">Contenido</h3>
          <ul class="nav-list">
            <li><RouterLink to="/actor" @click="closeMenu">Actor</RouterLink></li>
            <li><RouterLink to="/articulo" @click="closeMenu">Articulo</RouterLink></li>
            <li><RouterLink to="/fuentesporindicador" @click="closeMenu">Fuente Por Indicador</RouterLink></li>
            <li><RouterLink to="/indicador" @click="closeMenu">Indicador</RouterLink></li>
            <li><RouterLink to="/literal" @click="closeMenu">Literal</RouterLink></li>
          </ul>
        </div>
        
        <div class="nav-column">
          <h3 class="nav-title">Más Opciones</h3>
          <ul class="nav-list">
            <li><RouterLink to="/numeral" @click="closeMenu">Numeral</RouterLink></li>
            <li><RouterLink to="/paragrafo" @click="closeMenu">Paragrafo</RouterLink></li>
            <li><RouterLink to="/represenvisualporindicador" @click="closeMenu">Represen Visual x Indicador</RouterLink></li>
            <li><RouterLink to="/login" @click="closeMenu">Login</RouterLink></li>
            <li><RouterLink to="/" @click="closeMenu" class="logout">Cerrar Sesión</RouterLink></li>
          </ul>
        </div>
      </nav>
    </header>
    
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style scoped>
/* Estilos base */
.header {
  background-color: #2c3e50;
  padding: 1rem;
  position: relative;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  position: absolute;
  right: 1rem;
  top: 1rem;
  z-index: 1001;
}

.hamburger {
  display: block;
  width: 25px;
  height: 3px;
  background-color: white;
  position: relative;
  transition: all 0.3s ease;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 25px;
  height: 3px;
  background-color: white;
  transition: all 0.3s ease;
}

.hamburger::before {
  top: -8px;
}

.hamburger::after {
  top: 8px;
}

/* Nav container */
.nav-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 0;
}

.nav-column {
  flex: 1;
  min-width: 200px;
  margin-bottom: 1rem;
}

.nav-title {
  color: #ecf0f1;
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #34495e;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list li {
  margin-bottom: 0.5rem;
}

.nav-list li a {
  text-decoration: none;
  color: #bdc3c7;
  display: block;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-list li a:hover {
  background-color: #34495e;
  color: white;
}

.nav-list li a.router-link-active {
  background-color: #3498db;
  color: white;
  font-weight: bold;
}

.logout {
  color: #e74c3c !important;
}

.logout:hover {
  background-color: #e74c3c !important;
  color: white !important;
}

/* Estilos para móviles */
@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }
  
  .nav-container {
    position: fixed;
    top: 0;
    left: -100%;
    width: 80%;
    height: 100vh;
    background-color: #2c3e50;
    flex-direction: column;
    padding: 3rem 1rem 1rem;
    overflow-y: auto;
    transition: left 0.3s ease;
    z-index: 1000;
  }
  
  .nav-container.mobile-active {
    left: 0;
  }
  
  .menu-toggle.active .hamburger {
    background-color: transparent;
  }
  
  .menu-toggle.active .hamburger::before {
    transform: rotate(45deg);
    top: 0;
  }
  
  .menu-toggle.active .hamburger::after {
    transform: rotate(-45deg);
    top: 0;
  }
  
  .nav-column {
    min-width: 100%;
  }
}

/* Estilos para el contenido principal */
main {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>