import mutations from './users.mutations';
import actions from './users.actions';
import getters from './users.getters';

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
