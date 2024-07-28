<template>
  <div class="container">
    <div>
      <h1 class="title"><i class="fas fa-map-marker-alt"></i> Por Tu ubicación</h1>
    </div>
    <br>
    <div class="content">
      <div ref="mapContainer" class="map-container"></div>
      <div v-if="nearbyStores.length > 0" class="store-list">
        <h2>Las Tiendas mas cercanas son:</h2>
        <ol>
          <li v-for="(store, index) in nearbyStores" :key="index">
           <b> {{ store.name }} - {{ store.vicinity }} </b>
          </li>
        </ol>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';

export default {
  name: 'BicicleteriaMap',
  setup() {
    const mapContainer = ref(null);
    const userLocation = ref({ lat: 0, lng: 0 });
    const nearbyStores = ref([]);

    onMounted(() => {
      // Obtener la clave de API de Google Maps
      const apiKey = 'AIzaSyAqofXS4Pi9d6yk4eS5ss0p2fRoEdN2Hv4'; // Reemplaza con tu clave de API

      // Cargar la API de Google Maps
      const loader = new Loader({
        apiKey,
        version: 'weekly',
        libraries: ['places'],
      });

      loader.load().then(() => {
        // Obtener la ubicación actual del usuario
        navigator.geolocation.getCurrentPosition(
          position => {
            userLocation.value = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            // Crear el mapa centrado en la ubicación del usuario
            const map = new google.maps.Map(mapContainer.value, {
              center: userLocation.value,
              zoom: 15,
              disableDefaultUI: true, // Desactiva los controles de UI predeterminados para un aspecto más limpio
            });

            // Crear el marcador para la ubicación del usuario
            new google.maps.Marker({
              map: map,
              position: userLocation.value,
              title: 'Tú estás aquí',
              icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', // URL del icono del marcador
              },
            });

            // Buscar bicicleterías cercanas
            const service = new google.maps.places.PlacesService(map);
            service.nearbySearch(
              {
                location: userLocation.value,
                radius: 5000, // Radio de búsqueda en metros
                type: 'bicycle_store', // Tipo de lugar
              },
              (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                  results.forEach(place => {
                    // Crear un marcador para cada lugar encontrado
                    new google.maps.Marker({
                      map: map,
                      position: place.geometry.location,
                      title: place.name,
                      icon: {
                        url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', // URL del icono del marcador
                      },
                    });

                    // Agregar el lugar a la lista de bicicleterías cercanas
                    nearbyStores.value.push({
                      name: place.name,
                      vicinity: place.vicinity,
                    });
                  });
                } else {
                  console.error('Error al buscar lugares:', status);
                }
              }
            );
          },
          error => {
            console.error('Error al obtener la ubicación del usuario:', error);
          }
        );
      });
    });

    return {
      mapContainer,
      userLocation,
      nearbyStores,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  color: white;
}

.content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.map-container {
  height: 500px; /* Ajusta la altura según tus necesidades */
  width: 99%; /* Hace que el mapa ocupe el 60% del ancho del contenedor */
  margin-right: 80px; /* Añade espacio entre el mapa y la lista */
  border-radius: 10px; /* Estiliza los bordes */
  border: 2px solid #39ff14;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Agrega sombra */
}

.store-list {
  width: 55%; /* Hace que la lista ocupe el 35% del ancho del contenedor */
  color: #070707;
   border-radius: 10px; /* Estiliza los bordes */
  border: 2px solid #39ff14;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Agrega sombra */
}

.store-list h2 {
  margin-bottom: 10px;
  color:#f8f2f2;
  
}

.store-list ol {
  padding-left: 20px;
}

.store-list li {
  margin-bottom: 5px;
  
}
</style>


