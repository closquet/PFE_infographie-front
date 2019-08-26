import mutations from './tags.mutations';
import actions from './tags.actions';
import getters from './tags.getters';

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
