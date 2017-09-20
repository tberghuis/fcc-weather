import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import ToggleButton from 'vue-js-toggle-button'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import store from './store'
import App from './App.vue'

Vue.use(ToggleButton)
Vue.use(BootstrapVue);

window.store = store;

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
