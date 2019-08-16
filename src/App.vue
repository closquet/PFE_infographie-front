<template>
    <div id="app" class="app">
        <TheHeader/>
        <TheMain/>
        <TheFooter/>
    </div>
</template>

<script>
    import CryptoJS from 'crypto-js';
    import SecureStorage from 'secure-web-storage';

    let SECRET_KEY = 'zert4g65se4drg54sdf56g4s56fdg';

    let secureStorage = new SecureStorage(localStorage, {
        hash: function hash(key) {
            key = CryptoJS.SHA256(key, SECRET_KEY);

            return key.toString();
        },
        encrypt: function encrypt(data) {
            data = CryptoJS.AES.encrypt(data, SECRET_KEY);

            data = data.toString();

            return data;
        },
        decrypt: function decrypt(data) {
            data = CryptoJS.AES.decrypt(data, SECRET_KEY);

            data = data.toString(CryptoJS.enc.Utf8);

            return data;
        }
    });

    import TheHeader from '@/components/layout/TheHeader';
    import TheMain from '@/components/layout/TheMain';
    import TheFooter from '@/components/layout/TheFooter';

    export default {
        name: "App",
        components: {
            TheHeader,
            TheMain,
            TheFooter,
        },
        data: () => ({
            responseErrors: [],
        }),
        methods: {
            async loginFromLocalStorage() {
                this.$store.dispatch('loginFromToken').catch( err => {
                    if (err && err.data) {
                        if (err.data.errors) {
                            Object.values(err.data.errors).forEach( item => {
                                this.responseErrors = [...this.responseErrors, item[0]]
                            })
                        }else if (err.data.error){
                            this.responseErrors = [err.data.error]
                        }
                    }else if (err && err.message){
                        this.responseErrors = ['Problème rencontré'];
                        throw err.message;
                    }else {
                        this.responseErrors = ['Problème rencontré'];
                        throw 'loginFromLocalStorage: Problème rencontré';
                    }
                });
            },
        },
        created() {
            this.loginFromLocalStorage();
        },
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
