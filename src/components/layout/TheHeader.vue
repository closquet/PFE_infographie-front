<template>
    <header class="site-header">
        <h1 aria-level="1"
            class="site-header__title"
            :class="{ 'visually-hidden': $route.name !== 'home'}"
            role="heading">
            Alea-food
        </h1>
        <h1 aria-level="1"
            class="site-header__title"
            :class="{ 'visually-hidden': $route.name === 'home'}"
            role="heading">
            {{pageTitle}}
        </h1>
        <MainNav/>
    </header>
</template>

<script>
    import MainNav from '@/components/layout/MainNav';
    export default {
        name: "TheHeader",
        components: {
            MainNav,
        },
        computed: {
            pageTitle() {
                return this.$route.meta.displayedName
            },
        }
    }
</script>

<style scoped lang="scss">
    .site-header {

    }

    .site-header__title {
        font-family: $page-title-font-family;
    }
</style>