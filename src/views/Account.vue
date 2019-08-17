<template>
    <div :class="`site-view site-view--${$route.name}`">
        <loading :active.sync="user.isLoading || allergens.isLoading"
                 :can-cancel="false"
                 :is-full-page="true"></loading>

        <form @submit.prevent="tryToSubmit"
              novalidate
              class="form form--account">

            <Field label="Email"
                   id="account-email"
                   type="email"
                   name="email"
                   aria-disabled="true"
                   :disabled="true"
                   v-model="user.data.email"/>

            <Field label="Votre nom (Visible par les autre utilisateurs)"
                   id="account-name"
                   type="text"
                   name="name"
                   :v="$v.form.name"
                   v-model="form.name"/>

            <template v-if="!allergens.isLoading">
                <Field label="Mes allergies"
                       id="account-allergens"
                       type="select"
                       :multiple="true"
                       :options="allergensOptions"
                       :v="$v.form.allergens"
                       v-model="form.allergens"/>
                <SmallLabelList :items="smallLabelListItems"/>
            </template>

            <Field type="checkbox"
                   label="Changer de mot de passe&nbsp;?"
                   id="edit-password"
                   v-model="form.editPassword"/>

            <template v-if="form.editPassword">
                <Field label="Ancien mot de passe"
                       id="account-password"
                       type="password"
                       name="password"
                       :v="$v.form.oldPassword"
                       v-model="form.oldPassword"/>
                
                <Field label="Nouveau mot de passe"
                       id="account-new-password"
                       type="password"
                       :v="$v.form.newPassword"
                       v-model="form.newPassword"/>

                <Field label="Confirmation du mot de passe"
                       id="account-repeatPassword"
                       type="password"
                       :v="$v.form.repeatPassword"
                       v-model="form.repeatPassword"/>
            </template>

            <BigBtn text="Enregistrer"/>
        </form>
        <ul v-if="responseErrors">
            <li class="response-errors__error" v-for="(error, index) in responseErrors" :key="index">
                {{error}}
            </li>
        </ul>
        <span v-if="responseSuccess" class="response-success">
            Modifications enregistrées.
        </span>
    </div>
</template>

<script>
    import router from "@/router";
    import Field from "@/components/fields/Field";
    import BigBtn from "@/components/BigBtn";
    import { required, minLength, sameAs } from 'vuelidate/lib/validators';
    import Loading from 'vue-loading-overlay';
    import { mapState } from 'vuex';
    import SmallLabelList from "@/components/SmallLabelList";

    export default {
        name: 'account',
        components: {
            Field,
            BigBtn,
            Loading,
            SmallLabelList,
        },
        data: () => ({
            form: {
                name: '',
                description: '',
                allergens: [],
                disliked_ingredients: [],
                editPassword: false,
                oldPassword: '',
                newPassword: '',
                repeatPassword: '',
            },
            responseErrors: [],
            responseSuccess: false,
        }),
        computed:{
            ...mapState([
                'user',
                'allergens',
            ]),
            allergensOptions() {
                return this.allergens.allAllergens.map( item => {
                    return {
                        text: item.name,
                        value: item.id,
                    };
                });
            },
            smallLabelListItems() {
                return this.allergens.allAllergens.length ?  this.allergens.allAllergens.filter( item => this.form.allergens.includes(item.id)) : [];
            },
        },
        methods: {
            setWatcher() {
                Object.keys(this.form).forEach( key => {
                    this.$watch(`form.${key}`, function () {
                        this.responseSuccess = false;
                    })
                });
            },
            tryToSubmit() {
                this.$v.$touch();
                this.responseErrors = [];
                this.responseSuccess = false;
                if (!this.$v.$invalid)
                    this.updateUser();
            },
            updateUser() {
                this.$store.dispatch('updateUserProfile', {
                    name: this.form.name,
                    description: this.form.description,
                    allergens: this.form.allergens,
                    disliked_ingredients: this.form.disliked_ingredients,
                    oldPassword: this.form.oldPassword,
                    newPassword: this.form.newPassword,
                    editPassword: this.form.editPassword,
                }).then( () => {
                    this.responseSuccess = true;
                    this.form.allergens = this.user.data.allergens.map( item => item.id);
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
                });
            },
        },
        beforeRouteEnter(to, from, next) {
            if (router.app.$store.state.user.isLogged) next();
            else if (!from.name && to.name === 'account' && router.app.$store.state.user.isLoading) {
                router.app.$watch(`$store.state.user.isLoading`, function () {
                    if(router.app.$store.state.user.isLogged) {
                        next();
                    }else next(vm => vm.$router.push({name: 'login'}));
                });
            } else next(vm => vm.$router.push({name: 'login'}));

        },
        created(){
            !this.allergens.allAllergens.length && this.$store.dispatch('getAllAllergens');
        },
        mounted() {
            if (this.user.isLogged) {
                this.form.name = this.user.data.name;
                this.form.description = this.user.data.description;
                this.form.allergens = this.user.data.allergens.map( item => item.id);
                this.form.disliked_ingredients = this.user.data.disliked_ingredients;
            }
            this.setWatcher();

        },
        validations: {
            form: {
                name: {
                    required,
                    minLength: minLength(2),
                    alphaAndSpaceAndHyphen: value => /^([a-zA-Z]+([\s-][a-zA-Z]+)*)+$/.test(value),
                },
                oldPassword: {
                    required: function (value) {
                        return !this.form.editPassword || !!value
                    },
                    minLength: minLength(8),
                },
                newPassword: {
                    required: function (value) {
                        return !this.form.editPassword || !!value
                    },
                    minLength: minLength(8),
                },
                repeatPassword: {
                    required: function (value) {
                        return !this.form.editPassword || !!value
                    },
                    sameAs: sameAs('newPassword'),
                },
            }
        }
    }
</script>
