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


    async getAmountAllergens({ commit }) {
        let successResponse = null;
        commit('set_allergens_isLoading_to_true');
        await axios({
            method: 'get',
            url:'api/allergens/count',
        }).then( res => {
            commit('set_allergens_amount', res.data);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_allergens_isLoading_to_false'));
        return successResponse;
    },


    async deleteAllergen({ commit, dispatch, rootState }, slug) {
        let successResponse = null;
        commit('set_allergens_isLoading_to_true');
        await dispatch('handleTokenValidity', {
            expires_on: rootState.user.data.tokens.expires_on,
            rememberMe: rootState.user.data.tokens.rememberMe,
            refresh_token: rootState.user.data.tokens.refresh_token,
        });
        await axios({
            method: 'delete',
            url:`api/admin/allergens/${slug}`,
            headers: {
                Authorization: `Bearer ${rootState.user.data.tokens.access_token}`
            },
        }).then( res => {
            commit('delete_allergen', slug);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_allergens_isLoading_to_false'));
        return successResponse;
    },


    async getSingleAllergen({ commit }, slug) {
        let successResponse = null;
        commit('set_allergens_isLoading_to_true');
        await axios({
            method: 'get',
            url:`api/allergens/${slug}`,
        }).then( res => {
            commit('set_single_allergen', res.data);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_allergens_isLoading_to_false'));
        return successResponse;
    },


    async updateAllergen({ commit, dispatch, rootState }, { slug, name }) {
        let successResponse = null;
        commit('set_allergens_isLoading_to_true');
        await dispatch('handleTokenValidity', {
            expires_on: rootState.user.data.tokens.expires_on,
            rememberMe: rootState.user.data.tokens.rememberMe,
            refresh_token: rootState.user.data.tokens.refresh_token,
        });
        await axios({
            method: 'put',
            url:`api/admin/allergens/${slug}`,
            data:{name},
            headers: {
                Authorization: `Bearer ${rootState.user.data.tokens.access_token}`
            },
        }).then( res => {
            commit('set_single_allergen', res.data);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_allergens_isLoading_to_false'));
        return successResponse;
    },


    async createAllergen({ commit, dispatch, rootState }, { name }) {
        let successResponse = null;
        commit('set_allergens_isLoading_to_true');
        await dispatch('handleTokenValidity', {
            expires_on: rootState.user.data.tokens.expires_on,
            rememberMe: rootState.user.data.tokens.rememberMe,
            refresh_token: rootState.user.data.tokens.refresh_token,
        });
        await axios({
            method: 'post',
            url:`api/admin/allergens`,
            data:{name},
            headers: {
                Authorization: `Bearer ${rootState.user.data.tokens.access_token}`
            },
        }).then( res => {
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_allergens_isLoading_to_false'));
        return successResponse;
    },
};
