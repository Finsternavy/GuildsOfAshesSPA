<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import Menu from "./components/Menu.vue";

const imagePrefix = '../../public/AOCimages/';
const backgroundImages = [
  'AOC_castle.png',
  'AOC2023March.jpg',
  'AOCGoblinVillage.jpg',
  'AOCJanuary.jpg',
  'AOCKaelarCamp.png',
  'AOCKaelarCityA.png',
  'AOCVaeluneCityD.png',
  'AOCMountainFantasy.png',
  'AOCRiverlands.png',
  'AOCSpooky.jpg',
  'AOCTropicalBay.jpg',
  'AOCVaeluneCityA.png',
  'AOCVaeluneEncampment.png',
  'AOCWaterfall.png',
]

const randomImage = () => {
  const index = Math.floor(Math.random() * backgroundImages.length);
  return backgroundImages[index];
}

const currentYear = new Date().getFullYear();
</script>

<template>
  <div id="PrimaryLayout"
        class="uk-background-cover uk-background-fixed"
        :data-src="imagePrefix + randomImage()" 
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
      <p class="uk-text-center">Site Developed by 
        <a href="https://www.linkedin.com/in/christopher-finster/">Christopher Finster</a>
        <span>. All rights reserved. {{ currentYear }}</span>
      </p>
    </section>
  </div>
</template>

<style scoped></style>
