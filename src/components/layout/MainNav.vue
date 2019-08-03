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
            <li class="main-nav__item
                main-nav__item--home">
                <router-link :to="{ name: 'home' }">
                    Accueil
                </router-link>
            </li>
            <li class="main-nav__item
                main-nav__item--account">
                <router-link :to="{ name: (false ? 'account' : 'login') }">
                    {{ false ? 'Mon compte' : 'Se connecter' }}
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "MainNav"
    }
</script>

<style scoped>

</style>