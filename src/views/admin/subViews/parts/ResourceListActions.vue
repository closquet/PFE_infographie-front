<template>
    <div class="actions-list">
        <router-link :to="{name: `admin-${$route.meta.resource}-edit`, params: {slug}}"
                     v-if="!deleteActive"
                     class="link1 actions-list__actions">
            <span>
                Modifier<span class="visually-hidden"> la resource "{{name}}"</span>
            </span>
        </router-link>

        <button v-if="!deleteActive"
                @click="showChoices"
                class="link1 actions-list__actions">
            Supprimer
        </button>

        <div v-show="deleteActive">
            <span class="delete-question">Supprimer&nbsp;? </span>
            <button class="link1 actions-list__actions"
                    @click="deleteResources">
                Oui<span class="visually-hidden"> supprimer la resource {{name}}</span>
            </button>
            <button class="link1 actions-list__actions"
                    @blur="hideChoices"
                    @click="hideChoices">
                Non<span class="visually-hidden"> ne pas supprimer la resource {{name}}</span>
            </button>
        </div>
    </div>
</template>

<script>
    import {upFirstLetter} from '@/functions'

    export default {
        name: "ResourceListActions",
        props: {
            slug: String,
            name: String,
        },
        data: () => ({
            deleteActive: false,
        }),
        methods: {
            showChoices() {
                this.deleteActive = true;
            },
            hideChoices() {
                this.deleteActive = false;
            },
            deleteResources() {
                this.$store.dispatch(`delete${upFirstLetter(this.$route.meta.resource)}`, this.slug)
            }
        }
    }
</script>

<style scoped lang="scss">
    .actions-list {
        margin-left: auto;
    }

    .actions-list__actions:nth-last-child(1n + 2) {
        margin-right: 1rem;
    }

    .delete-question {
        color: $color-7;
    }
</style>