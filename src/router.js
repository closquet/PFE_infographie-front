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
      component: () => import(/* webpackChunkName: "account-lazy-loading" */ '@/views/Account.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        displayedName: 'Connexion',
      },
      component: () => import(/* webpackChunkName: "login-lazy-loading" */ '@/views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        displayedName: 'Inscription',
      },
      component: () => import(/* webpackChunkName: "register-lazy-loading" */ '@/views/Register.vue')
    },


    {
      path: '/admin',
      meta: {
        displayedName: 'Back office',
        displayedSubName: 'Dashboard',
      },
      component: () => import(/* webpackChunkName: "admin-lazy-loading" */ '@/views/admin/Admin.vue'),
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          meta: {
            displayedName: 'Back office',
            displayedSubName: 'Dashboard',
          },
          component: () => import(/* webpackChunkName: "admin-dashboard-lazy-loading" */ '@/views/admin/subViews/Dashboard.vue'),
        },
        {
          path: 'ingredients',
          name: 'admin-ingredients',
          meta: {
            displayedName: 'Back office',
            displayedSubName: 'Ingrédients',
            resource: 'ingredient',
          },
          component: () => import(/* webpackChunkName: "admin-ingredients-lazy-loading" */ '@/views/admin/subViews/ResourceList.vue'),
        },
        {
          path: 'ingredients/create',
          name: 'admin-ingredient-create',
          meta: {
            displayedName: 'Back office',
            displayedSubName: 'Nouvel ingrédient',
            resource: 'ingredient',
          },
          component: () => import(/* webpackChunkName: "admin-ingredients-edit-lazy-loading" */ '@/views/admin/subViews/ResourceEditOrCreate.vue'),
        },
        {
          path: 'ingredients/:slug',
          name: 'admin-ingredient-edit',
          meta: {
            displayedName: 'Back office',
            displayedSubName: 'Ingrédients',
            resource: 'ingredient',
          },
          component: () => import(/* webpackChunkName: "admin-ingredients-edit-lazy-loading" */ '@/views/admin/subViews/ResourceEditOrCreate.vue'),
        },
        {
          path: 'allergens',
          name: 'admin-allergens',
          meta: {
            displayedName: 'Back office',
            displayedSubName: 'Allergènes',
            resource: 'allergen',
          },
          component: () => import(/* webpackChunkName: "admin-allergens-lazy-loading" */ '@/views/admin/subViews/ResourceList.vue'),
        },
        {
          path: 'allergens/create',
          name: 'admin-allergen-create',
          meta: {
            displayedName: 'Back office',
            displayedSubName: 'Nouvel allergène',
            resource: 'allergen',
          },
          component: () => import(/* webpackChunkName: "admin-allergens-edit-lazy-loading" */ '@/views/admin/subViews/ResourceEditOrCreate.vue'),
        },
        {
          path: 'allergens/:slug',
          name: 'admin-allergen-edit',
          meta: {
            displayedName: 'Back office',
            displayedSubName: 'Allergènes',
            resource: 'allergen',
          },
          component: () => import(/* webpackChunkName: "admin-allergens-edit-lazy-loading" */ '@/views/admin/subViews/ResourceEditOrCreate.vue'),
        },
        {
          path: 'tags',
          name: 'admin-tags',
          meta: {
            displayedName: 'Back office',
            displayedSubName: 'Tags',
            resource: 'tag',
          },
          component: () => import(/* webpackChunkName: "admin-tags-lazy-loading" */ '@/views/admin/subViews/ResourceList.vue'),
        },
        {
          path: 'tags/create',
          name: 'admin-tag-create',
          meta: {
            displayedName: 'Back office',
            displayedSubName: 'Nouveau tag',
            resource: 'tag',
          },
          component: () => import(/* webpackChunkName: "admin-tags-edit-lazy-loading" */ '@/views/admin/subViews/ResourceEditOrCreate.vue'),
        },
        {
          path: 'tags/:slug',
          name: 'admin-tag-edit',
          meta: {
            displayedName: 'Back office',
            displayedSubName: 'Tags',
            resource: 'tag',
          },
          component: () => import(/* webpackChunkName: "admin-tags-edit-lazy-loading" */ '@/views/admin/subViews/ResourceEditOrCreate.vue'),
        },
        {
          path: 'recipes',
          name: 'admin-recipes',
          meta: {
            displayedName: 'Back office',
            displayedSubName: 'Recettes',
            resource: 'recipe',
          },
          component: () => import(/* webpackChunkName: "admin-recipes-lazy-loading" */ '@/views/admin/subViews/ResourceList.vue'),
        },
        {
          path: 'recipes/create',
          name: 'admin-recipe-create',
          meta: {
            displayedName: 'Back office',
            displayedSubName: 'Nouvelle recette',
            resource: 'recipe',
          },
          component: () => import(/* webpackChunkName: "admin-recipes-edit-lazy-loading" */ '@/views/admin/subViews/ResourceEditOrCreate.vue'),
        },
        {
          path: 'recipes/:slug',
          name: 'admin-recipe-edit',
          meta: {
            displayedName: 'Back office',
            displayedSubName: 'Recettes',
            resource: 'recipe',
          },
          component: () => import(/* webpackChunkName: "admin-recipes-edit-lazy-loading" */ '@/views/admin/subViews/ResourceEditOrCreate.vue'),
        },
        {
          path: 'users',
          name: 'admin-users',
          meta: {
            displayedName: 'Back office',
            displayedSubName: 'Utilisateurs',
            resource: 'user',
          },
          component: () => import(/* webpackChunkName: "admin-users-lazy-loading" */ '@/views/admin/subViews/ResourceList.vue'),
        },
        {
          path: 'users/create',
          name: 'admin-user-create',
          meta: {
            displayedName: 'Back office',
            displayedSubName: 'Nouvel utilisateur',
            resource: 'user',
          },
          component: () => import(/* webpackChunkName: "admin-users-edit-lazy-loading" */ '@/views/admin/subViews/ResourceEditOrCreate.vue'),
        },
        {
          path: 'users/:slug',
          name: 'admin-user-edit',
          meta: {
            displayedName: 'Back office',
            displayedSubName: 'Utilisateurs',
            resource: 'user',
          },
          component: () => import(/* webpackChunkName: "admin-users-edit-lazy-loading" */ '@/views/admin/subViews/ResourceEditOrCreate.vue'),
        },
      ]
    },
    {
      path: '/*',
      redirect: '/'
    },
  ]
});

export default router;