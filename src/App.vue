<template>
  <div>
    weather app<br> add location input <br> 
    <weather-card :key="i" v-for="(data,i) in weatherCardData" :data="data"></weather-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import WeatherCard from './components/WeatherCard.vue';

export default {

  components: {
    'weather-card': WeatherCard
  },
  data() {
    return {
    }
  },
  computed: {
    weatherCardData() {
      return this.$store.state.weatherCardData;
    }
  },
  methods: mapActions([

  ]),
  created: function() {

    // add ney york

    // add london

    // add current position
    let promise = getCurrentPosition();
    if (promise) {
      promise.then((currentPosition) => {
        this.$store.dispatch('addCurrentLocation', currentPosition);
      });
    }
  }

};

// this should probably be in store.js
function getCurrentPosition() {
  if (!navigator.geolocation) {
    return null;
  }
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(function(position) {
      resolve({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      });
    });
  });
}

</script>

<style lang="scss">

</style>
