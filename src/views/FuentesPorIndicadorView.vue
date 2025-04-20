<template>
    <div class="fondo">
      <div class="container">
        <h1 class="title">Fuentes por Indicador</h1>
        <p class="subtitle">Relaciona fuentes con indicadores fácilmente.</p>
  
        <form @submit.prevent="guardar">
          <label for="fuente">Fuente:</label>
          <select v-model="nuevo.FkIdFuente" required>
            <option disabled value="">Seleccione una fuente</option>
            <option v-for="f in fuentes" :key="f.id" :value="f.id">
              {{ f.nombre }}
            </option>
          </select>
  
          <label for="indicador">Indicador:</label>
          <select v-model="nuevo.FkIdIndicador" required>
            <option disabled value="">Seleccione un indicador</option>
            <option v-for="i in indicadores" :key="i.id" :value="i.id">
              {{ i.nombre }}
            </option>
          </select>
  
          <button class="btn btn-primary" type="submit">Agregar Relación</button>
        </form>
  
        <table class="table">
          <thead>
            <tr>
              <th>Fuente</th>
              <th>Indicador</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in relaciones" :key="`${item.fkIdFuente}-${item.fkIdIndicador}`">
              <td>{{ obtenerNombreFuente(item.fkIdFuente) }}</td>
              <td>{{ obtenerNombreIndicador(item.fkIdIndicador) }}</td>
              <td>
                <button class="btn btn-danger" @click="eliminar(item.fkIdFuente, item.fkIdIndicador)">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        relaciones: [],
        fuentes: [],
        indicadores: [],
        nuevo: {
          FkIdFuente: '',
          FkIdIndicador: ''
        }
      };
    },
    methods: {
      async cargarDatos() {
        try {
          const [relResp, fuenteResp, indResp] = await Promise.all([
            axios.get('https://localhost:7222/api/fuentesporindicador'),
            axios.get('https://localhost:7222/api/fuente'),
            axios.get('https://localhost:7222/api/indicador')
          ]);
          this.relaciones = relResp.data;
          this.fuentes = fuenteResp.data;
          this.indicadores = indResp.data;
        } catch (error) {
          console.error('Error al cargar los datos:', error);
        }
      },
      obtenerNombreFuente(id) {
        const f = this.fuentes.find(f => f.id === id);
        return f ? f.nombre : 'Desconocido';
      },
      obtenerNombreIndicador(id) {
        const i = this.indicadores.find(i => i.id === id);
        return i ? i.nombre : 'Desconocido';
      },
      async guardar() {
        try {
          await axios.post('https://localhost:7222/api/fuentesporindicador', this.nuevo);
          this.nuevo = { FkIdFuente: '', FkIdIndicador: '' };
          await this.cargarDatos();
        } catch (error) {
          console.error('Error al guardar la relación:', error);
        }
      },
      async eliminar(fuenteId, indicadorId) {
        try {
          await axios.delete(`https://localhost:7222/api/fuentesporindicador/${fuenteId}/${indicadorId}`);
          await this.cargarDatos();
        } catch (error) {
          console.error('Error al eliminar relación:', error);
        }
      }
    },
    mounted() {
      this.cargarDatos();
    }
  };
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
  