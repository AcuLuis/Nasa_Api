<template>
  <div class="contenia">
    <h1 class="titulo">Imágenes de Nasa desde {{ start }} hasta {{ end }}</h1>
    <div v-if="apodData.length" class="card-container">
      <div v-for="(item, index) in apodData" :key="index" class="card">
        <img :src="item.url" :alt="item.title" />
        <div class="card-content">
          <h2>{{ item.title }}</h2>
          <p>{{ item.date }}</p>
          <p>{{ item.explanation }}</p>
          <p v-if="item.copyrigh">{{ item.copyrigh }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    start: {
      type: String,
      default: null
    },
    end: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      apodData: []
    };
  },
  mounted() {
    this.fetchApodData();
  },
  methods: {
    async fetchApodData() {
      try {
        const params = {
          api_key: 'VeA5s85uQGj2NSlcPd2pvNaZ0uOTg1AifAb6FmqW'
        };

        if (this.start && this.end) {
          params.start_date = this.start;
          params.end_date = this.end;
        }

        const response = await axios.get('https://api.nasa.gov/planetary/apod', { params });

        if (Array.isArray(response.data)) {
          this.apodData = response.data;
        } else {
          this.apodData = [response.data];
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.contenia {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 20px;
}

.titulo {
  margin-bottom: 20px;
  font-size: 3.5em;
  font-weight: bold;
  color: #2c3e50;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.card {
  width: 300px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #a1cdff;
  overflow: hidden;
}

.card img {
  width: 100%;
  height: auto;
  border-radius: 10px 10px 0 0;
}

.card-content {
  padding: 15px;
  text-align: left;
}

.card-content h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.card-content p {
  font-size: 1em;
  line-height: 1.6;
  margin-bottom: 10px;
  color: #333;
}
</style>
  