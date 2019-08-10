import router from '@/router';
import axios from 'axios';

export default {
    async login({ commit }, { email, password }) {
        let successResponse = null;
        commit('set_user_isLoading_to_true');
        await axios({
            method: 'post',
            url:'api/login',
            data:{email, password},
        }).then( res => {
            commit('set_user_data', res.data);
            commit('set_user_isLogged_to_true');
            successResponse = res;
        }).catch( err => {
            throw err.response;
        });
        commit('set_user_isLoading_to_false');
        return successResponse;
    },

    logout({ commit }, {route}) {
        let localStorage = window.localStorage;
        localStorage.removeItem('user');
        router.push(route.query.redirect || '/');
        commit('unset_user_data');
        commit('set_isLogged_to_false');
    },

    // get back a session from local storage
    retrieveSession({ commit }, {token}) {
        // commit('set_user_isLoaded_to_false');
        // getUserInfo(token)
        // .then((res_get) => {
        //     let localStorage = window.localStorage
        //
        //     let user = [];
        //     user = res_get.data['data'];
        //     user["token"] = token;
        //
        //     localStorage.setItem("user", JSON.stringify(res_get.data['data']));
        //     commit('set_user_data', user);
        //     commit('set_invalid_credentials_to_false');
        //     commit('set_isLogged_to_true');
        //     commit('set_user_isLoaded_to_true');
        // })
        // .catch( (e) => {
        //     localStorage.removeItem("user");
        //     console.log(e);
        //     commit('set_user_isLoaded_to_true');
        // });
    },

    register({ commit, dispatch }, { params, route }) {
        // webService('user', 'post', params).then( () => {
        //     dispatch('login', {email: params.email, psw: params.password, route});
        //     if (params.newsletter) {
        //         subscribeToNewsletter(params.email, params.role).then(res => {
        //             console.log('newsletter subscribe: ok');
        //         }).catch(err => {
        //             console.log('newsletter subscribe: ', err.message);
        //         });
        //     }
        // }).catch(err => {
        //     commit('set_user_errors', err.data.data);
        // });
        //
        // if (document.querySelector('.alert--error') !== null) {
        //     let domRect = document.querySelector('.alert--error').getBoundingClientRect();
        //     window.scrollTo(
        //         domRect.left + document.documentElement.scrollLeft,
        //         domRect.top + document.documentElement.scrollTop
        //     );
        // }
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
