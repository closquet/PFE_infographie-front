<template>
    <div :class="['field-component', `field-component--${type}`, {required: required, invalid: v && v.$error}]">

        <template v-if="['checkbox'].includes(type)">
            <div :class="`field-component__input-container field-component__input-container--${type}`">
                <input :checked="value"
                       type="checkbox"
                       :id="id"
                       :class="`field-component__field field-component__field--${type}`"
                       @change="updateValue"
                       @focus="onFocus"
                       @blur="onBlur"
                       :required="required">
            </div>
            <label :class="`field-component__label field-component__label--${type}`"
                   :for="id"
                   v-html="printedLabel">
            </label>
        </template>

        <template v-else-if="['radio'].includes(type)">
            <fieldset class="field-component__fieldset">
                <legend v-if="label"
                        :class="`field-component__label field-component__label--${type}`"
                        v-html="printedLabel">
                </legend>
                <div :class="`field-component__input-container field-component__input-container--${type}`"
                     v-for="(option, index) in options"
                     :key="'radio-' + index">
                    <input :id="`${id}_${index}`"
                           name="`${id}_${index}`"
                           type="radio"
                           :value="option.value"
                           :checked="value === option.value"
                           @focus="onFocus"
                           @blur="onBlur"
                           @change="updateValue">
                    <label :for="`${id}_${index}`" :key="'label-' + index">{{option.text}}</label>
                </div>
            </fieldset>
        </template>

        <template v-else-if="['textarea'].includes(type)">
            <label :for="id"
                   :class="`field-component__label field-component__label--${type}`"
                   v-html="printedLabel + `${v && typeof v.$params.maxLength === 'object' ? ' (max ' + v.$params.maxLength.max + ' caractères)' : ''}`">
            </label>
            <div :class="`field-component__input-container field-component__input-container--${type}`">
                <textarea :cols="cols"
                          :rows="rows"
                          :maxlength="v && typeof v.$params.maxLength === 'object' ? v.$params.maxLength.max : ''"
                          :value="value"
                          :id="id"
                          :class="`field-component__field field-component__field--${type}`"
                          :placeholder="placeholderOnFocusBlur"
                          @input="updateValue"
                          @keyup="onKeyup"
                          @focus="onFocus"
                          @blur="onBlur"
                          :required="required">
                </textarea>
            </div>
        </template>

        <template v-else-if="['text', 'email', 'password', 'tel'].includes(type)">
            <label :class="`field-component__label field-component__label--${type}`"
                   :for="id" v-html="printedLabel"></label>
            <div :class="`field-component__input-container field-component__input-container--${type}`">
                <input :value="value"
                       :id="id"
                       :type="type !== 'password' ? type : passwordType"
                       :name="name"
                       :placeholder="placeholderOnFocusBlur"
                       :class="['field-component__field', `field-component__field--${type}`, {inputClass: inputClass}]"
                       @input="updateValue"
                       @click="$emit('click')"
                       @focus="onFocus"
                       @blur="onBlur"
                       @keyup="onKeyup"
                       :disabled="disabled"
                       :required="required">
                <div v-if="type === 'password'"
                     :title="(showPassword ? 'Masquer' : 'Afficher') + ' le mot de passe'"
                     aria-label="Masquer le mot de passe"
                     role="button"
                     @click="switchPasswordType"
                     class="field-component__password-btn">

                    <svg v-if="!showPassword"
                         class="field-component__password-btn-icon"
                         fill="currentColor" height="24px"
                         viewBox="0 0 24 24"
                         width="24px"
                         xmlns="https://www.w3.org/2000/svg"
                         aria-hidden="true"
                         focusable="false">
                        <path d="M10.58,7.25l1.56,1.56c1.38,0.07,2.47,1.17,2.54,2.54l1.56,1.56C16.4,12.47,16.5,12,16.5,11.5C16.5,9.02,14.48,7,12,7 C11.5,7,11.03,7.1,10.58,7.25z"></path><path d="M12,6c3.79,0,7.17,2.13,8.82,5.5c-0.64,1.32-1.56,2.44-2.66,3.33l1.42,1.42c1.51-1.26,2.7-2.89,3.43-4.74 C21.27,7.11,17,4,12,4c-1.4,0-2.73,0.25-3.98,0.7L9.63,6.3C10.4,6.12,11.19,6,12,6z"></path><path d="M16.43,15.93l-1.25-1.25l-1.27-1.27l-3.82-3.82L8.82,8.32L7.57,7.07L6.09,5.59L3.31,2.81L1.89,4.22l2.53,2.53 C2.92,8.02,1.73,9.64,1,11.5C2.73,15.89,7,19,12,19c1.4,0,2.73-0.25,3.98-0.7l4.3,4.3l1.41-1.41l-3.78-3.78L16.43,15.93z M11.86,14.19c-1.38-0.07-2.47-1.17-2.54-2.54L11.86,14.19z M12,17c-3.79,0-7.17-2.13-8.82-5.5c0.64-1.32,1.56-2.44,2.66-3.33 l1.91,1.91C7.6,10.53,7.5,11,7.5,11.5c0,2.48,2.02,4.5,4.5,4.5c0.5,0,0.97-0.1,1.42-0.25l0.95,0.95C13.6,16.88,12.81,17,12,17z"></path>
                    </svg>

                    <svg v-if="showPassword"
                         class="field-component__password-btn-icon"
                         fill="currentColor" height="24px"
                         viewBox="0 0 24 24"
                         width="24px"
                         xmlns="https://www.w3.org/2000/svg"
                         aria-hidden="true"
                         focusable="false">
                        <path d="M12,7c-2.48,0-4.5,2.02-4.5,4.5S9.52,16,12,16s4.5-2.02,4.5-4.5S14.48,7,12,7z M12,14.2c-1.49,0-2.7-1.21-2.7-2.7 c0-1.49,1.21-2.7,2.7-2.7s2.7,1.21,2.7,2.7C14.7,12.99,13.49,14.2,12,14.2z"></path><path d="M12,4C7,4,2.73,7.11,1,11.5C2.73,15.89,7,19,12,19s9.27-3.11,11-7.5C21.27,7.11,17,4,12,4z M12,17 c-3.79,0-7.17-2.13-8.82-5.5C4.83,8.13,8.21,6,12,6s7.17,2.13,8.82,5.5C19.17,14.87,15.79,17,12,17z"></path><path fill="none" d="M0,0h24v24H0V0z"></path>
                    </svg>
                </div>
            </div>
        </template>

        <template v-else-if="['select'].includes(type)">
            <label :class="[
                        `field-component__label field-component__label--${type}`,
                        {'visually-hidden': hideLabel},
                    ]"
                   :for="id" v-html="printedLabel"></label>
            <div :class="[
                            'field-component__field', `field-component__field--${type}`,
                            {inputClass: inputClass},
                            {'hide-selected': hideSelected},
                        ]">
                <v-select
                        :placeholder="placeholderOnFocusBlur"
                        :options="options"
                        :multiple="multiple"
                        :searchable="searchable"
                        label="text"
                        :reduce="item => item.value"
                        :value="value"
                        :id="id"
                        :components="{components}"
                        @input="updateValue"
                        @blur="onBlur"
                        :required="required"
                ></v-select>
            </div>
        </template>

        <template v-if="v && v.$error">
            <span class="field-component__field-alert" v-html="`Champs «${label}» erroné&nbsp;:`"></span>
            <ul>
                <li v-if="typeof v.$params.required === 'object' && !v.required" class="field-component__field-alert">*&nbsp;requis.</li>
                <li v-if="typeof v.$params.sameAs === 'object' && !v.sameAs" class="field-component__field-alert">Mots de passe différents.</li>
                <li v-if="typeof v.$params.alpha === 'object' && !v.alpha" class="field-component__field-alert">Caractères alphabétiques uniquement.</li>
                <li v-if="typeof v.$params.personName === 'object' && !v.personName" class="field-component__field-alert">
                    Caractères autorisés&nbsp;: Alphabétiques, un trait d'union ou un espace entre les éléments.
                </li>
                <li v-if="typeof v.$params.numeric === 'object' && !v.numeric" class="field-component__field-alert">Caractères numériques uniquement.</li>
                <li v-if="typeof v.$params.integer === 'object' && !v.integer" class="field-component__field-alert">Nombres entiers uniquement.</li>
                <li v-if="typeof v.$params.email === 'object' && !v.email" class="field-component__field-alert">
                    Veuillez entrer une adresse email valide.
                </li>
                <li v-if="typeof v.$params.minLength === 'object' && !v.minLength" class="field-component__field-alert">
                    Minimum {{v.$params.minLength.min}} caractères.
                </li>
                <li v-if="typeof v.$params.maxLength === 'object' && !v.maxLength" class="field-component__field-alert">
                    Maximum {{v.$params.maxLength.max}} caractères.
                </li>
                <li v-if="typeof v.$params.maxValue === 'object' && !v.maxValue" class="field-component__field-alert">
                    Maximum {{v.$params.maxValue.max}}.
                </li>
                <li v-if="typeof v.$params.minValue === 'object' && !v.minValue" class="field-component__field-alert">
                    La valeur doit être supérieur à {{v.$params.minValue.min - 1}}.
                </li>
                <li v-if="typeof v.$params.IsNot === 'object' && !v.IsNot" class="field-component__field-alert">
                    La valeur doit être différente de {{v.$params.IsNot.value}}.
                </li>
            </ul>
        </template>
    </div>
