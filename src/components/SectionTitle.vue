<template>
    <div class="section-title-component">
        <i class="section-title-component__decoration"></i>
        <span v-if="!level" class="section-title-component__text">
            {{title}}
        </span>
        <h1 v-if="level === '1'"
            :id="id"
            :aria-level="level"
            class="section-title-component__text">
            {{title}}
        </h1>
        <h2 v-else-if="level === '2'"
            :id="id"
            :aria-level="level"
            class="section-title-component__text">
            {{title}}
        </h2>
        <h3 v-else-if="level === '3'"
            :id="id"
            :aria-level="level"
            class="section-title-component__text">
            {{title}}
        </h3>
        <h4 v-else-if="level === '4'"
            :id="id"
            :aria-level="level"
            class="section-title-component__text">
            {{title}}
        </h4>
        <h5 v-else-if="level === '5'"
            :id="id"
            :aria-level="level"
            class="section-title-component__text">
            {{title}}
        </h5>
        <h6 v-else-if="level === '6'"
            :id="id"
            :aria-level="level"
            class="section-title-component__text">
            {{title}}
        </h6>
    </div>
</template>

<script>
    export default {
        name: "SectionTitle",
        props: {
            title: String,
            id: String,
            level: String,
        }
    }
</script>

<style scoped lang="scss">
    .section-title-component {
        width: max-content;
        position: relative;
        margin-bottom: $vertical-space-size-1;
    }

    .section-title-component__text {
        font-family: $section-title-font-family;
        font-size: $font-size-3;
        font-weight: bold;
        color: $color-8;
        position: relative;
    }

    .section-title-component__decoration {
        background-color: rgba($color-8, 20%);
        display: block;
        width: 100%;
        height: 1.45rem;
        position: absolute;
        bottom: -0.2em;
        right: -1.4em;
    }
</style>