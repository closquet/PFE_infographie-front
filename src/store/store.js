import Vue from 'vue';
import Vuex from 'vuex';

import user from './user/user.store.js';
import users from './users/users.store.js';
import allergens from './allergens/allergens.store.js';
import ingredients from './ingredients/ingredients.store.js';
import tags from './tags/tags.store.js';
import recipes from './recipes/recipes.store.js';
import ingredientSubCats from './ingredientSubCats/ingredientSubCats.store.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules : {
    user,
    users,
    allergens,
    ingredients,
    tags,
    recipes,
    ingredientSubCats,
  }
});
