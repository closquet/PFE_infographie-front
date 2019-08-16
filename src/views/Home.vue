<template>
    <div :class="`site-view site-view--${$route.name}`">
        <loading :active.sync="user.isLoading"
                 :can-cancel="false"
                 :is-full-page="true"></loading>

        content home
    </div>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import { mapState } from 'vuex';

    export default {
        name: 'home',
        components: {
            Loading
        },
        computed:{
            ...mapState([
                'user'
            ]),
        },
    }
</script>
