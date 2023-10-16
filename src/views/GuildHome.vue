<script setup>
import { ref, onBeforeMount, onMounted, computed } from "vue";
import Discord from "../components/Discord.vue";
import router from "../router/routes";
import { useUserStore } from "../stores/userStore";
import { useGuildStore } from "../stores/guildStore";
import RichTextEditor from "../components/RichTextEditor.vue";
import Loading from "../components/Loading.vue";
import { useAPI } from '../stores/apiStore';
import Editor from "../components/Editor.vue";

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
        if (eventDate > today && eventDate - today < (604800000 * 2)) { // 604800000 = 1 week in milliseconds
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
    localStorage.setItem("guild", JSON.stringify(guild.value));
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
    // console.log("Attempting to deny application for: ", application.User.Username);
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

.guild-title > * {
  height: 200px;
  font-size: 100px!important;
}

/* body {
  background-image: v-bind(background)!important;
} */

</style>

<template>
  <Loading v-model="showContent" :message="'Loading Guild ...'" />
  <div v-if="showContent" class="guild-home">
    <!-- This will only show for guild leaders (Or delegated rank)-->
    <div v-if="guildLeaderName == username" class="guild-control-container uk-margin-bottom">
      <button v-if="inbox && inbox.length > 0" uk-toggle="target: #Inbox; animation: uk-animation-fade" 
        class="goa-button goa-edit-button uk-flex uk-flex-middle">
        <span  uk-icon="icon: warning" class="uk-text-danger"></span>
        <span class="uk-text-danger uk-margin-small-left">New Applications!</span>
      </button> 
    </div>

    <!-- Guild Application Review-->
    <div id="Inbox" class="goa-container uk-padding uk-margin-large-bottom" hidden>
      <div v-for="application in inbox" class="applicant-container goa-container uk-flex uk-flex-column">
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
            <button class="goa-button goa-deny-button uk-width-small">Deny</button>
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

    <div class="goa-container uk-margin-bottom uk-margin-large-top" >
      <div v-if=" user && !user.GuildID">
        <button
          v-if="user"
          @click="apply" class="goa-button uk-margin-left uk-margin-top uk-light uk-position-top-left">
          Apply
        </button>
      </div>
      <button
        v-if="user && user.Rank.RankName == 'Guild Leader'"
        @click="createApplication" class="goa-button uk-margin-left uk-margin-top uk-light uk-position-top-left">
        Create Application
      </button>
      <Editor class="uk-margin-top uk-margin-remove-bottom" v-if="guild.Banner" v-model="guild.Banner" :viewOnly="true"/>
      <p v-if="guild.MemberList" class="member-count uk-position-top-right text-primary uk-margin-right">
       Members: <span class="text-default">{{ guild.MemberList.length }} </span>
      </p>
      
      <div :class="{
          'logo-container uk-margin-bottom': {},
          'bordered-logo-container': guild.LogoBorder == true,
        }"
      >
        <img class="guild-logo-upload uk-background-cover" :src="guild.Logo" alt="Uploaded Image" uk-img />
      </div>
      
      <div class="uk-flex uk-width-1-1 uk-child-width-1-2 uk-margin-bottom">
        <div class="uk-flex uk-flex-column">
          <div class="uk-text-center uk-margin-remove uk-text-large text-primary upper">{{ guild.Category }}</div>
          <div class="uk-text-center uk-margin-remove uk-text-large text-primary upper">{{ guild.Focus }}</div>
        </div>
        <div class="uk-flex uk-flex-column">
          <div class="uk-text-center uk-margin-remove uk-text-large text-primary upper" v-if="guild && guild.PrimaryRace">{{ guild.PrimaryRace }}</div>
          <div class="uk-text-center uk-margin-remove uk-text-large text-primary upper">{{ guild.Region }}</div>
        </div>
      </div>

      <!-- This is where we display the rich text -->
      <div v-html="guild.Description" class="uk-margin-large-top"></div>
    </div>
    <!-- Only show if guild leader or mod issues alert-->
    <div v-if="guild.Alerts.length > 0" class="guild-alerts goa-alert-container uk-padding">
      <h3 class="uk-light uk-text-center">GUILD ALERT!</h3>
      <hr />
      <div class="uk-margin-bottom goa-container uk-padding">
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
    <div class="right-side uk-width-1-1">
      <div class="goa-container upcoming-events uk-padding uk-light">
        <h3>Upcoming Events</h3>
        <div class="event-list uk-flex uk-width-1-1 grid">
          <div v-for="events in upcomingEvents" class="event-card uk-flex uk-flex-column uk-text-center uk-padding-small uk-width-1-1">
              <div>
                <h4 class="uk-text-bold text-goa-red">{{ events.Title }}</h4>
              </div>
              <div class="uk-flex uk-flex-column uk-flex-center">
                <!-- <p>{{ events.Content }}</p> -->
                <p class="uk-text-bold">Organizer: {{ events.Organizer }}</p>
                <div class="uk-child-width-1-2">
                  <span class="uk-text-bold uk-text-right uk-margin-small-right">{{ events.StartDate }}</span>
                  <span class="uk-text-bold uk-text-left"><span class="text-goa-red">@</span> {{ events.StartTime }}</span>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div class="discord uk-margin-top">
        <!-- <Discord class="goa-container" v-model="discordServers" /> -->
      </div>
    </div>
    <!-- <div class="guild-main-content uk-flex">
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
    </div> -->
  </div>
</template>
