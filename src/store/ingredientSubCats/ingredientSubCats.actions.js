import axios from 'axios';

export default {
    async getAllIngredientSubCats({ commit }) {
        let successResponse = null;
        commit('set_ingredientSubCats_isLoading_to_true');
        await axios({
            method: 'get',
            url:'api/ingredient-sub-categories',
        }).then( res => {
            commit('set_all_ingredientSubCats_data', res.data);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_ingredientSubCats_isLoading_to_false'));
        return successResponse;
    },
};
