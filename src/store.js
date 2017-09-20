import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
  weatherCardData: [],
  tempUnit: "C"
};

const mutations = {
  addWeatherCard(state, weatherCard) {
    state.weatherCardData.push(weatherCard);
  },
  setTempUnit(state, tempUnit) {
    state.tempUnit = tempUnit;
  },
  removeWeatherCard(state, card){
    state.weatherCardData.splice(state.weatherCardData.indexOf(card), 1);
  }
};

function populateWeatherCard(weatherCard,responseData){
  console.log('responseData',responseData);
  weatherCard.tempC = responseData.main.temp;
  weatherCard.description = responseData.weather[0].description;
  weatherCard.icon = responseData.weather[0].icon;
}

const actions = {
  addLocation({ commit }, location) {
    console.log("location", location);
    let { locality, administrative_area_level_1, country } = location;
    let { latitude, longitude } = location;
    let weatherCard = {};
    weatherCard.locationName = `${locality}, ${administrative_area_level_1}, ${country}`;
    weatherCard.lat = latitude;
    weatherCard.lon = longitude;

    axios
      .get(
        `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`
      )
      .then(res => {
        populateWeatherCard(weatherCard,res.data);
        commit("addWeatherCard", weatherCard);
      })
      .catch(err => {
        console.log("err", err);
      });
  },

  addLocationFromCoordinates({ commit }, location) {
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

        // set tempUnit to F if US
        // TODO put in separate action
        // if(country==="United States"){
        //   commit('setTempUnit','F');
        // }

        weatherCard.locationName = `${locality}, ${state}, ${country}`;
        weatherCard.lat = location.lat;
        weatherCard.lon = location.lon;
        // fetch weather Data
        return axios.get(
          `https://fcc-weather-api.glitch.me/api/current?lat=${location.lat}&lon=${location.lon}`
        );
      })
      .then(res => {
        populateWeatherCard(weatherCard,res.data);
        commit("addWeatherCard", weatherCard);
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
