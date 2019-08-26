export default {
    set_all_tags_data(state, payload) {
        state.all = payload;
    },

    set_tags_amount(state, payload) {
        state.amount = payload;
    },

    set_tags_isLoading_to_true(state) {
        state.isLoading = true;
    },

    set_tags_isLoading_to_false(state) {
        state.isLoading = false;
    },

    delete_tag(state, slug) {
        state.all = state.all.filter( item => item.slug !== slug);
    },

    set_single_tag(state, payload) {
        state.single = payload;
    },

    unset_single_tag(state) {
        state.single = {};
    },
};
