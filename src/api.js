import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5171/api', // URL base del backend
  headers: {
    'Content-Type': 'application/json',
  },
});

//Subsecion
export const getSubsecciones = () => api.get('/subseccion');
export const createSubseccion = (data) => api.post('/subseccion', data);
export const updateSubseccion = (id, data) => api.put(`/subseccion/${id}`, data);
export const deleteSubseccion = (id) => api.delete(`/subseccion/${id}`);

//Seccion
export const getSecciones = () => api.get('/seccion');
export const createSeccion = (data) => api.post('/seccion', data);
export const updateSeccion = (id, data) => api.put(`/seccion/${id}`, data);
export const deleteSeccion = (id) => api.delete(`/seccion/${id}`);

//Tipo Actor
export const getTipoActores = () => api.get('/tipoactor');
export const createTipoActor = (data) => api.post('/tipoactor', data);
export const updateTipoActor = (id, data) => api.put(`/tipoactor/${id}`, data);
export const deleteTipoActor = (id) => api.delete(`/tipoactor/${id}`);

// Funciones para TipoIndicador
export const getTipoIndicadores = () => api.get('/tipoindicador');
export const createTipoIndicador = (data) => api.post('/tipoindicador', data);
export const updateTipoIndicador = (id, data) => api.put(`/tipoindicador/${id}`, data);
export const deleteTipoIndicador = (id) => api.delete(`/tipoindicador/${id}`);

//unidad medicion
export const getUnidadMediciones = () => api.get('/unidadmedicion');
export const createUnidadMedicion = (data) => api.post('/unidadmedicion', data);
export const updateUnidadMedicion = (id, data) => api.put(`/unidadmedicion/${id}`, data);
export const deleteUnidadMedicion = (id) => api.delete(`/unidadmedicion/${id}`);

//Usuario
export const getUsuarios = () => api.get('/usuario');
export const createUsuario = (data) => api.post('/usuario', data);
export const updateUsuario = (email, data) => api.put(`/usuario/${email}`, data);
export const deleteUsuario = (email) => api.delete(`/usuario/${email}`);
export const login = (email, contrasena)=>api.api.get(`login/${email,contrasena}`);

//Sentido
export const getSentidos = () => api.get('/sentido');
export const createSentido = (data) => axios.post('/sentido', data);
export const updateSentido = (id, data) => axios.put(`${'/sentido'}/${id}`, data);
export const deleteSentido = (id) => axios.delete(`${'/sentido'}/${id}`);

//Frecuencia
export const getFrecuencias = () => api.get('/frecuencia');
export const createFrecuencia = (data) => axios.post('/frecuencia', data);
export const updateFrecuencia = (id, data) => axios.put(`${'/frecuencia'}/${id}`, data);
export const deleteFrecuencia = (id) => axios.delete(`${'/frecuencia'}/${id}`);

//Rol
export const getRoles = () => api.get('/rol');
export const createRol = (data) => api.post('/rol', data);
export const updateRol = (id, data) => api.put(`/rol/${id}`, data);
export const deleteRol = (id) => api.delete(`/rol/${id}`);

//Fuente
export const getFuentes = () => api.get('/fuente');
export const createFuente = (data) => api.post('/fuente', data);
export const updateFuente = (id, data) => api.put(`/fuente/${id}`, data);
export const deleteFuente = (id) => api.delete(`/fuente/${id}`);

//Rvisual
export const getRepresenVisuales = () => api.get('/represenvisual');
export const createRepresenVisual = (data) => api.post('/represenvisual', data);
export const updateRepresenVisual = (id, data) => api.put(`/represenvisual/${id}`, data);
export const deleteRepresenVisual = (id) => api.delete(`/represenvisual/${id}`);

//Actor
export const getActores = () => api.get('/actor');
export const createActor = (data) => api.post('/actor', data);
export const updateActor = (id, data) => api.put(`/actor/${id}`, data);
export const deleteActor = (id) => api.delete(`/actor/${id}`);
export const getAbout= () => api.get('/about');

//Articulo
export const getArticulos = () => api.get('/articulo');
export const createArticulo = (data) => api.post('/articulo', data);
export const updateArticulo = (id, data) => api.put(`/articulo/${id}`, data);
export const deleteArticulo = (id) => api.delete(`/articulo/${id}`);

//FuentesPorIndicador
export const getFuentesPorIndicadores = () => api.get('/fuentesporindicador');
export const createFuentePorIndicador = (data) => api.post('/fuentesporindicador', data);
export const updateFuentePorIndicador = (id, data) => api.put(`/fuentesporindicador/${id}`, data);
export const deleteFuentePorIndicador = (id) => api.delete(`/fuentesporindicador/${id}`);

//Literal
export const getLiterales = () => api.get('/literal');
export const createLiteral = (data) => api.post('/literal', data);
export const updateLiteral = (id, data) => api.put(`/literal/${id}`, data);
export const deleteLiteral = (id) => api.delete(`/literal/${id}`);

//Numeral
export const getNumerales = () => api.get('/numeral');
export const createNumeral = (data) => api.post('/numeral', data);
export const updateNumeral = (id, data) => api.put(`/numeral/${id}`, data);
export const deleteNumeral = (id) => api.delete(`/numeral/${id}`);

//Paragrafo
export const getParagrafos = () => api.get('/paragrafo');
export const createParagrafo = (data) => api.post('/paragrafo', data);
export const updateParagrafo = (id, data) => api.put(`/paragrafo/${id}`, data);
export const deleteParagrafo = (id) => api.delete(`/paragrafo/${id}`);

//Indicador
export const getIndicadores = () => api.get('/indicador');
export const createIndicador = (data) => api.post('/indicador', data);
export const updateIndicador = (id, data) => api.put(`/indicador/${id}`, data);
export const deleteIndicador = (id) => api.delete(`/indicador/${id}`);

// Funciones CRUD Indicdor en progreso
export const obtenerIndicadores = () => api.get('/indicadores');
export const crearIndicador = (data) => api.post('/indicadores', data);
export const actualizarIndicador = (id, data) => api.put(`/indicadores/${id}`, data);
export const eliminarIndicador = (id) => api.delete(`/indicadores/${id}`);


//represenvisualporindicador
export const getRepresenVisualesPorIndicadores = () => api.get('/represenvisualporindicador');
export const createRepresenVisualPorIndicador = (data) => api.post('/represenvisualporindicador', data);
export const updateRepresenVisualesPorIndicador = (id, data) => api.put(`/represenvisualporindicador/${id}`, data);
export const deleteRepresenVisualesPorIndicador = (id) => api.delete(`/represenvisualporindicador/${id}`);

//responsablesporindicador
export const getResponsablesPorIndicadores = () => api.get('/responsablesporindicador');
export const createResponsablesPorIndicador = (data) => api.post('/responsablesporindicador', data);
export const deleteResponsablesPorindicador = (ids) => api.delete(`/responsablesporindicador/${ids}`);
export const updateResponsablesPorindicador = (id, data) => api.put(`/responsablesporindicador/${id}`, data);

//ResultadoIndicador
export const getResultadosIndicadores = () => api.get('/resultadoindicador');
export const createResultadoIndicador = (data) => api.post('/resultadoindicador', data);
export const deleteResultadoIndicador = (ids) => api.delete(`/resultadoindicador/${ids}`);
export const updateResultadoIndicador = (id, data) => api.put(`/resultadoindicador/${id}`, data);

export default api;
