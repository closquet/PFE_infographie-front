<template>
    <div class="radio-wrapper" :data-size="dataSize">
        <fieldset>
            <legend v-if="legend" v-html="legend"></legend>
            <template v-for="(option, index) in options">
                <input :id="`${id}_${index}`"
                       type="radio"
                       :value="option.value"
                       :checked="value === option.value"
                       :key="'input-' + index"
                       @change="updateValue">
                <label :for="`${id}_${index}`" :key="'label-' + index">{{option.text}}</label>
            </template>
            <span class="form-info">* Champ requis</span>
        </fieldset>


    </div>
</template>

<script>
    export default {
        name: "RadioField",
        props: [
            'options',
            'value',
            'required',
            'dataSize',
            'legend',
            'id',
        ],
        data:() => ({
            requiredLabelInfo : '&nbsp;<span class="required-label-info" title="Champs requis"></span>',
        }),
        computed: {
            printedLabel() {
                return this.required ? this.label + this.requiredLabelInfo : this.label;
            },
        },
        methods: {
            updateValue(event) {
                this.$emit('input', event.target.value)
            },
        },
    }
</script>

<style scoped lang="scss">
    .invalid {
        select {
            border-color: #e46d77;
        }

        &.select-wrapper::after {
            border-color: #e46d77;
            opacity: 1;
        }

    }

    .radio-wrapper {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    [type="radio"] + * {
        left: 0;
    }

</style>