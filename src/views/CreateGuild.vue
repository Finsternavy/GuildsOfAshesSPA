<script setup>
import { ref, onBeforeMount } from "vue";
import { useUserStore } from "../stores/userStore";
import router from "../router/routes";

const baseUrl = process.env.APIURL + "Guilds";
let store;
let user = ref();
const guildName = ref();
let selectedImage = ref();
const guildLogoBase64 = ref();
const guildDescription = ref();
const guildCategory = ref();
const guildFocus = ref();
const guildPrimaryRace = ref();
const guildRegion = ref();
const autoApprove = ref();

onBeforeMount(() => {
  store = useUserStore();
  user = store.getUser;
  console.log("User on before mount: ", user);
});

const createGuild = async () => {
  const user = store.getUser;
  console.log("Attempting to create guild..");
  const call = {
    Name: guildName.value,
    Leader: user,
    AutoApprove: autoApprove.value,
    Logo: guildLogoBase64.value,
    Description: guildDescription.value,
    Category: guildCategory.value,
    Focus: guildFocus.value,
    PrimaryRace: guildPrimaryRace.value,
    Region: guildRegion.value,
  };
  const response = await fetch(baseUrl + "/createGuild", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
    },
    body: JSON.stringify(call),
  });

  if (response.ok) {
    let data = await response.json();
    console.log("Create Guild response data: ", data);
    store.setUser(data.Data);
    store.setGuildID(data.Data.GuildID);
    router.push({ name: "guild-home" });
    // threads.value = data.Data;
  } else {
    console.log("Error fetching thread data: ", response.statusText);
  }
};

const handleImage = (event) => {
  const file = event.target.files[0];
  console.log("File: ", file);
  if (file && file.type.startsWith("image/")) {
    console.log("It is an image file..");
    const reader = new FileReader();

    reader.onload = () => {
      guildLogoBase64.value = reader.result;
      console.log("Reader result: ", guildLogoBase64.value);
    };
    reader.readAsDataURL(file);
  } else {
    console.log("Something went wrong handling the image file.");
  }

  console.log("guildLogoBase64: ", guildLogoBase64.value);
};
</script>

<style scoped>
.goa-container {
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  border-radius: 30px;
  transition: background-color 0.3s ease-in-out;
}

.input {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

input,
textarea,
select,
button {
  border-radius: 20px;
  padding-left: 20px;
}

label {
  padding-left: 20px;
  color: orange;
}
.input > input,
.input > textarea {
  /* padding: 3px; */
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}
select {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}

textarea {
  min-height: 100px;
}

.goa-button {
  border-radius: 20px;
  background-color: transparent;
  color: white;
  padding: 5px 30px;
  /* height: 40px; */
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.goa-button:hover {
  background-color: gold;
  color: black;
}
</style>

<template>
  <div class="create-guild goa-container">
    <div class="goa-header uk-padding uk-padding-remove-bottom">
      <h3 class="uk-light uk-text-center uk-margin-remove">GUILD CREATION</h3>
      <hr class="uk-margin-remove-bottom" />
    </div>
    <div class="uk-form uk-padding uk-grid-small" uk-grid>
      <div class="input uk-width-1-2">
        <label for="guild-name">Guild Name</label>
        <input
          type="text"
          id="guild-name"
          class="goa-input uk-input"
          v-model="guildName"
        />
      </div>
      <div class="js-upload uk-light uk-width-1-2" uk-form-custom>
        <label for="guild-logo">Guild Logo</label>
        <input type="file" multiple v-on:change="handleImage" />
        <button
          class="uk-button uk-button-default uk-width-stretch"
          type="button"
          tabindex="-1"
        >
          Upload
        </button>
      </div>
      <div
        v-if="guildLogoBase64"
        class="upload-logo-container uk-height-auto uk-width-1-1 uk-flex uk-flex-center"
      >
        <img class="guild-logo-upload" :src="guildLogoBase64" alt="Uploaded Image" />
      </div>
      <div class="input uk-width-1-1">
        <label for="guild-description">Guild Description</label>
        <textarea
          id="guild-description"
          class="goa-input uk-input"
          v-model="guildDescription"
        ></textarea>
      </div>
      <div class="input uk-width-1-4">
        <label for="guild-type">Guild Category</label>
        <select id="guild-type" class="goa-input uk-input" v-model="guildCategory">
          <option value=""></option>
          <option value="rp">RP</option>
          <option value="casual">Casual</option>
          <option value="hardcore">Hardcore</option>
          <option value="social">Social</option>
        </select>
      </div>
      <div class="input uk-width-1-4">
        <label for="guild-focus">Focus</label>
        <select id="guild-focus" class="goa-input uk-input" v-model="guildFocus">
          <option value=""></option>
          <option value="pvp">PvP</option>
          <option value="pve">PvE</option>
          <option value="crafting">Crafting</option>
          <option value="trading">Trading</option>
          <option value="exploration">Exploration</option>
          <option value="mercenary">Mercenary</option>
          <option value="sailing">Sailing</option>
        </select>
      </div>
      <div class="input uk-width-1-4">
        <label for="guild-race">Primary Race</label>
        <select id="guild-race" class="goa-input uk-input" v-model="guildPrimaryRace">
          <option value=""></option>
          <option value="aelune">Aelune</option>
          <option value="kaelar">Kaelar</option>
          <option value="pyrian">Pyrian</option>
          <option value="renkai">Ren'Kai</option>
          <option value="vaelune">Vaelune</option>
        </select>
      </div>
      <div class="input uk-width-1-4">
        <label for="guild-region">Region</label>
        <select id="guild-region" class="goa-input uk-input" v-model="guildRegion">
          <option value=""></option>
          <option value="na-east">NA-East</option>
          <option value="na-west">NA-West</option>
          <option value="oceania">Oceania</option>
          <option value="south-america">South America</option>
          <option value="europe">Europe</option>
          <option value="asia">Asia</option>
        </select>
      </div>
      <div class="input uk-width-medium">
        <label for="guild-restricted">Auto approve join request?</label>
        <select
          name="guild-restricted"
          id="guild-restricted"
          class="goa-input uk-input uk-width-1-1"
          v-model="autoApprove"
        >
          <option value=""></option>
          <option :value="true">True</option>
          <option :value="false">False</option>
        </select>
      </div>
    </div>
    <button
      @click="createGuild"
      class="uk-button uk-button-default goa-button uk-margin-medium-left uk-margin-bottom uk-light"
    >
      Create Guild
    </button>
  </div>
</template>
