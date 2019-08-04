import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';

import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_APIURL;
Vue.prototype.axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
