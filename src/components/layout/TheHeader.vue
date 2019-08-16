<template>
    <header class="site-header" :style="headerStyle">
        <h1 aria-level="1"
            class="site-header__title"
            :class="{ 'visually-hidden': hideMainTitle}"
            role="heading">
            Alea-food
        </h1>
        <MainNav/>
        <h1 aria-level="1"
            class="site-header__title"
            :class="{ 'visually-hidden': !hideMainTitle}"
            role="heading">
            {{pageTitle}}
        </h1>
        <div v-if="$route.name === 'account'" class="site-header__user">
            <div v-if="user.data.avatar" class="site-header__user__avatar-menu">
                <button class="site-header__user__avatar-btn site-header__user__avatar-btn--edit">
                    <span>Changer</span>
                </button>
                <button class="site-header__user__avatar-btn site-header__user__avatar-btn--remove">
                    <span>Retirer</span>
                </button>
            </div>
            <div :class="['site-header__user__avatar-container', {'site-header__user__avatar-container--no-avatar': !user.data.avatar}]">
                <img class="site-header__user__avatar" v-if="user.data.avatar" :src="`${axios.defaults.baseURL}/storage/${user.data.avatar}`" alt="">
                <button title="Ajouter ma photo" v-if="!user.data.avatar">
                    <span class="visually-hidden">Ajouter ma photo</span>
                    <svg class="site-header__user__no-avatar-svg"
                         version="1.2" baseProfile="tiny" id="Calque_1"
                         xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20"
                         xml:space="preserve">
                        <path d="M10,7.49c-2.26,0-4.09,1.83-4.09,4.09c0,2.26,1.83,4.09,4.09,4.09c2.26,0,4.09-1.83,4.09-4.09C14.09,9.32,12.26,7.49,10,7.49z M10,13.91c-1.29,0-2.34-1.05-2.34-2.34c0-1.29,1.05-2.34,2.34-2.34c1.29,0,2.34,1.05,2.34,2.34C12.34,12.87,11.29,13.91,10,13.91z"/><circle cx="10" cy="11.58" r="1.84"/><path d="M18.88,5.38h-3.17l-0.77-2.5c-0.15-0.48-0.61-0.8-1.14-0.8H9.52C9,2.07,8.54,2.4,8.39,2.88l-0.77,2.5H6.05V4.43c0-0.1-0.08-0.18-0.18-0.18H5.26V4.14c0-0.1-0.08-0.18-0.18-0.18H2.61c-0.1,0-0.18,0.08-0.18,0.18v0.11H1.83c-0.1,0-0.18,0.08-0.18,0.18v0.95H1.12C0.5,5.38,0,5.88,0,6.5v10.31c0,0.62,0.5,1.12,1.12,1.12h17.76c0.62,0,1.12-0.5,1.12-1.12V6.5C20,5.88,19.5,5.38,18.88,5.38z M9.3,3.37c0.11-0.35,0.45-0.6,0.84-0.6h3.17c0.39,0,0.73,0.24,0.84,0.6l0.62,2.01H8.68L9.3,3.37zM10,17.08c-3.04,0-5.5-2.46-5.5-5.5c0-2.12,1.2-3.96,2.96-4.88C7.82,6.51,8.2,6.37,8.6,6.26C9.05,6.14,9.52,6.07,10,6.07c0.95,0,1.84,0.24,2.62,0.66c0.36,0.19,0.69,0.43,1,0.7c1.16,1.01,1.89,2.49,1.89,4.15C15.5,14.62,13.04,17.08,10,17.08z"/>
                </svg>
                <svg class="site-header__user__no-avatar-svg-add"
                     version="1.2" baseProfile="tiny" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                     x="0px" y="0px" viewBox="0 0 4 4"
                     xml:space="preserve">
                    <path d="M3.7,1.4H2.6V0.3C2.6,0.2,2.4,0,2.2,0H1.8C1.6,0,1.4,0.2,1.4,0.3v1.1H0.3C0.2,1.4,0,1.6,0,1.8v0.5c0,0.2,0.2,0.3,0.3,0.3h1.1v1.1C1.4,3.8,1.6,4,1.8,4h0.5c0.2,0,0.3-0.2,0.3-0.3V2.6h1.1C3.8,2.6,4,2.4,4,2.2V1.8C4,1.6,3.8,1.4,3.7,1.4z"/>
                </svg>
                </button>
            </div>
        </div>
        <template v-if="showHeaderMask">
            <svg aria-hidden="true" class="site-header__mask" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 18">
                <path d="m-4.971748,25.341685l384.25022,0.303852l0,-17.93341c0.289571,0.09467 -6.739649,7.666553 -33.616089,4.478389c-26.876441,-3.188164 -35.559589,-3.586678 -63.262997,2.391129c-27.703408,5.977807 -37.213532,-6.774848 -69.878734,-6.774848c-32.665208,0 -25.818868,8.56819 -59.955132,7.173368c-34.136263,-1.394821 -40.003834,-11.399531 -69.878733,-5.977807c-29.874899,5.421724 -30.553989,7.947212 -50.858487,5.829507c-20.304498,-2.117705 -39.280944,-9.416191 -39.694429,-3.836905c-0.413483,5.579281 -2.563719,16.419013 2.894381,14.346725z"/>
            </svg>
            <svg aria-hidden="true" class="site-header__mask-stroke" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 18">
                <path d="m379.27847,7.71213c0.28957,0.09467 -6.73965,7.66655 -33.61609,4.47839c-26.87644,-3.18817 -35.55959,-3.58668 -63.26299,2.39113c-27.70341,5.9778 -37.21354,-6.77485 -69.87874,-6.77485c-32.66521,0 -25.81887,8.56819 -59.95513,7.17337c-34.13626,-1.39483 -40.00383,-11.39954 -69.87873,-5.97781c-29.8749,5.42172 -30.55399,7.94721 -50.85849,5.82951c-20.3045,-2.11771 -39.28094,-9.4162 -39.69443,-3.83691"/>
            </svg>
        </template>
        <div :class="`site-header__content site-header__content--${$route.name}`"
             v-if="headerContentPart1 || headerContentPart2">
            <span v-if="headerContentPart1" class="site-header__content site-header__content--part-1" v-html="headerContentPart1"></span>
            <span v-if="headerContentPart2" class="site-header__content site-header__content--part-2" v-html="headerContentPart2"></span>
        </div>
        <AuthNav v-if="showAuthNav"/>
    </header>
