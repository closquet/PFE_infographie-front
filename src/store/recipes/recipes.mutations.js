export default {
    set_all_recipes_data(state, payload) {
        state.all = payload;
    },

    set_recipes_amount(state, payload) {
        state.amount = payload;
    },

    set_recipes_isLoading_to_true(state) {
        state.isLoading = true;
    },

    set_recipes_isLoading_to_false(state) {
        state.isLoading = false;
    },

    delete_recipe(state, slug) {
        state.all = state.all.filter( item => item.slug !== slug);
    },

    set_single_recipe(state, payload) {
        state.single = payload;
    },

    unset_single_recipe(state) {
        state.single = {};
    },

    set_recipes_avatar(state, thumbnail) {
        state.single.thumbnail = thumbnail;
    },
};
