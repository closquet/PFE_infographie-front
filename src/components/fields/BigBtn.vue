<template>
    <button @click="$emit('click')"
            class="btn1">
        {{text}}
    </button>
</template>

<script>
    export default {
        name: "BigBtn",
        props: {
            text: String
        }
    }
</script>

<style scoped lang="scss">
    .btn1 {
        color: $color-1;
        background-color: $color-9;
        display: block;
        width: 100%;
        min-height: 50px;
        border: 2px solid $color-8;
        border-radius: 3px;
        font-size: $font-size-5;
        transition: 0.3s;

        &:hover, &:focus {
            background-color: $color-8;
        }
    }

    form .btn1 {
        margin-top: $vertical-space-size-4;
    }
</style>