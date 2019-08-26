import axios from 'axios';

export default {
    async getAllIngredients({ commit }) {
        let successResponse = null;
        commit('set_ingredients_isLoading_to_true');
        await axios({
            method: 'get',
            url:'api/ingredients',
        }).then( res => {
            commit('set_all_ingredients_data', res.data);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_ingredients_isLoading_to_false'));
        return successResponse;
    },


    async getSingleIngredient({ commit }, slug) {
        let successResponse = null;
        commit('set_ingredients_isLoading_to_true');
        await axios({
            method: 'get',
            url:`api/ingredients/${slug}`,
        }).then( res => {
            commit('set_single_ingredient', res.data);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_ingredients_isLoading_to_false'));
        return successResponse;
    },


    async getAmountIngredients({ commit }) {
        let successResponse = null;
        commit('set_ingredients_isLoading_to_true');
        await axios({
            method: 'get',
            url:'api/ingredients/count',
        }).then( res => {
            commit('set_ingredients_amount', res.data);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_ingredients_isLoading_to_false'));
        return successResponse;
    },


    async deleteIngredient({ commit, rootState, dispatch }, slug) {
        let successResponse = null;
        commit('set_ingredients_isLoading_to_true');
        await dispatch('handleTokenValidity', {
            expires_on: rootState.user.data.tokens.expires_on,
            rememberMe: rootState.user.data.tokens.rememberMe,
            refresh_token: rootState.user.data.tokens.refresh_token,
        });
        await axios({
            method: 'delete',
            url:`api/admin/ingredients/${slug}`,
            headers: {
                Authorization: `Bearer ${rootState.user.data.tokens.access_token}`
            },
        }).then( res => {
            commit('delete_ingredient', slug);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_ingredients_isLoading_to_false'));
        return successResponse;
    },


    async updateIngredient({ commit, dispatch, rootState }, {slug, name, allergens, seasons, sub_cat_id}) {
        let successResponse = null;
        commit('set_ingredients_isLoading_to_true');
        await dispatch('handleTokenValidity', {
            expires_on: rootState.user.data.tokens.expires_on,
            rememberMe: rootState.user.data.tokens.rememberMe,
            refresh_token: rootState.user.data.tokens.refresh_token,
        });
        await axios({
            method: 'put',
            url:`api/admin/ingredients/${slug}`,
            data:{
                name,
                allergens,
                seasons,
                sub_cat_id,
            },
            headers: {
                Authorization: `Bearer ${rootState.user.data.tokens.access_token}`
            },
        }).then( res => {
            commit('set_single_ingredient', res.data);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_ingredients_isLoading_to_false'));
        return successResponse;
    },


    async createIngredient({ commit, dispatch, rootState }, { name, allergens, seasons, sub_cat_id }) {
        let successResponse = null;
        commit('set_ingredients_isLoading_to_true');
        await dispatch('handleTokenValidity', {
            expires_on: rootState.user.data.tokens.expires_on,
            rememberMe: rootState.user.data.tokens.rememberMe,
            refresh_token: rootState.user.data.tokens.refresh_token,
        });
        await axios({
            method: 'post',
            url:`api/admin/ingredients`,
            data:{
                name,
                allergens,
                seasons,
                sub_cat_id,
            },
            headers: {
                Authorization: `Bearer ${rootState.user.data.tokens.access_token}`
            },
        }).then( res => {
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_ingredients_isLoading_to_false'));
        return successResponse;
    },


    async uploadIngredientAvatar({ commit, rootState, dispatch }, {slug, avatar}) {
        let successResponse = null;
        commit('set_ingredients_isLoading_to_true');

        await dispatch('handleTokenValidity', {
            expires_on: rootState.user.data.tokens.expires_on,
            rememberMe: rootState.user.data.tokens.rememberMe,
            refresh_token: rootState.user.data.tokens.refresh_token,
        });

        const avatarFormData = new  FormData();
        avatarFormData.append("thumbnail", avatar);

        const headers = {
            Authorization: `Bearer ${rootState.user.data.tokens.access_token}`,
            "Content-Type": "application/x-www-form-urlencoded",
        };

        await axios({
            method: 'post',
            url:`api/admin/ingredients/${slug}/thumbnail`,
            headers,
            data: avatarFormData,
        }).then( res => {
            commit('set_ingredients_avatar', res.data.thumbnail);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_ingredients_isLoading_to_false'));
        return successResponse;
    },


    async deleteIngredientAvatar({ commit, rootState, dispatch }, slug) {
        let successResponse = null;
        commit('set_ingredients_isLoading_to_true');

        await dispatch('handleTokenValidity', {
            expires_on: rootState.user.data.tokens.expires_on,
            rememberMe: rootState.user.data.tokens.rememberMe,
            refresh_token: rootState.user.data.tokens.refresh_token,
        });

        const headers = {
            Authorization: `Bearer ${rootState.user.data.tokens.access_token}`,
        };

        await axios({
            method: 'delete',
            url:`api/admin/ingredients/${slug}/thumbnail`,
            headers,
        }).then( res => {
            commit('set_ingredients_avatar', null);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_ingredients_isLoading_to_false'));
        return successResponse;
    },
};
