import mutations from './allergens.mutations';
import actions from './allergens.actions';
import getters from './allergens.getters';

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
