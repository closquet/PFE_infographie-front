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
                left: -3rem;
                width: calc(100% + 1px);
                padding: 5px 1.5rem 5px 3.5rem;
            }

            .small-btn__icon > * {
                transform: rotate(180deg);
            }
        }
    }

    .small-btn__icon {
        background-color: $color-3;
        display: flex;
        align-items: center;
        height: 3rem;
        width: 3rem;
        border-radius: 1.5rem;
        position: relative;
        z-index: 2;
        fill: $color-1;
        padding-left: 0.8rem;

        & > * {
            display: block;
            width: 1.4rem;
            stroke: $color-1;
            transition: 0.5s;
        }
    }

    .small-btn__text {
        display: flex;
        align-items: center;
        background-color: $color-3;
        padding: 5px 0 5px 0;
        overflow: hidden;
        height: 3rem;
        width: 0;
        border-radius: 1.5rem;
        position: relative;
        left: -100%;
        z-index: 1;
        transition: 0.5s;

        & > * {
            display: block;
            white-space: nowrap;
        }
    }
</style>