</template>

<script>
    import MainNav from '@/components/layout/parts/MainNav';
    import AuthNav from "@/components/layout/parts/AuthNav";
    import { mapState } from 'vuex';

    export default {
        name: "TheHeader",
        components: {
            MainNav,
            AuthNav,
        },
        computed: {
            ...mapState([
                'user',
            ]),
            pageTitle() {
                return this.$route.meta.displayedName
            },
            headerBackgroundFileName() {
                let name = '';
                switch (this.$route.name) {
                    case 'home': name = 'food'; break;
                    default: name = 'food-pattern1'; break;
                }

                let fileName = '';
                const sizes = [1920, 1440, 1024, 768, 400];
                switch (true) {
                    case (window.outerWidth  >= sizes[0]): {
                        fileName = name + '_' + sizes[0] + '.jpg';
                    } break;
                    case (window.outerWidth  >= sizes[1]): {
                        fileName = name + '_' + sizes[1] + '.jpg';
                    } break;
                    case (window.outerWidth  >= sizes[2]): {
                        fileName = name + '_' + sizes[2] + '.jpg';
                    } break;
                    case (window.outerWidth  >= sizes[3]): {
                        fileName = name + '_' + sizes[3] + '.jpg';
                    } break;
                    case (window.outerWidth  < sizes[3]): {
                        fileName = name + '_' + sizes[4] + '.jpg';
                    } break;
                }
                return fileName;
            },
            showHeaderMask() {
                return this.$route.name !== 'login' && this.$route.name !== 'register';
            },
            headerStyle() {
                return {
                    "background-image": `linear-gradient(rgba(250, 236, 230, 0.80), rgba(250, 236, 230, 0.80)), url('assets/img/${this.headerBackgroundFileName}')`,
                };
            },
            headerContentPart1() {
                let content = '';
                switch (this.$route.name) {
                    case 'home': content = ''; break;
                    case 'login': content = ''; break;
                    case 'register': content = ''; break;
                }
                return content;
            },
            headerContentPart2() {
                let content = '';
                switch (this.$route.name) {
                    case 'home': content = ''; break;
                    case 'login': content = `Connectez-vous pour profiter pleinement d'Alea-food&nbsp;!`; break;
                    case 'register': content = `Rejoignez nous et profitez pleinement d'Alea-food&nbsp;!`; break;
                }
                return content;
            },
            hideMainTitle(){
                const routeNames = ['home', 'login', 'register'];
                return !routeNames.includes(this.$route.name);
            },
            showAuthNav() {
                const routes = ['login', 'register'];
                return routes.includes(this.$route.name);
            },
        },
        mounted() {
        },
    }
