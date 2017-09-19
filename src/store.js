import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
  weatherCardData: []
};

const mutations = {

  addWeatherCard(state, weatherCard) {
    state.weatherCardData.push(weatherCard);
  }

};


const actions = {
  addCurrentLocation({ commit }, location) {
    // { locationName, lon, lat, tempC, description }
    let weatherCard = {};

    // fetch locationName
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lon}&key=AIzaSyB-BiB3pqjmXqtWF8UR9Fb3yq8H0vtSa_8`
      )
      .then(res => {
        // should refactor into seperate function
        let locality, state, country;
        res.data.results.forEach(result => {
          result.address_components.forEach(ac => {
            ac.types.forEach(type => {
              if (type === "locality") {
                locality = ac.long_name;
              } else if (type === "administrative_area_level_1") {
                state = ac.short_name;
              } else if (type === "country") {
                country = ac.long_name;
              }
            });
          });
        });
        // console.log("location", locality, state, country);
        weatherCard.locationName = `${locality}, ${state}, ${country}`;
        weatherCard.lat = location.lat;
        weatherCard.lon = location.lon;
        // fetch weather Data
        return axios.get(
          `https://fcc-weather-api.glitch.me/api/current?lat=${location.lat}&lon=${location.lon}`
        );
      })
      .then(res => {
        // console.log("res", res);
        weatherCard.tempC = res.data.main.temp;
        weatherCard.description = res.data.weather[0].description;

        // commit addWeatherCard
        commit('addWeatherCard',weatherCard);
      })
      .catch(err => {
        console.log("err", err);
      });
  }
};


// const getters = {
// };

export default new Vuex.Store({
  state,
  //getters,
  actions,
  mutations
});
