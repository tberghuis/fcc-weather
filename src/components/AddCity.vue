<template>
    <div>
        <vue-google-autocomplete
            classname="form-control"
            :enable-geolocation="true"
            ref="addCity"
         id="add-city" placeholder="Add City" v-on:placechanged="getCityData" types="(cities)">
        </vue-google-autocomplete>

        {{cityData}}
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import VueGoogleAutocomplete from 'vue-google-autocomplete';

export default {
    components: { VueGoogleAutocomplete },
    data() {
        return {
            // TODO do i need to keep this?
            cityData: ''
        }
    },
    computed: {

    },
    methods: {

        // i don't need placeResultData
        getCityData: function (cityData, placeResultData) {
            
            // TODO remove
            this.cityData = cityData;
            
            
            // dispatch
            this.$store.dispatch('addLocation', cityData);


            // console.log('cityData',cityData);
            // console.log('placeResultData',placeResultData);

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
