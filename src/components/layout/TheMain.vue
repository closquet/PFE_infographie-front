<template>
    <main class="site-main"
          role="main">
        <router-view/>
    </main>
</template>

<script>
    export default {
        name: "TheMain"
    }
</script>

<style scoped>
    .site-main {
        flex-grow: 1;
    }
</style>