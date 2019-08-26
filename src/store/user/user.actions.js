import router from '@/router';
import axios from 'axios';

import CryptoJS from 'crypto-js';
import SecureStorage from 'secure-web-storage';

let SECRET_KEY = 'zert4g65se4drg54sdf56g4s56fdg';

let secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
        key = CryptoJS.SHA256(key, SECRET_KEY);

        return key.toString();
    },
    encrypt: function encrypt(data) {
        data = CryptoJS.AES.encrypt(data, SECRET_KEY);

        data = data.toString();

        return data;
    },
    decrypt: function decrypt(data) {
        data = CryptoJS.AES.decrypt(data, SECRET_KEY);

        data = data.toString(CryptoJS.enc.Utf8);

        return data;
    }
});

export default {
    async login({ commit }, { email, password, rememberMe }) {
        let successResponse = null;
        commit('set_logged_in_user_isLoading_to_true');
        await axios({
            method: 'post',
            url:'api/login',
            data:{email, password},
        }).then( res => {
            let expires_on = new Date(Date.now());
            expires_on.setSeconds(expires_on.getSeconds() + res.data.tokens.expires_in);
            res.data.tokens.expires_on = expires_on;

            if (rememberMe) {
                secureStorage.setItem('aleafood_tokens', {
                    access_token: res.data.tokens.access_token,
                    expires_on,
                    refresh_token: res.data.tokens.refresh_token,
                });
                res.data.tokens.rememberMe = rememberMe;
            }

            commit('set_logged_in_user_data', res.data);
            commit('set_user_isLogged_to_true');

            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_logged_in_user_isLoading_to_false'));
        return successResponse;
    },


    async handleTokenValidity({ dispatch }, {expires_on, rememberMe, refresh_token} ) {
        typeof expires_on !== 'object' && ( expires_on = new Date(expires_on) );
        const valid = expires_on > new Date(Date.now());

        if (!valid) {
            await dispatch('refreshToken', {refresh_token, rememberMe});
        }
    },


    async loginFromToken({ commit, state, dispatch }) {
        if (secureStorage.getItem('aleafood_tokens')) {
            let tokens = secureStorage.getItem('aleafood_tokens');
            if (tokens.access_token && tokens.expires_on && tokens.refresh_token) {
                let successResponse = null;
                commit('set_logged_in_user_isLoading_to_true');
                commit('refresh_logged_in_user_tokens', tokens);

                await dispatch('handleTokenValidity', {
                    expires_on: tokens.expires_on,
                    rememberMe: true,
                    refresh_token: tokens.refresh_token,
                });

                await axios({
                    method: 'get',
                    headers: {
                        Authorization: `Bearer ${state.data.tokens.access_token}`
                    },
                    url:'api/user',
                }).then( res => {
                    res.data.tokens = tokens;
                    res.data.tokens.rememberMe = true;

                    commit('set_logged_in_user_data', res.data);
                    commit('set_user_isLogged_to_true');
                    successResponse = res;
                }).catch( err => {
                    throw err.response;
                }).finally( () => commit('set_logged_in_user_isLoading_to_false'));

                return successResponse;
            }
        }
    },


    async refreshToken({ commit }, {refresh_token, rememberMe}) {
        let successResponse = null;
        await axios({
            method: 'post',
            data: {
                refresh_token,
            },
            url:'api/refresh-token',
        }).then( res => {
            let expires_on = new Date(Date.now());
            expires_on.setSeconds(expires_on.getSeconds() + res.data.expires_in);
            res.data.expires_on = expires_on;

            if (rememberMe) {
                secureStorage.setItem('aleafood_tokens', res.data);
                res.data.rememberMe = rememberMe;
            }

            successResponse = res;
            commit('refresh_logged_in_user_tokens', res.data);
        }).catch( err => {
            commit('set_user_isLogged_to_false');
            throw err.response;
        });
        return successResponse;
    },


    async logout({ commit, state, dispatch }) {
        commit('set_logged_in_user_isLoading_to_true');
        await dispatch('handleTokenValidity', {
            expires_on: state.data.tokens.expires_on,
            rememberMe: state.data.tokens.rememberMe,
            refresh_token: state.data.tokens.refresh_token,
        });
        await axios({
            method: 'post',
            headers: {
                Authorization: `Bearer ${state.data.tokens.access_token}`
            },
            url:'api/logout',
        });
        secureStorage.removeItem('aleafood_tokens');
        router.push({name: 'home'});
        commit('unset_logged_in_user_data');
        commit('set_user_isLogged_to_false');
        commit('set_logged_in_user_isLoading_to_false')
    },


    async register({ commit }, { token, name, email, password, rememberMe }) {
        let successResponse = null;
        commit('set_logged_in_user_isLoading_to_true');
        await axios({
            method: 'post',
            url:'api/register',
            data:{
                token,
                name,
                email,
                password,
            },
        }).then( res => {
            commit('set_logged_in_user_data', res.data);
            commit('set_user_isLogged_to_true');
            if (rememberMe) {
                secureStorage.setItem('aleafood_uc', {
                    email,
                    password,
                });
            }
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_logged_in_user_isLoading_to_false'));
        return successResponse;
    },


    async updateUserProfile({ commit, state, dispatch }, { name, editPassword, oldPassword, newPassword, description, allergens, disliked_ingredients }) {
        let successResponse = null;
        commit('set_logged_in_user_isLoading_to_true');

        await dispatch('handleTokenValidity', {
            expires_on: state.data.tokens.expires_on,
            rememberMe: state.data.tokens.rememberMe,
            refresh_token: state.data.tokens.refresh_token,
        });


        const headers = {
            Authorization: `Bearer ${state.data.tokens.access_token}`
        };

        let data = {
            disliked_ingredients,
            allergens,
            description,
        };

        if (editPassword) {
            data.old_password = oldPassword;
            data.new_password = newPassword;
        }

        state.data.name !== name && ( data.name = name );

        await axios({
            method: 'put',
            url:'api/user',
            headers,
            data,
        }).then( res => {
            commit('set_logged_in_user_data', res.data);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_logged_in_user_isLoading_to_false'));
        return successResponse;
    },


    async uploadLoggedInUserAvatar({ commit, state, dispatch }, avatar) {
        let successResponse = null;
        commit('set_logged_in_user_isLoading_to_true');

        await dispatch('handleTokenValidity', {
            expires_on: state.data.tokens.expires_on,
            rememberMe: state.data.tokens.rememberMe,
            refresh_token: state.data.tokens.refresh_token,
        });

        const avatarFormData = new  FormData();
        avatarFormData.append("avatar", avatar);

        const headers = {
            Authorization: `Bearer ${state.data.tokens.access_token}`,
            "Content-Type": "application/x-www-form-urlencoded",
        };

        await axios({
            method: 'post',
            url:'api/user/avatar',
            headers,
            data: avatarFormData,
        }).then( res => {
            commit('set_logged_in_user_avatar', res.data.avatar);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_logged_in_user_isLoading_to_false'));
        return successResponse;
    },


    async deleteLoggedInUserAvatar({ commit, state, dispatch }) {
        let successResponse = null;
        commit('set_logged_in_user_isLoading_to_true');

        await dispatch('handleTokenValidity', {
            expires_on: state.data.tokens.expires_on,
            rememberMe: state.data.tokens.rememberMe,
            refresh_token: state.data.tokens.refresh_token,
        });

        const headers = {
            Authorization: `Bearer ${state.data.tokens.access_token}`,
        };

        await axios({
            method: 'delete',
            url:'api/user/avatar',
            headers,
        }).then( res => {
            commit('set_logged_in_user_avatar', null);
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_logged_in_user_isLoading_to_false'));
        return successResponse;
    },


};
