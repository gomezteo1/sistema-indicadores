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
          <ul class="nav-list"><h3>Sin Dependencias</h3>
            <li><RouterLink to="/" @click="closeMenu">Inicio</RouterLink></li>
            <li><RouterLink to="/about" @click="closeMenu">About</RouterLink></li>
            <li><RouterLink to="/login" @click="closeMenu">Login</RouterLink></li>

            <!-- Cerramos sesión con el método -->
            <li><a href="#" @click.prevent="cerrarSesion">Cerrar Sesión</a></li>

            <li><RouterLink to="/frecuencia" @click="closeMenu">Frecuencia</RouterLink></li>
            <li><RouterLink to="/fuente" @click="closeMenu">Fuente</RouterLink></li>
            <li><RouterLink to="/represenvisual" @click="closeMenu">Represen. visual</RouterLink></li>
            <li><RouterLink to="/usuario" @click="closeMenu">Usuario</RouterLink></li>
            <li><RouterLink to="/rol" @click="closeMenu">Rol</RouterLink></li>
            <li><RouterLink to="/sentido" @click="closeMenu">Sentido</RouterLink></li>
            <li><RouterLink to="/seccion" @click="closeMenu">Sección</RouterLink></li>
            <li><RouterLink to="/subseccion" @click="closeMenu">SubSección</RouterLink></li>
            <li><RouterLink to="/tipoactor" @click="closeMenu">Tipo Actor</RouterLink></li>
            <li><RouterLink to="/tipoindicador" @click="closeMenu">Tipo Indicador</RouterLink></li>
            <li><RouterLink to="/unidadmedicion" @click="closeMenu">Unidad de Mediciones</RouterLink></li>
          </ul>
         
          <ul v-if="esAdmin" class="nav-list">
            <h3>Con Dependencias</h3>
            <li><RouterLink to="/actor" @click="closeMenu">Actores</RouterLink></li>
            <li><RouterLink to="/fuentesporindicador" @click="closeMenu">Fuente Por Indicador</RouterLink></li>
            <li><RouterLink to="/indicador" @click="closeMenu">Indicador</RouterLink></li>
            <li><RouterLink to="/represenvisualporindicador" @click="closeMenu">Represen Visu por Indicador</RouterLink></li>
            <li><RouterLink to="/responsablesporindicador" @click="closeMenu">Responsable por Indicador</RouterLink></li>
            <li><RouterLink to="/resultadoindicador" @click="closeMenu">Resultado Indicador</RouterLink></li>
            <li><RouterLink to="/rolusuario" @click="closeMenu">Rol Usuario</RouterLink></li>
            <li><RouterLink to="/variable" @click="closeMenu">Variable</RouterLink></li>
            <li><RouterLink to="/variableporindicador" @click="closeMenu">Variable por Indicador</RouterLink></li>
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
      menuOpen: false,
      esAdmin: false
    }
  },
  mounted() {
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');

    console.log('Token:', token);
    console.log('Rol:', rol);

    this.esAdmin = token && rol == "1";
    console.log('esAdmin después de la actualización:', this.esAdmin);
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
    cerrarSesion() {
      // Limpiar localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('rol');

      // Reset admin flag
      this.esAdmin = false;

      // Cerrar menú móvil
      this.menuOpen = false;

      // Redirigir al login
      this.$router.push('/login');
    }
  }
};
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
h3{
  background-color: aquamarine;
  text-decoration: dotted;
  border-radius: 50%;
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