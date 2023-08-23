<script setup>
import { ref } from "vue";
import CharacterMatrix from "../components/CharacterMatrix.vue";

const selectedClass = ref();
</script>

<style scoped>
.hero {
  box-shadow: inset 0 0 10px 10px var(--vt-c-black);
}

.shadow-text {
  color: orange;
  text-shadow: 0 3px 10px black;
}
</style>

<template>
  <div class="">
    <div class="character-matrix goa-container uk-padding">
      <h1 class="shadow-text uk-text-center uk-text-bold">GUILDS OF ASHES</h1>
      <h3 class="uk-text-center uk-light text-orange uk-text-bold">Sitewide Poll!</h3>
      <p class="uk-text-center">What class will you main in Ashes of Creation?</p>
      <CharacterMatrix v-model="selectedClass" />
    </div>
    <div
      v-if="selectedClass"
      class="goa-container selected-class uk-padding uk-margin-top"
    >
      <h2><span class="text-orange">Community Statistics</span></h2>
      <div class="uk-padding">
        <h3 class="uk-text-center">
          <span class="text-orange">Your Class Details</span>
        </h3>
        <div class="your-choice uk-flex uk-flex-between uk-child-width-1-3">
          <p class="uk-margin-remove uk-text-center">
            <span class="text-orange">Class: </span>{{ selectedClass.name }}
          </p>
          <p class="uk-margin-remove uk-text-center">
            <span class="text-orange">Primary: </span> {{ selectedClass.primary }}
          </p>
          <p class="uk-margin-remove uk-text-center">
            <span class="text-orange">Secondary: </span> {{ selectedClass.secondary }}
          </p>
        </div>
      </div>
      <table class="uk-table uk-text-center">
        <thead>
          <tr>
            <td></td>
            <td class="text-orange">Fighter</td>
            <td class="text-orange">Tank</td>
            <td class="text-orange">Rogue</td>
            <td class="text-orange">Ranger</td>
            <td class="text-orange">Mage</td>
            <td class="text-orange">Sorcerer</td>
            <td class="text-orange">Cleric</td>
            <td class="text-orange">Bard</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-orange">Primary</td>
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
            <td class="text-orange">Secondary</td>
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
