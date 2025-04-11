<template>
  <div>
    <header>
      <nav>
        <ul class="nav-list">
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/about">About</RouterLink></li>
          <li><RouterLink to="/frecuencia">Frecuencia</RouterLink></li>
          <li><RouterLink to="/fuente">Fuente</RouterLink></li>
          <li><RouterLink to="/represenvisual">Represen. visual</RouterLink></li>
          <li><RouterLink to="/usuario">Registra Usuario</RouterLink></li>
          <li><RouterLink to="/rol">Rol</RouterLink></li>
          <li><RouterLink to="/sentido">Sentido</RouterLink></li>
          <li><RouterLink to="/seccion">Sección</RouterLink></li>
          <li><RouterLink to="/subseccion">SubSección</RouterLink></li>
          <li><RouterLink to="/tipoactor">Tipo Actor</RouterLink></li>
          <li><RouterLink to="/tipoindicador">Tipo Indicador</RouterLink></li>
          <li><RouterLink to="/unidadmedicion">Unidad de Mediciones</RouterLink></li>
          <li><RouterLink to="/login">Login</RouterLink></li>
        </ul>
      
        <ul class="nav-list">
          <li><RouterLink to="/actor">Actor</RouterLink></li>
          <li><RouterLink to="/#">#</RouterLink></li>
          <li><RouterLink to="/#">#</RouterLink></li>
          <li><RouterLink to="/#">#</RouterLink></li>
          <li><RouterLink to="/#">#</RouterLink></li>
          <li><RouterLink to="/#">#</RouterLink></li>
          <li><RouterLink to="/#">#</RouterLink></li>
          <li><RouterLink to="/#">#</RouterLink></li>
          <li><RouterLink to="/#">#</RouterLink></li>
          <li><RouterLink to="/#">#</RouterLink></li>
          <li><RouterLink to="/#">#</RouterLink></li>
          <li><RouterLink to="/#">#</RouterLink></li>
          <li><RouterLink to="/#">#</RouterLink></li>
          <li><RouterLink to="/#">Cerrar Sesion</RouterLink></li>
        </ul>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.nav-list {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-list li a {
  text-decoration: none;
  color: #333;
}

.nav-list li a.router-link-active {
  font-weight: bold;
  color: #4caf50;
}

a:hover{
  background-color: aquamarine;
}



</style>
 