<template>
    <nav role="navigation"
         aria-labelledby="auth-nav__title"
         class="auth-nav">
        <h2 id="auth-nav__title"
            class="auth-nav__title visually-hidden"
            role="heading"
            aria-level="2">
            Navigation connexion/inscription
        </h2>
        <ul class="auth-nav__list">
            <li class="auth-nav__item" :class="{'auth-nav__item--active': $route.name === 'login'}">
                <router-link class="auth-nav__link" :to="{ name: 'login' }">
                    Se connecter
                </router-link>
            </li>
            <li class="auth-nav__item" :class="{'auth-nav__item--active': $route.name === 'register'}">
                <router-link class="auth-nav__link" :to="{ name: 'register' }">
                    Créer un compte
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "AuthNav"
    }
</script>

<style scoped lang="scss">
    .auth-nav {
        height: 5rem;
    }

    .auth-nav__list {
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        width: 100%;
    }

    .auth-nav__item {
        width: 50%;
        border-bottom: 2px solid transparent;
        transition: 0.3s;
    }

    .auth-nav__item--active {
        border-bottom: 2px solid $color-3;
        background-color: $color-11;
    }

    .auth-nav__link {
        display: block;
        padding: 15px 20px;
        text-decoration: none;
        color: $color-3;
        transition: 0.3s;
    }

    .auth-nav__link:hover, .auth-nav__link:focus {
        background-color: $color-11;
    }

</style>