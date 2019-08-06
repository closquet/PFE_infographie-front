<template>
    <div class="text-wrapper" :class="{required: required}" :data-size="dataSize">
        <label :for="id" v-html="printedLabel"></label>
        <div class="input-container">
            <textarea
                    :cols="cols"
                    :rows="rows"
                    :minlength="minlength"
                    :maxlength="maxlength"
                    :value="value"
                    :id="id"
                    :placeholder="placeholderAfterRequireCheck"
                    @input="updateValue"
                    @focus="focused = true"
                    @blur="focused = false"
                    :required="required"></textarea>
        </div>
        <span class="form-info">* Champ requis</span>
    </div>
</template>

<script>
    export default {
        name: "InputTextareaField",
        props: [
            'label',
            'id',
            'placeholder',
            'required',
            'value',
            'dataSize',
            'placeholderOnFocus',
            'cols',
            'rows',
            'minlength',
            'maxlength',
        ],
        data:() => ({
            requiredLabelInfo : '&nbsp;<span class="required-label-info" title="Champs requis">*</span>',
            requiredPlaceholder : ' *',
            focused: false,
        }),
        computed: {
            printedLabel() {
                return this.required ? this.label + this.requiredLabelInfo : this.label;
            },
            placeholderAfterRequireCheck() {
                return this.required ? this.placeholderOnFocusBlur + this.requiredPlaceholder : this.placeholder;
            },
            placeholderOnFocusBlur() {
                if (this.placeholderOnFocus) {
                    return this.focused ? this.placeholderOnFocus : this.placeholder ;
                } else
                    return this.placeholder;
            },
        },
        methods: {
            updateValue(event) {
                this.$emit('input', event.target.value)
            },
        },
    }
</script>

<style scoped>
    .text-wrapper {
        margin-top: 10px;
        margin-bottom: 10px;
    }
    textarea {
        resize: none;
    }
</style>