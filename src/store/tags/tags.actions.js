import axios from 'axios';

export default {
    async getAllTags({ commit }) {
        let successResponse = null;
        commit('set_tags_isLoading_to_true');
        await axios({
            method: 'get',
            url:'api/tags',
        }).then( res => {
            commit('set_all_tags_data', res.data);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_tags_isLoading_to_false'));
        return successResponse;
    },


    async getAmountTags({ commit }) {
        let successResponse = null;
        commit('set_tags_isLoading_to_true');
        await axios({
            method: 'get',
            url:'api/tags/count',
        }).then( res => {
            commit('set_tags_amount', res.data);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_tags_isLoading_to_false'));
        return successResponse;
    },


    async deleteTag({ commit, dispatch, rootState }, slug) {
        let successResponse = null;
        commit('set_tags_isLoading_to_true');
        await dispatch('handleTokenValidity', {
            expires_on: rootState.user.data.tokens.expires_on,
            rememberMe: rootState.user.data.tokens.rememberMe,
            refresh_token: rootState.user.data.tokens.refresh_token,
        });
        await axios({
            method: 'delete',
            url:`api/admin/tags/${slug}`,
            headers: {
                Authorization: `Bearer ${rootState.user.data.tokens.access_token}`
            },
        }).then( res => {
            commit('delete_tag', slug);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_tags_isLoading_to_false'));
        return successResponse;
    },


    async getSingleTag({ commit }, slug) {
        let successResponse = null;
        commit('set_tags_isLoading_to_true');
        await axios({
            method: 'get',
            url:`api/tags/${slug}`,
        }).then( res => {
            commit('set_single_tag', res.data);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_tags_isLoading_to_false'));
        return successResponse;
    },


    async updateTag({ commit, dispatch, rootState }, {slug, name}) {
        let successResponse = null;
        commit('set_tags_isLoading_to_true');
        await dispatch('handleTokenValidity', {
            expires_on: rootState.user.data.tokens.expires_on,
            rememberMe: rootState.user.data.tokens.rememberMe,
            refresh_token: rootState.user.data.tokens.refresh_token,
        });
        await axios({
            method: 'put',
            url:`api/admin/tags/${slug}`,
            data:{name},
            headers: {
                Authorization: `Bearer ${rootState.user.data.tokens.access_token}`
            },
        }).then( res => {
            commit('set_single_tag', res.data);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_tags_isLoading_to_false'));
        return successResponse;
    },


    async createTag({ commit, dispatch, rootState }, { name }) {
        let successResponse = null;
        commit('set_tags_isLoading_to_true');
        await dispatch('handleTokenValidity', {
            expires_on: rootState.user.data.tokens.expires_on,
            rememberMe: rootState.user.data.tokens.rememberMe,
            refresh_token: rootState.user.data.tokens.refresh_token,
        });
        await axios({
            method: 'post',
            url:`api/admin/tags`,
            data:{name},
            headers: {
                Authorization: `Bearer ${rootState.user.data.tokens.access_token}`
            },
        }).then( res => {
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_tags_isLoading_to_false'));
        return successResponse;
    },
};
