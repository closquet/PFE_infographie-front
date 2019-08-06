<template>
    <div class="checkbox-wrapper" :class="{wrapperClass, required: required, invalid: v.$error}" :data-size="dataSize">
        <input :checked="value"
               type="checkbox"
               @change="updateValue"
               :required="required"
               :id="id" data-size="1">
        <label :for="id" v-html="printedLabel"></label>
        <template v-if="v.$error">
            <span class="form-info">* Champ requis</span>
        </template>
    </div>
</template>

<script>
    export default {
        name: "CheckboxField",
        props: {
            label: String,
            id: String,
            required: Boolean,
            value: Boolean,
            dataSize: [Number, String],
            wrapperClass: String,
            v: {
                type: Object,
                default: () => ({}),
            },
        },
        data:() => ({
            requiredLabelInfo : '<span class="required-label-info" title="Champs requis">&nbsp;*</span>',
        }),
        computed: {
            printedLabel() {
                return this.required ? '<span>' + this.label + this.requiredLabelInfo + '</span>' : this.label;
            },
        },
        methods: {
            updateValue(event) {
                this.$emit('input', event.target.checked);
                this.v.$touch();
            },
        },
    }
</script>

<style lang="scss" scoped>
    label {
        font-family: "Sofia Pro Light";
        display: flex;
        align-items: flex-start;
        text-align: left;

        &:before {
            margin: 5px 10px 0 0;
         }
        &:after {
            top: 13px;
        }
    }

    .checkbox-wrapper {
        margin-top: 10px;
        margin-bottom: 10px;

        &.invalid label {
            color: #e46d77;
        }
    }
</style>