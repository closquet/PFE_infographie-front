<template>
    <header class="site-header" :style="headerStyle">
        <h1 aria-level="1"
            class="site-header__title"
            :class="{ 'visually-hidden': hideMainTitle}"
            role="heading">
            Alea-food
        </h1>
        <h1 aria-level="1"
            class="site-header__title"
            :class="{ 'visually-hidden': !hideMainTitle}"
            role="heading">
            {{pageTitle}}
        </h1>
        <MainNav/>
        <template v-if="showHeaderMask">
            <svg aria-hidden="true" class="site-header__mask" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 18">
                <path d="m-4.971748,25.341685l384.25022,0.303852l0,-17.93341c0.289571,0.09467 -6.739649,7.666553 -33.616089,4.478389c-26.876441,-3.188164 -35.559589,-3.586678 -63.262997,2.391129c-27.703408,5.977807 -37.213532,-6.774848 -69.878734,-6.774848c-32.665208,0 -25.818868,8.56819 -59.955132,7.173368c-34.136263,-1.394821 -40.003834,-11.399531 -69.878733,-5.977807c-29.874899,5.421724 -30.553989,7.947212 -50.858487,5.829507c-20.304498,-2.117705 -39.280944,-9.416191 -39.694429,-3.836905c-0.413483,5.579281 -2.563719,16.419013 2.894381,14.346725z"/>
            </svg>
            <svg aria-hidden="true" class="site-header__mask-stroke" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 18">
                <path d="m379.27847,7.71213c0.28957,0.09467 -6.73965,7.66655 -33.61609,4.47839c-26.87644,-3.18817 -35.55959,-3.58668 -63.26299,2.39113c-27.70341,5.9778 -37.21354,-6.77485 -69.87874,-6.77485c-32.66521,0 -25.81887,8.56819 -59.95513,7.17337c-34.13626,-1.39483 -40.00383,-11.39954 -69.87873,-5.97781c-29.8749,5.42172 -30.55399,7.94721 -50.85849,5.82951c-20.3045,-2.11771 -39.28094,-9.4162 -39.69443,-3.83691"/>
            </svg>
        </template>
        <div :class="`site-header_content site-header_content--${$route.name}`"
             v-if="headerContentPart1 || headerContentPart2">
            <span v-if="headerContentPart1" class="site-header_content site-header_content--part-1" v-html="headerContentPart1"></span>
            <span v-if="headerContentPart2" class="site-header_content site-header_content--part-2" v-html="headerContentPart2"></span>
        </div>
        <AuthNav v-if="showAuthNav"/>
    </header>
</template>

<script>
    import MainNav from '@/components/layout/parts/MainNav';
    import AuthNav from "@/components/layout/parts/AuthNav";

    export default {
        name: "TheHeader",
        components: {
            MainNav,
            AuthNav,
        },
        computed: {
            pageTitle() {
                return this.$route.meta.displayedName
            },
            headerBackgroundFileName() {
                let name = '';
                switch (this.$route.name) {
                    case 'home': name = 'food'; break;
                }

                let fileName = '';
                const sizes = [1920, 1440, 1024, 768, 400];
                switch (true) {
                    case (window.screen.width >= sizes[0]): {
                        fileName = name + '_' + sizes[0] + '.jpg';
                    } break;
                    case (window.screen.width >= sizes[1]): {
                        fileName = name + '_' + sizes[1] + '.jpg';
                    } break;
                    case (window.screen.width >= sizes[2]): {
                        fileName = name + '_' + sizes[2] + '.jpg';
                    } break;
                    case (window.screen.width >= sizes[3]): {
                        fileName = name + '_' + sizes[3] + '.jpg';
                    } break;
                    case (window.screen.width < sizes[3]): {
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

    .site-header_content--part-1 {
        font-size: $font-size-4;
        display: block;
    }

    .site-header_content--part-2 {
        display: block;
        margin-top: 0.3em;
    }
</style>