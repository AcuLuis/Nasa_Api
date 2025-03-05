<template>
  <div class="container">
    <h1 class="titulo">IMÁGEN DEL DÍA</h1>
    <div v-if="apodData.length" class="card-container">
      <div v-for="(item, index) in apodData" :key="index" class="card">
        <img :src="item.url" :alt="item.title" class="card-image" />
        <div class="card-content">
          <h2 class="card-title">{{ item.title }}</h2>
          <p class="card-date">📅 {{ item.date }}</p>
          <p class="card-text">{{ item.explanation }}</p>
          <p v-if="item.copyright" class="card-copyright">
            📷 {{ item.copyright }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Fondo con efecto espacial */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 30px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #0d1b2a, #1b263b, #415a77, #778da9);
  color: white;
}

/* Título principal */
.titulo {
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 2px 2px 10px rgba(255, 255, 255, 0.3);
  margin-bottom: 30px;
  font-family: Georgia, "Times New Roman", Times, serif;
}

/* Contenedor de tarjetas */
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
}

/* Tarjetas */
.card {
  width: 640px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 12px 24px rgba(255, 255, 255, 0.4);
}

/* Imagen de la tarjeta */
.card-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
}

/* Contenido de la tarjeta */
.card-content {
  padding: 20px;
  text-align: left;
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 8px;
  font-weight: bold;
  color: #fff;
}

.card-date {
  font-size: 1rem;
  color: #ffcc00;
  margin-bottom: 5px;
}

.card-text {
  font-size: 1rem;
  line-height: 1.5;
  color: #e0e0e0;
  margin-bottom: 10px;
}

.card-copyright {
  font-size: 0.9rem;
  font-style: italic;
  color: #ffcc00;
  text-align: right;
}
</style>

<script>
import axios from "axios";

export default {
  props: {
    start: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      apodData: [],
    };
  },
  mounted() {
    this.fetchApodData();
  },
  methods: {
    async fetchApodData() {
      try {
        const params = {
          api_key: "VeA5s85uQGj2NSlcPd2pvNaZ0uOTg1AifAb6FmqW",
        };

        if (this.start && this.end) {
          params.start_date = this.start;
          params.end_date = this.start;
        }

        const response = await axios.get(
          "https://api.nasa.gov/planetary/apod",
          { params }
        );

        if (Array.isArray(response.data)) {
          this.apodData = response.data;
        } else {
          this.apodData = [response.data];
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
