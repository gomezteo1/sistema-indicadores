<template>
    <div class="fondo">
      <div class="container">
        <h1 class="title">Gestión de Resultados de Indicadores</h1>
        <p class="subtitle">Administra los resultados calculados para los indicadores.</p>
  
        <form @submit.prevent="guardar" class="form-group">
          <label>Indicador</label>
          <select v-model="nuevo.fkIdIndicador" required>
            <option disabled value="">Selecciona un indicador</option>
            <option v-for="i in indicadores" :key="i.id" :value="i.id">
              {{ i.nombre }}
            </option>
          </select>
  
          <label>Resultado</label>
          <input v-model.number="nuevo.resultado" type="number" step="0.01" placeholder="Resultado" required />
  
          <label>Fecha de Cálculo</label>
          <input v-model="nuevo.fechaCalculo" type="datetime-local" required />
  
          <button class="btn btn-primary" type="submit">
            {{ editando ? 'Actualizar' : 'Agregar' }}
          </button>
          <button v-if="editando" type="button" class="btn btn-secondary" @click="cancelarEdicion">
            Cancelar
          </button>
        </form>
  
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Indicador</th>
              <th>Resultado</th>
              <th>Fecha de Cálculo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in resultados" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ obtenerNombreIndicador(item.fkIdIndicador) }}</td>
              <td>{{ item.resultado }}</td>
              <td>{{ formatFecha(item.fechaCalculo) }}</td>
              <td>
                <button class="btn btn-warning" @click="editar(item)">Editar</button>
                <button class="btn btn-danger" @click="eliminar(item.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import {
    getResultadosIndicadores,
    createResultadoIndicador,
    updateResultadoIndicador,
    deleteResultadoIndicador,
    getIndicadores
  } from '@/api.js';
  
  const resultados = ref([]);
  const indicadores = ref([]);
  //const idAnterior = ref(null);
  
  const nuevo = ref({
    fkIdIndicador: '',
    resultado: 0,
    fechaCalculo: ''
  });
  
  const editando = ref(false);
  const idEditando = ref(null);
  
  const cargarDatos = async () => {
    resultados.value = (await getResultadosIndicadores()).data;
    indicadores.value = (await getIndicadores()).data;
  };
  
  const guardar = async () => {
  const data = { ...nuevo.value };

  if (!data.fechaCalculo.includes('T')) {
    alert('Formato de fecha inválido');
    return;
  }

  try {
    if (editando.value) {
      // Incluir el ID explícitamente en el cuerpo
      data.id = idEditando.value;
      await updateResultadoIndicador(idEditando.value, data);
    } else {
      await createResultadoIndicador(data);
    }
    cancelarEdicion();
    await cargarDatos();
  } catch (e) {
    console.error('Error al guardar:', e.response?.data || e);
  }
};

  
  const editar = (item) => {
    editando.value = true;
    idEditando.value = item.id;
    nuevo.value = {
      fkIdIndicador: item.fkIdIndicador,
      resultado: item.resultado,
      fechaCalculo: item.fechaCalculo.slice(0, 16) // para datetime-local
    };
  };
  
  const cancelarEdicion = () => {
    editando.value = false;
    idEditando.value = null;
    nuevo.value = { fkIdIndicador: '', resultado: 0, fechaCalculo: '' };
  };
  
  const eliminar = async (id) => {
    if (confirm('¿Estás seguro de eliminar este resultado?')) {
      await deleteResultadoIndicador(id);
      await cargarDatos();
    }
  };
  
  const obtenerNombreIndicador = (id) => {
    const ind = indicadores.value.find(i => i.id === id);
    return ind ? ind.nombre : id;
  };
  
  const formatFecha = (fecha) => new Date(fecha).toLocaleString();
  
  onMounted(cargarDatos);
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

/* Tarjeta principal */
.container {
  max-width: 1000px;
  width: 100%;
  padding: 20px;
  background: #ffffff; /* Fondo blanco para la tarjeta */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #2e7d32; /* Verde oscuro para el título */
  font-weight: bold;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #555;
}

/* Formulario */
.form-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.form-control {
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: #2e7d32; /* Verde oscuro al enfocar */
  outline: none;
}

/* Botones */
.btn {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #4caf50; /* Verde */
  color: white;
}

.btn-primary:hover {
  background-color: #388e3c; /* Verde más oscuro al pasar el mouse */
}

.btn-cancel {
  background-color: #757575; /* Gris para cancelar */
  color: white;
}

.btn-cancel:hover {
  background-color: #616161; /* Gris más oscuro al pasar el mouse */
}

.btn-warning {
  background-color: #ffa000; /* Amarillo cálido */
  color: white;
}

.btn-warning:hover {
  background-color: #ff8f00; /* Amarillo más oscuro al pasar el mouse */
}

.btn-success {
  background-color: #2e7d32; /* Verde oscuro */
  color: white;
}

.btn-success:hover {
  background-color: #1b5e20; /* Verde más oscuro al pasar el mouse */
}

.btn-danger {
  background-color: #d32f2f; /* Rojo */
  color: white;
}

.btn-danger:hover {
  background-color: #c62828; /* Rojo más oscuro al pasar el mouse */
}

/* Tabla */
.table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.table th,
.table td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #4caf50; /* Verde para el encabezado */
  color: white;
  font-weight: bold;
}

.table td {
  text-align: center;
}

.table tr:hover {
  background-color: #f5f5f5; /* Fondo gris claro al pasar el mouse */
}
</style>
  