<template>
    <section class="dashboard-section"
             :aria-labelledby="titleId">
        <SectionTitle class="dashboard-section__title"
                      :title="displayedTitle"
                      level="3"
                      :id="titleId"/>

        <div class="dashboard-section__actions">
            <MidBtn class="dashboard-section__btn dashboard-section__btn--list"
                    @click="$emit('listBtnClicked')">
                <svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 10 10"
                     stroke-linecap="round"
                     fill="none"
                     stroke-width="1.5">
                    <g transform="translate(1.4 1.4)">
                        <line x2="7" y2="0"/>
                        <line x2="7" y1="3.5" y2="3.5"/>
                        <line x2="7" y1="7" y2="7"/>
                    </g>
                </svg>
                Liste
            </MidBtn>
            <MidBtn class="dashboard-section__btn dashboard-section__btn--add"
                    @click="$emit('newBtnClicked')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5.426 5.426">
                    <g transform="translate(1.061 1.061)">
                        <line x2="3.305" y2="3.305" fill="none" stroke-linecap="round" stroke-width="1"/>
                        <line x2="3.305" y2="3.305" transform="translate(3.305) rotate(90)" fill="none" stroke-linecap="round" stroke-width="1"/>
                    </g>
                </svg>
                Nouveau
            </MidBtn>
        </div>
    </section>
</template>

<script>
    import SectionTitle from "@/components/SectionTitle";
    import MidBtn from "@/components/MidBtn";

    export default {
        name: "DashBoardSection",
        props: {
            title: String,
            titleId: String,
            amount: Number,
        },
        components: {
            SectionTitle,
            MidBtn,
        },
        computed: {
            displayedTitle() {
                return `${this.title} (${this.amount}<span class="visually-hidden"> resources</span>)`;

            }
        },
    }
</script>

<style scoped lang="scss">
    .dashboard-section {
        padding-bottom: 3.1rem;
        position: relative;
    }

    .dashboard-section + .dashboard-section {
        padding-top: 1.9rem;

        &:after {
            content: '';
            width: 100vw;
            height: 1px;
            position: absolute;
            top: 0;
            left: -20px;
            background-color: $color-6;
        }
    }

    .dashboard-section__actions {
        display: flex;
        width: fit-content;
        margin-left: auto;
        margin-right: auto;
        margin-top: $vertical-space-size-2;
    }

    .dashboard-section__btn {
        display: flex;
        align-items: center;
    }

    .dashboard-section__btn svg {
        stroke: $color-1;
        width: 1rem;
    }

    .dashboard-section__btn--list {
        margin-right: $vertical-space-size-1;

        svg {

        }
    }

    .dashboard-section__btn--add {
        svg {
            transform: rotate(45deg);
            /*margin-right: 0.5rem;*/
        }
    }

</style>