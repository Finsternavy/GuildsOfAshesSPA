<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import Menu from "./components/Menu.vue";
</script>

<template>
  <div id="PrimaryLayout"
        class="uk-background-cover uk-background-fixed"
        data-src="../../public/AOCimages/AOC_castle.png" 
        uk-height-viewport="expand: true"
        uk-img>
    <div id="MenuContainer" class="">
      <Menu />
    </div>
    <section id="MainBodySection" class="uk-padding-remove">
      <!-- <div class="hero uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light" 
      data-src="../../public/AOCimages/AOC_castle.png" 
      uk-img></div> -->
      <div
        id="MainBodyContainer"
        class="mainbody container "
        uk-height-viewport="expand: true"
      >
        <RouterView />
      </div>
    </section>

    <section id="GlobalFooter" class="uk-section uk-margin-large-top uk-section-xsmall">
      <!-- <footer-navigation /> -->
      <p class="uk-text-center">Site Developed by <a href="https://www.linkedin.com/in/christopher-finster/">Christopher Finster</a></p>
    </section>
  </div>
</template>

<style scoped></style>
