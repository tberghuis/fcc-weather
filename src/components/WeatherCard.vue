<template>
  <div class="card">
    <button @click="removeWeatherCard(data)" type="button" class="close" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    <div class="card-body">
      <div>{{data.locationName}}</div>
      <img :src="data.icon">
      <div class="temp">{{tempDisplay}}</div>
      <div>{{data.description}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  props: ['data'],
  data() {
    return {
    }
  },
  computed: {
    tempDisplay() {
      if (this.$store.state.tempUnit === 'C') {
        let tempC = Math.round(this.data.tempC);
        return `${tempC} \xB0C`;
      }
      let tempF = Math.round(this.data.tempC * 1.8 + 32);
      return `${tempF} \xB0F`;
    }
  },
  methods: {
    ...mapMutations([
      'removeWeatherCard'
    ])
  }
}
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  margin: 15px;
  background-color: #d2d2d2;
}

.close {
  top: 5px;
  right: 10px;
  position: absolute;
}

img {
  width: 50px;
  height: 50px;
}

.card-body {
  text-align: center;
}

.temp {
  font-size: 2rem;
}

</style>
