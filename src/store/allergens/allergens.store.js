import mutations from './allergens.mutations';
import actions from './allergens.actions';
import getters from './allergens.getters';

export default {
    state: {
        allAllergens : [],
        isLoading: false,
    },
    mutations,
    actions,
    getters,
};
