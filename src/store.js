import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
  location: null,
  tempC: null,
  tempF: null,
  description: null,
  locationName: null
};

// location
//     lat
//     long
//     name

const mutations = {
  setLocation(state, { lat, lon }) {
    state.location = { lat, lon };
  },
  // i should use an each function to set incoming properties
  setWeather(state, { tempC, tempF, description, locationName }) {
    state.tempC = tempC;
    state.tempF = tempF;
    state.description = description;
    state.locationName = locationName;
  }
};

// should action functions return promise?

const actions = {
  setLocationFromCurrentPosition({ commit }) {
    // all methods to deal with error state first
    if (!navigator.geolocation) {
      // commit location:null ?
      return;
    }

    // this allows to chain for once location is set
    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(function(position) {
        commit("setLocation", {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        resolve();
      });
    });
  },
  fetchWeatherData({ commit, state }) {
    // assume state data is good

    // TODO
    axios
      .get(
        `https://fcc-weather-api.glitch.me/api/current?lat=${state.location
          .lat}&lon=${state.location.lon}`
      )
      .then(res => {
        console.log("res", res);

        // I should not be setting state in action

        let tempC, tempF, description, locationName;

        tempC = res.data.main.temp;
        tempF = res.data.main.temp * 1.8 + 32;
        description = res.data.weather[0].description;
        locationName = res.data.name + ", " + res.data.sys.country;
        commit("setWeather", { tempC, tempF, description, locationName });
      })
      .catch(err => {
        console.log("err", err);
      });
  }
};

const getters = {};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
