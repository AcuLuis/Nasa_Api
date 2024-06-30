<template>
    <div>
      <h1 class="titulo">Imágenes random de la NASA</h1>
      <div v-if="apodData.length" class="card-container">
        <div v-for="item in apodData" :key="item.date" class="card">
          <img :src="item.url" :alt="item.title" />
          <div class="card-content">
            <h2>{{ item.title }}</h2>
            <p>{{ item.date }}</p>
            <p>{{ item.explanation }}</p>
            <p v-if="item.copyright">Copyright: {{ item.copyright }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      count: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        apodData: []
      };
    },
    async created() {
      await this.fetchRandomApodData();
    },
    methods: {
      async fetchRandomApodData() {
        try {
          const response = await axios.get('https://api.nasa.gov/planetary/apod', {
            params: {
              api_key: 'VeA5s85uQGj2NSlcPd2pvNaZ0uOTg1AifAb6FmqW',
              count: this.count
            }
          });
          this.apodData = response.data;
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .titulo {
    margin-bottom: 20px;
    font-size: 3.5em;
    font-weight: bold;
    color: #2c3e50;
    text-align: center;
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
    color: #333333;
  }
  </style>
  