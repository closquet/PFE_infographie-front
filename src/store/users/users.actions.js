import axios from 'axios';

export default {
    async getAllUsers({ commit }) {
        let successResponse = null;
        commit('set_users_isLoading_to_true');
        await axios({
            method: 'get',
            url:'api/users',
        }).then( res => {
            commit('set_all_users_data', res.data);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_users_isLoading_to_false'));
        return successResponse;
    },


    async getAmountUsers({ commit }) {
        let successResponse = null;
        commit('set_users_isLoading_to_true');
        await axios({
            method: 'get',
            url:'api/users/count',
        }).then( res => {
            commit('set_users_amount', res.data);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_users_isLoading_to_false'));
        return successResponse;
    },


    async deleteUser({ commit, rootState, dispatch }, slug) {
        let successResponse = null;
        commit('set_users_isLoading_to_true');
        await dispatch('handleTokenValidity', {
            expires_on: rootState.user.data.tokens.expires_on,
            rememberMe: rootState.user.data.tokens.rememberMe,
            refresh_token: rootState.user.data.tokens.refresh_token,
        });
        await axios({
            method: 'delete',
            url:`api/admin/users/${slug}`,
            headers: {
                Authorization: `Bearer ${rootState.user.data.tokens.access_token}`
            },
        }).then( res => {
            commit('delete_user', slug);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_users_isLoading_to_false'));
        return successResponse;
    },


    async getSingleUser({ commit, dispatch, rootState }, slug) {
        let successResponse = null;
        commit('set_users_isLoading_to_true');
        let url = '';
        let headers = {};
        if (rootState.user.data.is_admin) {
            url = `api/admin/users/${slug}`;
            headers = {Authorization: `Bearer ${rootState.user.data.tokens.access_token}`};
            await dispatch('handleTokenValidity', {
                expires_on: rootState.user.data.tokens.expires_on,
                rememberMe: rootState.user.data.tokens.rememberMe,
                refresh_token: rootState.user.data.tokens.refresh_token,
            });
        }else {
            url = `api/users/${slug}`;
        }

        await axios({
            method: 'get',
            url,
            headers,
        }).then( res => {
            commit('set_single_user', res.data);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_users_isLoading_to_false'));
        return successResponse;
    },


    async updateUser({ commit, dispatch, rootState }, {slug, name, email, description, allergens, disliked_ingredients, password, is_admin}) {
        let successResponse = null;
        commit('set_users_isLoading_to_true');
        await dispatch('handleTokenValidity', {
            expires_on: rootState.user.data.tokens.expires_on,
            rememberMe: rootState.user.data.tokens.rememberMe,
            refresh_token: rootState.user.data.tokens.refresh_token,
        });
        let data = {name, email, description, allergens, disliked_ingredients, is_admin};
        if (password)
            data.password = password;

        await axios({
            method: 'put',
            url:`api/admin/users/${slug}`,
            data,
            headers: {
                Authorization: `Bearer ${rootState.user.data.tokens.access_token}`
            },
        }).then( res => {
            commit('set_single_user', res.data);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_users_isLoading_to_false'));
        return successResponse;
    },


    async createUser({ commit, dispatch, rootState }, { name, email, description, allergens, disliked_ingredients, password, is_admin }) {
        let successResponse = null;
        commit('set_users_isLoading_to_true');
        await dispatch('handleTokenValidity', {
            expires_on: rootState.user.data.tokens.expires_on,
            rememberMe: rootState.user.data.tokens.rememberMe,
            refresh_token: rootState.user.data.tokens.refresh_token,
        });

        await axios({
            method: 'post',
            url:`api/admin/users`,
            data:{name, email, description, allergens, disliked_ingredients, password, is_admin},
            headers: {
                Authorization: `Bearer ${rootState.user.data.tokens.access_token}`
            },
        }).then( res => {
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_users_isLoading_to_false'));
        return successResponse;
    },


    async uploadUserAvatar({ commit, rootState, dispatch }, {slug, avatar}) {
        let successResponse = null;
        commit('set_users_isLoading_to_true');

        await dispatch('handleTokenValidity', {
            expires_on: rootState.user.data.tokens.expires_on,
            rememberMe: rootState.user.data.tokens.rememberMe,
            refresh_token: rootState.user.data.tokens.refresh_token,
        });

        const avatarFormData = new  FormData();
        avatarFormData.append("avatar", avatar);

        const headers = {
            Authorization: `Bearer ${rootState.user.data.tokens.access_token}`,
            "Content-Type": "application/x-www-form-urlencoded",
        };

        await axios({
            method: 'post',
            url:`api/admin/users/${slug}/avatar`,
            headers,
            data: avatarFormData,
        }).then( res => {
            commit('set_users_avatar', res.data.avatar);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_users_isLoading_to_false'));
        return successResponse;
    },


    async deleteUserAvatar({ commit, rootState, dispatch }, slug) {
        let successResponse = null;
        commit('set_users_isLoading_to_true');

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
            url:`api/admin/users/${slug}/avatar`,
            headers,
        }).then( res => {
            commit('set_users_avatar', null);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_users_isLoading_to_false'));
        return successResponse;
    },
};
