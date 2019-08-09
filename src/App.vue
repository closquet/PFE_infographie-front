<template>
    <div id="app" class="app">
        <TheHeader/>
        <TheMain/>
        <TheFooter/>
    </div>
</template>

<script>
    import TheHeader from '@/components/layout/TheHeader';
    import TheMain from '@/components/layout/TheMain';
    import TheFooter from '@/components/layout/TheFooter';

    export default {
        name: "App",
        components: {
            TheHeader,
            TheMain,
            TheFooter,
        }
    }
</script>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    ul{
        list-style: none;
    }

    html {
        font-family: $labor-text-font-family, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: $root-font-size;
        color: $color-2;
        background-color: $color-1;
    }

    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        margin: 0;
        font-size: $font-size-6;
    }

    .visually-hidden{
        position: absolute !important;
        clip: rect(1px 1px 1px 1px) !important;
        line-height: 1px !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 1px !important;
        overflow: hidden !important;
        font-size: 1px !important;
        color: transparent !important;
    }

    p {
        margin-top: 0.3em;
    }

    button, input[type="submit"], input[type="reset"] {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
    }

    .g-recaptcha > div{
        margin-left: auto;
        margin-right: auto;
        margin-top: $vertical-space-size-4;
    }
</style>
