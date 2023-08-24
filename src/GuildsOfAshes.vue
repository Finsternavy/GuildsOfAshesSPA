<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onBeforeMount, ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import Menu from "./components/Menu.vue";

const imagePrefix = "../../public/AOCimages/";

// Need to go over these images and change the resolution.
// Some of them do not load in time and will just show
// a black background.

const backgroundImages = [
  "AOC_castle.png",
  "AOC2023March.jpg",
  "AOCGoblinVillage.jpg",
  "AOCJanuary.jpg",
  "AOCKaelarCamp.png",
  "AOCKaelarCityA.png",
  "AOCVaeluneCityD.png",
  "AOCMountainFantasy.png",
  "AOCRiverlands.png",
  "AOCSpooky.jpg",
  "AOCTropicalBay.jpg",
  "AOCVaeluneCityA.png",
  "AOCVaeluneEncampment.png",
  "AOCWaterfall.png",
];

const getRandomImage = () => {
  const index = Math.floor(Math.random() * backgroundImages.length);
  return backgroundImages[index];
};

onBeforeMount(() => {
  console.log("PrimaryLayout mounted");
  randomImage.value = getRandomImage;
});
const randomImage = ref();
const currentYear = new Date().getFullYear();
</script>

<template>
  <div
    id="PrimaryLayout"
    class="uk-background-cover uk-background-fixed"
    :data-src="imagePrefix + getRandomImage()"
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

    <section
      id="GlobalFooter"
      class="uk-section goa-container-no-radius uk-margin-large-top uk-section-xsmall uk-padding-remove"
    >
      <!-- <footer-navigation /> -->
      <p class="uk-text-center">
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
