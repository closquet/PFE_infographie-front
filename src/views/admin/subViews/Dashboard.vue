<template>
    <section :class="`site-sub-view site-sub-view--${$route.name}`"
             aria-labelledby="site-sub-view-dashboard-title">
        <loading :active.sync="isLoading"
                 :can-cancel="false"
                 :is-full-page="true"></loading>

<!--        <h2 class="visually-hidden"-->
<!--            id="site-sub-view-dashboard-title">-->
<!--            {{$route.meta.displayedSubName}}-->
<!--        </h2>-->

        <DashBoardSection v-if="!allergens.isLoading"
                          title="Allergènes"
                          :amount="allergens.amount"
                          titleId="allergens-title"
                          @listBtnClicked="list('allergens')"
                          @newBtnClicked="create('allergen')"/>

        <DashBoardSection v-if="!tags.isLoading"
                          title="Tags"
                          :amount="tags.amount"
                          titleId="tags-title"
                          @listBtnClicked="list('tags')"
                          @newBtnClicked="create('tag')"/>

        <DashBoardSection v-if="!ingredients.isLoading"
                          title="Ingrédients"
                          :amount="ingredients.amount"
                          titleId="ingredients-title"
                          @listBtnClicked="list('ingredients')"
                          @newBtnClicked="create('ingredient')"/>

        <DashBoardSection v-if="!recipes.isLoading"
                          title="Recipes"
                          :amount="recipes.amount"
                          titleId="recipes-title"
                          @listBtnClicked="list('recipes')"
                          @newBtnClicked="create('recipe')"/>

        <DashBoardSection v-if="!users.isLoading"
                          title="Users"
                          :amount="users.amount"
                          titleId="users-title"
                          @listBtnClicked="list('users')"
                          @newBtnClicked="create('user')"/>

    </section>
</template>

<script>
    import { mapState } from 'vuex';
    import DashBoardSection from "@/views/admin/subViews/parts/DashBoardSection";
    import Loading from 'vue-loading-overlay';

    export default {
        name: "Dashboard",
        components: {
            DashBoardSection,
            Loading,
        },
        computed: {
            ...mapState([
                'ingredients',
                'allergens',
                'users',
                'tags',
                'recipes',
            ]),
            isLoading() {
                return this.ingredients.isLoading ||this.allergens.isLoading ||this.users.isLoading ||this.tags.isLoading ||this.recipes.isLoading;
            }
        },
        methods: {
            list(resource) {
                this.$router.push({
                    name: `admin-${resource}`,
                });
            },
            create(resource) {
                this.$router.push({name: `admin-${resource}-create`});
            },
        },
        created() {
            !this.ingredients.amount && this.$store.dispatch('getAmountIngredients');
            !this.allergens.amount && this.$store.dispatch('getAmountAllergens');
            !this.users.amount && this.$store.dispatch('getAmountUsers');
            !this.tags.amount && this.$store.dispatch('getAmountTags');
            !this.recipes.amount && this.$store.dispatch('getAmountRecipes');
        },
    }
</script>

<style scoped>

</style>