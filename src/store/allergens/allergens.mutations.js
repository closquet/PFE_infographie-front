export default {
    set_all_allergens_data(state, payload) {
        state.all = payload;
    },

    set_allergens_amount(state, payload) {
        state.amount = payload;
    },

    set_allergens_isLoading_to_true(state) {
        state.isLoading = true;
    },

    set_allergens_isLoading_to_false(state) {
        state.isLoading = false;
    },

    delete_allergen(state, slug) {
        state.all = state.all.filter( item => item.slug !== slug);
    },

    set_single_allergen(state, payload) {
        state.single = payload;
    },

    unset_single_allergen(state) {
        state.single = {};
    },
};
