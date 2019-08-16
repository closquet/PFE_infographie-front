<template>
    <nav role="navigation"
         aria-labelledby="main-nav__title"
         class="main-nav">
        <h2 id="main-nav__title"
            class="main-nav__title visually-hidden"
            role="heading"
            aria-level="2">
            Navigation principale
        </h2>
        <ul class="main-nav__list">
            <li class="main-nav__item main-nav__item--home">
                <router-link :to="{ name: 'home' }">
                    <span class="visually-hidden">Accueil</span>
                    <svg aria-hidden="true" class="main-nav__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <g transform="translate(-41.048 -20.398)">
                            <rect width="3.143" height="8.882" transform="translate(44.19 27.515)"/><rect width="3.143" height="8.882" transform="translate(50.476 27.515)"/><path d="M130.048,19.693h16l-8-9.3Z" transform="translate(-89 10)"/>
                        </g>
                    </svg>
                </router-link>
            </li>
            <li class="main-nav__item main-nav__item--account" ref="accountDropdown">
                <div @click="showDropDown" @mouseover="showDropDown" @mouseleave="hideDopDown" @blur="hideDopDown">
                    <span class="visually-hidden">Mon compte</span>
                    <svg aria-hidden="true" class="main-nav__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <defs><clipPath id="a"><rect width="16" height="16" fill="none"/></clipPath></defs><g clip-path="url(#a)"><path d="M0,370v-2c0-2.2,3.6-4,8-4s8,1.8,8,4v2Zm4-12a4,4,0,1,1,4,4A4,4,0,0,1,4,358Z" transform="translate(0 -354)"/></g>
                    </svg>
                </div>
                <div class="main-nav__sub-list-container">
                    <ul class="main-nav__sub-list" @mouseover="showDropDown" @mouseleave="hideDopDown">
                        <li>
                            <a :href="user.isLogged ? '/account' : '/login'" @click.prevent="$router.push({name: accountRouteName})" @blur="!user.isLogged && hideDopDown()" @focus="showDropDown">
                                <span>{{ accountRouteDisplayedName }}</span>
                            </a>
                        </li>
                        <li v-if="user.isLogged">
                            <button @click="logout" @focus="showDropDown" @blur="hideDopDown">
                                Déconnexion
                            </button>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </nav>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: "MainNav",
        computed: {
            ...mapState([
                'user'
            ]),
            accountRouteName() {
                return this.user.isLogged ? 'account' : 'login';
            },
            accountRouteDisplayedName() {
                return this.user.isLogged ? 'Mon compte' : 'Se connecter';
            },
        },
        methods: {
            showDropDown() {
                if (!this.$refs.accountDropdown.classList.contains('active'))
                    this.$refs.accountDropdown.classList.add('active');
            },
            hideDopDown() {
                this.$refs.accountDropdown.classList.remove('active');

            },
            logout() {
                this.$store.dispatch('logout');
            },
        },
    }
</script>

<style scoped lang="scss">
    .main-nav__list {
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 20px;
    }

    .main-nav__icon {
        width: 45px;
        height: 45px;
        fill: #E1875B;
        padding: 0 10px 10px;
    }

    .main-nav__item--account {
        position: relative;

        &.active {
            .main-nav__sub-list-container {
                right: 9px;
                top: 5px;
                transform: scale(1);
                opacity: 1;
            }

            .main-nav__sub-list {
                opacity: 1;
            }
        }
    }

    .main-nav__sub-list-container {
        overflow: hidden;
        background-color: $color-3;
        position: absolute;
        right: -39px;
        top: -5px;
        border-radius: 5px;
        transform: scale(0);
        transition: 0.3s;
        opacity: 0;
    }

    .main-nav__sub-list {
        width: max-content;
        opacity: 0;
        padding: 5px;
        transition: 0.3s;
        /*transition-delay: 0.3s;*/

        li {
            display: block;

            & > * {
                display: block;
                padding: 5px 10px 0;
                color: $color-1;
                text-decoration: none;
                border-bottom: 2px solid transparent;
                transition: 0.3s;
                
                &:focus, &:hover {
                    border-bottom: 2px solid $color-1;
                    outline: none;
                }
            }

            &:first-child > * {
                padding-top: 5px;
            }

            &:last-child {
                padding-bottom: 5px;
            }
        }
    }
</style>