import Vue from 'vue';
import Vuex from 'vuex';

import user from './user/user.store.js';
import allergens from './allergens/allergens.store.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules : {
    user,
    allergens,
  }
});
