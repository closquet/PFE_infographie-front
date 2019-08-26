import mutations from './ingredients.mutations';
import actions from './ingredients.actions';
import getters from './ingredients.getters';

export default {
    state: {
        all : [],
        amount : null,
        isLoading: false,
        single : {},
    },
    mutations,
    actions,
    getters,
};
