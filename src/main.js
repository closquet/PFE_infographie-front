import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';

import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_APIURL;
axios.defaults.headers.common['X-localization'] = 'fr';
Vue.prototype.axios = axios;

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

import vSelect from 'vue-select';
Vue.component('v-select', vSelect);
import 'vue-select/dist/vue-select.css';

import 'vue-loading-overlay/dist/vue-loading.css';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  router.prevRoute = from;
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
