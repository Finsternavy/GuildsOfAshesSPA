<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onBeforeMount, ref, computed, onMounted, watch } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import { useGuildStore } from "./stores/guildStore";
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
];
let background = ref();
let guild = ref();
let guildStore;

const primaryColor = ref('#ff0000');
const secondaryColor = ref('#333333');
const accentColor = ref('#666666');
const textColor = ref('#ffffff');
const buttonTextColor = ref('#ffffff');
const buttonHoverTextColor = ref('#ffffff');
const inputTextColor = ref('#ffffff');
const headerColor = ref('#ffffff');
const backgroundColor = ref('#000000');
const backgroundColorAlpha = ref('#000000e6');

let getRandomImage = () => {
  let index = Math.floor(Math.random() * backgroundImages.length);
  return backgroundImages[index];
};


onBeforeMount(() => {
  guildStore = useGuildStore();
  let guild = guildStore.getGuild;
  // console.log("Guild: ", guild);
  let tmp = guild.Background ? guild.Background : getRandomImage();
  // set colors from guild
  background.value = guildStore.getGuild.Background ? guildStore.getGuild.Background : getRandomImage();
  // background.value = guild.Background? guild.Background : getRandomImage();
  // console.log("Background: ", background.value);
  // console.log("PrimaryLayout mounted");
});

onMounted(() => {
  // setColors();
  // console.log("Mounted, now getting background");
});

watch(() => guild, (newVal, oldVal) => {
  // console.log("Guild changed: ", newVal);
  getBackground();
  setColors();
});

let currentYear = new Date().getFullYear();

const getBackground = () => {
  let tmp = guildStore.getGuild.Background;
  if (tmp){
    let start = tmp.lastIndexOf('/');
    let end = tmp.lastIndexOf('.');
    tmp = tmp.substring(start, end);
  }
  // console.log("tmp: ", tmp);
  let imageToReturn = null;
  if (tmp && tmp != 'random') {
    // console.log("Return guild background");
    setColors();
    backgroundImages.forEach(image => {
      // console.log("Image: ", image);
      // console.log("tmp: ", tmp);
      if (image.includes(tmp)) {
        // console.log("Match found");
        // background.value = image;
        imageToReturn = image;
      }
    });
    return imageToReturn;
  } else {
    setColors();
    // console.log("Generating random background")
    imageToReturn = getRandomImage();
    return imageToReturn;
  }
  
};

const setColors = () => {
  let doc = document.querySelector(':root');
  let colors = guildStore.getGuild.Colors;
  // console.log("Guild colors: ", colors);
  if (colors){
    // console.log("Setting colors");
    primaryColor.value = colors.Primary ? colors.Primary : "#ff0000";
    secondaryColor.value = colors.Secondary ? colors.Secondary : "#333333";
    accentColor.value = colors.Accent ? colors.Accent : "#333333";
    textColor.value = colors.Text ? colors.Text : "#ffffff";
    headerColor.value = colors.Header ? colors.Header : "#ffffff";
    backgroundColor.value = colors.Background ? colors.Background : "#000000";
    inputTextColor.value = colors.InputText ? colors.InputText : "#ffffff";
    buttonTextColor.value = colors.ButtonText ? colors.ButtonText : "#ffffff";
    buttonHoverTextColor.value = colors.ButtonHoverText ? colors.ButtonHoverText : "#333333";
    const backgroundColorAlpha = ref('#000000e6');
  }
  doc.style.setProperty('--primary-color', primaryColor.value);
  doc.style.setProperty('--secondary-color', secondaryColor.value);
  doc.style.setProperty('--accent-color', accentColor.value);
  doc.style.setProperty('--text-color', textColor.value);
  doc.style.setProperty('--header-color', headerColor.value);
  doc.style.setProperty('--background-color', backgroundColor.value);
  doc.style.setProperty('--input-text-color', inputTextColor.value);
  doc.style.setProperty('--button-text-color', buttonTextColor.value);
  doc.style.setProperty('--button-hover-text-color', buttonHoverTextColor.value);
  let backgroundWithAlpha = backgroundColor.value + "e6";
  doc.style.setProperty('--background-color-alpha', backgroundWithAlpha);
}
</script>

<style>
.guild-button {
  background-color: v-bind(primaryColor);
}
</style>

<template>
  <div v-if="background"
    id="PrimaryLayout"
    class="uk-background-cover uk-background-fixed uk-width-1-1"
    :data-src="getBackground()"
    uk-height-viewport="expand: true"
    uk-img
  >
    <div id="MenuContainer" class="">
      <Menu></Menu>
    </div>
    <section id="MainBodySection" class="uk-padding-remove">
      <!-- <div class="hero uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light" 
      data-src="../../public/AOCimages/AOC_castle.png" 
      uk-img></div> -->
      <div id="MainBodyContainer" class="mainbody container" uk-height-viewport="expand: true">
        <RouterView />
      </div>
    </section>

    <section id="GlobalFooter" class="goa-container-no-radius uk-padding-remove uk-flex uk-flex-column uk-text-center">
      <!-- <footer-navigation /> -->
      <p class="uk-text-center uk-margin-remove">
        Developed by
        <a href="https://www.linkedin.com/in/christopher-finster/" target="_blank"
          >Christopher Finster</a
        >
      </p>
      <span>All rights reserved. {{ currentYear }}</span>
    </section>
  </div>
</template>

<style scoped></style>
