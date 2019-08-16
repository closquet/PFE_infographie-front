export default {
    set_user_data(state, payload) {
        const tokens = state.data.tokens;
        state.data = payload;
        tokens && ( state.data.tokens = tokens );
    },

    refresh_user_tokens(state, payload) {
        state.data.tokens = payload;
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
        state.isLoading = true;
    },

    set_user_isLoading_to_false(state) {
        state.isLoading = false;
    },
};
