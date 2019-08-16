<template>
    <button @click="$emit('click')"
            class="big-btn">
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
    .big-btn {
        color: $color-1;
        background-color: $color-3;
        display: block;
        width: 100%;
        min-height: 50px;
        border: 2px solid $color-3;
        border-radius: 3px;
        font-size: $font-size-5;
        transition: 0.3s;

        &:hover, &:focus {
            background-color: $color-1;
            color: $color-3;
        }
    }

    form .big-btn {
        margin-top: $vertical-space-size-4;
    }
</style>