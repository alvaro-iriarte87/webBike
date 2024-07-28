<template>
  <div>
    <Navbar />
    <div class="main-content">
      <Advertisement />
      <AdvertisementRight />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './js/components/Navbar.vue';
import Advertisement from './js/components/Advertisement.vue';
import AdvertisementRight from './js/components/AdvertisementRight.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Advertisement,
    AdvertisementRight
  }
}
</script>

<style>
.main-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-left: auto;
  background: rgb(83, 82, 82);
}
</style>
