import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  location: null
};

// location
//     lat
//     long
//     name

const mutations = {
  setLocation(state, { lat, lon }) {
    state.location = { lat, lon };
  }
};

const actions = {
  setLocation({ commit }) {
    // all methods to deal with error state first
    if (!navigator.geolocation) {
      // commit location:null ?
      return;
    }

    navigator.geolocation.getCurrentPosition(function(position) {

        commit('setLocation',{lat:position.coords.latitude,lon:position.coords.longitude});
    });


    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     commit('increment')
    //     resolve()
    //   }, 1000)
    // })
  }
};

const getters = {};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
