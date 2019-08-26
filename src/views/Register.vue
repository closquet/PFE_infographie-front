<template>
    <div :class="`site-view site-view--${$route.name}`">
        <loading :active.sync="user.isLoading"
                 :can-cancel="false"
                 :is-full-page="true"></loading>

        <h2 class="visually-hidden">
            Formulaire de création de compte
        </h2>

        <form @submit.prevent="tryToSubmit"
              novalidate
              class="form form--register">

            <Field label="Votre nom"
                            labelInfo=" (Visible par les autre utilisateurs)"
                            id="register-name"
                            type="text"
                            name="name"
                            :v="$v.form.name"
                            v-model="form.name"/>

            <Field label="Email"
                            id="register-email"
                            type="email"
                            name="email"
                            :v="$v.form.email"
                            v-model="form.email"/>

            <Field label="Mot de passe"
                            id="register-password"
                            type="password"
                            name="password"
                            :v="$v.form.password1"
                            v-model="form.password1"/>

            <Field label="Confirmation mot de passe"
                            id="register-password2"
                            type="password"
                            :v="$v.form.password2"
                            v-model="form.password2"/>

            <Field type="checkbox"
                   label="Se souvenir de moi"
                   id="login-remember-me"
                   v-model="form.rememberMe"/>

            <Recaptcha :v="$v.form.recaptchaToken"
                       :callback="callback"/>

            <BigBtn text="Créer mon compte"/>
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
    import Recaptcha from "@/components/fields/Recaptcha";
    import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';
    import router from "@/router";
    import { mapState } from 'vuex';
    import Loading from 'vue-loading-overlay';
    import { personName } from '@/functions';

    export default {
        name: 'register',
        components: {
            Field,
            BigBtn,
            Recaptcha,
            Loading,
        },
        data: () => ({
            form: {
                name: '',
                email: '',
                password1: '',
                password2: '',
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
                if (!this.$v.$invalid && this.recaptchaIsOk)
                    this.register();
            },
            register() {

                this.$store.dispatch('register', {
                    token: this.form.recaptchaToken,
                    name: this.form.name,
                    email: this.form.email,
                    password: this.form.password1,
                    rememberMe: this.form.rememberMe,
                }).then( () => {
                    this.$router.push({name: 'home'})
                }).catch(err => {
                    if (err.data.errors) {
                        Object.values(err.data.errors).forEach( item => {
                            this.responseErrors = [...this.responseErrors, item[0]]
                        })
                    }else if (err.data.error){
                        this.responseErrors = [err.data.error]
                    }
                    window.grecaptcha.reset();
                    this.recaptchaIsOk = false;
                    this.form.recaptchaToken = '';
                    this.$v.$reset();
                });
            },
            callback(token) {
                this.$v.$reset();
                this.form.recaptchaToken = token;
                this.recaptchaIsOk = true;
                setTimeout( () => {
                    this.recaptchaIsOk = false;
                    this.form.recaptchaToken = '';
                    this.$v.$touch();
                }, 120000);
            },

        },
        beforeRouteEnter(to, from, next) {
            if (router.app.$store.state.user.isLogged) next( vm => vm.$router.push({name: 'home'}));
            else if (!from.name && to.name === 'register' && router.app.$store.state.user.isLoading) {
                router.app.$watch(`$store.state.user.isLoading`, function () {
                    if(router.app.$store.state.user.isLogged) {
                        next( vm => vm.$router.push({name: 'home'}));
                    } else next();
                });
            } else next();
        },
        validations: {
            form: {
                name: {
                    required,
                    minLength: minLength(2),
                    personName,
                },
                email: {
                    required,
                    email,
                },
                password1: {
                    required,
                    minLength: minLength(8),
                },
                password2: {
                    required,
                    sameAs: sameAs('password1')
                },
                recaptchaToken: {
                    required,
                },
            }
        }
    }
</script>