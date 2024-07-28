<template>
  <div class="advertisements">
    <div class="advertisement">
      <h4>Pachamamabike</h4>
      <div class="image-carousel">
        <img :src="currentImage1" alt="Bicicleta de prueba">
      </div>
      <p>¡Descuento especial!</p>
    </div>

    <div class="advertisement">
      <h4>Leira Bike</h4>
      <div class="image-carousel">
        <img :src="currentImage2" alt="Bicicleta de prueba">
      </div>
      <p>¡Oferta exclusiva!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Advertisement',
  data() {
    return {
      images1: [
        'https://acdn.mitiendanube.com/stores/001/177/160/products/diseno-sin-titulo-1-3c804cffb08df997c517053282836088-1024-1024.jpg',
        'https://acdn.mitiendanube.com/stores/001/177/160/products/diseno-sin-titulo-1-1fbdcc48044c5263fc17013003845008-1024-1024.jpg',
        'https://acdn.mitiendanube.com/stores/001/177/160/products/diseno-sin-titulo-3-1-10f84a84e4eae4c3ab4684e7a781-1024-1024.jpg'
      ],
      images2: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQuGIZUOKlFJrBca2cGNn6lSYkFvXxd6nUcA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT25AOKuN0VkrbIjkMlIELatYiEifChtfQl4Q&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVe6Gmn-dbKef8fo-gui52W7lWoC6wVLaCQ&s'
      ],
      currentImageIndex1: 0,
      currentImageIndex2: 0,
      intervalId1: null,
      intervalId2: null
    };
  },
  computed: {
    currentImage1() {
      return this.images1[this.currentImageIndex1];
    },
    currentImage2() {
      return this.images2[this.currentImageIndex2];
    }
  },
  methods: {
    startCarousel1() {
      this.intervalId1 = setInterval(() => {
        this.currentImageIndex1 = (this.currentImageIndex1 + 1) % this.images1.length;
      }, 3000); // Cambia la imagen cada 3 segundos
    },
    startCarousel2() {
      this.intervalId2 = setInterval(() => {
        this.currentImageIndex2 = (this.currentImageIndex2 + 1) % this.images2.length;
      }, 3000); // Cambia la imagen cada 3 segundos
    },
    stopCarousel1() {
      clearInterval(this.intervalId1);
    },
    stopCarousel2() {
      clearInterval(this.intervalId2);
    }
  },
  mounted() {
    this.startCarousel1();
    this.startCarousel2();
  },
  beforeDestroy() {
    this.stopCarousel1();
    this.stopCarousel2();
  }
};
</script>

<style scoped>
.advertisements {
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 200px; /* Ancho de cada publicidad */
}

.advertisement {
  width: 100%; /* Ocupa todo el ancho del contenedor */
  padding: 10px;
  background-color: #333;
  border: 2px solid #39ff14; /* Borde verde como solicitado */
  color: #fff;
  text-align: center;
  margin-bottom: 1px; /* Espacio entre cada publicidad */
  animation: slide-in 0.5s ease-out forwards;
}

.advertisement img {
  max-width: 100%; /* Ajusta la imagen al ancho del contenedor */
  height: auto; /* Mantiene la proporción de la imagen */
}

.image-carousel {
  position: relative;
  height: 189px; /* Altura de la imagen */
  overflow: hidden;
}

.image-carousel img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ajusta la imagen para cubrir el contenedor */
  animation: slide-in 1s infinite alternate; /* Animación de desplazamiento */
}

@keyframes slide-in {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
