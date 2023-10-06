<script setup>
import { ref, onBeforeMount, computed } from "vue";
import Discord from "../components/Discord.vue";
import router from "../router/routes";
import { useUserStore } from "../stores/userStore";
import { useGuildStore } from "../stores/guildStore";
import RichTextEditor from "../components/RichTextEditor.vue";
import Loading from "../components/Loading.vue";

let baseUrl = process.env.APIURL + "Guilds";
let discordServers = ref([
  {
    embedSrc: "https://discord.com/widget?id=340337686059548672&theme=dark",
  },
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
    console.log("Got guildID from local storage..");
    guildID.value = localStorage.getItem("guildID");
  } else {
    guildID.value = user.GuildID;
  }
  getGuildData();
  console.log("GuildID: ", guildID.value);
});

// let memberCount = computed(() => {
//   let count = 0;
//   if (guild.MemberList) {
//     count = guild.value.MemberList.length;
//   }
//   console.log("Member count: ", count);
//   return count;
// });

let getGuildData = async () => {
  console.log("Fetching guild data..");
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
    console.log("Guild data: ", data);
    guild.value = data.Data;
    console.log("Guild: ", guild.value);
    localStorage.setItem("guildLogo", guild.value.Logo);
    localStorage.setItem("guildName", guild.value.Name);
    inbox.value = guild.value.Applications;
    guildLeaderName.value = guild.value.Leader.Username;
    console.log("Inbox: ", inbox.value);

    // test guildStore 

    guildStore.setGuild(guild.value);
    console.log("GuildStore: ", guildStore.getGuild);
    console.log("Memberlist: ", guildStore.getGuild.MemberList);



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
    console.log("Error fetching thread data: ", response.statusText);
  }
};

let denyApplication = async (application) => {
    console.log("Attempting to deny application for: ", application.User.Username);
    let call = {
        GuildID: application.GuildID,
        User: application.User
    };
    console.log("call: ", call);
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
        console.log("Response from denyApplication: ", data);
        await getGuildData();
        inbox.value = guild.value.Applications;
        // success.value = true;
    } else {
        console.log("Error during deny application: ", response.statusText);
    }
}

let approveApplication = async (application) => {
    console.log("Attempting to deny application for: ", application.User.Username);
    application.User.Role = "Member";
    let call = {
        GuildID: application.GuildID,
        GuildName: guild.value.Name,
        User: application.User
    };
    console.log("call: ", call);
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
        console.log("Response from denyApplication: ", data);
        await getGuildData();
        inbox.value = guild.value.Applications;
        getGuildData();
    } else {
        console.log("Error during deny application: ", response.statusText);
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
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Pirata+One&display=swap');
/* .goa-container {
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  border-radius: 30px;
  transition: background-color 0.3s ease-in-out;
} */

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
  background-color: red;
  color: white;
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
    <div id="Inbox" class="goa-container uk-padding uk-margin-bottom" hidden>
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
            <button class="goa-button">Send {{ application.User.Username }} a message</button>
          </div>
          <div class="Approve-container">
            <button class="goa-button">Approve Trial Period</button>
          </div>
          <div class="Approve-container">
            <button @click="approveApplication(application)" class="goa-button goa-success-button">Grant Full Membership</button>
          </div>
          <div class="Approve-container">
            <button @click="denyApplication(application)" class="goa-button goa-deny-button uk-width-small">Deny</button>
          </div>
        </div>
      </div>
  </div>

    <!-- Guild Info Section -->

    <div class="goa-container uk-padding uk-margin-bottom">
      <h1 class="uk-light uk-text-center uk-margin-remove">{{ guild.Name }}</h1>
      <div v-if=" user && !user.GuildID">
        <button
          v-if="user"
          @click="apply" class="goa-button uk-margin-left uk-margin-top uk-light uk-position-top-left">
          Apply
        </button>
      </div>
      <button
        v-if="user && user.Role == 'Guild Leader'"
        @click="createApplication" class="goa-button uk-margin-left uk-margin-top uk-light uk-position-top-left">
        Create Application
      </button>
      <p
        v-if="guild.MemberList"
        class="uk-text-small uk-text-warning uk-text-center uk-margin-remove-top"
      >
        ( Members: {{ guild.MemberList.length }} )
      </p>
      <div class="guild-type-container uk-flex uk-width-1-1 uk-margin-large-bottom uk-text-uppercase">
        <div class="guild-type-info-container uk-width-expand">
          <div class="guild-type-info-label uk-text-center" for="">Type</div>
          <div class="guild-type-info uk-text-center">{{ guild.Category }}</div>
        </div>
        <div class="guild-type-info-container uk-width-expand">
          <div class="guild-type-info-label uk-text-center" for="">Focus</div>
          <div class="guild-type-info uk-text-center">{{ guild.Focus }}</div>
        </div>
        <div v-if="guild.PrimaryRace" class="guild-type-info-container uk-width-expand">
          <div class="guild-type-info-label uk-text-center" for="">Race</div>
          <div class="guild-type-info uk-text-center">{{ guild.PrimaryRace }}</div>
        </div>
        <div class="guild-type-info-container uk-width-expand">
          <div class="guild-type-info-label uk-text-center" for="">Region</div>
          <div class="guild-type-info uk-text-center">{{ guild.Region }}</div>
        </div>
      </div>
      <div :class="{
          'logo-container': guild.LogoBorder == false,
          'bordered-logo-container': guild.LogoBorder == true,
        }"
      >
        <img class="guild-logo-upload" :src="guild.Logo" alt="Uploaded Image" uk-img />
      </div>
        
      <!-- This is where we display the rich text -->
      <div v-html="guild.Description" class="uk-margin-large-top"></div>
    </div>
    <!-- Only show if guild leader or mod issues alert-->
    <div v-if="guild.Alerts" class="guild-alerts goa-alert-container uk-padding">
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
          <!-- <Discord class="goa-container" v-model="discordServers" /> -->
        </div>
      </div>
    </div>
  </div>
</template>
