export default {
    set_all_allergens_data(state, payload) {
        state.allAllergens = payload;
    },

    set_allergens_isLoading_to_true(state) {
        state.isLoading = true;
    },

    set_allergens_isLoading_to_false(state) {
        state.isLoading = false;
    },
};
