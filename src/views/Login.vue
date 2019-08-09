<template>
    <div :class="`site-view site-view--${$route.name}`">
        <form @submit.prevent="tryToSubmit"
              novalidate
              class="form form--login">

            <InputTextField label="Email"
                            id="login-email"
                            type="email"
                            name="email"
                            :required="true"
                            :v="$v.form.email"
                            v-model="form.email"/>

            <InputTextField label="Mot de passe"
                            id="login-password"
                            type="password"
                            name="password"
                            :required="true"
                            :v="$v.form.password"
                            v-model="form.password"/>

            <Recaptcha :v="$v.recaptchaToken"
                       :callback="callback"/>

            <BigBtn text="Se connecter"/>
        </form>
    </div>
</template>

<script>
    import InputTextField from "@/components/fields/InputTextField";
    import BigBtn from "@/components/BigBtn";
    import { required, minLength, email } from 'vuelidate/lib/validators';
    import Recaptcha from "@/components/Recaptcha";

    export default {
        name: 'login',
        components: {
            InputTextField,
            BigBtn,
            Recaptcha,
        },
        data: () => ({
            form: {
                email: '',
                password: '',
                recaptchaToken: '',
            },
            recaptchaIsOk: false,
        }),
        methods: {
            tryToSubmit() {
                this.$v.$touch();
                if (!this.$v.$invalid && this.recaptchaIsOk)
                    this.login();
            },
            login() {
                this.axios({
                    method: 'post',
                    url:'api/login',
                    data:{
                        token: this.form.recaptchaToken,
                        email: this.form.email,
                        password: this.form.password,
                    },
                }).then(response => {
                    console.log(response);
                    this.$router.push({name: 'home'})
                }).catch(err => {
                    console.log({err});
                })
            },
            callback(token) {
                this.$v.$reset();
                this.form.recaptchaToken = token;
                this.recaptchaIsOk = true;
            },

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
                recaptchaToken: {
                    required,
                },
            }
        }
    }
</script>
