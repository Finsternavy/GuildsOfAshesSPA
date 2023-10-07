<script setup>
import { ref, onBeforeMount } from "vue";
import { useUserStore } from "../stores/userStore";
import router from "../router/routes";
import RichTextEditor from "../components/RichTextEditor.vue";

let baseUrl = "https://goabackend.azurewebsites.net/Guilds";
let store;
let user = ref();
let guildName = ref();
let selectedImage = ref();
let guildLogoBase64 = ref();
let guildDescription = ref();
let guildCategory = ref();
let guildFocus = ref();
let guildPrimaryRace = ref();
let guildRegion = ref();
let autoApprove = ref();
let addBorder = ref();

onBeforeMount(() => {
  store = useUserStore();
  user = store.getUser;
  // console.log("User on before mount: ", user);
});

let createGuild = async () => {
  let user = store.getUser;
  // console.log("Attempting to create guild..");
  let call = {
    Name: guildName.value,
    Leader: user,
    AutoApprove: autoApprove.value,
    Logo: guildLogoBase64.value,
    LogoBorder: addBorder.value,
    Description: guildDescription.value,
    Category: guildCategory.value,
    Focus: guildFocus.value,
    PrimaryRace: guildPrimaryRace.value,
    Region: guildRegion.value,
  };
  // console.log("call: ", call);
  let response = await fetch(baseUrl + "/createGuild", {
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
    // console.log("Create Guild response data: ", data);
    store.setUser(data.Data);
    store.setGuildID(data.Data.GuildID);
    router.push({ name: "guild-home" });
    // threads.value = data.Data;
  } else {
    // console.log("Error fetching thread data: ", response.statusText);
  }
};

let handleImage = (event) => {
  let file = event.target.files[0];
  // console.log("File: ", file);
  if (file && file.type.startsWith("image/")) {
    // console.log("It is an image file..");
    let reader = new FileReader();

    reader.onload = () => {
      guildLogoBase64.value = reader.result;
      // console.log("Reader result: ", guildLogoBase64.value);
    };
    reader.readAsDataURL(file);
  } else {
    // console.log("Something went wrong handling the image file.");
  }

  // console.log("guildLogoBase64: ", guildLogoBase64.value);
};

// let handleInput = () => {
//   guildDescription.value = this.$refs.guildDescription.innerHTML;
//   console.log("Guild description: ", guildDescription.value);
// };
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

.add-border {
  box-shadow: inset 0 0 100px 10px rgba(0, 0, 0, 1), 0 0 10px 5px rgba(0, 0, 0, 1);
}

/* .editable-content {
  border: 1px solid #ccc;
  min-height: 200px;
  padding: 8px;
} */
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
        class="hero-preview uk-position-relative uk-width-1-1 uk-text-center"
      >
        <h1 class="text-goa-red">Guild Logo Preview</h1>
        <div
          v-if="guildLogoBase64"
          :class="{ 'logo-container': {}, 'bordered-logo-container': addBorder == true }"
        >
          <img
            class="guild-logo-upload"
            :src="guildLogoBase64"
            alt="Uploaded Image"
            uk-img
          />
        </div>
        <div class="uk-text-left uk-margin-top uk-flex uk-flex-middle">
          <div class="input-conatiner uk-width-1-4">
            <label for="AddBorderSelect">Add Border?</label>
            <select
              class="goa-input uk-input"
              name="AddBorderSelect"
              id="AddBorderSelect"
              v-model="addBorder"
            >
              <option value=""></option>
              <option :value="true">Yes</option>
              <option :value="false">No</option>
            </select>
          </div>
          <div class="text-goa-red uk-text-middle uk-padding-small uk-margin-top">
            Recommend 'No' for png and 'Yes' for opaque logos.
          </div>
        </div>
      </div>
      <div class="input uk-width-1-1">
        <label for="guild-description">Guild Description</label>
        <RichTextEditor v-model="guildDescription" />
        <!-- <div
          id="guild-description"
          contenteditable="true"
          @input="handleInput"
          class="editable-content goa-input"
          ref="guildDescription"
        ></div> -->
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
