<template>
  <div>
    <header>
      <nav>
        <!-- Mobile menu button -->
        <div class="mobile-menu-btn" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <!-- Navigation lists -->
        <div class="nav-container" :class="{ 'active': menuOpen }">
          <ul class="nav-list">
            <li><RouterLink to="/" @click="closeMenu">Home</RouterLink></li>
            <li><RouterLink to="/about" @click="closeMenu">About</RouterLink></li>
            <li><RouterLink to="/frecuencia" @click="closeMenu">Frecuencia</RouterLink></li>
            <li><RouterLink to="/fuente" @click="closeMenu">Fuente</RouterLink></li>
            <li><RouterLink to="/represenvisual" @click="closeMenu">Represen. visual</RouterLink></li>
            <li><RouterLink to="/usuario" @click="closeMenu">Registra Usuario</RouterLink></li>
            <li><RouterLink to="/rol" @click="closeMenu">Rol</RouterLink></li>
            <li><RouterLink to="/sentido" @click="closeMenu">Sentido</RouterLink></li>
            <li><RouterLink to="/seccion" @click="closeMenu">Sección</RouterLink></li>
            <li><RouterLink to="/subseccion" @click="closeMenu">SubSección</RouterLink></li>
            <li><RouterLink to="/tipoactor" @click="closeMenu">Tipo Actor</RouterLink></li>
            <li><RouterLink to="/tipoindicador" @click="closeMenu">Tipo Indicador</RouterLink></li>
            <li><RouterLink to="/unidadmedicion" @click="closeMenu">Unidad de Mediciones</RouterLink></li>
            <li><RouterLink to="/login" @click="closeMenu">Login</RouterLink></li>
          </ul>
        
          <ul class="nav-list">
            <li><RouterLink to="/actor" @click="closeMenu">Actor</RouterLink></li>
            <li><RouterLink to="/articulo" @click="closeMenu">Articulo</RouterLink></li>
            <li><RouterLink to="/fuentesporindicador" @click="closeMenu">Fuente Por Indicador</RouterLink></li>
            <li><RouterLink to="/indicador" @click="closeMenu">Indicador</RouterLink></li>
            <li><RouterLink to="/literal" @click="closeMenu">Literal</RouterLink></li>
            <li><RouterLink to="/numeral" @click="closeMenu">Numeral</RouterLink></li>
            <li><RouterLink to="/paragrafo" @click="closeMenu">Paragrafo</RouterLink></li>
            <li><RouterLink to="/represenvisualporindicador" @click="closeMenu">Represen Visu x Indicador</RouterLink></li>
            <li><RouterLink to="/responsablesporindicador" @click="closeMenu">Responsable Por Indicador</RouterLink></li>
            <li><RouterLink to="/resultadoindicador" @click="closeMenu">Resultado Indicador</RouterLink></li>
            <li><RouterLink to="/rol_usuario" @click="closeMenu">Rol Usuario</RouterLink></li>
            <li><RouterLink to="/#" @click="closeMenu">#</RouterLink></li>
            <li><RouterLink to="/#" @click="closeMenu">#</RouterLink></li>
            <li><RouterLink to="/#" @click="closeMenu">Cerrar Sesion</RouterLink></li>
          </ul>
        </div>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    }
  }
}
</script>

<style scoped>
/* Base styles */
.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list li a {
  text-decoration: none;
  color: #333;
  display: block;
  padding: 10px 15px;
}

.nav-list li a.router-link-active {
  font-weight: bold;
  color: #4caf50;
}

a:hover {
  background-color: aquamarine;
}

/* Desktop styles */
@media (min-width: 769px) {
  .mobile-menu-btn {
    display: none;
  }
  
  .nav-container {
    display: flex;
    gap: 20px;
  }
  
  .nav-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
}

/* Mobile styles */
@media (max-width: 768px) {
  .mobile-menu-btn {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 24px;
    width: 30px;
    cursor: pointer;
    padding: 20px;
    margin-left: auto;
  }
  
  .mobile-menu-btn span {
    display: block;
    height: 3px;
    width: 100%;
    background-color: #333;
    transition: all 0.3s ease;
  }
  
  .nav-container {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }
  
  .nav-container.active {
    max-height: 1000px; /* Adjust based on your content */
  }
  
  .nav-list {
    flex-direction: column;
  }
  
  .nav-list li {
    border-bottom: 1px solid #eee;
  }
}
</style>