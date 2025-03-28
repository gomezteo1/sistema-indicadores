import { createRouter, createWebHistory } from 'vue-router';

// Importar vistas
import AboutView from '@/views/AboutView.vue';
import HomeView from '@/views/HomeView.vue';

// ############## ->No dependen de otras tablas 
import SeccionView from '@/views/SeccionView.vue';
import SubSeccionView from '@/views/SubSeccionView.vue';
import TipoActorView from '@/views/TipoActorView.vue';
import TipoIndicadorView from '@/views/TipoIndicadorView.vue';
import UnidadMedicionView from '@/views/UnidadMedicionView.vue';
import UsuariosView from '@/views/UsuariosView.vue';
import LoginView from '@/views/LoginView.vue';
import SentidoView from '@/views/SentidoView.vue';
import FrecuenciaView from '@/views/FrecuenciaView.vue';
import RolView from '@/views/RolView.vue';
import FuenteView from '@/views/FuenteView.vue';
import RepresenVisualView from '@/views/RepresenVisualView.vue';

//## Si dependen de otras tablas ##

import IndicadoresView from '@/views/IndicadoresView.vue';
import ReportesView from '@/views/ReportesView.vue';
import ConfiguracionView from '@/views/ConfiguracionView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/subseccion', component: SubSeccionView},
  { path: '/seccion', component: SeccionView},
  { path: '/tipoactor', component: TipoActorView },
  { path: '/tipoindicador', component: TipoIndicadorView },
  { path: '/unidadmedicion', component: UnidadMedicionView },
  { path: '/usuario', component: UsuariosView },
  { path: '/fuente', component: FuenteView },
  { path: '/rol', component: RolView },
  { path: '/login', component: LoginView },
  { path: '/sentido', component: SentidoView },
  { path: '/frecuencia', component: FrecuenciaView },
  { path: '/indicadores', component: IndicadoresView },
  { path: '/represenvisual', component: RepresenVisualView },
  { path: '/reportes', component: ReportesView },
  
  { path: '/configuracion', component: ConfiguracionView },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
