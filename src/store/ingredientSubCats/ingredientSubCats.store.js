import mutations from './ingredientSubCats.mutations';
import actions from './ingredientSubCats.actions';
import getters from './ingredientSubCats.getters';

export default {
    state: {
        isLoading: false,
        amount : null,
        all : [],
        single : {},
    },
    mutations,
    actions,
    getters,
};
