<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onBeforeMount, ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import Menu from "./components/Menu.vue";
import AOC_castle from "./public/AOCimages/AOC_castle.png";
import AOC2023March from "./public/AOCimages/AOC2023March.jpg";
import AOCGoblinVillage from "./public/AOCimages/AOCGoblinVillage.jpg";
import AOCJanuary from "./public/AOCimages/AOCJanuary.jpg";
import AOCKaelarCamp from "./public/AOCimages/AOCKaelarCamp.png";
import AOCKaelarCityA from "./public/AOCimages/AOCKaelarCityA.png";
import AOCVaeluneCityD from "./public/AOCimages/AOCVaeluneCityD.png";
import AOCMountainFantasy from "./public/AOCimages/AOCMountainFantasy.png";
import AOCRiverlands from "./public/AOCimages/AOCRiverlands.png";
import AOCSpooky from "./public/AOCimages/AOCSpooky.jpg";
import AOCTropicalBay from "./public/AOCimages/AOCTropicalBay.jpg";
import AOCVaeluneCityA from "./public/AOCimages/AOCVaeluneCityA.png";
import AOCVaeluneEncampment from "./public/AOCimages/AOCVaeluneEncampment.png";
import AOCWaterfall from "./public/AOCimages/AOCWaterfall.png";

let imagePrefix = "/src/public/AOCimages/";

// Need to go over these images and change the resolution.
// Some of them do not load in time and will just show
// a black background.

let backgroundImages = [
  AOC_castle,
  AOC2023March,
  AOCGoblinVillage,
  AOCJanuary,
  AOCKaelarCamp,
  AOCKaelarCityA,
  AOCVaeluneCityD,
  AOCMountainFantasy,
  AOCRiverlands,
  AOCSpooky,
  AOCTropicalBay,
  AOCVaeluneCityA,
  AOCVaeluneEncampment,
  AOCWaterfall,

  // "AOC_castle.png",
  // "AOC2023March.jpg",
  // "AOCGoblinVillage.jpg",
  // "AOCJanuary.jpg",
  // "AOCKaelarCamp.png",
  // "AOCKaelarCityA.png",
  // "AOCVaeluneCityD.png",
  // "AOCMountainFantasy.png",
  // "AOCRiverlands.png",
  // "AOCSpooky.jpg",
  // "AOCTropicalBay.jpg",
  // "AOCVaeluneCityA.png",
  // "AOCVaeluneEncampment.png",
  // "AOCWaterfall.png",
];

let getRandomImage = () => {
  let index = Math.floor(Math.random() * backgroundImages.length);
  return backgroundImages[index];
};

onBeforeMount(() => {
  // console.log("PrimaryLayout mounted");
  randomImage.value = getRandomImage;
});
let randomImage = ref();
let currentYear = new Date().getFullYear();
</script>

<style></style>

<template>
  <div
    id="PrimaryLayout"
    class="uk-background-cover uk-background-fixed uk-width-1-1"
    :data-src="getRandomImage()"
    uk-height-viewport="expand: true"
    uk-img
  >
    <div id="MenuContainer" class="">
      <Menu />
    </div>
    <section id="MainBodySection" class="uk-padding-remove">
      <!-- <div class="hero uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light" 
      data-src="../../public/AOCimages/AOC_castle.png" 
      uk-img></div> -->
      <div
        id="MainBodyContainer"
        class="mainbody container"
        uk-height-viewport="expand: true"
      >
        <RouterView />
      </div>
    </section>

    <section id="GlobalFooter" class="footer">
      <!-- <footer-navigation /> -->
      <p class="uk-text-center uk-margin-remove">
        Developed by
        <a href="https://www.linkedin.com/in/christopher-finster/" target="_blank"
          >Christopher Finster</a
        >
        <span>. All rights reserved. {{ currentYear }}</span>
      </p>
    </section>
  </div>
</template>

<style scoped></style>
