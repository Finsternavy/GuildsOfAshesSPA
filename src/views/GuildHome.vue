<script setup>
import { ref, onBeforeMount, onMounted, computed } from "vue";
import Discord from "../components/Discord.vue";
import router from "../router/routes";
import { useUserStore } from "../stores/userStore";
import { useGuildStore } from "../stores/guildStore";
import Loading from "../components/Loading.vue";
import { useAPI } from '../stores/apiStore';
import Editor from "../components/Editor.vue";
import BannerBar from '../public/Images/BannerRod.png';
// import VerticalRod from '../public/Images/VerticalRod.png';

let api = useAPI();
let baseUrl = api.getAPI + "Guilds";
let discordServers = ref([
  // {
  //   embedSrc: "https://discord.com/widget?id=340337686059548672&theme=dark",
  // },
]);
let userStore;
let guildStore;
let user;
let guild = ref({});
let guildID = ref();
let inbox = ref([]);
let guildLogo = ref();
let guildLeaderName = ref();
let username = ref();

let showContent = ref(false);

let background = ref();

let canEditDescription = ref(false);
let canEditLogo = ref(false);
let canEditBanner = ref(false);

let showLeaderControls = ref(false);

onBeforeMount(() => {
  userStore = useUserStore();
  guildStore = useGuildStore();
  user = userStore.getUser;
  if (user){
    username.value = user.Username;
  } else {
    username.value = '';
  }
  if (localStorage.getItem("guildID")) {
    // console.log("Got guildID from local storage..");
    guildID.value = localStorage.getItem("guildID");
  } else {
    guildID.value = user.GuildID;
  }
  getGuildData();
  // console.log("GuildID: ", guildID.value);
});

onMounted(() => {
  // getBanner();
  
});

// let memberCount = computed(() => {
//   let count = 0;
//   if (guild.MemberList) {
//     count = guild.value.MemberList.length;
//   }
//   console.log("Member count: ", count);
//   return count;
// });

const upcomingEvents = computed(() => {
  let events = [];
  if (guild.value.Events) {
    guild.value.Events.forEach((event) => {
      if (event.StartDate) {
        let eventDate = new Date(event.StartDate);
        let today = new Date();
        // not perfect but it works
        let computedEventDate = (eventDate.getFullYear() * 12 * 30) + (eventDate.getMonth() * 30) + eventDate.getDate();
        let computedToday = (today.getFullYear() * 12 * 30) + (today.getMonth() * 30) + today.getDate();
        // console.log("Computed event date: ", computedEventDate);
        // console.log("Computed today: ", computedToday);
        if (computedEventDate + 1 >= computedToday && eventDate - today < (604800000 * 2)) { // 604800000 = 1 week in milliseconds
          events.push(event);
        }
      }
    });
  }
  events.sort((a, b) => {
    let dateA = new Date(a.StartDate);
    let dateB = new Date(b.StartDate);
    return dateA - dateB;
  });
  return events;
});

