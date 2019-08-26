export default {
    set_all_ingredientSubCats_data(state, payload) {
        state.all = payload;
    },

    set_ingredientSubCats_isLoading_to_true(state) {
        state.isLoading = true;
    },

    set_ingredientSubCats_isLoading_to_false(state) {
        state.isLoading = false;
    },
};
