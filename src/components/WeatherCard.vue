<template>
  <div class="card">
    <button @click="removeWeatherCard(data)" type="button" class="close" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    <div class="card-body">
      <div>{{data.locationName}}</div>
      <!-- <canvas 
        :id="data.iconId"
         width="50" height="50"></canvas> -->
      <img :src="data.icon">
      <div>{{tempDisplay}}</div>
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
}

.close {
  top: 5px;
  right: 10px;
  position: absolute;
}
</style>