</template>

<script>
    export default {
        name: "Field",
        props: {
            label: String,
            labelInfo: {
                type: String,
                default: ''
            },
            name: String,
            id: String,
            inputClass: String,
            placeholder: String,
            type: String,
            value: [Number, String, Boolean, Array],
            placeholderOnFocus: String,
            v: Object,
            cols: [Number, String],
            rows: [Number, String],
            options: Array,
            disabled: Boolean,
            multiple: Boolean,
            hideLabel: Boolean,
            hideSelected: Boolean,
            searchable: {
                type: Boolean,
                default: true
            },
            components: Object
        },
        data:() => ({
            focused: false,
            showPassword: false,
        }),
        computed: {
            printedLabel() {
                if (this.required)
                    return this.label +  this.labelInfo + '&nbsp;<span class="field-component__required-label-info" title="Champs requis">*</span>';
                else 
                    return this.label +  this.labelInfo;
            },
            placeholderOnFocusBlur() {
                if (this.placeholderOnFocus) {
                    return this.focused ? this.placeholderOnFocus : this.placeholder ;
                } else
                    return this.placeholder;
            },
            passwordType() {
                return this.showPassword ? 'text' : 'password';
            },
            required() {
                return this.v && typeof this.v.$params.required === 'object';
            },
        },
        methods: {
            updateValue(event) {
                switch (this.type) {
                    case 'checkbox': this.$emit('input', event.target.checked);break;
                    case 'select': this.$emit('input', event);break;
                    default: this.$emit('input', event.target.value);
                }
                this.v && this.v.$reset();
            },
            onBlur() {
                this.focused = false;
                this.v && this.v.$touch();
                this.$emit('blur');
            },
            onKeyup(event) {
                this.$emit('keyup', event.key);
            },
            onFocus() {
                this.focused = true;
                this.$emit('focus');
            },
            switchPasswordType() {
                this.showPassword = !this.showPassword;
            },
        },
    }
