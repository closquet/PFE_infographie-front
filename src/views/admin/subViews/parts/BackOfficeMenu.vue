<template>
    <div v-if="showMenu">
        <nav class="back-office-menu" :class="{active: burgerActive}" aria-labelledby="back-office-menu-title">
            <div class="back-office-menu__title-container">
                <h2 class="visually-hidden" id="back-office-menu-title">
                    Menu back office
                </h2>
                <button class="back-office-menu__burger-menu"
                        title="Menu back office"
                        v-if="!burgerActive"
                        @focus="openMenu"
                        :class="{active: burgerActive}"
                        aria-hidden="true">
                    <span class="visually-hidden">Menu back office</span>
                    <svg class="back-office-menu__icon" :class="{active: burgerActive}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 10"><path d="M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z"></path></svg>
                </button>
                <span class="back-office-menu__burger-menu"
                      v-if="burgerActive"
                      @click="closeMenu"
                      :class="{active: burgerActive}"
                      aria-hidden="true">
                        <span class="visually-hidden">Menu back office</span>
                        <svg class="back-office-menu__icon" :class="{active: burgerActive}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 10"><path d="M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z"></path></svg>
                </span>
            </div>
            <ul class="back-office-menu__list">
                <li v-for="(link, index) in adminNavLis" :key="index" @click="closeMenu">
                    <router-link :to="{name: link.value}">
                        {{link.text}}
                    </router-link>
                </li>
            </ul>
            <div class="visually-hidden" aria-hidden="true">
                <label>
                    <input class="visually-hidden" type="checkbox" @focus="closeMenu">
                </label>
            </div>


        </nav>
        <div v-if="burgerActive"
             @click="closeMenu"
             class="hider"></div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "BackOfficeMenu",
        data: () => ({
            currentView: 'admin',
            burgerActive: true,
            adminNavLis: [
                {
                    text: 'Dashboards',
                    value: 'admin-dashboard',
                },
                {
                    text: 'Allergènes',
                    value: 'admin-allergens',
                },
                {
                    text: 'Tags',
                    value: 'admin-tags',
                },
                {
                    text: 'Ingrédients',
                    value: 'admin-ingredients',
                },
                {
                    text: 'Recettes',
                    value: 'admin-recipes',
                },
                {
                    text: 'Utilisateurs',
                    value: 'admin-users',
                },
            ],
        }),
        computed: {
            ...mapState([
                'user',
            ]),
            showMenu() {
                const acceptedRoutes = [
                    'admin-dashboard',
                    'admin-ingredients',
                    'admin-ingredient-create',
                    'admin-ingredient-edit',
                    'admin-allergens',
                    'admin-allergen-create',
                    'admin-allergen-edit',
                    'admin-tags',
                    'admin-tag-create',
                    'admin-tag-edit',
                    'admin-recipes',
                    'admin-recipe-create',
                    'admin-recipe-edit',
                    'admin-users',
                    'admin-user-create',
                    'admin-user-edit',
                ];
                if (this.user.isLogged && this.user.data.is_admin && acceptedRoutes.includes(this.$route.name)) {

                    return true;
                }
                return false;
            }
        },
        methods: {
            openMenu() {
                setTimeout( () => {
                    this.burgerActive = true;
                    this.$emit('burgerActiveChanged', this.burgerActive);
                }, 100);
            },
            closeMenu() {
                setTimeout( () => {
                    this.burgerActive = false;
                    this.$emit('burgerActiveChanged', this.burgerActive);
                }, 100);
            }
        },
        mounted() {
            setTimeout( () => {
                this.burgerActive = false;
            }, 500)
        }
    }
</script>

<style scoped lang="scss">
    .back-office-menu {
        position: absolute;
        left: -127px;
        top: calc(100% - 33px);
        display: inline-block;
        background-color: $color-3;
        padding: 12px 20px 18px;
        z-index: 5;
        border-radius: 0 0 5px 0;
        text-align: left;
        transition: 0.3s;

        &.active {
            left: -1px;;
        }
    }

    .back-office-menu__burger-menu {
        padding: 9px 4px 9px 9px;
        position: absolute;
        top: 0;
        left: 99.9%;
        background-color: $color-3;
        border-radius: 0 5px 5px 0;
        transition: 0.3s;

        &.active {
            padding-left: 0;
        }
    }

    .back-office-menu__icon {
        fill: $color-1;
        display: block;
        width: 20px;
        transform: rotate(-90deg);
        transition: 0.3s;

        &:hover {
            cursor: pointer;
        }

        &.active {
            transform: rotate(90deg);
        }
    }

    .back-office-menu__list {
        a {
            display: inline-block;
            width: fit-content;
            font-size: 16px;
            color: $color-1;
            text-decoration: none;
            padding: 8px 0 2px;
            border-bottom: 2px solid transparent;
            transition: 0.3s;

            &:hover, &:focus {
                border-bottom: 2px solid $color-1;
                outline: none;
            }

            &.router-link-exact-active {

                position: relative;
                display: flex;
                align-items: center;
                &:before {
                    content: '';
                    display: block;
                    background-color: $color-1;
                    border-radius: 5px;
                    width: 8px;
                    height: 8px;
                    position: absolute;
                    left: -13px;
                }
            }
        }
    }

    .hider {
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba($color-2, 0.5);
    }
</style>