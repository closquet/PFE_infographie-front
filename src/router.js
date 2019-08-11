import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router =  new Router({
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
        displayedName: 'Connexion',
      },
      component: () => import(/* webpackChunkName: "home-lazy-loading" */ '@/views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        displayedName: 'Inscription',
      },
      component: () => import(/* webpackChunkName: "home-lazy-loading" */ '@/views/Register.vue')
    },
    {
      path: '/*',
      redirect: '/'
    },
  ]
});

export default router;