<script setup>
import { ref, onBeforeMount, computed } from "vue";
import Discord from "../components/Discord.vue";
import router from "../router/routes";
import { useUserStore } from "../stores/userStore";

const baseUrl = process.env.APIURL + "Guilds";
const discordServers = ref([
  {
    embedSrc: "https://discord.com/widget?id=340337686059548672&theme=dark",
  },
]);
let store;
let user;
let guild = ref({});
let guildID = ref();
let guildLogo = ref();


onBeforeMount(() => {
  store = useUserStore();
  user = store.getUser;
  if (localStorage.getItem("guildID")) {
    console.log("Got guildID from local storage..");
    guildID.value = localStorage.getItem("guildID");
  } else {
    guildID.value = user.GuildID;
  }
  getGuildData();
  console.log("GuildID: ", guildID.value);
});

// const memberCount = computed(() => {
//   let count = 0;
//   if (guild.MemberList) {
//     count = guild.value.MemberList.length;
//   }
//   console.log("Member count: ", count);
//   return count;
// });

const getGuildData = async () => {
  console.log("Fetching guild data..");
  const call = {
    GuildID: guildID.value,
  };
  const response = await fetch(baseUrl + "/fetchGuildData", {
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
    console.log("Guild data: ", data);
    guild.value = data.Data;
    console.log("Guild: ", guild.value);
    handleGuildLogo(guild.value.Logo);
    // store.setUser(data.Data);
    // router.push({ name: "guild-home" });
    // threads.value = data.Data;
  } else {
    console.log("Error fetching thread data: ", response.statusText);
  }
};

const handleGuildLogo = (logo) => {};

const apply = () => {
  if (guild.value.AutoApprove) {
    return alert("You can apply!");
  }
  return alert("Guild is restricted");
};
</script>

<style scoped>
.goa-container {
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  border-radius: 30px;
  transition: background-color 0.3s ease-in-out;
}

.goa-alert-container {
  background-color: rgba(255, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  border-radius: 30px;
  transition: background-color 0.3s ease-in-out;
}
</style>

<template>
  <div class="guild-home">
    <div class="goa-container uk-padding uk-margin-bottom">
      <h1 class="uk-light uk-text-center uk-margin-remove">{{ guild.Name }}</h1>
      <div v-if="!store.getAuthenticated">
        <button
          @click="apply" class="goa-button uk-margin-left uk-margin-top uk-light uk-position-top-left">
          Apply
        </button>
      </div>
      <p
        v-if="guild.MemberList"
        class="uk-text-small uk-text-warning uk-text-center uk-margin-remove-top"
      >
        ( Members: {{ guild.MemberList.length }} )
      </p>
      <div
        :class="{
          'logo-container': guild.LogoBorder == false,
          'bordered-logo-container': guild.LogoBorder == true,
        }"
      >
        <img class="guild-logo-upload" :src="guild.Logo" alt="Uploaded Image" uk-img />
      </div>
      <p class="text-orange uk-margin-remove-bottom">Who we are:</p>
      <p class="uk-padding-small uk-padding-remove-bottom uk-margin-remove">
        {{ guild.Description }}
      </p>
    </div>
    <!-- Only show if guild leader or mod issues alert-->
    <div v-if="guild.Alerts" class="guild-alerts goa-alert-container uk-padding">
      <h3 class="uk-light uk-text-center">GUILD ALERT!</h3>
      <hr />
      <div class="uk-margin-bottom goa-container uk-padding">
        <p class="uk-margin-remove-bottom">
          Alert issued by:
          <span v-if="guild.Leader" class="text-orange uk-text-bold">{{
            guild.Leader.Username
          }}</span>
        </p>
        <p class="uk-margin-remove-top">
          Alert will expire at: <span class="uk-text-warning">4:15 PM EST</span>
        </p>
        <p class="uk-margin-remove">The castle is under attack!</p>
        <p class="uk-margin-remove">
          War has been declaired! Participate in pre-war events. WE MUST PROTECT THIS
          HOUSE!
        </p>
      </div>
    </div>
    <div class="guild-main-content uk-flex">
      <div class="left-side uk-width-2-3">
        <div class="goa-container newest-mod-message uk-margin-right uk-padding uk-light">
          <h3>Get to work!</h3>
          <p class="uk-text-bold uk-text-warning">The Leader @<span> 01/01/1901</span></p>
          <p>
            We are in need of resources. Check out the task section, claim a task, gather
            resources and support the guild!
          </p>
        </div>
        <div
          class="popular-threads goa-container uk-margin-top uk-margin-right uk-padding"
        >
          <h3 class="uk-light">Popular Threads</h3>
          <a href="#">Character Build Guides</a>
        </div>
      </div>
      <div class="right-side uk-width-1-3">
        <div class="goa-container upcoming-events uk-padding uk-light">
          <h3>Upcoming Events</h3>
          <ul>
            <li>Leadership Planning - 01/01/1901 @ 2:00 PM EST</li>
            <li>Team Meeting - 01/01/1901 @ 4:00 PM EST</li>
            <li>Group Play - 01/01/1901 @ All day</li>
          </ul>
        </div>
        <div class="discord uk-margin-top">
          <Discord class="goa-container" v-model="discordServers" />
        </div>
      </div>
    </div>
  </div>
</template>
