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
      <CharacterMatrix v-model="selectedClass"/>
    </div>
    <div v-if="selectedClass" class="selected-class">
      <p>{{ selectedClass.name }}</p>
    </div>
  </div>
</template>
