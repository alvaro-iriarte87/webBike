<!-- AdvertisementRight.vue -->
<template>
  <div class="advertisements-right">
    <div class="advertisement">
      <h4> Casanova </h4>
      <div class="image-carousel">
        <img :src="currentImage3" alt="Bicicleta de prueba">
      </div>
      <p>¡Gran oferta!</p>
    </div>

    <div class="advertisement">
      <h4>Yuhmak Bike</h4>
      <div class="image-carousel">
        <img :src="currentImage4" alt="Bicicleta de prueba">
      </div>
      <p>¡Promoción imperdible!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdvertisementRight',
  data() {
    return {
      images3: [
        'https://tiempodeseguros.com.ar/storage/app/media/bicis.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDFT6GKGgkY2_9N6h83Em-1igopPWrY6YMlg&s'
      ],
      images4: [
        'https://www.eltucumano.com/fotos/cache/notas/2023/08/11/818x460_230811115445_84415.jpeg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ9oiFRh4oYwG3Jx1RNZRP3hvIk37ZU5Q4gA&s'
      ],
      currentImageIndex3: 0,
      currentImageIndex4: 0,
      intervalId3: null,
      intervalId4: null
    };
  },
  computed: {
    currentImage3() {
      return this.images3[this.currentImageIndex3];
    },
    currentImage4() {
      return this.images4[this.currentImageIndex4];
    }
  },
  methods: {
    startCarousel3() {
      this.intervalId3 = setInterval(() => {
        this.currentImageIndex3 = (this.currentImageIndex3 + 1) % this.images3.length;
      }, 3000); // Cambia la imagen cada 3 segundos
    },
    startCarousel4() {
      this.intervalId4 = setInterval(() => {
        this.currentImageIndex4 = (this.currentImageIndex4 + 1) % this.images4.length;
      }, 3000); // Cambia la imagen cada 3 segundos
    },
    stopCarousel3() {
      clearInterval(this.intervalId3);
    },
    stopCarousel4() {
      clearInterval(this.intervalId4);
    }
  },
  mounted() {
    this.startCarousel3();
    this.startCarousel4();
  },
  beforeDestroy() {
    this.stopCarousel3();
    this.stopCarousel4();
  }
};
</script>

<style scoped>
.advertisements-right {
  position: fixed;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