</script>

<style scoped lang="scss">
    .field-component {
        margin-top: $vertical-space-size-2;
        transition: 0.3s;
    }

    .field-component__fieldset {
        border: none;
    }

    .field-component__input-container {
        display: flex;
        align-items: center;
        position: relative;
    }

    .field-component__label {
        display: block;
        margin-bottom: 0.3em;
        color: $color-2;
    }

    /* Change Autocomplete styles in Chrome*/
    input:-webkit-autofill,
    textarea:-webkit-autofill,
    select:-webkit-autofill{
        /*border: 1px solid green;*/
        -webkit-text-fill-color: $color-2;
        color: $color-2;
        -webkit-box-shadow: 0 0 0px 1000px #fff inset;
        background-color: #fff;

        &:hover, &:focus {
            border-color: $color-8;
            -webkit-text-fill-color: $color-2;
            color: $color-2;
            outline: none;
            background-color: $color-10;
            -webkit-box-shadow: 0 0 0px 1000px $color-10 inset;
        }
    }

    .field-component__field:not(.field-component__field--checkbox) {
        display: block;
        width: 100%;
        min-height: 5rem;
        padding: 0 15px;
        font-size: $font-size-5;
        color: $color-2;
        background-color: #fff;
        border: 2px solid $color-9;
        border-radius: 3px;
        transition: 0.3s;

        &.field-component__field--textarea {
            padding: 15px;
        }

        &:focus, &:hover {
            border-color: $color-8;
            outline: none;
            background-color: $color-10;
        }
    }


    .field-component__field[disabled] {
        background-color: $color-12;
        border-color: $color-12;

        &:focus, &:hover {
            border-color: $color-12;
            background-color: $color-12;
            outline: none;
        }
    }

    .field-component__field--textarea {
        resize: none;
        padding-top: 15px;
    }

    .field-component__label--checkbox {
        display: inline-block;
        cursor: pointer;
        margin-bottom: 0;
    }

    .field-component--checkbox {
        display: flex;
        align-items: center;
    }

    .field-component__input-container--checkbox {
        display: inline-block;
    }

    .field-component__field--checkbox {
        margin-right: 5px;
        cursor: pointer;
        display: block;
    }

    .invalid .field-component__field {
        border-color: $color-7;
        color: $color-7;
        background-color: $color-5-op80;
    }


    .field-component__field--password {
        padding-right: 45px;
    }

    .field-component__password-btn {
        position: absolute;
        top: 0;
        right: 0;
        width: 50px;
        display: flex;
        justify-content: center;

        &:hover {
            cursor: pointer;
        }
    }

    .field-component__password-btn-icon {
        display: block;
        min-height: 5rem;
    }

    .field-component__field-alert {
        display: block;
        color: $color-7;
        margin-top: 0.3em;
    }

    .field-component .field-component__field--select {
        padding: 0;
        display: flex;
        align-items: center;
        border: none;
        min-height: auto;
    }

