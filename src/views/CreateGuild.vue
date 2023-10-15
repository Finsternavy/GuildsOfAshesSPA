<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { useUserStore } from "../stores/userStore";
import router from "../router/routes";
import RichTextEditor from "../components/RichTextEditor.vue";
import { useAPI } from '../stores/apiStore';
import Editor from "../components/Editor.vue";

import AOC_castle from "../public/AOCimages/AOC_castle.png";
import AOC2023March from "../public/AOCimages/AOC2023March.jpg";
import AOCGoblinVillage from "../public/AOCimages/AOCGoblinVillage.jpg";
import AOCJanuary from "../public/AOCimages/AOCJanuary.jpg";
import AOCKaelarCamp from "../public/AOCimages/AOCKaelarCamp.png";
import AOCKaelarCityA from "../public/AOCimages/AOCKaelarCityA.png";
import AOCVaeluneCityD from "../public/AOCimages/AOCVaeluneCityD.png";
import AOCMountainFantasy from "../public/AOCimages/AOCMountainFantasy.png";
import AOCRiverlands from "../public/AOCimages/AOCRiverlands.png";
import AOCSpooky from "../public/AOCimages/AOCSpooky.jpg";
import AOCTropicalBay from "../public/AOCimages/AOCTropicalBay.jpg";
import AOCVaeluneCityA from "../public/AOCimages/AOCVaeluneCityA.png";
import AOCVaeluneEncampment from "../public/AOCimages/AOCVaeluneEncampment.png";
import AOCWaterfall from "../public/AOCimages/AOCWaterfall.png";
import { useGuildStore } from "../stores/guildStore";


let api = useAPI();
let baseUrl = api.getAPI + "Guilds";
let store;
let guildStore;
let user = ref();
let guildName = ref();
let guildBanner = ref();
let selectedImage = ref();
let guildLogoBase64 = ref();
let guildDescription = ref();
let guildCategory = ref();
let guildFocus = ref();
let guildPrimaryRace = ref();
let guildRegion = ref();
let autoApprove = ref();
let addBorder = ref();
let ranks = ref([
    {RankName: 'Guild Leader', RankLevel: 0}, 
    {RankName: 'Member', RankLevel: 1}, 
    {RankName: 'Recruit', RankLevel: 2}
    ]);

const imagePrefix = "../public/AOCimages/";

const backgroundImages = [
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
]

const guildNameToPass = computed(() => {
  return guildName.value;
});

let guild = ref({
  Name: null,
  Background: null,
  Leader: null,
  Banner: null,
  Logo: null,
  LogoBorder: false,
  Description: null,
  Category: null,
  Focus: null,
  PrimaryRace: null,
  Region: null,
  Ranks: [
    {RankName: 'Guild Leader', RankLevel: 0}, 
    {RankName: 'Member', RankLevel: 1}, 
    {RankName: 'Recruit', RankLevel: 2}
    ],
  AutoApprove: false,
})

const selectedBackground = ref();

const currentStep = ref(0);

const steps = [
  'Guild Background',
  'Guild Name',
  'Guild Logo',
  'Guild Description',
  'Guild Categories',
  'Guild Ranks',
  'Guild Approval',
  'Create Guild'
]

const nextStep = () => {
  currentStep.value++;
}

const prevStep = () => {
  currentStep.value--;
}

onBeforeMount(() => {
  store = useUserStore();
  guildStore = useGuildStore();
  user = store.getUser;
  // console.log("User on before mount: ", user);
});

let createGuild = async () => {
  if (checkRanks()){
    let user = store.getUser;
    guild.value.Ranks = ranks.value;
    guild.value.Leader = user;
    // console.log("Attempting to create guild..");
    let call = guild.value;
    console.log("call: ", call);
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
  } else {
    alert('Rank names and levels must be unique!')
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
      guild.value.Logo = guildLogoBase64.value;
      // console.log("Reader result: ", guildLogoBase64.value);
    };
    reader.readAsDataURL(file);
  } else {
    // console.log("Something went wrong handling the image file.");
  }

  // console.log("guildLogoBase64: ", guildLogoBase64.value);
};

const addRank = () => {
  if (ranks.value.length >= 6) return alert('Rank limit reached!')
  ranks.value.push({RankName: 'Type Rank Name here', RankLevel: ranks.value.length})
}

const checkRanks = () => {
  // console.log('Saving ranks..');
  // console.log('Ranks: ', ranks.value);
  // check each rank in ranks for duplicate names and levels
  for (let i = 0; i < ranks.value.length; i++){
    for (let j = 0; j < ranks.value.length; j++){
      if (i != j){
        if (ranks.value[i].RankName == ranks.value[j].RankName){
          return false;
        }
        if (ranks.value[i].RankLevel == ranks.value[j].RankLevel){
          return false;
        }
      }
    }
  }
  return true;
}

