<template>
    <div class="select-wrapper" :class="{required: required, invalid: v.$error}" :data-size="dataSize">
        <label :for="id" v-html="printedLabel"></label>
        <div class="input-container">

            <v-select
                    :placeholder="printedPlaceholder"
                    :options="options"
                    label="text"
                    :reduce="item => item.value"
                    :value="value"
                    :id="id"
                    @input="updateValue"
                    @blur="onBlur"
                    :required="required"
            ></v-select>

        </div>
        <template v-if="v.$error">
            <span class="form-info" v-html="label + '&nbsp;:'"></span>
            <span v-if="typeof v.$params.required === 'object' && !v.required" class="form-info">*&nbsp;Champ requis</span>
        </template>
    </div>
</template>

<script>
    import vSelect from 'vue-select';

    export default {
        name: "SelectField",
        components: {
            vSelect,
        },
        props: {
            label: String,
            placeholder: String,
            id: String,
            options: Array,
            value: String,
            required: Boolean,
            dataSize: [Number, String],
            v: {
                type: Object,
                default: () => ({}),
            },
        },
        data:() => ({
            requiredLabelInfo : '&nbsp;<span class="required-label-info" title="Champs requis">*</span>',
        }),
        computed: {
            printedLabel() {
                return this.required ? this.label + this.requiredLabelInfo : this.label;
            },
            printedPlaceholder() {
                return this.required ? this.placeholder + ' *' : this.placeholder;
            },
        },
        methods: {
            updateValue(event) {
                this.$emit('input', event)
            },
            onBlur() {
                this.v.$touch();
            },
        },
    }
</script>

<style lang="scss">
    #app {
        .select-wrapper {
            margin-top: 10px;
            margin-bottom: 10px;

            &::after {
                display: none;
            }

            &.invalid .input-container::before {
                right: 17px;
            }

            .vs__dropdown-toggle {
                padding: 10px 25px;
                width: 100%;
                font-family: "sofia-pro", Helvetica, Arial, sans-serif;
                font-weight: 400;
                font-style: normal;
                font-size: 1.5rem;
                line-height: 1.6;
                color: #384A52;
                background-color: #FFFFFF;
                border: 1px solid #50d7e2;
                border-radius: 25px;
            }

            .vs__search, .vs__search:focus {
                padding: 0;
            }

            .vs__clear {
                background-color: transparent;
            }

            &.invalid {
                .vs__dropdown-toggle {
                    border-color: #e46d77;
                }

                .vs__open-indicator {
                    fill: #e46d77;
                }

                .input-container input[type="search"] {
                    border: none;
                    color: green;
                }
            }
        }
    }
</style>>