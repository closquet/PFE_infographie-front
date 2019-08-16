import axios from 'axios';

export default {
    async getAllAllergens({ commit }) {
        let successResponse = null;
        commit('set_allergens_isLoading_to_true');
        await axios({
            method: 'get',
            url:'api/allergens',
        }).then( res => {
            commit('set_all_allergens_data', res.data);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_allergens_isLoading_to_false'));
        return successResponse;
    },
    


};