const shiftRankUp = (index) => {
  // console.log('Shifting rank up..');
  // console.log('Index: ', index);
  // console.log('Ranks: ', ranks.value);
  let temp = ranks.value[index];
  ranks.value[index] = ranks.value[index - 1];
  ranks.value[index - 1] = temp;
  // console.log('Ranks: ', ranks.value);
}

const setBackground = (image) => {
  console.log("Setting guild background to: ", image);
  guildStore.setGuild(guild.value);
  guild.value.Background = image;
}

const guildValid = () => {
  // if all guild properties have values and they are not equal to '' or null
  if (guild.value.Name && guild.value.Name != '' &&
      guild.value.Background && guild.value.Background != '' &&
      guild.value.Banner && guild.value.Banner != '' &&
      guild.value.Logo && guild.value.Logo != '' &&
      guild.value.Description && guild.value.Description != '' &&
      guild.value.Category && guild.value.Category != '' &&
      guild.value.Focus && guild.value.Focus != '' &&
      guild.value.PrimaryRace && guild.value.PrimaryRace != '' &&
      guild.value.Region && guild.value.Region != '' &&
      guild.value.Ranks && guild.value.Ranks != '' &&
      guild.value.AutoApprove && guild.value.AutoApprove != '' &&
      guild.value.Leader && guild.value.Leader != '') {
        return true;
      } else {
        return false;
      }
}
</script>

