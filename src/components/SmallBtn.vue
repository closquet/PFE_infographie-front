<template>
    <button @click="$emit('click')"
            class="small-btn">
        <span class="small-btn__icon">
            <slot name="icon"></slot>
        </span>
        <span class="small-btn__text">
            <slot name="text"></slot>
        </span>
    </button>
</template>

<script>
    export default {
        name: "SmallBtn",
        props: {
            text: String
        }
    }
</script>

<style scoped lang="scss">
    .small-btn {
        color: $color-1;
        display: flex;
        align-items: center;
        border-radius: 1.5rem;
        overflow: hidden;
        font-size: $font-size-5;

        &:hover, &:focus {
            .small-btn__text {
                width: 100%;
                padding-right: 2rem;
                padding-left: 3.3rem;
            }
        }
    }

    .small-btn__icon {
        background-color: $color-3;
        display: flex;
        align-items: center;
        /*justify-content: center;*/
        height: 3rem;
        min-width: 3.4rem;
        border-radius: 1.5rem;
        position: relative;
        z-index: 2;
        fill: $color-1;
        padding-left: 0.8rem;

        & > * {
            display: block;
            width: 1.4rem;
        }
    }

    .small-btn__text {
        display: flex;
        align-items: center;
        background-color: $color-3;
        padding: 5px 0;
        transition: 0.3s;
        overflow: hidden;
        width: 3rem;
        height: 3rem;
        border-radius: 1.5rem;
        position: relative;
        z-index: 1;
        margin-left: -3.4rem;

        & > * {
            display: block;
            white-space: nowrap;
        }
    }
</style>