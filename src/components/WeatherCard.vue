<template>
  <div class="card">
    <div class="card-body">

      <div>{{data.locationName}}</div>
      <div>tempC: {{tempC}}</div>
      <div>tempF: {{tempF}}</div>
      <div>{{data.description}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: ['data'],
  data() {
    return {
    }
  },
  computed: {
    tempC() {
      return Math.round(this.data.tempC);
    },
    tempF() {
      return Math.round(this.data.tempC * 1.8 + 32);
    }
  },
  methods: mapActions([

  ])

}
</script>

<style lang="scss">

</style>