</style>

<style lang="scss">
    .field-component__required-label-info {
        color: $color-7;
        cursor: help;
        transform: scale(1.3);
        display: inline-block;
    }

    .field-component--select {
        input {
            padding: 0 15px;
            width: 100%;
            border: 2px solid $color-9;
            transition: 0.3s;
            border-radius: 3px;

            &:focus, &:hover {
                border: 2px solid $color-8;
                background-color: $color-10;
            }

            &:focus {
                border-radius: 3px 3px 0 0;
            }
        }

        input[type="search"]::-webkit-search-cancel-button {
            display: none;
        }


        .v-select {
            width: 100%;
        }

        .vs__dropdown-toggle {
            border: none;
            padding: 0;
            position: relative;
            display: flex;
            align-items: center;
        }

        .vs__search {
            padding: 0 15px;
            min-height: 4.6rem;
            margin: 0;
            color: $color-2;

        }

        .vs__actions {
            padding-right: 0;
            position: absolute;
            right: 10px;
        }

        .vs--open {
            .vs__actions, .vs__dropdown-toggle {

            }
        }

        .vs__selected-options {
            padding: 0;
            display: flex;
            align-items: center;
        }

        .vs__selected {
            position: absolute;
            padding: 0 15px;
            margin: 0;

        }

        .hide-selected .vs__selected { // cells in field
            display: none;
        }

        .vs__clear {
            display: none;
        }

        .vs__dropdown-menu {
            max-height: 150px;
            padding: 0;
            border: 2px solid $color-8;
            border-top: none;
            background-color: $color-10;
        }
    }
</style>