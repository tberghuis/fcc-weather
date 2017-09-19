<template>
    <div>
        <vue-google-autocomplete id="add-city" placeholder="Add City" v-on:placechanged="getCityData" types="(cities)">
        </vue-google-autocomplete>

        {{address}}
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import VueGoogleAutocomplete from 'vue-google-autocomplete';

export default {
    components: { VueGoogleAutocomplete },
    data() {
        return {
            // address: ''
        }
    },
    computed: {

    },
    methods: {
        // i don't need placeResultData
        getCityData: function (cityData, placeResultData) {
            // this.address = cityData;
            console.log('cityData',cityData);
            console.log('placeResultData',placeResultData);
        }
    }

}
</script>

<style lang="scss">

</style>
