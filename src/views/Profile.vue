<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { useUserStore } from "../stores/userStore";
import { useGuildStore } from "../stores/guildStore";
import CharacterMatrix from "../components/CharacterMatrix.vue";
import MemberCard from "../components/MemberCard.vue";
import router from "../router/routes";
import { useAPI } from '../stores/apiStore'

let store = useUserStore();
let guildStore;
let guild = ref({});
let guildID = ref();
let user = ref();
let selectedClass = ref();

let api = useAPI();
let baseUrl = api.getAPI;

let hiddenKeys = ["Password", "GuildID", "UserID"];

onBeforeMount(()=> {
  user.value = store.getUser;
  guildStore = useGuildStore();
  guildID.value = guildStore.getGuild.GuildID;
})

let keys = computed(() => {
  let returnKeys = [];
  let keys = Object.keys(user.value);

  keys.forEach((key) => {
    if (checkHide(key)) {
      returnKeys.push(key);
    }
  });
  return returnKeys;
});

let checkHide = (key) => {
  let found = false;
  hiddenKeys.forEach((item) => {
    // console.log("Key: ", key, " check key: ", item);
    if (item == key) {
      // console.log("Match found. Key: ", key, " matches.");
      found = true;
    }
  });
  if (found) {
    return false;
  }
  return true;
};

let updateUserClass = async () => {
  // console.log("baseURL: ", baseUrl);
  // let hashedPassword = await hash(password.value);
  console.log(selectedClass.value);
  console.log("Name: ", selectedClass.value.name);
  user.value.Subclass = selectedClass.value.name;
  user.value.Primary = selectedClass.value.primary;
  user.value.Secondary = selectedClass.value.secondary;
  console.log("User now: ", user.value);
  // let call = {
  //   User: user,
  // };
  let response = await fetch(baseUrl + "Users/updateUser/" + user.value.UserID, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
    },
    body: JSON.stringify(user.value),
  });

  if (response.ok) {
    let data = await response.json();
    // console.log("data: ", data);
    localStorage.setItem("User", JSON.stringify(data.Data));
    getGuildData();
  } else {
    // console.log("Error fetching data: ", response.statusText);
  }
};

let getGuildData = async () => {
  // console.log("Fetching guild data..");
  guildID.value = localStorage.getItem("guildID");
  let call = {
    GuildID: guildID.value,
  };
  let response = await fetch(baseUrl + "Guilds/fetchGuildData", {
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
    // console.log("Guild data: ", data);

    // test guildStore 
    guild.value = data.Data;
    guildStore.setGuild(guild.value);
    // console.log("GuildStore: ", guildStore.getGuild);
  } else {
    // console.log("Error fetching thread data: ", response.statusText);
  }
};

let leaveGuild = async () => {
  // console.log("Leaving guild..");
  guildID.value = localStorage.getItem("guildID");
  let call = {
    User: user.value,
    GuildID: guildID.value,
  };
  let response = await fetch(baseUrl + "Guilds/leaveGuild", {
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
    // console.log("Guild data: ", data);
    // store.setUser(data.Data);
    localStorage.setItem("User", JSON.stringify(data.Data));
    localStorage.removeItem("guildName");
    localStorage.removeItem("guildLogo");
    store.setGuildID(null);
    localStorage.removeItem("guildID");
    user.value = data.Data;
    // console.log("User after leaving guild: ", user.value);
    location.reload();

  } else {
    // console.log("Error fetching thread data: ", response.statusText);
  }
};
</script>

<style scoped>
label {
  color: rgb(255, 65, 65);
}
</style>

<template>
  <div class="profile">
    
    <div class="goa-container uk-margin-bottom">
      <!-- <h3 class="uk-light uk-text-center">{ Guild name } Roster</h3> -->
      <h3
        class="uk-light uk-text-center uk-padding uk-padding-remove-bottom uk-text-bold"
      >
        Character Matrix
      </h3>
      <div class="uk-padding uk-padding-remove-top">
        <CharacterMatrix v-model="selectedClass" />
        <div class="uk-flex uk-flex-center">
          <div v-if="selectedClass" class="uk-flex-column uk-width-1-2@l">
            <div class="uk-flex uk-flex-between uk-margin-bottom">
              <label for="selected-primary text-goa-red">Primary Archetype</label>
              <input
                class="goa-input uk-text-center"
                type="text"
                id="selected-primary"
                disabled
                v-model="selectedClass.primary"
              />
            </div>
            <div class="uk-flex uk-flex-between">
              <label for="selected-secondary text-goa-red">Secondary Archetype</label>
              <input
                class="goa-input uk-text-center"
                type="text"
                id="selected-secondary"
                disabled
                v-model="selectedClass.secondary"
              />
            </div>
            <div class="uk-flex uk-flex-between uk-child-width-1- uk-margin-top">
              <button @click="updateUserClass" class="goa-button">Update My Class</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="goa-container uk-padding user-info uk-flex uk-flex-column">
      <h4 class="text-goa-red">User Details</h4>
      <div class="uk-margin-bottom uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-center">
        <div>
          <MemberCard  :member="user" />
        </div>
      </div>
      <div v-if="user" class="user-details uk-flex uk-flex-around uk-margin-bottom uk-child-width-1-4">
        <div class="input-container uk-padding-small uk-flex uk-flex-column">
          <label for="">Email</label>
          <input class="goa-input" type="text" v-model="user.Email">
        </div>
        <div class="input-container uk-padding-small uk-flex uk-flex-column">
          <label for="">Guild Name</label>
          <input class="goa-input" type="text" v-model="user.GuildName">
        </div>
        <div class="input-container uk-padding-small uk-flex uk-flex-column">
          <label for="">Guild Role</label>
          <input class="goa-input" type="text" v-model="user.Rank.RankName">
        </div>
      </div>
      <div class="leave-guild-controls">
        <h4 class="text-goa-red">Guild Options</h4>
        <button @click="leaveGuild" class="goa-button" type="submit">Leave Guild</button>
      </div>
    </div>
  </div>
</template>
