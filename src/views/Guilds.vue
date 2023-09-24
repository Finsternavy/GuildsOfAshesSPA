<script setup>
import { ref, onBeforeMount } from "vue";
import router from "../router/routes";

const baseUrl = process.env.APIURL + "Guilds";
const guildsList = ref();

onBeforeMount(() => {
  getAllGuilds();
});

const getAllGuilds = async () => {
  console.log("Fetching guild data..");
  //   const call = {
  //     GuildID: guildID.value,
  //   };
  const response = await fetch(baseUrl + "/getAllGuilds", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
    },
    // body: JSON.stringify(call),
  });

  if (response.ok) {
    let data = await response.json();
    console.log("Guilds list data: ", data);
    guildsList.value = data.Data;
    console.log("Guild list: ", guildsList.value);
    // store.setUser(data.Data);
    // router.push({ name: "guild-home" });
    // threads.value = data.Data;
  } else {
    console.log("Error fetching thread data: ", response.statusText);
  }
};

const visit = (id) => {
  console.log("visit");
  localStorage.setItem("guildID", id);
  router.push({ name: "guild-home" });
};

const goToCreate = () => {
  console.log("goToCreate");
  router.push({ name: "guild-create" });
};
</script>

<style scoped>
.guild-header {
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  border-radius: 30px;
  transition: background-color 0.3s ease-in-out;
}
.guild-card {
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  border-radius: 30px;
  transition: background-color 0.3s ease-in-out;
}
.guild-card:hover {
  background-color: rgba(0, 0, 0, 1);
  color: black;
}
.guild-card:hover > div > p {
  /* color: black; */
}
.guild-card:hover > div > label {
  /* color: orangered; */
}
.label {
  color: orange;
}

.dark-line {
  border: 1px solid rgba(0, 0, 0, 0.5);
}
</style>

<template>
  <div class="uk-container">
    <div
      class="guild-header uk-padding-small uk-margin-bottom uk-flex uk-flex-middle uk-flex-between"
    >
      <input class="goa-input" type="text" placeholder="Search..." />
      <h3
        class="uk-text-center uk-text-bold uk-position-center uk-light uk-margin-remove"
      >
        Guild List
      </h3>
      <button class="goa-button" @click="goToCreate">
        <span uk-icon="icon: plus"> </span> Create Guild
      </button>
    </div>
    <!-- {{ guild }} -->
    <button
      v-for="guild in guildsList"
      class="guild-card uk-margin-bottom uk-flex uk-flex-around uk-padding-small uk-width-1-1"
      @click="visit(guild.ID)"
    >
      <div class="guild-name">
        <label class="label" :for="'Guild-Name' + guild.ID">Name</label>
        <p class="uk-margin-remove uk-light" :id="'Guild-Name' + guild.ID">
          {{ guild.Name }}
        </p>
      </div>
      <div class="">
        <label class="label" :for="'Guild-Type' + guild.ID">Type</label>
        <p class="uk-margin-remove uk-light" :id="'Guild-Type' + guild.ID">
          {{ guild.Category }}
        </p>
      </div>
      <div class="">
        <label class="label" :for="'Guild-Focus' + guild.ID">Focus</label>
        <p class="uk-margin-remove uk-light" :id="'Guild-Focus' + guild.ID">
          {{ guild.Focus }}
        </p>
      </div>
      <div class="">
        <label class="label" :for="'Guild-Region' + guild.ID">Region</label>
        <p class="uk-margin-remove uk-light" :id="'Guild-Region' + guild.ID">
          {{ guild.Region }}
        </p>
      </div>
      <div>
        <label class="label" :for="'Guild-Size' + guild.ID">Members</label>
        <p class="uk-margin-remove uk-light" :id="'Guild-Size' + guild.ID">
          {{ guild.MemberList.length }}
        </p>
      </div>
    </button>
  </div>
</template>
