export default {
    set_all_ingredients_data(state, payload) {
        state.all = payload;
    },

    set_ingredients_amount(state, payload) {
        state.amount = payload;
    },

    set_ingredients_isLoading_to_true(state) {
        state.isLoading = true;
    },

    set_ingredients_isLoading_to_false(state) {
        state.isLoading = false;
    },

    delete_ingredient(state, slug) {
        state.all = state.all.filter( item => item.slug !== slug);
    },

    set_single_ingredient(state, payload) {
        state.single = payload;
    },

    unset_single_ingredient(state) {
        state.single = {};
    },

    set_ingredients_avatar(state, thumbnail) {
        state.single.thumbnail = thumbnail;
    },
};
