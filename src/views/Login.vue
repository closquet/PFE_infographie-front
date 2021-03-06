<template>
    <div :class="`site-view site-view--${$route.name}`">
        <loading :active.sync="user.isLoading"
                 :can-cancel="false"
                 :is-full-page="true"></loading>

        <h2 class="visually-hidden">
            Formulaire de connexion
        </h2>

        <form @submit.prevent="tryToSubmit"
              novalidate
              class="form form--login">

            <Field label="Email"
                   id="login-email"
                   type="email"
                   name="email"
                   :v="$v.form.email"
                   v-model="form.email"/>

            <Field label="Mot de passe"
                   id="login-password"
                   type="password"
                   name="password"
                   :v="$v.form.password"
                   v-model="form.password"/>

            <Field type="checkbox"
                   label="Se souvenir de moi"
                   id="login-remember-me"
                   v-model="form.rememberMe"/>

            <BigBtn text="Se connecter"/>
        </form>
        <ul class="response-errors" v-if="responseErrors.length">
            <li class="response-errors__error" v-for="(error, index) in responseErrors" :key="index">
                {{error}}
            </li>
        </ul>
    </div>
</template>

<script>
    import Field from "@/components/fields/Field";
    import BigBtn from "@/components/BigBtn";
    import { required, minLength, email } from 'vuelidate/lib/validators';
    import { mapState } from 'vuex';
    import Loading from 'vue-loading-overlay';

    import router from '@/router';

    export default {
        name: 'login',
        components: {
            Field,
            BigBtn,
            Loading,
        },
        data: () => ({
            form: {
                email: '',
                password: '',
                recaptchaToken: '',
                rememberMe: false,
            },
            responseErrors: [],
            recaptchaIsOk: false,
        }),
        computed:{
            ...mapState([
                'user'
            ]),
        },
        methods: {
            tryToSubmit() {
                this.$v.$touch();
                this.responseErrors = [];
                !this.$v.$invalid && this.login();
            },
            login() {
                this.$store.dispatch('login', {
                    email: this.form.email,
                    password: this.form.password,
                    rememberMe: this.form.rememberMe,
                }).then( () => {
                    this.$router.prevRoute.name ? this.$router.push({name: this.$router.prevRoute.name}) : this.$router.push({name: 'home'});
                }).catch( err => {
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
                        throw 'Problème rencontré';
                    }
                })
            },
        },
        beforeRouteEnter(to, from, next) { // if auto connect on app load, go home
            if (router.app.$store.state.user.isLogged) next( vm => vm.$router.push({name: 'home'}));
            else if (!from.name && to.name === 'login' && router.app.$store.state.user.isLoading) {
                router.app.$watch(`$store.state.user.isLoading`, function () {
                    if(router.app.$store.state.user.isLogged) {
                        next( vm => vm.$router.push({name: 'home'}));
                    } else next();
                });
            } else next();
        },
        validations: {
            form: {
                email: {
                    required,
                    email,
                },
                password: {
                    required,
                    minLength: minLength(8),
                },
            }
        }
    }
</script>