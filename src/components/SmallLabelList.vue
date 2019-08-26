<template>
    <ul class="small-label-list-component">
        <li v-for="(item) in items"
            class="small-label-list-component__item"
            :key="item.id">
            <button  class="small-label-list-component__btn"
                     :title="`Supprimer ${item.name} de mes allergies`"
                     @click.prevent="$emit('click', item.id)">
                <span class="visually-hidden">Supprimer </span><span class="small-label-list-component__text">{{item.name}}</span><span class="visually-hidden"> de mes allergies</span>
                <span class="small-label-list-component__cross-container">
                    <svg class="small-label-list-component__cross" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5.426 5.426">
                        <g transform="translate(1.061 1.061)">
                            <line x2="3.305" y2="3.305" fill="none" stroke-linecap="round"/>
                            <line x2="3.305" y2="3.305" transform="translate(3.305) rotate(90)" fill="none" stroke-linecap="round"/>
                        </g>
                    </svg>
                </span>
            </button>

        </li>

    </ul>
</template>

<script>
    export default {
        name: "SmallLabelList",
        props: {
            items: Array // [ {name:'exemple', id:123},... ]
        },
    }
</script>

<style scoped lang="scss">
    .small-label-list-component {
        display: block;
    }

    .small-label-list-component__btn {
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover, &:focus {
            .small-label-list-component__text {
                color: $color-7;
                border-color: $color-7;
            }

            .small-label-list-component__cross-container{
                border-color: $color-7;
                transform: scale(1.3) rotate(180deg);
            }

            .small-label-list-component__cross {
                stroke: $color-7;
            }
        }
    }

    .small-label-list-component__item {
        display: inline-block;
        position: relative;
        margin-right: $vertical-space-size-1;
        margin-top: $vertical-space-size-1;
    }

    .small-label-list-component__text {
        display: block;
        padding: 0.8rem 1rem;
        color: $color-3;
        border: 1px solid $color-3;
        border-radius: 0.6rem;
        background-color: $color-5;
        transition: 0.3s;

    }

    .small-label-list-component__cross-container {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        padding: 4px;
        border-radius: 100%;
        border: 1px solid $color-3;
        background-color: $color-5;
        transition: 0.3s;
        transform: scale(0);

    }

    .small-label-list-component__cross {
        width: 0.9rem;
        stroke: $color-3;
        stroke-width: 0.1rem;
        transition: 0.3s;
    }
</style>