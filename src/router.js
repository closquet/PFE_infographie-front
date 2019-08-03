import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        displayedName: 'Accueil',
      },
      component: () => import(/* webpackChunkName: "home-lazy-loading" */ '@/views/Home.vue')
    },
    {
      path: '/account',
      name: 'account',
      meta: {
        displayedName: 'Mon compte',
      },
      component: () => import(/* webpackChunkName: "home-lazy-loading" */ '@/views/Account.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        displayedName: 'Se connecter',
      },
      component: () => import(/* webpackChunkName: "home-lazy-loading" */ '@/views/Login.vue')
    },
  ]
});
