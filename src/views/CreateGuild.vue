<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { useUserStore } from "../stores/userStore";
import router from "../router/routes";
import RichTextEditor from "../components/RichTextEditor.vue";
import { useAPI } from '../stores/apiStore';
import Editor from "../components/Editor.vue";


let api = useAPI();
let baseUrl = api.getAPI + "Guilds";
let store;
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
    ])

const guildNameToPass = computed(() => {
  return guildName.value;
});

let guild = ref({
  Name: "",
  Leader: "",
  Banner: "",
  Logo: "",
  LogoBorder: "",
  Description: "",
  Category: "",
  Focus: "",
  PrimaryRace: "",
  Region: "",
  Ranks: [
    {RankName: 'Guild Leader', RankLevel: 0}, 
    {RankName: 'Member', RankLevel: 1}, 
    {RankName: 'Recruit', RankLevel: 2}
    ],
  AutoApprove: "",
})

onBeforeMount(() => {
  store = useUserStore();
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

// let handleInput = () => {
//   guildDescription.value = this.$refs.guildDescription.innerHTML;
//   console.log("Guild description: ", guildDescription.value);
// };
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
</style>

<template>
  <div class="create-guild goa-container">
    <div class="goa-header uk-padding uk-padding-remove-bottom">
      <h1 class="text-goa-red uk-text-center uk-margin-remove">GUILD CREATION</h1>
      <hr class="uk-margin-remove-bottom" />
    </div>
    <div class="uk-form uk-padding uk-grid-small" uk-grid>
      <div class="input uk-width-1-1">
        <label for="guild-name">Guild Name</label>
        <input
          type="text"
          id="guild-name"
          class="goa-input uk-input"
          v-model="guild.Name"
        />
      </div>
      <div>
        <span>The editor below is a WYSIWYG editor. It accepts Markdown annotation, has in editor controls, and also accepts copy paste from a text editor such as Microsoft word.</span>
        <p> Basic instruction:</p>
        <ul>
          <li>Click on the text area to start typing.</li>
          <li>Highlight text to change basic styling</li>
          <li>Returning to the next line will display quick formatting options for the line.</li>
          <li>Use the top bar to control formatting</li>
        </ul>
      </div>
      <div class="uk-width-1-1 uk-flex uk-flex-column">
        <label> Guild Banner <span class="text-goa-red">( How guild name will appear at the top of your home page. )</span></label>
        <Editor v-model="guild.Banner" :limited="true"/>
      </div>
      <div class="js-upload uk-light uk-width-1-2 uk-flex uk-flex-column" uk-form-custom>
        <label for="guild-logo-label uk-width-1-1">Guild Logo</label>
        <div>
          <input type="file" multiple v-on:change="handleImage" />
          <button
            class="goa-button uk-text-lead"
            type="button"
            tabindex="-1"
          >
            Upload Guild Logo
          </button>
        </div>
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
              v-model="guild.LogoBorder"
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
      <div class="uk-width-1-1 uk-margin-large-bottom">
        <h3 class="text-goa-red uk-margin-remove">GUILD DESCRIPTION</h3>
        
        <Editor v-model="guild.Description"/>
      </div>
      <div class="input uk-width-1-1">
        <label for="guild-description">Guild Description</label>
        <!-- <pre><code>{{ guildDescription }}</code></pre> -->
        <!-- <RichTextEditor v-model="guildDescription" /> -->
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
        <select id="guild-type" class="goa-input uk-input" v-model="guild.Category">
          <option value=""></option>
          <option value="rp">RP</option>
          <option value="casual">Casual</option>
          <option value="hardcore">Hardcore</option>
          <option value="social">Social</option>
        </select>
      </div>
      <div class="input uk-width-1-4">
        <label for="guild-focus">Focus</label>
        <select id="guild-focus" class="goa-input uk-input" v-model="guild.Focus">
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
        <select id="guild-race" class="goa-input uk-input" v-model="guild.PrimaryRace">
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
        <select id="guild-region" class="goa-input uk-input" v-model="guild.Region">
          <option value=""></option>
          <option value="na-east">NA-East</option>
          <option value="na-west">NA-West</option>
          <option value="oceania">Oceania</option>
          <option value="south-america">South America</option>
          <option value="europe">Europe</option>
          <option value="asia">Asia</option>
        </select>
      </div>
      <div class="rank-structure-container uk-width-1-1">
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
      </div>
      <div class="input uk-width-medium">
        <label for="guild-restricted">Auto approve join request?</label>
        <select
          name="guild-restricted"
          id="guild-restricted"
          class="goa-input uk-input uk-width-1-1"
          v-model="guild.AutoApprove"
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
