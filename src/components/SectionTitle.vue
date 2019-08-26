<template>
    <div class="section-title-component">
        <i class="section-title-component__decoration"></i>
        <span v-if="!level"
              v-html="title"
              class="section-title-component__text"></span>
        <h1 v-if="level === '1'"
            :id="id"
            :aria-level="level"
            v-html="title"
            class="section-title-component__text">
        </h1>
        <h2 v-else-if="level === '2'"
            :id="id"
            :aria-level="level"
            v-html="title"
            class="section-title-component__text">
        </h2>
        <h3 v-else-if="level === '3'"
            :id="id"
            :aria-level="level"
            v-html="title"
            class="section-title-component__text">
        </h3>
        <h4 v-else-if="level === '4'"
            :id="id"
            :aria-level="level"
            v-html="title"
            class="section-title-component__text">
        </h4>
        <h5 v-else-if="level === '5'"
            :id="id"
            :aria-level="level"
            v-html="title"
            class="section-title-component__text">
        </h5>
        <h6 v-else-if="level === '6'"
            :id="id"
            :aria-level="level"
            v-html="title"
            class="section-title-component__text">
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
        margin-left: auto;
        margin-right: auto;
        width: max-content;
        position: relative;
        margin-bottom: $vertical-space-size-2;
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
        width: calc(100% + 20px);
        height: 1.45rem;
        position: absolute;
        bottom: -0.2em;
        right: -10px;
    }
</style>