<template>
  <div>
    <add-city></add-city>
    <div>
      &deg;C <toggle-button
      :color="{checked: '#3f5163', unchecked: '#3f5163'}"
      @input="tempUnitChange"/> &deg;F
    </div>
    <weather-card :key="i" v-for="(data,i) in weatherCardData" :data="data"></weather-card>
  </div>
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
      return this.$store.state.weatherCardData.reverse();
    }
  },
  methods:{
    tempUnitChange(tempUnitF){
      console.log('tempUnitF',tempUnitF);
      if(tempUnitF){
        this.setTempUnit('F');
      }
      else{
        this.setTempUnit('C');
      }
    },
    ...mapMutations([
      'setTempUnit'
    ])
  },
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
