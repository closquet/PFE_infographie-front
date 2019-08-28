import axios from 'axios';

export default {
    async getAllRecipes({ commit }) {
        let successResponse = null;
        commit('set_recipes_isLoading_to_true');
        await axios({
            method: 'get',
            url:'api/recipes',
        }).then( res => {
            commit('set_all_recipes_data', res.data);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_recipes_isLoading_to_false'));
        return successResponse;
    },


    async getAmountRecipes({ commit }) {
        let successResponse = null;
        commit('set_recipes_isLoading_to_true');
        await axios({
            method: 'get',
            url:'api/recipes/count',
        }).then( res => {
            commit('set_recipes_amount', res.data);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_recipes_isLoading_to_false'));
        return successResponse;
    },


    async deleteRecipe({ commit, rootState, dispatch }, slug) {
        let successResponse = null;
        commit('set_recipes_isLoading_to_true');
        await dispatch('handleTokenValidity', {
            expires_on: rootState.user.data.tokens.expires_on,
            rememberMe: rootState.user.data.tokens.rememberMe,
            refresh_token: rootState.user.data.tokens.refresh_token,
        });
        await axios({
            method: 'delete',
            url:`api/admin/recipes/${slug}`,
            headers: {
                Authorization: `Bearer ${rootState.user.data.tokens.access_token}`
            },
        }).then( res => {
            commit('delete_recipe', slug);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_recipes_isLoading_to_false'));
        return successResponse;
    },


    async getSingleRecipe({ commit }, slug) {
        let successResponse = null;
        commit('set_recipes_isLoading_to_true');
        await axios({
            method: 'get',
            url:`api/recipes/${slug}`,
        }).then( res => {
            commit('set_single_recipe', res.data);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_recipes_isLoading_to_false'));
        return successResponse;
    },


    async updateRecipe({ commit, dispatch, rootState }, {slug, name, preparation_time, cooking_time, persons, ingredients, tags, steps, description}) {
        let successResponse = null;
        commit('set_recipes_isLoading_to_true');
        await dispatch('handleTokenValidity', {
            expires_on: rootState.user.data.tokens.expires_on,
            rememberMe: rootState.user.data.tokens.rememberMe,
            refresh_token: rootState.user.data.tokens.refresh_token,
        });
        await axios({
            method: 'put',
            url:`api/admin/recipes/${slug}`,
            data:{name, preparation_time, cooking_time, persons, ingredients, tags, steps, description},
            headers: {
                Authorization: `Bearer ${rootState.user.data.tokens.access_token}`
            },
        }).then( res => {
            commit('set_single_recipe', res.data);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_recipes_isLoading_to_false'));
        return successResponse;
    },


    async createRecipe({ commit, dispatch, rootState }, { name, preparation_time, cooking_time, persons, ingredients, tags, steps, description }) {
        let successResponse = null;
        commit('set_recipes_isLoading_to_true');
        await dispatch('handleTokenValidity', {
            expires_on: rootState.user.data.tokens.expires_on,
            rememberMe: rootState.user.data.tokens.rememberMe,
            refresh_token: rootState.user.data.tokens.refresh_token,
        });
        await axios({
            method: 'post',
            url:`api/admin/recipes`,
            data:{name, preparation_time, cooking_time, persons, ingredients, tags, steps, description},
            headers: {
                Authorization: `Bearer ${rootState.user.data.tokens.access_token}`
            },
        }).then( res => {
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_recipes_isLoading_to_false'));
        return successResponse;
    },


    async uploadRecipeAvatar({ commit, rootState, dispatch }, {slug, avatar}) {
        let successResponse = null;
        commit('set_recipes_isLoading_to_true');

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
            url:`api/admin/recipes/${slug}/thumbnail`,
            headers,
            data: avatarFormData,
        }).then( res => {
            commit('set_recipes_avatar', res.data.thumbnail);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_recipes_isLoading_to_false'));
        return successResponse;
    },


    async deleteRecipeAvatar({ commit, rootState, dispatch }, slug) {
        let successResponse = null;
        commit('set_recipes_isLoading_to_true');

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
            url:`api/admin/recipes/${slug}/thumbnail`,
            headers,
        }).then( res => {
            commit('set_recipes_avatar', null);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_recipes_isLoading_to_false'));
        return successResponse;
    },
};
