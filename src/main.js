import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';

import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_APIURL;
Vue.prototype.axios = axios;

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

import vSelect from 'vue-select';
Vue.component('v-select', vSelect);
import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
