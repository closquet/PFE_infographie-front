<template>
  <div id="app" class="app">
    <div id="nav">
      <router-link :to="{ name: 'home'}">Home</router-link> |
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
  html {
    font-family: $labor-text-font-family, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $color-2;
    background-color: $color-1;
  }

  .page-title {
    font-family: $page-title-font-family;
  }
</style>
