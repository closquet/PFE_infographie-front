<template>
    <div :class="`site-sub-view site-sub-view--${$route.name}`">
        <loading :active.sync="$store.state[$route.meta.resource + 's'].isLoading"
                 :can-cancel="false"
                 :is-full-page="true"></loading>
        <section :aria-labelledby="`${$route.meta.resource}-section-title`">
            <SectionTitle title="Liste des resources"
                          class="site-sub-view__title"
                          level="3"
                          :id="`${$route.meta.resource}-section-title`"/>

            <SmallBtn @click="goCreate" class="site-sub-view__addBtn">
                <template v-slot:icon>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.426 4.426">
                        <g transform="translate(0.5 0.5)">
                            <line x1="1.652" x2="1.652" y2="3.305"  fill="none" stroke-linecap="round" stroke-width="1"/>
                            <line y1="1.652" x2="3.305" y2="1.652" fill="none" stroke-linecap="round" stroke-width="1"/>
                        </g>
                    </svg>
                </template>
                <template v-slot:text>
                    Nouveau
                </template>
            </SmallBtn>

            <ul class="resource-list">
                <li v-for="item in $store.state[$route.meta.resource + 's'].all" :key="item.slug" class="resource-list__item">
                    {{item.name}}
                    <span v-if="$route.meta.resource === 'user' && windowWidth > 470">&nbsp;- {{item.email}}</span>
                    <ResourceListActions :slug="item.slug" :name="item.name"/>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import { mapState } from 'vuex';
    import SectionTitle from "@/components/SectionTitle";
    import {upFirstLetter} from '@/functions'
    import ResourceListActions from "@/views/admin/subViews/parts/ResourceListActions";
    import SmallBtn from "@/components/SmallBtn";

    export default {
        name: "ResourceList",
        components: {
            Loading,
            SectionTitle,
            ResourceListActions,
            SmallBtn,
        },
        data: () => ({
            windowWidth: 0,
        }),
        computed: {
            ...mapState([
            ]),
        },
        methods: {
            getWindowWidth(event) {
                this.windowWidth = document.documentElement.clientWidth;
            },
            goCreate() {
                this.$router.push({name: `admin-${this.$route.meta.resource}-create`});
            },
        },
        mounted() {
            this.$store.dispatch(`getAll${upFirstLetter(this.$route.meta.resource + 's')}`);
            this.$nextTick(function() {
                window.addEventListener('resize', this.getWindowWidth);

                //Init
                this.getWindowWidth();
            });
        },
        watch: {
            '$route.name'() {
                this.$store.dispatch(`getAll${upFirstLetter(this.$route.meta.resource + 's')}`)
            }
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.getWindowWidth, false);
        }
    }
</script>

<style scoped lang="scss">
    .resource-list {
        margin-top: $vertical-space-size-2;
    }

    .resource-list__item {
        padding: 8px;
        display: flex;
    }

    .resource-list__item:nth-child(even) {
        background-color: rgba($color-8, 20%);
    }

    .resource-list__item:nth-child(odd) {
        background-color: rgba($color-8, 30%);
    }
</style>