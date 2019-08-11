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
        commit('set_user_isLoading_to_true');
        await axios({
            method: 'post',
            url:'api/login',
            data:{email, password},
        }).then( res => {
            commit('set_user_data', res.data);
            commit('set_user_isLogged_to_true');
            if (rememberMe) {
                secureStorage.setItem('aleafood_uc', {
                    email: email,
                    password: password,
                });
            }
            successResponse = res;
        }).catch( err => {
            throw err.response;
        }).finally( () => commit('set_user_isLoading_to_false'));
        return successResponse;
    },

    logout({ commit }) {
        secureStorage.removeItem('aleafood_uc');
        router.push({name: 'home'});
        commit('unset_user_data');
        commit('set_user_isLogged_to_false');
    },

    async register({ commit }, { token, name, email, password, rememberMe }) {
        let successResponse = null;
        commit('set_user_isLoading_to_true');
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
            commit('set_user_data', res.data);
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
        }).finally( () => commit('set_user_isLoading_to_false'));
        return successResponse;
    },

    addFavoriteAddress({ commit, rootState }, { params }) {
        return new Promise( (resolve, reject) => {

            // postUserInfo('patients/addresses', 'post', params, rootState.user.data.token).then( () => {
            //     resolve();
            //     commit('add_favorite_address', params);
            // }).catch(err => {
            //     reject(err);
            //     commit('set_user_errors', err.data);
            // });
        });
    },

    removeProfilePicture({ commit, rootState } ) {
        return new Promise( (resolve, reject) => {

            // postUserInfo('user/media/avatar', 'delete', {}, rootState.user.data.token).then( () => {
            //     resolve();
            // }).catch(err => {
            //     reject(err);
            //     commit('set_user_errors', err.data);
            // });
        });
    },
};
