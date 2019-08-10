export default {
    set_user_data(state, payload) {
        state.data = payload;
    },

    unset_user_data(state) {
        state.data = {};
    },

    set_user_isLogged_to_true(state) {
        state.isLogged = true;
    },

    set_user_isLogged_to_false(state) {
        state.isLogged = false;
    },

    set_user_isLoading_to_true(state) {
        state.isLoaded = true;
    },

    set_user_isLoading_to_false(state) {
        state.isLoaded = false;
    },
};
