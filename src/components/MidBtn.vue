<template>
    <button @click.prevent="$emit('click')"
            class="mid-btn">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "MidBtn",
        props: {
            // text: String
        }
    }
</script>

<style scoped lang="scss">
    .mid-btn {
        color: $color-1;
        background-color: $color-3;
        display: block;
        /*width: 100%;*/
        /*min-height: 50px;*/
        padding: 4px 13px 4px 11px;
        border: 2px solid $color-3;
        border-radius: 2rem;
        font-size: $font-size-5;
        transition: 0.3s;

        svg {
            transition: 0.3s;
            margin-right: 5px;
        }

        &:hover, &:focus {
            background-color: $color-1;
            color: $color-3;

            svg {
                stroke: $color-3;
            }
        }
    }

    form .mid-btn {
        margin-top: $vertical-space-size-2;
    }
</style>