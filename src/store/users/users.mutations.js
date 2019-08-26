export default {
    set_all_users_data(state, payload) {
        state.all = payload;
    },

    set_users_amount(state, payload) {
        state.amount = payload;
    },

    set_users_isLoading_to_true(state) {
        state.isLoading = true;
    },

    set_users_isLoading_to_false(state) {
        state.isLoading = false;
    },

    delete_user(state, slug) {
        state.all = state.all.filter( item => item.slug !== slug);
    },

    set_single_user(state, payload) {
        state.single = payload;
    },

    unset_single_user(state) {
        state.single = {};
    },

    set_users_avatar(state, avatar) {
        state.single.avatar = avatar;
    },
};
