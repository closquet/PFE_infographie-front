import mutations from './user.mutations';
import actions from './user.actions';
import getters from './user.getters';

export default {
    state: {
        data : {},
        amount : null,
        isLogged: false,
        isLoading: false,
    },
    mutations,
    actions,
    getters,
};
