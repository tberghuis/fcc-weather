import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import store from './store'
import App from './App.vue'

Vue.use(BootstrapVue);

window.store = store;

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
