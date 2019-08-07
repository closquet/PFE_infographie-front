<template>
    <div class="field-component" :class="{required: required, invalid: v.$error}" :data-size="dataSize">
        <label class="field-component__label" :for="id" v-html="printedLabel"></label>
        <div class="field-component__input-container">
            <input :value="value"
                   :id="id"
                   :type="type !== 'password' ? type : passwordType"
                   :name="name"
                   :placeholder="placeholderOnFocusBlur"
                   class="field-component__field"
                   :class="[`field-component__field--${type}`, {inputClass: inputClass}]"
                   @input="updateValue"
                   @click="$emit('click')"
                   @focus="onFocus"
                   @blur="onBlur"
                   @keyup="onKeyup"
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
        <template v-if="v.$error">
            <span class="field-component__field-alert" v-html="'Champs ' + label + ' erroné' + '&nbsp;:'"></span>
            <ul>
                <li v-if="typeof v.$params.required === 'object' && !v.required" class="field-component__field-alert">*&nbsp;requis</li>
                <li v-if="typeof v.$params.alpha === 'object' && !v.alpha" class="field-component__field-alert">Caractères alphabétiques uniquement</li>
                <li v-if="typeof v.$params.numeric === 'object' && !v.numeric" class="field-component__field-alert">Caractères numériques uniquement</li>
                <li v-if="typeof v.$params.email === 'object' && !v.email" class="field-component__field-alert">
                    Veuillez entrer une adresse email valide.
                </li>
                <li v-if="typeof v.$params.minLength === 'object' && !v.minLength" class="field-component__field-alert">
                    Minimum {{v.$params.minLength.min}} caractères
                </li>
                <li v-if="typeof v.$params.minValue === 'object' && !v.minValue" class="field-component__field-alert">
                    La valeur doit être supérieur à {{v.$params.minValue.min - 1}}
                </li>
                <li v-if="typeof v.$params.IsNot === 'object' && !v.IsNot" class="field-component__field-alert">
                    La valeur doit être différente de {{v.$params.IsNot.value}}
                </li>
            </ul>
        </template>
    </div>
</template>

<script>
    export default {
        name: "InputTextField",
        props: {
            label: String,
            name: String,
            id: String,
            inputClass: String,
            placeholder: String,
            required: Boolean,
            type: String,
            value: [Number, String],
            dataSize: [Number, String],
            placeholderOnFocus: String,
            v: {
                type: Object,
                default: () => ({}),
            },
        },
        data:() => ({
            focused: false,
            showPassword: false,
        }),
        computed: {
            printedLabel() {
                return this.required ? this.label + '&nbsp;<span class="required-label-info" title="Champs requis">*</span>' : this.label;
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
        },
        methods: {
            updateValue(event) {
                this.$emit('input', event.target.value);
                this.v.$reset();
            },
            onBlur() {
                this.focused = false;
                this.v.$touch();
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
        margin-bottom: $vertical-space-size-2;
    }

    .field-component__input-container {
        display: flex;
        align-items: center;
        position: relative;
    }

    .field-component__label {
        display: block;
        margin-bottom: 0.3em;
    }

    /* Change Autocomplete styles in Chrome*/
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
        /*border: 1px solid green;*/
        -webkit-text-fill-color: $color-2;
        color: $color-2;
        -webkit-box-shadow: 0 0 0px 1000px #fff inset;
        background-color: #fff;
    }

    .field-component__field {
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
        &:focus, &:hover {
            border-color: $color-8;
            outline: none;
            background-color: $color-10;
        }
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
</style>