<template>
  <div>
    weather app
    <div>{{locationName}}</div>
    <div>tempC: {{tempC}}</div>
    <div>tempF: {{tempF}}</div>
    <div>{{description}}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
    }
  },
  computed: {
    tempC() {
      return Math.round(this.$store.state.tempC);
    },
    tempF() {
      return Math.round(this.$store.state.tempF);
    },
    description() {
      return this.$store.state.description;
    },
    locationName() {
      return this.$store.state.locationName;
    }
  },
  methods: mapActions([

  ]),
  created: function() {
    // dispatch here
    this.$store.dispatch('setLocationFromCurrentPosition').then(() => {
      this.$store.dispatch('fetchWeatherData');
    });

  }

}
</script>

<style lang="scss">

</style>
