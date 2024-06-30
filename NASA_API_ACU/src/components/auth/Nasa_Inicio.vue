<template>
  <div class="container">
    <h1 class="titulo">Nasa Imágenes</h1>
    <q-input filled v-model="fechaInicio" label="Fecha Inicio" type="date" />
    <q-input filled v-model="fechaFin" label="Fecha Fin" type="date" />
    <q-btn class="blue-btn" label="Imagen del Día" @click="deldia" />
    <q-btn label="Solicitar por Rango" @click="emitirFechas" />
    <q-btn label="Limpiar" @click="limpiar" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      fechaInicio: '',
      fechaFin: '',
    };
  },
  methods: {
    emitirFechas() {
      if (this.fechaInicio && this.fechaFin) {
        this.$router.push({
          path: '/CARDS',
          query: {
            start: this.fechaInicio,
            end: this.fechaFin
          }
        });
      } else {
        alert('Por favor, ingrese ambas fechas.');
      }
    },
    limpiar() {
      this.fechaInicio = '';
      this.fechaFin = '';
    },
    deldia() {
      const fechaActual = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato YYYY-MM-DD
      this.$router.push({
        path: '/CARDS',
        query: {
          date: fechaActual
        }
      });
    }
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}
.titulo {
  margin-bottom: 20px;
  font-size: 3.5em;
  font-weight: bold;
  color: #2c3e50;
}
.q-input {
  margin-bottom: 10px;
  width: 300px;
}
.q-btn {
  margin-bottom: 10px;
  width: 150px;
}
.blue-btn {
  background-color: blue;
  color: white;
}
</style>