</script>

<style scoped lang="scss">
    .site-header {
        position: relative;
        background-repeat: no-repeat;
        background-size: cover;
        padding: 40px 20px 20px;
        text-align: center;
    }

    .site-header__mask, .site-header__mask-stroke {
        position: absolute;
        bottom: -1px;
        left: 0;
    }

    .site-header__mask {
        fill: $color-1;
    }

    .site-header__mask-stroke {
        stroke: $color-3;
        stroke-width: 1;
        fill: transparent;
    }

    .site-header__title {
        font-family: $page-title-font-family;
        font-size: $font-size-1;
        line-height: 1;
        color: $color-2;
        padding: 20px 25px;
    }

    .site-header__content--part-1 {
        font-size: $font-size-4;
        display: block;
        font-style: italic;
    }

    .site-header__content--part-2 {
        display: block;
        margin-top: 0.3em;
        font-style: italic;
        text-shadow: #fff 0 0 2px, #fff 0 0 3px, #fff 0 0 4px, #fff 0 0 4px, #fff 0 0 5px, #fff 0 0 5px;
    }

    .site-header__user {
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: $vertical-space-size-2;
    }

    .site-header__user__avatar-container {
        width: 104px;
        height: 104px;
        border: 2px solid $color-3;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: auto;
        margin-right: auto;
        background-color: $color-1;
        position: relative;
        z-index: 1;
    }

    .site-header__user__avatar {
        width: 94px;
        height: auto;
        border: 2px solid $color-2;
        border-radius: 50%;
    }

    .site-header__user__no-avatar-svg {
        width: 50px;
        fill: $color-2;
        .st0{fill: $color-1;}
    }

    .site-header__user__no-avatar-svg-add {
        fill: $color-2;
        width: 12px;
        height: 12px;
        position: absolute;
        top: 23px;
        right: 11px;
    }

    .site-header__user__avatar-menu{
        position: absolute;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        width: 100%;
    }

    .site-header__user__avatar-btn {
        position: absolute;
        padding: 5px 10px;
        background-color: $color-3;
        min-width: 6em;
        color: $color-1;

        span{
            border-bottom: 2px solid transparent;
            transition: 0.3s;
        }

        &:hover span, &:focus span{
            border-bottom: 2px solid $color-1;
        }
    }

    .site-header__user__avatar-btn--edit{
        border-radius: 5px 0 0 5px;
        right: 50%;
        margin-right: 45px;
    }

    .site-header__user__avatar-btn--remove{
        border-radius: 0 5px 5px 0;
        left: 50%;
        margin-left: 45px;
    }

</style>