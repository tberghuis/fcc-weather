<template>
  <b-container>
    <h1>
      <a target="_blank" href="https://github.com/tberghuis/fcc-weather">
        <i class="fa fa-github" aria-hidden="true"></i>
      </a> freeCodeCamp - Weather App</h1>
    <add-city></add-city>
    <div>
      <br> &deg;C
      <toggle-button :color="{checked: '#3f5163', unchecked: '#3f5163'}" @input="tempUnitChange" /> &deg;F
    </div>
    <b-row>
      <weather-card :key="weatherCardData.length-i-1" v-for="(data,i) in weatherCardData" :data="data"></weather-card>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import WeatherCard from './components/WeatherCard.vue';
import AddCity from './components/AddCity.vue';

export default {

  components: {
    'weather-card': WeatherCard,
    'add-city': AddCity
  },
  data() {
    return {
    }
  },
  computed: {
    weatherCardData() {
      return this.$store.state.weatherCardData.slice().reverse();
    }
  },
  methods: {
    tempUnitChange(tempUnitF) {
      console.log('tempUnitF', tempUnitF);
      if (tempUnitF) {
        this.setTempUnit('F');
      }
      else {
        this.setTempUnit('C');
      }
    },
    ...mapMutations([
      'setTempUnit'
    ])
  },
  created: function() {

    // add new york
    this.$store.dispatch('addLocationFromCoordinates', { lat: 40.730610, lon: -73.935242 });

    // add london
    this.$store.dispatch('addLocationFromCoordinates', { lat: 51.508530, lon: -0.076132 });

    // add current position
    let promise = getCurrentPosition();
    if (promise) {
      promise.then((currentPosition) => {
        this.$store.dispatch('addLocationFromCoordinates', currentPosition);
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

h1 {
  margin-top: 50px;
  margin-bottom: 15px;
  a {
    color: black;
  }
}

body {
  background-color: #e4e4db;
}
</style>
