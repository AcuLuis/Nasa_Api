<template>
  <div class="container">
    <h1 class="titulo">NASA IMÁGENES</h1>
    <div class="contenedor">
      <!-- Sección de entradas -->
      <div class="entradas">
        <q-input
          filled
          v-model="fechaInicio"
          label="Fecha Inicio"
          type="date"
          class="input-box"
        />
        <q-input
          filled
          v-model="fechaFin"
          label="Fecha Fin"
          type="date"
          class="input-box"
        />
        <q-input
          v-model="numeroImagenes"
          label="Número de Imágenes (opcional)"
          type="number"
          class="input-box"
        />
      </div>

      <!-- Sección de botones -->
      <div class="boton_opciones">
        <q-btn class="blue-btn" label="Imagen del Día" @click="deldia" />
        <q-btn
          class="white-btn"
          label="Solicitar por Rango"
          @click="emitirFechas"
        />
        <q-btn
          class="white-btn"
          label="Imágenes Aleatorias"
          @click="obtenerImagenesAleatorias"
        />
        <q-btn class="red-btn" label="Limpiar" @click="limpiar" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-image: url("src/components/images/espacio_exterior.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  padding: 20px;
}

/* Título */
.titulo {
  font-size: 3rem;
  font-weight: bold;
  font-family: Georgia, "Times New Roman", Times, serif;
  text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.7);
  margin-bottom: 20px;
}

/* Contenedor de inputs y botones */
.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 500px;
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
}

/* Inputs */
.entradas {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

.input-box {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  width: 100%;
}

/* Botones */
.boton_opciones {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  align-items: center;
}

.q-btn {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
}

/* Estilos individuales para los botones */
.blue-btn {
  background-color: #007bff;
  color: white;
}
.blue-btn:hover {
  background-color: #0056b3;
}

.white-btn {
  background-color: white;
  color: #333;
}
.white-btn:hover {
  background-color: #ddd;
}

.red-btn {
  background-color: #ff4444;
  color: white;
}
.red-btn:hover {
  background-color: #cc0000;
}
</style>

<script>
export default {
  data() {
    return {
      fechaInicio: "",
      fechaFin: "",
      numeroImagenes: null,
    };
  },
  methods: {
    emitirFechas() {
      if (this.fechaInicio && this.fechaFin) {
        if (this.fechaInicio <= this.fechaFin) {
          const fechaActual = new Date().toISOString().split("T")[0];
          if (
            this.fechaInicio > fechaActual &&
            this.fechaFin > this.fechaInicio
          ) {
            alert("Logica Incorrecta");
          } else {
            this.$router.push({
              path: "/CARDS",
              query: {
                start: this.fechaInicio,
                end: this.fechaFin,
              },
            });
          }
        } else {
          alert("Fechas Incorrectas");
        }
      } else {
        alert("Por favor, ingrese ambas fechas.");
      }
    },
    limpiar() {
      this.fechaInicio = "";
      this.fechaFin = "";
      this.numeroImagenes = null;
    },
    deldia() {
      const fechaActual = new Date().toISOString().split("T")[0];
      this.$router.push({
        path: "/delDia",
        query: {
          date: fechaActual,
        },
      });
    },
    obtenerImagenesAleatorias() {
      if (this.numeroImagenes) {
        this.$router.push({
          path: "/RANDOM",
          query: {
            count: this.numeroImagenes,
          },
        });
      } else {
        alert("Por favor, ingrese el número de imágenes.");
      }
    },
  },
};
</script>
