<template>
    <div v-if="user.isLogged && user.data.is_admin"
         :class="`site-view site-view--${$route.name}`">

        <div class="sub-router-view" :class="{active: false}">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import router from "@/router";

    export default {
        name: "Admin",
        components: {
        },
        data: () => ({
        }),
        computed: {
            ...mapState([
                'user',
            ]),
        },
        beforeRouteEnter(to, from, next) {
            if (router.app.$store.state.user.isLogged && router.app.$store.state.user.data.is_admin) next();
            else if (!from.name && router.app.$store.state.user.isLoading) {
                router.app.$watch(`$store.state.user.isLoading`, function () {
                    if(router.app.$store.state.user.isLogged && router.app.$store.state.user.data.is_admin) {
                        next();
                    }else next(vm => vm.$router.push({name: 'home'}));
                });
            } else next(vm => vm.$router.push({name: 'home'}));

        },
    }
</script>

<style scoped lang="scss">
    .site-view {
        margin-top: $vertical-space-size-2;
        position: relative;
    }
</style>