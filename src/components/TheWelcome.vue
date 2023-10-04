<script setup>
import { ref } from "vue";
import CharacterMatrix from "../components/CharacterMatrix.vue";
import GoaLogo from "../../public/Images/GoALogoFinalwithwordsandShadow.png";

const selectedClass = ref();
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
</style>

<template>
  <div class="">
    <div class="hero goa-container uk-padding uk-margin-bottom">
      <div class="goa-logo" :data-src="GoaLogo" uk-img></div>
      <div class="hero-message">
        <p><span class="text-goa-red uk-text-lead">Welcome!</span> to Guilds of Ashes. This site was build as a portfolio project to demonstrate my skills as a web developer while also serving as a potential hub for the guild I am a member of. The site is still under development and it and all features may or may not be fully functional.</p>

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
      <h2><span class="text-goa-red">Community Statistics</span></h2>
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
      <table class="uk-table uk-text-center">
        <thead>
          <tr>
            <td></td>
            <td class="text-goa-red">Fighter</td>
            <td class="text-goa-red">Tank</td>
            <td class="text-goa-red">Rogue</td>
            <td class="text-goa-red">Ranger</td>
            <td class="text-goa-red">Mage</td>
            <td class="text-goa-red">Sorcerer</td>
            <td class="text-goa-red">Cleric</td>
            <td class="text-goa-red">Bard</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-goa-red">Primary</td>
            <td class="cell">14</td>
            <td class="cell">14</td>
            <td class="cell">14</td>
            <td class="cell">14</td>
            <td class="cell">14</td>
            <td class="cell">14</td>
            <td class="cell">14</td>
            <td class="cell">14</td>
          </tr>
          <tr>
            <td class="text-goa-red">Secondary</td>
            <td class="cell">14</td>
            <td class="cell">14</td>
            <td class="cell">14</td>
            <td class="cell">14</td>
            <td class="cell">14</td>
            <td class="cell">14</td>
            <td class="cell">14</td>
            <td class="cell">14</td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  </div>
</template>
