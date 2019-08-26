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
                <router-link :to="{ name: 'home' }" title="Accueil">
                    <span class="visually-hidden">Accueil</span>
                    <svg aria-hidden="true" class="main-nav__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <g transform="translate(-41.048 -20.398)">
                            <rect width="3.143" height="8.882" transform="translate(44.19 27.515)"/><rect width="3.143" height="8.882" transform="translate(50.476 27.515)"/><path d="M130.048,19.693h16l-8-9.3Z" transform="translate(-89 10)"/>
                        </g>
                    </svg>
                </router-link>
            </li>
            <li v-if="user.isLogged && user.data.is_admin" class="main-nav__item main-nav__item--admin">
                <router-link :to="{ name: 'admin-dashboard' }" title="Back office">
                    <span class="visually-hidden">Back office</span>
                    <svg width="28" height="28" aria-hidden="true" version="1.2" baseProfile="tiny" id="Calque_2"
                         xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
                         xml:space="preserve">
                        <g>
                            <g>
                                <path fill="#F9F7F3" d="M21.9,469.7c-6.9,0-12.6-5.2-13.4-11.9l52.2-101.6c5.1-10,15.3-16.2,26.5-16.2h338.1
                                c10,0,19.1,5.5,23.8,14.4l54.4,103.4c-0.8,6.7-6.5,11.8-13.4,11.8H21.9z"/>
                                <path fill="#E1875B" d="M425.3,347.6c7.2,0,13.8,4,17.1,10.4l53.1,100.9c-1,2-3,3.4-5.4,3.4H21.9c-2.4,0-4.5-1.4-5.4-3.5
                                l50.9-99.1c3.8-7.5,11.4-12.1,19.8-12.1H425.3 M425.3,332.6H87.2c-14,0-26.8,7.8-33.2,20.2L0.9,456.2c0,11.6,9.4,21,21,21h468.2
                                c11.6,0,21-9.4,21-21l-55.4-105.3C449.8,339.6,438,332.6,425.3,332.6L425.3,332.6z"/>
                            </g>
                            <g>
                                <path fill="#F9F7F3" d="M101.5,297.9c-18.5,0-33.5-15-33.5-33.5V75.8c0-18.5,15-33.5,33.5-33.5h309c18.5,0,33.5,15,33.5,33.5
                                v188.6c0,18.5-15,33.5-33.5,33.5H101.5z"/>
                                <path fill="#E1875B" d="M410.5,49.8c14.3,0,26,11.7,26,26v188.6c0,14.3-11.7,26-26,26h-309c-14.3,0-26-11.7-26-26V75.8
                                c0-14.3,11.7-26,26-26H410.5 M410.5,34.8h-309c-22.6,0-41,18.4-41,41v188.6c0,22.6,18.4,41,41,41h309c22.6,0,41-18.4,41-41V75.8
                                C451.5,53.2,433.1,34.8,410.5,34.8L410.5,34.8z"/>
                            </g>
                            <g>
                                <path fill="#E1875B" d="M116.5,263.6c-7.4,0-13.5-6.1-13.5-13.5V86.9c0-7.4,6.1-13.5,13.5-13.5h279c7.4,0,13.5,6.1,13.5,13.5
                                v163.2c0,7.4-6.1,13.5-13.5,13.5H116.5z"/>
                                <path fill="#E1875B" d="M395.5,80.9c3.3,0,6,2.7,6,6v163.2c0,3.3-2.7,6-6,6h-279c-3.3,0-6-2.7-6-6V86.9c0-3.3,2.7-6,6-6H395.5
                                M395.5,65.9h-279c-11.6,0-21,9.4-21,21v163.2c0,11.6,9.4,21,21,21h279c11.6,0,21-9.4,21-21V86.9
                                C416.5,75.3,407.1,65.9,395.5,65.9L395.5,65.9z"/>
                            </g>
                            <rect x="127.9" y="93.5" fill="#F9F7F3" width="13.9" height="56.4"/>
                            <g>
                                <path fill="#E1875B" d="M358.6,435.3c-5.2,0-9.4-4.2-9.4-9.4v-42.6c0-5.2,4.2-9.4,9.4-9.4H417c3.7,0,7,2.2,8.6,5.5L445,422
                                c1.4,3,1.1,6.2-0.6,9c-1.8,2.7-4.6,4.3-7.9,4.3H358.6z"/>
                                <path fill="#E1875B" d="M417,381.4c0.7,0,1.4,0.4,1.7,1.1l19.4,42.6c0.1,0.2,0.4,0.9-0.1,1.8c-0.6,0.9-1.3,0.9-1.6,0.9h-77.8
                                c-1.1,0-1.9-0.9-1.9-1.9v-42.6c0-1.1,0.9-1.9,1.9-1.9H417 M417,366.4h-58.4c-9.3,0-16.9,7.6-16.9,16.9v42.6
                                c0,9.3,7.6,16.9,16.9,16.9h77.8c12.3,0,20.5-12.7,15.4-23.9l-19.4-42.6C429.7,370.2,423.6,366.4,417,366.4L417,366.4z"/>
                            </g>
                            <g>
                                <path fill="#E1875B" d="M74.1,434c-2.9,0-5.5-1.3-6.9-3.5c-0.6-1-1.6-3.1-0.3-5.7l0.1-0.2l20.8-46.7c1.2-2.5,4-4.1,7.2-4.1h213.1
                                c4.3,0,7.8,3,7.8,6.7v46.8c0,3.7-3.5,6.7-7.8,6.7H74.1z"/>
                                <path fill="#E1875B" d="M308.1,381.4c0.1,0,0.2,0,0.3,0v45.1c-0.1,0-0.2,0-0.3,0H74.3l20-45c0.1,0,0.3-0.1,0.5-0.1H308.1
                                M308.1,366.4H94.9c-6,0-11.5,3.3-14,8.4l-20.8,46.8c-4.5,9.4,2.9,19.9,14,19.9h234c8.5,0,15.3-6.3,15.3-14.2v-46.8
                                C323.4,372.7,316.5,366.4,308.1,366.4L308.1,366.4z"/>
                            </g>
                            <g>
                            <rect x="102.2" y="297.9" fill="#E1875B" width="307.5" height="41.9"/>
                            <path fill="#E1875B" d="M402.3,305.4v26.9H109.7v-26.9H402.3 M417.3,290.4H94.7v56.9h322.5V290.4L417.3,290.4z"/>
                            </g>
                        </g>
                        <g>
                            <circle fill="#F9F7F3" cx="189.8" cy="319.2" r="10.2"/>
                            <circle fill="#F9F7F3" cx="256" cy="319.2" r="10.2"/>
                            <circle fill="#F9F7F3" cx="322.2" cy="319.2" r="10.2"/>
                        </g>
                    </svg>
                </router-link>
            </li>
            <li class="main-nav__item main-nav__item--account" ref="accountDropdown">
                <div @click="showDropDown" @mouseover="showDropDown" @mouseleave="hideDropDown" @blur="hideDropDown">
                    <span class="visually-hidden">Mon compte</span>
                    <svg aria-hidden="true" class="main-nav__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <defs><clipPath id="a"><rect width="16" height="16" fill="none"/></clipPath></defs><g clip-path="url(#a)"><path d="M0,370v-2c0-2.2,3.6-4,8-4s8,1.8,8,4v2Zm4-12a4,4,0,1,1,4,4A4,4,0,0,1,4,358Z" transform="translate(0 -354)"/></g>
                    </svg>
                </div>
                <div class="main-nav__sub-list-container">
                    <ul class="main-nav__sub-list" @mouseover="showDropDown" @mouseleave="hideDropDown">
                        <li>
                            <a :href="user.isLogged ? '/account' : '/login'" @click.prevent="goToAccountRoute" @blur="hideDropDown()" @focus="showDropDown">
                                <span>{{ accountRouteDisplayedName }}</span>
                            </a>
                        </li>
                        <li v-if="user.isLogged">
                            <button @click="logout" @focus="showDropDown" @blur="hideDropDown">
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
            hideDropDown() {
                this.$refs.accountDropdown.classList.remove('active');
            },
            logout() {
                this.$store.dispatch('logout');
            },
            goToAccountRoute() {
                this.$router.push({name: this.accountRouteName});
                this.hideDropDown();
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

    .main-nav__item--admin {
        margin-right: auto;
        margin-left: 2rem;

        a {
            border-bottom: 2px solid transparent;
            transition:  0.3s;

            &:hover, &:focus {
                border-bottom: 2px solid $color-3;
                outline: none;
            }
        }
    }

    .main-nav__item--home {
        a {
            border-bottom: 2px solid transparent;
            transition:  0.3s;

            &:hover, &:focus {
                border-bottom: 2px solid $color-3;
                outline: none;
            }
        }
    }

    .main-nav__icon {
        width: 25px; //old 45
        height: 25px;
        fill: $color-3;;
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