<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { useUserStore } from "../stores/userStore";
import router from "../router/routes.js";
import { useAPI } from '../stores/apiStore'

let api = useAPI();
let baseUrl = api.getAPI + "Guilds";
let store = useUserStore();
let guildID = ref();
let guild = ref({});
let description = ref();
let questions = ref([]);
let requirements = ref([]);
let success = ref(false);
let logo = ref();
let guildName = ref();

onBeforeMount(() => {
    // console.log("Guild application mounted");
    guildID.value = localStorage.getItem("guildID");
    getGuildData();
    fetchGuildApplication();
});

let fetchGuildApplication = async () => {
    let guildID = localStorage.getItem("guildID");
    let call = {
        GuildID: guildID,
    };
    let response = await fetch(baseUrl + "/getGuildApplication", {
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
        // console.log("Guild application data: ", data);
        description.value = data.Data.Description;
        requirements.value = data.Data.Requirements;
        questions.value = data.Data.Questions;
    } else {
        console.log("Error fetching guild application data");
    }
};

let updateAnswer = (question) => {
    // console.log("Question: ", question.question);
    // console.log("Question answer: ", question.answer);
}

let submitApplication = async () => {
    let user = store.getUser;
    // console.log("Submitting application..");
    let guildID = localStorage.getItem("guildID");
    // console.log("Attempting to create guild..");
    let call = {
        GuildID: guildID,
        User: user,
        Questions: questions.value
    };
    // console.log("call: ", call);
    let response = await fetch(baseUrl + "/submitGuildApplication", {
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
        // console.log("Response from submitApplication: ", data);
        success.value = true;
    } else {
        // console.log("Error during submit application: ", response.statusText);
    }
}

let getGuildData = async () => {
//   console.log("Fetching guild data..");
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
  } else {
    // console.log("Error fetching thread data: ", response.statusText);
  }
};

let goHome = () => {
    router.push({ name: "guild-home" });
}

</script>

<style scoped>
.guild-app-header {
    margin-left: auto;
    margin-right: auto;
}
.goa-textarea {
    height: 100px;
}

.dark-background {
    background-color: black;
}

.text-success {
    color: #00ff00;
}
</style>

<template>
    <div class="application-preview goa-container uk-margin-top uk-margin-bottom-large uk-padding">
            <h2 class="uk-text-center text-goa-red">{{ guild.Name }}</h2>
            <div
                :class="{
                'logo-container': guild.LogoBorder == false,
                'bordered-logo-container': guild.LogoBorder == true,
                }"
            >
                <img class="guild-logo-upload" :src="guild.Logo" alt="Uploaded Image" uk-img />
            </div>
            <!-- <h4 class="text-goa-red">Description:</h4> -->
            <div v-if="success" class="uk-margin-large-top">
                <h3 class="text-success uk-text-center">Application submitted successfully!</h3>
                <p class="uk-light uk-text-center">Thank you for applying to <span class="text-goa-red">{{ guild.Name }}</span>!</p>
                <p class="uk-light uk-text-center">You will receive notification when your application has been reviewed.</p>
                <div class="uk-flex uk-flex-center">
                    <button @click="goHome" class="goa-button">Home</button>
                </div>
            </div>
            <div v-if="!success" class="application-contents">
                <div v-html="description" class="uk-margin-large-top">
                </div>
                <ul class="uk-list">
                    <p v-if="requirements && requirements.length > 0" class="text-goa-red uk-text-lead uk-text-bold">Requirements:</p>
                    <li v-for="requirement in requirements" class="">
                        <input type="checkbox" class="goa-input uk-margin-right">
                        <span class="requirement">{{ requirement }}</span>
                    </li>
                </ul>
                <h3 class="text-goa-red uk-text-center">Please answer all questions.</h3>
                <div v-for="question in questions" class="app-question uk-margin-bottom">
                    <p class="text-goa-red">{{question.question}}</p>
                    <textarea v-if="question.answerType == 'typed'" 
                        class="goa-input uk-width-1-1" 
                        :name="'Question' +question.id" 
                        :id="'Question' +question.id" 
                        cols="30" rows="2"
                        v-model="question.answer"
                        @change="updateAnswer(question)"></textarea>
                    <select v-else class="goa-input uk-width-medium" :id="questions.id" @change="updateAnswer(question)" v-model="question.answer">
                        <option class="dark-background" value=""></option>
                        <option class="dark-background" v-for="option in question.options" :value="option">
                            <span>{{ option }}</span>
                        </option>
                    </select>
                </div>
                <div>
                    <button @click="submitApplication" class="goa-button">Submit Application</button>
                </div>
            </div>
        </div>
</template>