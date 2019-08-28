<template>
    <div :class="`site-sub-view site-sub-view--${$route.name}`">
        <loading :active.sync="$store.state[$route.meta.resource + 's'].isLoading"
                 :can-cancel="false"
                 :is-full-page="true"></loading>
        <section :aria-labelledby="`${$route.meta.resource}-section-title`">
            <span v-if="!$route.params.slug && responseSuccess" class="response-success response-success--top">
                Resource<span v-if="previousResourceName"> "{{previousResourceName}}"</span> créée.
            </span>
            <SectionTitle :title="subViewTitle"
                          class="site-sub-view__title"
                          :class="{'visually-hidden': !$route.params.slug}"
                          level="3"
                          :id="`${$route.meta.resource}-section-title`"/>

            <form @submit.prevent="tryToSubmit"
                  novalidate
                  class="form">

                <div v-if="['user', 'recipe', 'ingredient'].includes(this.$route.meta.resource)"
                     class="site-sub-view__avatar-field">
                    <div v-if="$store.state[this.$route.meta.resource + 's'].single.avatar || $store.state[this.$route.meta.resource + 's'].single.thumbnail" class="site-sub-view__avatar-field__avatar-menu">
                        <button class="site-sub-view__avatar-field__avatar-btn site-sub-view__avatar-field__avatar-btn--edit"
                                @click.prevent="selectAvatar">
                            <span>Changer</span><span class="visually-hidden"> d'avatar</span>
                        </button>
                        <button class="site-sub-view__avatar-field__avatar-btn site-sub-view__avatar-field__avatar-btn--remove"
                                @click.prevent="deleteAvatar">
                            <span>Retirer</span><span class="visually-hidden"> l'avatar</span>
                        </button>
                    </div>

                    <input type="file" ref="resourceAvatarInput" @change="processFile($event)" style="display: none;">

                    <div :class="['site-sub-view__avatar-field__avatar-container', {'site-sub-view__avatar-field__avatar-container--no-avatar': !avatar}]">
                        <img class="site-sub-view__avatar-field__avatar" v-if="!form.selectedFile && avatar" :src="avatar" :alt="`Photo de ${form.name}`">
                        <div :key="$route.name" class="site-sub-view__avatar-field__new-avatar" v-if="form.selectedFile && avatar" :style="`background-image: url('${avatar}')`"></div>
                        <button title="Ajouter une photo" v-if="!avatar" @click.prevent="selectAvatar">
                            <span class="visually-hidden">Ajouter une photo</span>
                            <svg class="site-sub-view__avatar-field__no-avatar-svg"
                                 version="1.2" baseProfile="tiny" id="Calque_1"
                                 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20"
                                 xml:space="preserve">
                                    <path d="M10,7.49c-2.26,0-4.09,1.83-4.09,4.09c0,2.26,1.83,4.09,4.09,4.09c2.26,0,4.09-1.83,4.09-4.09C14.09,9.32,12.26,7.49,10,7.49z M10,13.91c-1.29,0-2.34-1.05-2.34-2.34c0-1.29,1.05-2.34,2.34-2.34c1.29,0,2.34,1.05,2.34,2.34C12.34,12.87,11.29,13.91,10,13.91z"/><circle cx="10" cy="11.58" r="1.84"/><path d="M18.88,5.38h-3.17l-0.77-2.5c-0.15-0.48-0.61-0.8-1.14-0.8H9.52C9,2.07,8.54,2.4,8.39,2.88l-0.77,2.5H6.05V4.43c0-0.1-0.08-0.18-0.18-0.18H5.26V4.14c0-0.1-0.08-0.18-0.18-0.18H2.61c-0.1,0-0.18,0.08-0.18,0.18v0.11H1.83c-0.1,0-0.18,0.08-0.18,0.18v0.95H1.12C0.5,5.38,0,5.88,0,6.5v10.31c0,0.62,0.5,1.12,1.12,1.12h17.76c0.62,0,1.12-0.5,1.12-1.12V6.5C20,5.88,19.5,5.38,18.88,5.38z M9.3,3.37c0.11-0.35,0.45-0.6,0.84-0.6h3.17c0.39,0,0.73,0.24,0.84,0.6l0.62,2.01H8.68L9.3,3.37zM10,17.08c-3.04,0-5.5-2.46-5.5-5.5c0-2.12,1.2-3.96,2.96-4.88C7.82,6.51,8.2,6.37,8.6,6.26C9.05,6.14,9.52,6.07,10,6.07c0.95,0,1.84,0.24,2.62,0.66c0.36,0.19,0.69,0.43,1,0.7c1.16,1.01,1.89,2.49,1.89,4.15C15.5,14.62,13.04,17.08,10,17.08z"/>
                            </svg>
                            <svg class="site-sub-view__avatar-field__no-avatar-svg-add"
                                 version="1.2" baseProfile="tiny" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                 x="0px" y="0px" viewBox="0 0 4 4"
                                 xml:space="preserve">
                                <path d="M3.7,1.4H2.6V0.3C2.6,0.2,2.4,0,2.2,0H1.8C1.6,0,1.4,0.2,1.4,0.3v1.1H0.3C0.2,1.4,0,1.6,0,1.8v0.5c0,0.2,0.2,0.3,0.3,0.3h1.1v1.1C1.4,3.8,1.6,4,1.8,4h0.5c0.2,0,0.3-0.2,0.3-0.3V2.6h1.1C3.8,2.6,4,2.4,4,2.2V1.8C4,1.6,3.8,1.4,3.7,1.4z"/>
                            </svg>
                        </button>
                    </div>


                </div>
                <button v-if="form.selectedFile" class="site-sub-view__cancelAvatarBtn" @click.prevent="cancelSelectedAvatar">
                    Annuler
                </button>

                <ul class="avatar-response response-errors" v-if="avatarResponseErrors.length">
                    <li class="response-errors__error" v-for="(error, index) in avatarResponseErrors" :key="index">
                        {{error}}
                    </li>
                </ul>
                <span v-if="avatarResponseSuccess" class="avatar-response response-success">
                    Modifications enregistrées.
                </span>

                <Field label="Nom"
                       :labelInfo="$route.params.slug ? ' (change le slug automatiquement)' : ''"
                       id="resource-title"
                       type="text"
                       ref="nameField"
                       :v="$v.form.name"
                       v-model="form.name"/>

                <Field v-if="['user'].includes(this.$route.meta.resource)"
                       label="Email"
                       id="resource-email"
                       type="email"
                       name="email"
                       :v="$v.form.email"
                       v-model="form.email"/>

                <Field v-if="['user'].includes(this.$route.meta.resource)"
                       label="Mot de passe"
                       id="resource-password"
                       type="password"
                       name="password"
                       placeholder="••••••••"
                       :v="$v.form.password"
                       v-model="form.password"/>

                <Field v-if="['recipe', 'user'].includes(this.$route.meta.resource)"
                       label="Présentation/description"
                       id="resource-description"
                       type="textarea"
                       rows="5"
                       v-model="form.description"/>

                <Field v-if="['recipe'].includes(this.$route.meta.resource)"
                       label="Temps de préparation"
                       labelInfo=" (en minutes)"
                       id="resource-prep-time"
                       type="text"
                       :v="$v.form.preparation_time"
                       v-model="form.preparation_time"/>

                <Field v-if="['recipe'].includes(this.$route.meta.resource)"
                       label="Temps de cuisson total"
                       labelInfo=" (en minutes)"
                       id="resource-cooking-time"
                       type="text"
                       :v="$v.form.cooking_time"
                       v-model="form.cooking_time"/>

                <Field v-if="['recipe'].includes(this.$route.meta.resource)"
                       label="Nombre de personnes"
                       id="resource-persons"
                       type="text"
                       :v="$v.form.persons"
                       v-model="form.persons"/>

                <template v-if="['recipe'].includes(this.$route.meta.resource) && !tags.isLoading">
                    <Field label="Tags"
                           id="resource-tags"
                           type="select"
                           :hideSelected="true"
                           :multiplex="true"
                           :key="'tags' + tagsFieldKey"
                           :options="tagsOptions"
                           @input="addTag"/>
                    <SmallLabelList @click="removeTag"
                                    :items="tagsSmallLabelList"/>
                </template>

                <template v-if="['recipe'].includes(this.$route.meta.resource) && !ingredients.isLoading">
                    <div v-if="this.form.ingredients.length"
                         class="site-sub-view__repeater">
                        <div v-for="(item, index) in form.ingredients" :key="index"
                             class="site-sub-view__repeater__item">
                            <MidBtn class="site-sub-view__mid-btn site-sub-view__mid-btn--remove"
                                    @click="removeIngredientInRecipe(index)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5.426 5.426">
                                    <g transform="translate(1.061 1.061)">
                                        <line x2="3.305" y2="3.305" fill="none" stroke-linecap="round" stroke-width="1"/>
                                        <line x2="3.305" y2="3.305" transform="translate(3.305) rotate(90)" fill="none" stroke-linecap="round" stroke-width="1"/>
                                    </g>
                                </svg>Supprimer l'ingrédient {{index + 1}}
                            </MidBtn>

                            <Field label="Nom de l'ingrédient"
                                   :id="`resource-recipe-ingredient-${index}`"
                                   type="select"
                                   :multiplex="true"
                                   :options="ingredientsOptions"
                                   :v="$v.form.ingredients.$each[index].ingredient_id"
                                   v-model="form.ingredients[index].ingredient_id"/>

                            <Field label="Détail"
                                   labelInfo=" (s'affichera à côté du nom de l'ingrédient)"
                                   id="resource-measure"
                                   type="text"
                                   :v="$v.form.ingredients.$each[index].detail"
                                   v-model="form.ingredients[index].detail"/>

                            <Field label="Quantité"
                                   id="resource-amount"
                                   type="text"
                                   :v="$v.form.ingredients.$each[index].amount"
                                   v-model="form.ingredients[index].amount"/>

                            <Field label="Mesure"
                                   id="resource-measure"
                                   type="text"
                                   :v="$v.form.ingredients.$each[index].measure"
                                   v-model="form.ingredients[index].measure"/>
                        </div>
                    </div>

                    <MidBtn class="site-sub-view__mid-btn site-sub-view__mid-btn--add"
                            @click="addIngredientInRecipe">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5.426 5.426">
                            <g transform="translate(1.061 1.061)">
                                <line x2="3.305" y2="3.305" fill="none" stroke-linecap="round" stroke-width="1"/>
                                <line x2="3.305" y2="3.305" transform="translate(3.305) rotate(90)" fill="none" stroke-linecap="round" stroke-width="1"/>
                            </g>
                        </svg>Ajouter un ingrédient
                    </MidBtn>

                    <div v-if="this.form.steps.length"
                         class="site-sub-view__repeater">
                        <div v-for="(item, index) in form.steps" :key="index"
                             class="site-sub-view__repeater__item">
                            <MidBtn class="site-sub-view__mid-btn site-sub-view__mid-btn--remove"
                                    @click="removeStepInRecipe(index)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5.426 5.426">
                                    <g transform="translate(1.061 1.061)">
                                        <line x2="3.305" y2="3.305" fill="none" stroke-linecap="round" stroke-width="1"/>
                                        <line x2="3.305" y2="3.305" transform="translate(3.305) rotate(90)" fill="none" stroke-linecap="round" stroke-width="1"/>
                                    </g>
                                </svg>Supprimer l'étape {{index + 1}}
                            </MidBtn>

                            <Field :label="`Étape ${index + 1}`"
                                   :id="`resource-recipe-step-${index}`"
                                   type="textarea"
                                   rows="5"
                                   :v="$v.form.steps.$each[index]"
                                   v-model="form.steps[index]"/>
                        </div>
                    </div>

                    <MidBtn class="site-sub-view__mid-btn site-sub-view__mid-btn--add"
                            @click="addStepInRecipe">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5.426 5.426">
                            <g transform="translate(1.061 1.061)">
                                <line x2="3.305" y2="3.305" fill="none" stroke-linecap="round" stroke-width="1"/>
                                <line x2="3.305" y2="3.305" transform="translate(3.305) rotate(90)" fill="none" stroke-linecap="round" stroke-width="1"/>
                            </g>
                        </svg>Ajouter une étape
                    </MidBtn>
                </template>

                <template v-if="['ingredient', 'user'].includes(this.$route.meta.resource) && !allergens.isLoading">
                    <Field :label="this.$route.meta.resource === 'user' ? 'Les allergies' : 'Allergènes'"
                           id="resource-allergens"
                           type="select"
                           :hideSelected="true"
                           :multiplex="true"
                           :key="'allergens' + allergensFieldKey"
                           :options="allergensOptions"
                           @input="addAllergen"/>
                    <SmallLabelList @click="removeAllergen"
                                    :items="allergensSmallLabelList"/>
                </template>

                <template v-if="['user'].includes(this.$route.meta.resource) && !ingredients.isLoading">
                    <Field label="Ce que je n'aime pas"
                           id="resource-disliked-ingredients"
                           type="select"
                           :hideSelected="true"
                           :key="'dislikedIngredients' + dislikedIngredientsFieldKey"
                           :options="ingredientsOptions"
                           @input="addDislikedIngredient"/>
                    <SmallLabelList @click="removeIngredient"
                                    :items="ingredientsSmallLabelList"/>

                    <Field type="checkbox"
                           label="Est administrateur"
                           id="resource-isAdmin"
                           v-model="form.is_admin"/>
                </template>

                <Field v-if="['ingredient'].includes(this.$route.meta.resource)"
                       label="Saisons"
                       labelInfo=" (aucun mois équivaut à toute l'année)"
                       id="resource-saisons"
                       type="select"
                       :hideSelected="true"
                       :multiplex="true"
                       :key="'seasons' + seasonsFieldKey"
                       :options="seasonsOptions"
                       @input="addSeason"/>
                <SmallLabelList @click="removeSeason"
                                :items="seasonsSmallLabelList"/>

                <Field v-if="['ingredient'].includes(this.$route.meta.resource) && !ingredientSubCats.isLoading"
                       label="Type d'ingrédients"
                       id="resource-sub-cat"
                       :key="form.sub_cat_id"
                       type="select"
                       :multiplex="true"
                       :options="ingredientSubCatsOptions"
                       :v="$v.form.sub_cat_id"
                       v-model="form.sub_cat_id"/>


                <BigBtn text="Enregistrer"/>
            </form>
            <ul class="response-errors" v-if="responseErrors.length">
                <li class="response-errors__error" v-for="(error, index) in responseErrors" :key="index">
                    {{error}}
                </li>
            </ul>
            <span v-if="$route.params.slug && responseSuccess" class="response-success">
                Modifications enregistrées.
            </span>
        </section>
    </div>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import { mapState } from 'vuex';
    import SectionTitle from "@/components/SectionTitle";
    import Field from "@/components/fields/Field";
    import { required, minLength, maxLength, email, integer, maxValue } from 'vuelidate/lib/validators';
    import {personName, upFirstLetter} from '@/functions';
    import BigBtn from "@/components/BigBtn";
    import SmallLabelList from "@/components/SmallLabelList";
    import MidBtn from "@/components/MidBtn";

    export default {
        name: "ResourceEditOrCreate",
        components: {
            Loading,
            SectionTitle,
            Field,
            BigBtn,
            SmallLabelList,
            MidBtn,
        },
        data: () => ({
            form: {
                allergens: [],
                ingredients: [],
                tags: [],
                steps: [],
                description: '',
                disliked_ingredients: [],
                editPassword: false,
                name: '',
                email: '',
                password: '',
                preparation_time: '',
                cooking_time: '',
                persons: '',
                seasons: [],
                sub_cat_id: '',
                is_admin: 0,
                selectedFile: null,
            },
            previousResourceName: '',
            allergensFieldKey: 0,
            dislikedIngredientsFieldKey: 0,
            seasonsFieldKey: 0,
            tagsFieldKey: 0,
            responseErrors: [],
            avatarResponseErrors: [],
            avatarResponseSuccess: false,
            responseSuccess: false,
            seasonsOptions: [
                {
                    text: 'Janvier',
                    value: 1,
                },
                {
                    text: 'Février',
                    value: 2,
                },
                {
                    text: 'Mars',
                    value: 3,
                },
                {
                    text: 'Avril',
                    value: 4,
                },
                {
                    text: 'Mai',
                    value: 5,
                },
                {
                    text: 'Juin',
                    value: 6,
                },
                {
                    text: 'Juillet',
                    value: 7,
                },
                {
                    text: 'Août',
                    value: 8,
                },
                {
                    text: 'Septembre',
                    value: 9,
                },
                {
                    text: 'Octobre',
                    value: 10,
                },
                {
                    text: 'Novembre',
                    value: 11,
                },
                {
                    text: 'Décembre',
                    value: 12,
                },
            ],
            avatar: null,
        }),
        computed: {
            ...mapState([
                'allergens',
                'ingredients',
                'ingredientSubCats',
                'tags',
                'users',
            ]),
            subViewTitle() {
                return this.$route.params.slug ? this.$store.state[this.$route.meta.resource + 's'].single.name : 'Formulaire de créations';
            },
            allergensOptions() {
                return this.allergens.all.map( item => {
                    return {
                        text: item.name,
                        value: item.id,
                    };
                });
            },
            tagsOptions() {
                return this.tags.all.map( item => {
                    return {
                        text: item.name,
                        value: item.id,
                    };
                });
            },
            ingredientsOptions() {
                return this.ingredients.all.map( item => {
                    return {
                        text: item.name,
                        value: item.id,
                    };
                });
            },
            ingredientSubCatsOptions() {
                return this.ingredientSubCats.all.map( item => {
                    return {
                        text: item.name,
                        value: item.id,
                    };
                });
            },
            allergensSmallLabelList() {
                return this.allergens.all.length ?  this.allergens.all.filter( item => this.form.allergens.includes(item.id)) : [];
            },
            tagsSmallLabelList() {
                return this.tags.all.length ?  this.tags.all.filter( item => this.form.tags.includes(item.id)) : [];
            },
            ingredientsSmallLabelList() {
                return this.ingredients.all.length ?  this.ingredients.all.filter( item => this.form.disliked_ingredients.includes(item.id)) : [];
            },
            seasonsSmallLabelList() {
                let list = [];
                this.seasonsOptions.forEach( item => {
                    if (this.form.seasons.includes(item.value)){
                        list = [...list,
                            {
                                id: item.value,
                                name: item.text
                            }
                        ];
                    }
                });
                return list;
            },
        },
        methods: {
            tryToSubmit() {
                this.$v.$touch();
                this.responseErrors = [];
                this.avatarResponseErrors = [];
                this.responseSuccess = false;
                this.avatarResponseSuccess = false;
                if (this.$v.form.ingredients && !this.$v.form.ingredients.required)
                    this.responseErrors = [...this.responseErrors, 'Champs ingrédients requis'];
                if (this.$v.form.steps && !this.$v.form.steps.required)
                    this.responseErrors = [...this.responseErrors, 'Champs étapes requis'];
                if (!this.$v.$invalid)
                    this.submit();
            },
            submit() {
                if (this.$route.params.slug) {
                    this.update();
                }else {
                    this.create();
                }
            },
            refreshMultiSelectField() {
                this.allergensFieldKey++;
                this.dislikedIngredientsFieldKey++;
                this.seasonsFieldKey++;
                this.tagsFieldKey++;
            },
            create() {
                this.$store.dispatch(`create${upFirstLetter(this.$route.meta.resource)}`, this.form).then( (res) => {
                    if (this.form.selectedFile) {
                        this.$store.dispatch(`upload${upFirstLetter(this.$route.meta.resource)}Avatar`, {avatar: this.form.selectedFile, slug: res.data.slug}).then( () => {
                            setTimeout( () => {this.responseSuccess = true;}, 100);
                            this.avatar = null;
                            this.form.selectedFile = null;
                            this.$refs.resourceAvatarInput.value = '';
                            this.refreshMultiSelectField();
                            this.$store.commit(`unset_single_${this.$route.meta.resource}`);
                            this.previousResourceName = this.form.name;
                            this.form = {
                                allergens: [],
                                ingredients: [],
                                tags: [],
                                steps: [],
                                description: '',
                                disliked_ingredients: [],
                                editPassword: false,
                                name: '',
                                email: '',
                                password: '',
                                preparation_time: '',
                                cooking_time: '',
                                persons: '',
                                seasons: [],
                                sub_cat_id: '',
                                is_admin: 0,
                                selectedFile: null,
                            };
                            window.scrollTo(0,0);
                            this.$v.$reset();
                            setTimeout( () => {
                                document.getElementById('resource-title') && document.getElementById('resource-title').focus();
                                this.responseSuccess = true;
                                }, 100);
                        }).catch( err => {
                            this.catchAction(err);
                        });
                    }else {
                        this.refreshMultiSelectField();
                        window.scrollTo(0,0);
                        this.previousResourceName = this.form.name;
                        this.form = {
                            allergens: [],
                            ingredients: [],
                            tags: [],
                            steps: [],
                            description: '',
                            disliked_ingredients: [],
                            editPassword: false,
                            name: '',
                            email: '',
                            password: '',
                            preparation_time: '',
                            cooking_time: '',
                            persons: '',
                            seasons: [],
                            sub_cat_id: '',
                            is_admin: 0,
                            selectedFile: null,
                        };
                        document.getElementById('resource-title') && document.getElementById('resource-title').focus();
                        this.$v.$reset();
                        setTimeout( () => {this.responseSuccess = true;}, 100);
                    }
                }).catch( err => {
                    this.catchAction(err);
                });
            },
            update() {
                this.$store.dispatch(`update${upFirstLetter(this.$route.meta.resource)}`, {
                    ...this.form,
                    slug: this.$store.state[this.$route.meta.resource + 's'].single.slug
                }).then( () => {
                    const slug = this.$store.state[this.$route.meta.resource + 's'].single.slug;
                    this.$router.push({name: `admin-${this.$route.meta.resource}-edit`, params: {slug}});
                    if (this.form.selectedFile) {
                        this.$store.dispatch(`upload${upFirstLetter(this.$route.meta.resource)}Avatar`, {avatar: this.form.selectedFile, slug}).then( () => {
                            setTimeout( () => {this.responseSuccess = true;}, 100);
                            this.cancelSelectedAvatar();
                        }).catch( err => {
                            this.catchAction(err);
                        });
                    }else
                        setTimeout( () => {
                            this.responseSuccess = true;
                            }, 100);
                }).catch( err => {
                    this.catchAction(err);
                });
            },
            catchAction(err) {
                if (err && err.data) {
                    if (err.data.errors) {
                        Object.values(err.data.errors).forEach( item => {
                            this.responseErrors = [...this.responseErrors, item[0]];
                        });
                    }else if (err.data.error){
                        this.responseErrors = [err.data.error];
                    }
                }else if (err && err.message){
                    this.responseErrors = ['Problème rencontré'];
                    throw err.message;
                }else {
                    this.responseErrors = ['Problème rencontré'];
                    throw 'Problème rencontré';
                }
            },
            setWatcher() {
                Object.keys(this.form).forEach( key => {
                    this.$watch(`form.${key}`, function () {
                        this.responseSuccess = false;
                        this.avatarResponseSuccess = false;
                    })
                });
            },
            removeAllergen(id) {
                this.form.allergens = this.form.allergens.filter( item => item !== id);
            },
            removeTag(id) {
                this.form.tags = this.form.tags.filter( item => item !== id);
            },
            removeIngredient(id) {
                this.form.disliked_ingredients = this.form.disliked_ingredients.filter( item => item !== id);
            },
            removeSeason(id) {
                this.form.seasons = this.form.seasons.filter( item => item !== id);
            },
            addAllergen(value) {
                if (!this.form.allergens.includes(value))
                    this.form.allergens = [...this.form.allergens, value];
            },
            addTag(value) {
                if (!this.form.tags.includes(value))
                    this.form.tags = [...this.form.tags, value];
            },
            addDislikedIngredient(value) {
                if (!this.form.disliked_ingredients.includes(value))
                    this.form.disliked_ingredients = [...this.form.disliked_ingredients, value];
            },
            addSeason(value) {
                if (!this.form.seasons.includes(value))
                    this.form.seasons = [...this.form.seasons, value];
            },
            addIngredientInRecipe() {
                this.responseErrors = [];
                this.avatarResponseErrors = [];
                this.form.ingredients.push({
                    ingredient_id: null,
                    detail: null,
                    amount: null,
                    measure: null
                });
                this.$v.$reset();
            },
            addStepInRecipe() {
                this.responseErrors = [];
                this.avatarResponseErrors = [];
                this.form.steps.push('');
                this.$v.$reset();
            },
            removeIngredientInRecipe(index) {
                this.form.ingredients.splice(index, 1);
                this.$v.$reset();
            },
            removeStepInRecipe(index) {
                this.form.steps.splice(index, 1);
                this.$v.$reset();
            },
            getAnnexResources() {
                if (['user', 'ingredient'].includes(this.$route.meta.resource)){
                    !this.allergens.all.length && this.$store.dispatch('getAllAllergens');
                }
                if (['user', 'recipe'].includes(this.$route.meta.resource)){
                    !this.ingredients.all.length && this.$store.dispatch('getAllIngredients');
                }
                if (['ingredient'].includes(this.$route.meta.resource)){
                    this.$store.dispatch('getAllIngredientSubCats');
                }
                if (['recipe'].includes(this.$route.meta.resource)){
                    this.$store.dispatch('getAllTags');
                }
            },
            selectAvatar() {
                this.responseErrors = [];
                this.avatarResponseErrors = [];
                this.responseSuccess = false;
                this.avatarResponseSuccess = false;
                this.$refs.resourceAvatarInput.click();
            },
            cancelSelectedAvatar() {
                if (this.$route.meta.resource === 'user' && this.$store.state[this.$route.meta.resource + 's'].single.avatar)
                    this.avatar = `${this.axios.defaults.baseURL}/storage/${this.$store.state[this.$route.meta.resource + 's'].single.avatar}`;
                else if(this.$store.state[this.$route.meta.resource + 's'].single.thumbnail)
                    this.avatar = `${this.axios.defaults.baseURL}/storage/${this.$store.state[this.$route.meta.resource + 's'].single.thumbnail}`;
                else
                    this.avatar = null;
                this.form.selectedFile = null;
                this.$refs.resourceAvatarInput.value = '';
            },
            processFile(event) {
                if (event.target.files[0]){
                    const file = event.target.files[0];
                    const supportedFormats = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];

                    if (file.size > 2000000) {
                        this.avatarResponseErrors = [...this.avatarResponseErrors, 'Le fichier ne doit pas dépasser 2 MO'];
                        if (this.$route.meta.resource === 'user' && this.$store.state[this.$route.meta.resource + 's'].single.avatar)
                            this.avatar = `${this.axios.defaults.baseURL}/storage/${this.$store.state[this.$route.meta.resource + 's'].single.avatar}`;
                        else if(this.$store.state[this.$route.meta.resource + 's'].single.thumbnail)
                            this.avatar = `${this.axios.defaults.baseURL}/storage/${this.$store.state[this.$route.meta.resource + 's'].single.thumbnail}`;
                        else
                            this.avatar = null;
                    }
                    if (!supportedFormats.includes(file.type)){
                        this.avatarResponseErrors = [...this.avatarResponseErrors, 'Formats supporté: jpeg,png,jpg,gif'];
                        if (this.user.data.avatar)
                            if (this.$route.meta.resource === 'user')
                                (this.avatar = `${this.axios.defaults.baseURL}/storage/${this.$store.state[this.$route.meta.resource + 's'].single.avatar}`);
                            else
                                (this.avatar = `${this.axios.defaults.baseURL}/storage/${this.$store.state[this.$route.meta.resource + 's'].single.thumbnail}`);
                        else
                            this.avatar = null;
                    }
                    if (!this.avatarResponseErrors.length) {
                        this.form.selectedFile = event.target.files[0];
                        let reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = ev => {
                            this.avatar = ev.target.result;
                        };
                    }
                }
            },
            deleteAvatar() {
                this.$store.dispatch(`delete${upFirstLetter(this.$route.meta.resource)}Avatar`, this.$route.params.slug).then( () => {
                    this.avatarResponseSuccess = true;
                    this.form.selectedFile = null;
                    this.avatar = null;
                }).catch( err => {
                    this.catchAction(err);
                });
            },
        },
        created() {
            this.$store.commit(`unset_single_${this.$route.meta.resource}`);
            if (this.$route.params.slug){
                this.$store.dispatch(`getSingle${upFirstLetter(this.$route.meta.resource)}`, this.$route.params.slug).then( () => {
                    const allergens = this.$store.state[this.$route.meta.resource + 's'].single.allergens;
                    const ingredients = this.$store.state[this.$route.meta.resource + 's'].single.ingredients;
                    const tags = this.$store.state[this.$route.meta.resource + 's'].single.tags;
                    const steps = this.$store.state[this.$route.meta.resource + 's'].single.steps;
                    const description = this.$store.state[this.$route.meta.resource + 's'].single.description;
                    const disliked_ingredients = this.$store.state[this.$route.meta.resource + 's'].single.disliked_ingredients;
                    const editPassword = this.$store.state[this.$route.meta.resource + 's'].single.editPassword;
                    const name = this.$store.state[this.$route.meta.resource + 's'].single.name;
                    const email = this.$store.state[this.$route.meta.resource + 's'].single.email;
                    const password = this.$store.state[this.$route.meta.resource + 's'].single.password;
                    const is_admin = this.$store.state[this.$route.meta.resource + 's'].single.is_admin;
                    const preparation_time = this.$store.state[this.$route.meta.resource + 's'].single.preparation_time;
                    const cooking_time = this.$store.state[this.$route.meta.resource + 's'].single.cooking_time;
                    const persons = this.$store.state[this.$route.meta.resource + 's'].single.persons;
                    const seasons = this.$store.state[this.$route.meta.resource + 's'].single.seasons;
                    const sub_cat_id = this.$store.state[this.$route.meta.resource + 's'].single.sub_cat_id;

                    allergens && allergens.length && (this.form.allergens = allergens.map( item => item.id));
                    ingredients && (this.form.ingredients = ingredients);
                    tags && tags.length && (this.form.tags = tags.map( item => item.id));
                    steps && steps.length && (this.form.steps = steps.map( item => item.content));
                    description && (this.form.description = description);
                    disliked_ingredients && disliked_ingredients.length && (this.form.disliked_ingredients = disliked_ingredients.map( item => item.id));
                    editPassword && (this.form.editPassword = editPassword);
                    name && (this.form.name = name);
                    email && (this.form.email = email);
                    password && (this.form.password = password);
                    is_admin && (this.form.is_admin = is_admin);
                    preparation_time && (this.form.preparation_time = preparation_time);
                    cooking_time && (this.form.cooking_time = cooking_time);
                    persons && (this.form.persons = persons);
                    seasons && seasons.length && (this.form.seasons = seasons.map( item => item.id));
                    sub_cat_id && (this.form.sub_cat_id = sub_cat_id);

                    if (this.$route.meta.resource === 'user')
                        this.$store.state[this.$route.meta.resource + 's'].single.avatar ? this.avatar = `${this.axios.defaults.baseURL}/storage/${this.$store.state[this.$route.meta.resource + 's'].single.avatar}` : null;
                    else
                        this.$store.state[this.$route.meta.resource + 's'].single.thumbnail ? this.avatar = `${this.axios.defaults.baseURL}/storage/${this.$store.state[this.$route.meta.resource + 's'].single.thumbnail}` : null;

                    this.getAnnexResources();
                });
            }else {
                this.getAnnexResources();
            }
            this.setWatcher();
        },
        mounted() {

        },
        watch: {
        },
        validations() {
            if (['allergen', 'tag'].includes(this.$route.meta.resource)) {
                return {
                    form: {
                        name: {
                            required,
                            minLength: minLength(2),
                            maxLength: maxLength(50),
                            personName,
                        },
                    }
                }
            }else if (this.$route.meta.resource === 'ingredient'){
                return {
                    form: {
                        name: {
                            required,
                            minLength: minLength(2),
                            maxLength: maxLength(50),
                        },
                        sub_cat_id: {required}
                    }
                }
            }else if (this.$route.meta.resource === 'recipe'){
                return {
                    form: {
                        name: {
                            required,
                            minLength: minLength(2),
                            maxLength: maxLength(50),
                        },
                        preparation_time: {
                            required,
                            integer,
                            maxValue: maxValue(720)
                        },
                        cooking_time: {
                            required,
                            integer,
                            maxValue: maxValue(1440)
                        },
                        persons: {
                            required,
                            integer,
                            maxValue: maxValue(100)
                        },
                        description: {},
                        ingredients: {
                            required,
                            $each: {
                                ingredient_id: {
                                    required,
                                },
                                amount: {
                                    required,
                                    integer,
                                    maxValue: maxValue(50000),
                                },
                                measure: {
                                    required,
                                    maxLength: maxLength(10)
                                },
                                detail: {
                                    maxLength: maxLength(15)
                                },
                            }
                        },
                        steps: {
                            required,
                            $each: {
                                required
                            }
                        },
                    }
                }
            }else if (this.$route.meta.resource === 'user'){
                return {
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
                        password: this.$route.params.slug ?
                            {
                                minLength: minLength(8)
                            }
                            :
                            {
                                required,
                                minLength: minLength(8),
                            },
                        description: {}
                    }
                }
            }else {
                return {
                    form: {
                        name: {},
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .site-sub-view__mid-btn svg {
        stroke: $color-1;
        width: 1rem;
    }

    .site-sub-view__mid-btn--add {
        svg {
            transform: rotate(45deg);
        }
    }

    .site-sub-view__repeater {
        margin-top: $vertical-space-size-3;

    }

    .site-sub-view__repeater__item {
        border-top: 1px solid rgba($color-2, 0.3);
        margin-bottom: $vertical-space-size-3;

        &:last-child {
            margin-bottom: 0;
            border-bottom: none;
        }
    }
    
    .site-sub-view__avatar-field {
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: $vertical-space-size-2;
    }

    .site-sub-view__avatar-field__avatar-container {
        width: 104px;
        height: 104px;
        border: 2px solid $color-3;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: auto;
        margin-right: auto;
        background-color: $color-1;
        position: relative;
        z-index: 1;
        overflow: hidden;
    }

    .site-sub-view__avatar-field__avatar {
        width: 94px;
        height: auto;
        min-height: 94px;
        border: 2px solid $color-2;
        border-radius: 50%;
    }

    .site-sub-view__avatar-field__new-avatar {
        width: 94px;
        height: auto;
        min-height: 94px;
        border: 2px solid $color-2;
        border-radius: 50%;
        background-position: center;
        background-size: cover;
    }

    .site-sub-view__avatar-field__no-avatar-svg {
        width: 50px;
        fill: $color-2;
        .st0{fill: $color-1;}
    }

    .site-sub-view__avatar-field__no-avatar-svg-add {
        fill: $color-2;
        width: 12px;
        height: 12px;
        position: absolute;
        top: 23px;
        right: 11px;
    }

    .site-sub-view__avatar-field__avatar-menu{
        position: absolute;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        width: 100%;
    }

    .site-sub-view__avatar-field__avatar-btn {
        position: absolute;
        padding: 5px 10px;
        background-color: $color-3;
        min-width: 6em;
        color: $color-1;

        span{
            border-bottom: 2px solid transparent;
            transition: 0.3s;
        }

        &:hover span, &:focus span{
            border-bottom: 2px solid $color-1;
        }
    }

    .site-sub-view__avatar-field__avatar-btn--edit{
        border-radius: 5px 0 0 5px;
        right: 50%;
        margin-right: 45px;
    }

    .site-sub-view__avatar-field__avatar-btn--remove{
        border-radius: 0 5px 5px 0;
        left: 50%;
        margin-left: 45px;
    }

    .site-sub-view__saveAvatarBtn, .site-sub-view__cancelAvatarBtn {
        display: block;
        margin-left: auto;
        margin-right: auto;
        padding: 5px 10px;
        background-color: $color-3;
        min-width: 6em;
        color: $color-1;
        border-radius: 5px;
        margin-top: -10px;
        margin-bottom: $vertical-space-size-2;
    }
</style>

<style lang="scss">
    .site-sub-view__mid-btn--remove {
        &:hover ~ .field-component, &:focus ~ .field-component {
            opacity: 0.4;
        }
    }
</style>