<style scoped>
.goa-container {
  background-color: rgba(0, 0, 0, 0.9);
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
  /* background-color: transparent; */
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

.image:hover {
  cursor: pointer;
  outline: 3px solid red;
  outline-offset: 3px;
}

.selected {
  outline: 3px solid gold;
  outline-offset: 3px;
}

.bg-black {
  background-color: black;
}
</style>

<template>
  <div class="create-guild goa-container uk-padding">
    <div class="goa-header uk-margin-large-bottom">
      <h1 class="text-goa-red uk-text-center uk-margin-remove">GUILD CREATION</h1>
      <hr class="uk-margin-remove-bottom" />
      <ul class="uk-breadcrumb">
        <li @click="currentStep = 0"><a>Background</a></li>
        <li v-if="guild.Background" @click="currentStep = 1"><a>Name</a></li>
        <li v-if="guild.Name" @click="currentStep = 2"><a>Logo</a></li>
        <li v-if="guild.Logo" @click="currentStep = 3"><a>Description</a></li>
        <li v-if="guild.Description" @click="currentStep = 4"><a>Types</a></li>
        <li v-if="guild.Region" @click="currentStep = 5"><a>Ranks</a></li>
        <li v-if="guild.Region" @click="currentStep = 6"><a>Approval</a></li>
        <li v-if="guildValid()" @click="currentStep = 7"><a>Finalize</a></li>
    </ul>
    </div>

    <!-- Guild background selector -->
    <div v-show="steps[currentStep] == 'Guild Background'" id="GuildBackgroundSelector uk-margin-large-bottom">
      <h3 class="text-goa-red uk-margin-left">GUILD BACKGROUND</h3>
      <div class="image-card-container uk-flex uk-child-width-1-6 uk-width-1-1 uk-grid-small uk-margin-large-bottom" uk-grid>
        <div v-for="bgImage in backgroundImages" class="image-card" @click="setBackground(bgImage)">
          <div class="image uk-height-small uk-background-cover" :class="{'selected' : bgImage == guild.Background}" :data-src="bgImage" uk-img></div>
        </div>
        <div  class="image-card ">
          <div class="image uk-height-small uk-width-1-1 uk-background-cover uk-flex uk-flex-middle uk-flex-center uk-background-secondary" @click="setBackground('random')" uk-img> Always Random</div>
        </div>
      </div>
      <button @click="nextStep" class="goa-button uk-align-center uk-flex uk-flex-middle">Guild Name <span uk-icon="icon: chevron-double-right"></span></button>
    </div>

    <!-- Guild Name -->
    <div v-show="steps[currentStep] == 'Guild Name'" class="input uk-width-1-1">
      <div class="input uk-margin-large-bottom">
        <label for="guild-name uk-margin-top">Guild Name</label>
        <input
          type="text"
          id="guild-name"
          class="goa-input uk-input"
          v-model="guild.Name"
          maxlength="20"
        />
      </div>
      <label> Guild Banner <span class="text-goa-red">( How guild name will appear at the top of your home page. )</span></label>
      <span>The editor below is a WYSIWYG editor. It accepts Markdown annotation, has in editor controls, and also accepts copy paste from a text editor such as Microsoft word.</span>
      <p> Basic instruction:</p>
      <ul>
        <li>Click on the text area to start typing.</li>
        <li>Highlight text to change basic styling</li>
        <li>Returning to the next line will display quick formatting options for the line.</li>
        <li>Use the top bar to control formatting</li>
      </ul>
      <div class="uk-width-1-1 uk-flex uk-flex-column">
        <Editor v-model="guild.Banner" :limited="true"/>
      </div>
      <div class="uk-flex uk-flex-between uk-margin-large-top">
        <button @click="prevStep" class="goa-button"><span uk-icon="icon: chevron-double-left"></span> Guild Background</button>
        <button @click="nextStep" class="goa-button">Guild Logo <span uk-icon="icon: chevron-double-right"></span></button>
      </div>
    </div>

    <!-- Guild Logo -->
    <div  v-show="steps[currentStep] == 'Guild Logo'" class="js-upload uk-position-relative uk-light uk-width-1-1 uk-flex uk-flex-column uk-margin-bottom" uk-form-custom>
      <div class="uk-align-center">
        <input   type="file" multiple v-on:change="handleImage" />
        <button
          class="goa-button uk-text-large"
          type="button"
          tabindex="-1"
        >
          Upload Guild Logo
        </button>
      </div>
      <div v-if="guildLogoBase64" class="hero-preview uk-position-relative uk-width-1-1 uk-text-center">
        <h1 class="text-goa-red">Guild Logo Preview</h1>
        <div v-if="guildLogoBase64"
          :class="{ 'logo-container': {}, 'bordered-logo-container': guild.LogoBorder == true }">
          <img
            class="guild-logo-upload"
            :src="guildLogoBase64"
            alt="Uploaded Image"
            uk-img
          />
        </div>
      </div>
    </div>
    <div v-show="steps[currentStep] == 'Guild Logo' && guildLogoBase64" >
      <div class="input">
        <label for="AddBorderSelect">Add Border?</label>
        <select
          class="goa-input uk-input"
          name="AddBorderSelect"
          id="AddBorderSelect"
          v-model="guild.LogoBorder"
        >
          <option class="bg-black text-goa-gray" value=""></option>
          <option class="bg-black text-goa-gray" :value="true">Yes</option>
          <option class="bg-black text-goa-gray" :value="false">No</option>
        </select>
      </div>
      <div class="text-goa-red uk-text-middle uk-padding-small uk-margin-top">
        Recommend 'No' for png and 'Yes' for opaque logos.
      </div>
      <div class="uk-flex uk-flex-between uk-margin-large-top">
        <button @click="prevStep" class="goa-button"><span uk-icon="icon: chevron-double-left"></span> Guild Banner</button>
        <button @click="nextStep" class="goa-button">Guild Description <span uk-icon="icon: chevron-double-right"></span></button>
      </div>
    </div>

    <!-- Guild Description -->
    <div v-show="steps[currentStep] == 'Guild Description'" class="uk-width-1-1 uk-margin-large-bottom">
      <h3 class="text-goa-red uk-margin-remove">GUILD DESCRIPTION</h3>
      <Editor v-model="guild.Description"/>
      <div class="uk-flex uk-flex-between uk-margin-large-top">
        <button @click="prevStep" class="goa-button"><span uk-icon="icon: chevron-double-left"></span> Guild Logo</button>
        <button @click="nextStep" class="goa-button">Guild Types <span uk-icon="icon: chevron-double-right"></span></button>
      </div>
    </div>

    <!-- Guild Types -->
    <div v-show="steps[currentStep] == 'Guild Categories'">
      <div class="uk-flex uk-width-1-1 uk-child-width-1-4" uk-grid>
        <div class="input ">
          <label for="guild-type">Guild Category</label>
          <select id="guild-type" class="goa-input uk-input" v-model="guild.Category">
            <option class="bg-black" value=""></option>
            <option class="bg-black" value="rp">RP</option>
            <option class="bg-black" value="casual">Casual</option>
            <option class="bg-black" value="hardcore">Hardcore</option>
            <option class="bg-black" value="social">Social</option>
          </select>
        </div>
        <div class="input">
          <label for="guild-focus">Focus</label>
          <select id="guild-focus" class="goa-input uk-input" v-model="guild.Focus">
            <option class="bg-black" value=""></option>
            <option class="bg-black" value="pvp">PvP</option>
            <option class="bg-black" value="pve">PvE</option>
            <option class="bg-black" value="crafting">Crafting</option>
            <option class="bg-black" value="trading">Trading</option>
            <option class="bg-black" value="exploration">Exploration</option>
            <option class="bg-black" value="mercenary">Mercenary</option>
            <option class="bg-black" value="sailing">Sailing</option>
          </select>
        </div>
        <div class="input">
          <label for="guild-race">Primary Race</label>
          <select id="guild-race" class="goa-input uk-input" v-model="guild.PrimaryRace">
            <option class="bg-black" value=""></option>
            <option class="bg-black" value="aelune">Aelune</option>
            <option class="bg-black" value="kaelar">Kaelar</option>
            <option class="bg-black" value="pyrian">Pyrian</option>
            <option class="bg-black" value="renkai">Ren'Kai</option>
            <option class="bg-black" value="vaelune">Vaelune</option>
          </select>
        </div>
        <div class="input">
          <label for="guild-region">Region</label>
          <select id="guild-region" class="goa-input uk-input" v-model="guild.Region">
            <option class="bg-black" value=""></option>
            <option class="bg-black" value="na-east">NA-East</option>
            <option class="bg-black" value="na-west">NA-West</option>
            <option class="bg-black" value="oceania">Oceania</option>
            <option class="bg-black" value="south-america">South America</option>
            <option class="bg-black" value="europe">Europe</option>
            <option class="bg-black" value="asia">Asia</option>
          </select>
        </div>
      </div>
      <div class="uk-flex uk-flex-between uk-margin-large-top">
        <button @click="prevStep" class="goa-button"><span uk-icon="icon: chevron-double-left"></span> Guild Description</button>
        <button @click="nextStep" class="goa-button">Guild Ranks <span uk-icon="icon: chevron-double-right"></span></button>
      </div>
    </div>

    <!-- Rank Structure -->
    <div v-show="steps[currentStep] == 'Guild Ranks'" class="rank-structure-container uk-width-1-1">
      <h3 class="text-goa-red uk-margin-remove">RANK STRUCTURE</h3>
      <div v-for="(rank, index) in ranks" class="uk-flex uk-margin-small-bottom">
        <div class="uk-flex uk-flex-column uk-margin-right">
          <label :for="'RankName' + index">Rank Name</label>
          <input class="goa-input" :id="'RankName' + index" type="text" v-model="rank.RankName" :readonly="rank.RankName == 'Guild Leader'">
        </div>
        <div class="uk-flex uk-flex-column uk-margin-right uk-width-auto">
          <label :for="'RankLevel' + index">Rank Level</label>
          <input class="goa-input" :id="'RankLevel' + index" type="text" v-model="rank.RankLevel" readonly>
        </div>
        <span v-if="rank.RankName == 'Guild Leader'" class="text-goa-red uk-align-bottom uk-margin-remove-bottom">( This rank cannot be modified )</span>
        <div v-if="index > 1" class="uk-flex uk-flex-column">
          <label :for="'UpButton' + index">Move up</label>
          <button @click="shiftRankUp(index)" :id="'UpButton' + index" class="goa-button"><span uk-icon="icon: chevron-up"></span></button>
        </div>
      </div>
      <button @click="addRank" class="goa-button uk-margin-right">Add Rank</button>
      <div class="uk-flex uk-flex-between uk-margin-large-top">
        <button @click="prevStep" class="goa-button"><span uk-icon="icon: chevron-double-left"></span> Guild Types</button>
        <button @click="nextStep" class="goa-button">Guild Approval <span uk-icon="icon: chevron-double-right"></span></button>
      </div>
    </div>

    <!-- Auto Approve -->
    <div v-show="steps[currentStep] == 'Guild Approval'" class="input">
      <label for="guild-restricted">Auto approve join request?</label>
      <select
        name="guild-restricted"
        id="guild-restricted"
        class="goa-input uk-input uk-width-1-1"
        v-model="guild.AutoApprove"
      >
        <option class="bg-black" :value="true">True</option>
        <option class="bg-black" :value="false">False</option>
      </select>
      <div class="uk-flex uk-flex-between uk-margin-large-top">
        <button @click="prevStep" class="goa-button"><span uk-icon="icon: chevron-double-left"></span> Guild Ranks</button>
        <button @click="nextStep" class="goa-button">Finalize Guild <span uk-icon="icon: chevron-double-right"></span></button>
      </div>
    </div>

    <!-- Create Guild -->
    <div v-show="steps[currentStep] == 'Create Guild'">
      <button
        @click="createGuild"
        class="goa-button uk-align-center uk-text-lead"
      >
        Create Guild
      </button>
      <div class="uk-flex uk-flex-between uk-margin-large-top">
        <button @click="prevStep" class="goa-button"><span uk-icon="icon: chevron-double-left"></span> Guild Approval</button>
      </div>
    </div>
  </div>
</template>
