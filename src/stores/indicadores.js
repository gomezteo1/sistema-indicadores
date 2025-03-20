import { reactive } from 'vue';
export const useIndicadoresStore = () => {
    return {
      indicadores: [],
      addIndicador(nombre, valor) {
        this.indicadores.push({ id: Date.now(), nombre, valor });
      },
      deleteIndicador(id) {
        this.indicadores = this.indicadores.filter(i => i.id !== id);
      },
      updateIndicador(id, nombre, valor) {
        const indicador = this.indicadores.find(i => i.id === id);
        if (indicador) {
          indicador.nombre = nombre;
          indicador.valor = valor;
        }
      },
    };
  };

export const indicadoresStore = reactive({
  indicadores: [],
  addIndicador(indicador) {
    this.indicadores.push(indicador);
  }
});