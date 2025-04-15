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
  /* puedes reutilizar tus estilos de la vista de actores o frecuencias aquí */
  </style>
  