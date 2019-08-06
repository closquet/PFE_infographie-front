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
        </form>
    </div>
</template>

<script>
    import InputTextField from "@/components/fields/InputTextField";
    import { required, minLength, email } from 'vuelidate/lib/validators';


    export default {
        name: 'login',
        components: {
            InputTextField
        },
        data: () => ({
            form: {
                email: '',
                password: '',
            }
        }),
        methods: {
            tryToSubmit() {

            },
            submit() {

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
            }
        }
    }
</script>