let getGuildData = async () => {
  // console.log("Fetching guild data..");
  let call = {
    GuildID: guildID.value,
  };
  let response = await fetch(baseUrl + "/fetchGuildData", {
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
    guild.value = data.Data;
    // console.log("Guild: ", guild.value);
    localStorage.setItem("guildLogo", guild.value.Logo);
    localStorage.setItem("guildName", guild.value.Name);
    background.value = guild.Background;
    // localStorage.setItem("guild", JSON.stringify(guild.value));
    inbox.value = guild.value.Applications;
    guildLeaderName.value = guild.value.Leader.Username;
    // console.log("Inbox: ", inbox.value);

    // test guildStore 

    guildStore.setGuild(guild.value);
    // console.log("GuildStore: ", guildStore.getGuild);
    // console.log("Memberlist: ", guildStore.getGuild.MemberList);



    showContent.value = true;
    if (!inbox.value.length > 0) {
      // toggle off uk-toggle
      let element = document.getElementById("Inbox");
      if (element)
      element.hidden = true;
    }
    // userStore.setUser(data.Data);
    // router.push({ name: "guild-home" });
    // threads.value = data.Data;
  } else {
    // console.log("Error fetching thread data: ", response.statusText);
  }
};

let denyApplication = async (application) => {
    console.log("Attempting to deny application for: ", application.User.Username);
    let call = {
        GuildID: application.GuildID,
        User: application.User
    };
    // console.log("call: ", call);
    let response = await fetch(baseUrl + "/denyGuildApplication", {
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
        // console.log("Response from denyApplication: ", data);
        await getGuildData();
        inbox.value = guild.value.Applications;
        // success.value = true;
    } else {
        // console.log("Error during deny application: ", response.statusText);
    }
}

let approveApplication = async (application) => {
    // console.log("Attempting to deny application for: ", application.User.Username);
    // application.User.Rank.RankName = "Member";
    let call = {
        GuildID: application.GuildID,
        GuildName: guild.value.Name,
        User: application.User
    };
    // console.log("call: ", call);
    let response = await fetch(baseUrl + "/approveGuildApplication", {
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
        // console.log("Response from denyApplication: ", data);
        await getGuildData();
        inbox.value = guild.value.Applications;
        getGuildData();
    } else {
        // console.log("Error during deny application: ", response.statusText);
    }
}

const saveDescription = async () => {
  let call = {
        GuildName: guild.value.Name,
        Description: guild.value.Description,
        ID: guild.value.ID,
    };
    console.log("call: ", call);
    let response = await fetch(baseUrl + "/updateGuildDescription", {
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
        console.log("Response from save description: ", data);
        canEditDescription.value = false;
        // await getGuildData();
        // inbox.value = guild.value.Applications;
        // getGuildData();
    } else {
        // console.log("Error during deny application: ", response.statusText);
    }
}

let apply = () => {
  if (guild.value.AutoApprove) {
    return alert("You can apply!");
  }
  // return alert("Guild is restricted");
  router.push({ name: "guild-application" });
};

let createApplication = () => {
  router.push({ name: "create-application" });
};

const getBanner = () => {
  let doc = document.getElementById("GuildBanner");
  console.log("Banner inner html: ", doc);
  // return `guild.value.Banner`;
}

const toggleEditDescription = () => {
  canEditDescription.value = !canEditDescription.value;
}

const toggleShowLeaderControls = () => {
  showLeaderControls.value = !showLeaderControls.value;

  if (canEditDescription.value) {
    canEditDescription.value = false;
  }
}
</script>

<style scoped>

.goa-alert-container {
  background-color: rgba(255, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  border-radius: 30px;
  transition: background-color 0.3s ease-in-out;
}

.goa-success-button:hover {
  background-color: greenyellow;
  color: black;
}

.goa-deny-button:hover {
  background-color: var(--secondary-color);
  color: var(--button-text-color);
}

.goa-edit-button,
.goa-delete-button {
  padding: 5px 10px;
}

.applicant-container {
  border: 1px solid gray;
  border-radius: 30px;
  margin-bottom: 40px;
  padding: 40px;
}

/* .guild-type-info-container {
  border: 1px solid gray;
  border-radius: 10px;
  margin-bottom: 40px;
  overflow: hidden;
} */
.guild-type-container {
  border: 1px solid gray;
  border-radius: 30px;
  margin-bottom: 40px;
  overflow: hidden;
}
.guild-type-info-label {
  background-color: rgb(117, 0, 0);
  color: white;
  padding: 3px 10px;
  border: 1px solid gray;
  border-bottom: none;
  /* border-radius: 30px 30px 0 0; */
  /* width: fit-content; */
}

.guild-type-info {
  border: 1px solid gray;
  font-weight: 700;
  padding: 3px 10px;
  /* border-radius: 0px 0px 30px 30px; */
  background-color: black;
  
}

.event-card {
  border: 1px solid var(--primary-color);
  border-radius: 30px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* grid-template-rows: 1fr; */
  grid-gap: 20px;
  padding: 5px;

}
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.guild-title > * {
  height: 200px;
  font-size: 100px!important;
}

/* body {
  background-image: v-bind(background)!important;
} */
.guild-control-container {
  position: sticky;
  z-index: 100;
  border-radius: 30px;
  margin-bottom: 40px;
  background-color: transparent;
}

.goa-container-mod {
  border-radius: 0px 0px 30px 30px;
}

.banner {
  position: absolute!important;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.radius-top {
  border-radius: 30px 30px 0 0;
}

.radius-bottom {
  border-radius: 0 0 30px 30px;
}
@media (max-width: 768px) {
  .font-shrink {
    font-size: 16px!important;
  }
}

.guild-banner-test-container {
  position: fixed;
}
.guild-banner-test {
  /* position: absolute;
  height: 100vh;
  width: 100%;
  max-width: 100%; */
  border-radius: 10px;
  box-shadow: inset 0px 0px 20px 10px rgba(255, 255, 255, 0.1);
  background-color: var(--background-color);
  background-image: repeating-linear-gradient(89deg, 
      transparent, 
      transparent 7%, 
      rgba(255, 255, 255, 0.01) 14%, 
      rgba(255, 255, 255, 0.01) 21%,
      transparent 28%);
  background-size: contain;
  z-index: 2!important;
  clip-path: polygon(0% 0%, 100% 0%,  100% 100%, 97% 99%, 96% 97%, 94% 99%, 93% 98%, 90% 100%, 86% 99%, 84% 99%, 80% 99%, 78% 99%, 75% 100%, 74% 96%, 73% 98%, 72% 98%, 70% 100%, 68% 100%, 67% 99%, 64% 99%, 62% 96%, 62% 100%, 58% 100%, 51% 100%, 49% 98%, 48% 100%, 45% 100%, 44% 96%, 43% 98%, 40% 99%, 39% 98%, 36% 100%, 34% 100%, 32% 99%, 29% 99%, 26% 99%, 23% 100%, 22% 98%, 19% 100%, 16% 100%, 14% 98%, 12% 99%, 10% 97%, 8% 99%, 6% 99%, 4% 100%, 2% 99%, 0% 100%, 0% 10%);
  /* overflow: hidden; */
}

.guild-side-banner {
  display: flex;
  align-items: center;
  min-height: fit-content;
  max-height: 70vh;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: inset 0px 0px 20px 10px rgba(255, 255, 255, 0.1);
  background-color: var(--background-color);
  /* background-image: repeating-linear-gradient(89deg, 
      transparent, 
      transparent 7%, 
      rgba(255, 255, 255, 0.05) 14%, 
      rgba(255, 255, 255, 0.05) 21%,
      transparent 28%); */
  background-size: contain;
  clip-path: polygon(0% 0%, 100% 0%, 99% 12%, 98% 23%, 98% 37%, 98% 49%, 98% 62%, 98% 83%, 99% 92%, 100% 100%, 97% 99%, 96% 97%, 94% 99%, 93% 98%, 90% 100%, 86% 99%, 84% 99%, 80% 99%, 78% 99%, 75% 100%, 74% 96%, 73% 98%, 72% 98%, 70% 100%, 68% 100%, 67% 99%, 64% 99%, 62% 96%, 62% 100%, 58% 100%, 51% 100%, 49% 98%, 48% 100%, 45% 100%, 44% 96%, 43% 98%, 40% 99%, 39% 98%, 36% 100%, 34% 100%, 32% 99%, 29% 99%, 26% 99%, 23% 100%, 22% 98%, 19% 100%, 16% 100%, 14% 98%, 12% 99%, 10% 97%, 8% 99%, 6% 99%, 4% 100%, 2% 99%, 0% 100%, 1% 84%, 2% 57%, 2% 24%, 1% 10%);
  z-index: 2;
}

.guild-side-banner:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: repeating-linear-gradient(89deg, 
      rgba(0, 0, 0, 0.7), 
      rgba(0, 0, 0, 0.7) 7%, 
      rgba(255, 255, 255, 0.03) 14%, 
      rgba(255, 255, 255, 0.03) 21%,
      rgba(0, 0, 0, 0.7) 28%);
  background-size: contain;
}

.banner-bar {
  position: absolute;
  width: calc(100% + 250px);
  transform: translateX(-125px);
  top: -15px;
  height: 90px;
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 1;
}

.sub-bar {
  top: -5px;
  z-index: 1;
}

.vertical-rod {
  position: absolute;
  height: 100%;
  width: 15px;
  /* top: 25vh; */
  left: calc(50% - 10px);
  background-repeat: no-repeat;
  background-size: cover;
  background-image: linear-gradient(to right, gray, gray 10%, rgb(68, 68, 68) 15%, rgb(36, 36, 36) 30%, rgb(16, 16, 16) 100%);
}

.banner-container {
  z-index: -1!important;
}

.tooltip {
  opacity: 0;
  position: absolute;
  transform: translate(-40px, 40px);
  transition: all 0.3s ease-in-out;
  border-radius: 10px;
  min-width: 100px;
  pointer-events: none;
}

.tooltip-right{
  opacity: 0;
  position: absolute;
  transform: translate(40px, -50px);
  transition: all 0.3s ease-in-out;
  border-radius: 10px;
  min-width: 100px;
  pointer-events: none;
}

.tooltip-top {
  opacity: 0;
  position: absolute;
  transform: translate(-40px, -40px);
  transition: all 0.3s ease-in-out;
  border-radius: 10px;
  min-width: 100px;
  pointer-events: none;
}

.leader-controls:hover .tooltip,
.leader-controls:hover .tooltip-right,
.leader-controls:hover .tooltip-top {
  background-color: var(--primary-color);
  color: var(--button-text-color);
  padding: 10px;
  opacity: 1;
}

</style>

<template>
  <div class="uk-flex uk-position-relative">
    <div class="vertical-rod"></div>
  <div class="banner-bar uk-visible@l" :data-src="BannerBar" uk-img></div>
    <div class="guild-side-banner uk-padding-small uk-width-1-6 uk-margin-right uk-visible@l" uk-sticky>
      <div class="uk-text-center uk-margin-remove uk-text-large text-primary upper uk-flex uk-flex-column font-shrink uk-position-bottom uk-padding-large uk-padding-remove-horizontal">
        <label class="text-accent uk-margin-top" for="">Category</label>
        <p class="uk-margin-remove"> {{ guild.Category }} - {{ guild.Focus }}</p>
      </div>
      <div :class="{
          'logo-container uk-margin-bottom': {} }">
        <img class="guild-logo-upload uk-background-cover" :src="guild.Logo" alt="Uploaded Image" uk-img />
      </div>
    </div>
    <div class="center-content uk-width-expand uk-flex uk-flex-column">
        <div class="guild-banner-test-container guild-banner-test uk-position-relative uk-background-primary  uk-margin-medium-bottom" uk-stick="start: 0">
        
        <div v-if="guildLeaderName == username" class="guild-control-container goa-container-no-radius uk-flex uk-flex-right uk-margin-remove-bottom">
          <div v-if="showLeaderControls">
            <!-- Move this to an admin control panel | probably option under the user icon -->
            <button  v-if="inbox && inbox.length > 0"  uk-toggle="target: #Inbox; animation: uk-animation-fade" 
              class="goa-button uk-flex uk-flex-middle">
              <span uk-icon="icon: warning" class=""></span>
              <span class="uk-margin-small-left">New Applications!</span>
            </button>
            <button
              @click="createApplication" class="leader-controls uk-icon-button uk-margin-left">
              <div class="tooltip">Edit Application</div>
              <span uk-icon="icon: file-edit"></span>
            </button>
            <button
              @click="" class="leader-controls uk-icon-button uk-margin-left">
              <div class="tooltip">Edit Logo</div>
              <span uk-icon="icon: bookmark"></span>
            </button>
            <button
              @click="" class="leader-controls uk-icon-button uk-margin-left">
              <span class="tooltip">Edit Colors</span>
              <span uk-icon="icon: paint-bucket"></span>
            </button>
          </div>

          <button
            @click="toggleShowLeaderControls" class="leader-controls uk-icon-button uk-margin-left">
            <span class="tooltip">Toggle Leader Controls</span>
            <span uk-icon="icon: cog"></span>
          </button>

        </div>
        <Loading v-model="showContent" :message="'Loading Guild ...'" />
        <div v-if="showContent" class="guild-home">
          <Editor class="uk-width-1-1 uk-padding" v-if="guild.Banner" v-model="guild.Banner" :viewOnly="true"/>
          <div class="uk-hidden@l uk-padding" :class="{
              'logo-container uk-margin-bottom': {},
              'bordered-logo-container': guild.LogoBorder == true }">
            <img class="guild-logo-upload uk-background-cover" :src="guild.Logo" alt="Uploaded Image" uk-img />
          </div>
      
          <!-- Guild Application Review ( move this to a component )-->
          <div id="Inbox" class="uk-padding" hidden>
            <div v-for="application in inbox" class="applicant-container uk-flex uk-flex-column">
              <h3 class="text-goa-red">Applicant Info</h3>
              <div class="applicant-info uk-width-1-1 uk-flex uk-child-width-1-4 uk-grid-small uk-margin-bottom" uk-grid>
                <div class="applicant-data-item uk-flex uk-flex-column">
                  <label for="">Username</label>
                  <input class="goa-input" type="text" readonly v-model="application.User.Username">
                </div>
                <div class="applicant-data-item uk-flex uk-flex-column">
                  <label for="">Class</label>
                  <input class="goa-input" type="text" readonly v-model="application.User.Subclass">
                </div>
                <div class="applicant-data-item uk-flex uk-flex-column">
                  <label for="">Primary</label>
                  <input class="goa-input" type="text" readonly v-model="application.User.Primary">
                </div>
                <div class="applicant-data-item uk-flex uk-flex-column">
                  <label for="">Secondary</label>
                  <input class="goa-input" type="text" readonly v-model="application.User.Secondary">
                </div>
              </div>
              <hr class="uk-divider-icon uk-width-1-1 text-goa-red">
              <div class="application-responses">
                <div class="question-info">
                  <h3 class="text-goa-red">Questions</h3>
                  <div v-for="question in application.Questions" class="uk-margin-bottom">
                    <p class="text-goa-red">{{ question.question }}</p>
                    <p>{{ question.answer }}</p>
                  </div>
                </div>
              </div>
              <hr class="uk-divider-icon uk-width-1-1 text-goa-red">
              <h4 class="text-goa-red uk-text-center uk-margin-remove-top uk-margin-medium-bottom">Process Application</h4>
              <div class="application-responses uk-flex uk-flex-around uk-width-1-1">
                <div class="Approve-container">
                  <button class="goa-button goa-success-button" uk-toggle="target: #ApprovalRank">Grant Full Membership</button>
                </div>
                <div class="Approve-container">
                  <button class="goa-button goa-deny-button uk-width-small" @click="denyApplication(application)">Deny</button>
                </div>
              </div>
              <div id="ApprovalRank" class="approval-rank-container" hidden>
                <div class="uk-flex uk-flex-column uk-margin-bottom">
                  <label for="">Rank</label>
                  <select class="goa-input" v-model="application.User.Rank">
                    <option class="text-goa-red uk-background-secondary" v-for="rank in guild.Ranks" :value="rank">{{rank.RankName}}</option>
                  </select>
                </div>
                <button @click="approveApplication(application)" class="goa-button">Approve as {{ application.User.Rank.RankName }}</button>
              </div>
            </div>
        </div>
      
          <!-- Guild Info Section -->
      
          <div class="uk-padding uk-margin-bottom uk-position-relative">
            <div v-if=" user && !user.GuildID">
              <button
                v-if="user"
                @click="apply" class="goa-button uk-margin-left uk-margin-top uk-position-top-left">
                Apply
              </button>
            </div>
            
            <!-- <Editor class="uk-margin-top uk-margin-remove-bottom" v-if="guild.Banner" v-model="guild.Banner" :viewOnly="true"/>
            <p v-if="guild.MemberList" class="member-count uk-position-top-right text-primary uk-margin-right">
            Members: <span class="text-default">{{ guild.MemberList.length }} </span>
            </p> -->
            
            <!-- <div :class="{
                'logo-container uk-margin-bottom': {},
                'bordered-logo-container': guild.LogoBorder == true,
              }">
              <img class="guild-logo-upload uk-background-cover" :src="guild.Logo" alt="Uploaded Image" uk-img />
            </div> -->
            
            <div class="uk-hidden@l uk-flex uk-width-1-1 uk-flex-between uk-margin-large-bottom">
                <div class="uk-text-center uk-margin-remove uk-text-large text-primary upper uk-flex uk-flex-column font-shrink">
                  <label class="text-accent" for="">Style</label>
                  <p class="uk-margin-remove"> {{ guild.Category }} - {{ guild.Focus }}</p>
                </div>
                <!-- <div class="uk-text-center uk-margin-remove uk-text-large text-primary upper"></div> -->
                <div v-if="guild && guild.PrimaryRace" class="uk-text-center uk-margin-remove uk-text-large text-primary upper uk-flex uk-flex-column font-shrink">
                  <label class="text-accent" for="">Race</label> 
                  <p class="uk-margin-remove">{{ guild.PrimaryRace }}</p> 
                </div>
                <div class="uk-text-center uk-margin-remove uk-text-large text-primary upper uk-flex uk-flex-column font-shrink">
                  <label class="text-accent" for="">Region</label> 
                  <p class="uk-margin-remove">{{ guild.Region }}</p>
                </div>
            </div>
      
            <!-- This is where we display the rich text -->
            <!-- <div v-html="guild.Description" class="uk-margin-large-top"></div> -->
            <div class="edit-button-container uk-flex uk-flex-between uk-margin-small-bottom">
              <button @click="toggleEditDescription" v-if="user && user.Rank.RankName == 'Guild Leader' && showLeaderControls" class="leader-controls uk-icon-button">
                <div class="tooltip-right">Edit Guild Description</div>
                <span class="" uk-icon="icon: pencil"></span>
              </button>
              <button v-if="canEditDescription && showLeaderControls" @click="saveDescription" class="leader-controls uk-icon-button">
                <div class="tooltip-top">Save</div>
                <span uk-icon="icon: check"></span>
              </button>
            </div>
            <Editor class="uk-margin-large-bottom" v-if="guild.Description && !canEditDescription" v-model="guild.Description" :viewOnly="true"/>
            <Editor  class="uk-margin-large-bottom" v-if=" canEditDescription" v-model="guild.Description"/>
          </div>
          <!-- Only show if guild leader or mod issues alert-->
          <div v-if="guild.Alerts.length > 0" class="guild-alerts goa-alert-container uk-padding">
            <h3 class="uk-light uk-text-center">GUILD ALERT!</h3>
            <hr />
            <div class="uk-margin-bottom uk-padding">
              <p class="uk-margin-remove-bottom">
                Alert issued by:
                <span v-if="guild.Leader" class="text-goa-red uk-text-bold">{{
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
        </div>
      </div>
      <div v-if="user && user.GuildID == guildID" class="uk-position-relative">
        <div v-if="upcomingEvents && upcomingEvents.length > 0" class="banner-bar sub-bar uk-visible@l" :data-src="BannerBar" uk-img></div>
        <!-- <div class="vertical-rod" :data-src="VerticalRod" uk-img></div> -->
        <div class="guild-banner-test uk-width-1-1 uk-margin-large-bottom uk-position-relative">
          <div class="banner-container right-side uk-width-1-1">
              <div v-if="upcomingEvents && upcomingEvents.length > 0" class="upcoming-events uk-padding uk-light">
                <h1 class="uk-text-center">Upcoming Events</h1>
                <div class="event-list uk-flex uk-width-1-1 grid">
                  <div v-for="events in upcomingEvents" class="event-card uk-flex uk-flex-column uk-text-center uk-padding-small uk-width-1-1">
                      <div>
                        <h4 class="uk-text-bold text-header">{{ events.Title }}</h4>
                      </div>
                      <div class="uk-flex uk-flex-column uk-flex-center">
                        <p class="uk-text-bold"><span class="text-accent">Organizer:</span> {{ events.Organizer }}</p>
                        <div class="uk-child-width-1-2">
                          <span class="uk-text-bold uk-text-right uk-margin-small-right">{{ events.StartDate }}</span>
                          <span class="uk-text-bold uk-text-left"><span class="text-accent">@</span> {{ events.StartTime }}</span>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  <div class="guild-side-banner uk-padding-small uk-margin-left uk-width-1-6 uk-visible@l" uk-sticky>
    <div class="uk-position-bottom uk-padding-large uk-padding-remove-horizontal">
      <div v-if="guild && guild.PrimaryRace" class="uk-text-center uk-margin-remove uk-text-large text-primary upper uk-flex uk-flex-column font-shrink">
        <label class="text-accent" for="">Race</label> 
        <p class="uk-margin-remove">{{ guild.PrimaryRace }}</p> 
      </div>
      <div class="uk-text-center uk-margin-remove uk-text-large text-primary upper uk-flex uk-flex-column font-shrink">
        <label class="text-accent" for="">Region</label> 
        <p class="uk-margin-remove">{{ guild.Region }}</p>
      </div>
    </div>
    <div :class="{
        'logo-container uk-margin-bottom': {},
        'bordered-logo-container': guild.LogoBorder == true }">
      <img class="guild-logo-upload uk-background-cover" :src="guild.Logo" alt="Uploaded Image" uk-img />
    </div>
  </div>
</div>
</template>
