<template>
    <nav role="navigation"
         aria-labelledby="main-nav__title"
         class="main-nav">
        <h2 id="main-nav__title"
            class="main-nav__title visually-hidden"
            role="heading"
            aria-level="2">
            Navigation principale
        </h2>
        <ul class="main-nav__list">
            <li class="main-nav__item main-nav__item--home">
                <router-link :to="{ name: 'home' }">
                    <span class="visually-hidden">Accueil</span>
                    <svg class="main-nav__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <g transform="translate(-41.048 -20.398)">
                            <rect width="3.143" height="8.882" transform="translate(44.19 27.515)"/><rect width="3.143" height="8.882" transform="translate(50.476 27.515)"/><path d="M130.048,19.693h16l-8-9.3Z" transform="translate(-89 10)"/>
                        </g>
                    </svg>
                </router-link>
            </li>
            <li class="main-nav__item main-nav__item--account">
                <router-link :to="{ name: accountRouteName }">
                    <span class="visually-hidden">{{ accountRouteDisplayedName }}</span>
                    <svg class="main-nav__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <defs><clipPath id="a"><rect width="16" height="16" fill="none"/></clipPath></defs><g clip-path="url(#a)"><path d="M0,370v-2c0-2.2,3.6-4,8-4s8,1.8,8,4v2Zm4-12a4,4,0,1,1,4,4A4,4,0,0,1,4,358Z" transform="translate(0 -354)"/></g>
                    </svg>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: "MainNav",
        computed: {
            ...mapState([
                'user'
            ]),
            UserIsLoggedIn() {
                return false;
            },
            accountRouteName() {
                return this.user.isLogged ? 'account' : 'login';
            },
            accountRouteDisplayedName() {
                return this.UserIsLoggedIn ? 'Mon compte' : 'Se connecter';
            },
        },
    }
</script>

<style scoped lang="scss">
    .main-nav__list {
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 20px;
    }
    .main-nav__icon {
        width: 20px;
        height: 20px;
        fill: $color-3;
    }
</style>