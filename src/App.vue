<template>
  <div>
    weather app
    <div>tempC: {{tempC}}</div>
    <div>tempF: {{tempF}}</div>
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
      return this.$store.state.tempC;
    },
    tempF() {
      return this.$store.state.tempF;
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
