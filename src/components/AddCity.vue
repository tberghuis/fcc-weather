<template>
    <div>
        <vue-google-autocomplete
            classname="form-control"
            :enable-geolocation="true"
            ref="addCity"
         id="add-city" placeholder="Add City" v-on:placechanged="getCityData" types="(cities)">
        </vue-google-autocomplete>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import VueGoogleAutocomplete from 'vue-google-autocomplete';

export default {
    components: { VueGoogleAutocomplete },
    data() {
        return {
        }
    },
    computed: {

    },
    methods: {
        // i don't need placeResultData
        getCityData: function (cityData, placeResultData) {
            this.$store.dispatch('addLocation', cityData);
            // clear the input value
            setTimeout(()=>{
                this.$refs.addCity.clear();
            });
        }
    }
}
</script>

<style lang="scss">

</style>
