<script setup>
import { ref, onBeforeMount } from "vue";
import CharacterMatrix from "../components/CharacterMatrix.vue";
import GoaLogo from "../public/Images/GoALogoFinalwithwordsandShadow.png";
import SkillBar from "../components/SkillBar.vue";

let selectedClass = ref();
const noticeAcknowledged = ref(false);

onBeforeMount(() => {
  if (localStorage.getItem("noticeAcknowledged")) {
    noticeAcknowledged.value = true;
  }
});

const acknowledgeNotice = () => {
  localStorage.setItem("noticeAcknowledged", true);
  noticeAcknowledged.value = true;
};
</script>

<style scoped>
.hero {
  /* box-shadow: inset 0 0 10px 10px var(--vt-c-black); */
}

.text-goa-red {
  color: rgb(255, 65, 65)!important;
}


.goa-logo {
  margin-left: auto;
  margin-right: auto;
  min-height: 0;
  min-width: 0;
  width: 100%;
  min-height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
}

.notice {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 1000;
}

.notice-content {
  height: fit-content;
  max-height: 80vh;
  background-color: rgba(0, 0, 0, 0.8);
  width: 800px;
  max-width: 85%;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
}

.logo-container,
.guild-logo-upload {
  /* max-width: 80%; */
  background-position: center;
  border-radius: 0px;
}
</style>

<template>
  <div class="uk-margin-large-bottom">
    <div class="hero goa-container uk-padding uk-margin-bottom uk-width-1-1">
      <!-- <div class="goa-logo" :data-src="GoaLogo" uk-img></div> -->
      <div class="logo-container uk-margin-bottom uk-position-relative">
        <img class="guild-logo-upload uk-background-cover" :src="GoaLogo" alt="Uploaded Image" uk-img />
      </div>
      <div class="hero-message">
        <span class="text-goa-red uk-text-lead uk-text-uppercase">Welcome !!!</span>
        <p>Welcome to Guilds of Ashes, a meticulously crafted online platform. Created as a showcase of my proficiency in web development, this site also functions as a central hub for the esteemed guild of which I am an active member. Please note that the site is currently undergoing continuous development, and some features may still be in the refinement phase. Thank you for your understanding and patience as we strive to deliver a seamless user experience.</p>

        <p>Please utilize the <span class="goa-button" disabled>Feedback</span> menu link to report any bugs or to submit feature requests.</p>

        <div class="uk-text-lead text-goa-red">The Objectives</div>
        <p>This website aims to achieve the following functional goals:</p>
        <ul>
          <li>
            Simplify the process of guild recruitment and applications
          </li>
          <li>
            Establish a centralized platform for effective communication and coordination among guild members
          </li>
          <li>
            Equip guild leaders with comprehensive tools for efficient guild management
          </li>
          <li>
            Provide a dedicated space for members to access information about guildmates' character classes, facilitating the formation of parties and obtaining assistance with character-related professional services
          </li>
        </ul>
        <span class="uk-text-lead text-goa-red">Getting started</span>
        <p>It's as easy as:</p>
        <ul>
          <li>Registering an account</li>
          <li>Selecting your character on the profile page ( Hover over your user name in the upper right hand corner )</li>
          <li>Joining or creating a guild</li>
        </ul>
        <hr class="uk-margin-large">
        <h3 class="uk-text-lead text-goa-red">Development Status</h3>
        <div class="uk-flex uk-child-width-1-1 uk-child-width-1-3@m" uk-grid>
          <div class="left">
            <h4 class="text-orange"><span uk-icon="icon: star"></span> Recently Added <span uk-icon="icon: star"></span></h4>
            <ul>
              <li class="text-orange uk-text-lead">Added Skill Bar in Profile ( Prototype )</li>
              <li>Guild Details Editing</li>
              <li>Interactive Guild Map !</li>
              <li>Guild Calendar</li>
              <li>Event scheduling on the calendar</li>
              <li>Recurring events on the calendar</li>
              <li>Event canceling on the calendar</li>
              <li>Guild Event RSVP</li>
              <li>Upcoming events on the guild home page</li>
              <li>Feedback - Bug report and feature request tools</li>
              <li>Background selection at guild creation</li>
              <li>Custom color themes at guild creation</li>
              <li>Rich text editor for guild banner and description</li>
            </ul>
          </div>
          <div class="center">
            <h4 class="text-goa-red">In Active Development</h4>
            <ul>
              <li>Guild Leader Controls Panel</li>
              <li>Guild Application Editing</li>
              <li>Guild Roster Management Features</li>
              <li>Guild Data Metrix</li>
              <li>Ongoing Bug Fixes</li>
              <li>Ongoing Feature Improvements</li>
            </ul>
          </div>
          <div class="right">
            <h4 class="text-goa-red">Planned Features</h4>
            <ul>
              <li>Member Direct Messaging</li>
              <li>Guild News</li>
              <li>Guild Event Reminders</li>
              <li>Guild Tasks</li>
              <li>Guild Alert</li>
              <li>Guild XP System</li>
              <li>Guild Promotion System</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="goa-container uk-margin-bottom">
      <SkillBar />
    </div> -->
    <div class="character-matrix goa-container uk-padding">
      <h3 class="uk-text-center uk-light text-goa-red uk-text-bold">Sitewide Poll!</h3>
      <p class="uk-text-center">What class will you main in Ashes of Creation?</p>
      <CharacterMatrix v-model="selectedClass" />
    </div>
    <div
      v-if="selectedClass"
      class="goa-container selected-class uk-padding uk-margin-top"
    >
      <!-- <h2><span class="text-goa-red">Community Statistics</span></h2> -->
      <div class="uk-padding">
        <h3 class="uk-text-center">
          <span class="text-goa-red">Your Class Details</span>
        </h3>
        <div class="your-choice uk-flex uk-flex-between uk-child-width-1-3">
          <p class="uk-margin-remove uk-text-center">
            <span class="text-goa-red">Class: </span>{{ selectedClass.name }}
          </p>
          <p class="uk-margin-remove uk-text-center">
            <span class="text-goa-red">Primary: </span> {{ selectedClass.primary }}
          </p>
          <p class="uk-margin-remove uk-text-center">
            <span class="text-goa-red">Secondary: </span> {{ selectedClass.secondary }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div v-if="!noticeAcknowledged" id="Notice" class="notice goa-container-no-radius uk-padding">
    <div class="uk-panel-scrollable notice-content">
      <h1 class="text-goa-red">NOTICE:</h1>
      <p class="text-goa-gray uk-text-large">
        This site is in early development and all features may or may not be
        fully functional.  If you encounter errors where the browser stops responding, click the GOA logo in the upper left-hand corner then press <span class="text-goa-red">shift + F5</span> to refresh the page.
      </p>
      <p class="text-goa-gray uk-text-large">
        Please report any bugs or issues to CyFinXP in discord.
      </p>
      <button class="goa-button" @click="acknowledgeNotice">Acknowledge and close</button>
    </div>
  </div>
</template>
