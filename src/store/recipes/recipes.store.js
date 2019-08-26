import mutations from './recipes.mutations';
import actions from './recipes.actions';
import getters from './recipes.getters';

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
