<script setup>
import { ref, onBeforeMount } from "vue";
import CharacterMatrix from "../components/CharacterMatrix.vue";
import GoaLogo from "../public/Images/GoALogoFinalwithwordsandShadow.png";

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
  box-shadow: inset 0 0 10px 10px var(--vt-c-black);
}

.text-goa-red {
  color: rgb(255, 65, 65)!important;
}

.goa-logo {
  margin-left: auto;
  margin-right: auto;
  height: 300px;
  width: 600px;
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

.notice-contents {
  width: 800px;
  max-width: 85%;
}
</style>

<template>
  <div class=" uk-margin-large-bottom">
    <div class="hero goa-container uk-padding uk-margin-bottom">
      <div class="goa-logo" :data-src="GoaLogo" uk-img></div>
      <div class="hero-message">
        <p><span class="text-goa-red uk-text-lead">Welcome!</span> to Guilds of Ashes. This site was built as a portfolio project to demonstrate my skills as a web developer while also serving as a potential hub for the guild I am a member of. The site is still under development and it and all features may or may not be fully functional.</p>

        <span class="uk-text-lead text-goa-red">The Goals</span>
        <p>The functional goals of this site are: </p>
        <ul>
          <li>
            Streamline guild recruitment and the application process
          </li>
          <li>
            Provide a place for guild members to communicate and organize
          </li>
          <li>
            Provide guild leaders with tools to manage their guild
          </li>
          <li>
            Provide a place for members to view guildmates character classes to form parties or get help with character profession related services
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
        <div class="uk-flex uk-flex-around">
          <div class="left">
            <h4 class="text-orange"><span uk-icon="icon: star"></span> Recently Added <span uk-icon="icon: star"></span></h4>
            <ul>
              <li>Guild Calendar</li>
              <li>Event scheduling on the calendar</li>
              <li>Recurring events on the calendar</li>
              <li>Event canceling on the calendar</li>
              <li>Guild Event RSVP</li>
              <li>Upcoming events on the guild home page</li>
              <li>Feedback - Bug report and feature request tools</li>
            </ul>
          </div>
          <div class="center">
            <h4 class="text-goa-red">In Active Development</h4>
            <ul>
              <li>Guild Leader Controls Panel</li>
              <li>Guild Application Editing</li>
              <li>Guild Details Editing</li>
              <li>Guild Roster Management Features</li>
              <li>Guild Data Metrix</li>
              <li>Ongoing Bug Fixes</li>
              <li>Ongoing Feature Improvements</li>
              <li>Mobile Friendly Layout</li>
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
    <div class="notice-contents goa-container uk-position-top-center uk-margin-xlarge-top uk-padding-large">
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
