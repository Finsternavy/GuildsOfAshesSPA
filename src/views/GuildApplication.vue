<script setup>

import { on } from "events";
import { ref, onBeforeMount, computed } from "vue";
import { useUserStore } from "../stores/userStore";

const baseUrl = process.env.APIURL + "Guilds";
const store = useUserStore();
let description = ref([]);
let questions = ref([]);
let requirements = ref([]);

onBeforeMount(() => {
    console.log("Guild application mounted");
    fetchGuildApplication();
});

const fetchGuildApplication = async () => {
    const guildID = localStorage.getItem("guildID");
    const call = {
        GuildID: guildID,
    };
    const response = await fetch(baseUrl + "/getGuildApplication", {
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
        console.log("Guild application data: ", data);
        description.value = data.Data.Description;
        requirements.value = data.Data.Requirements;
        questions.value = data.Data.Questions;
    } else {
        console.log("Error fetching guild application data");
    }
};

const updateAnswer = (question) => {
    console.log("Question: ", question.question);
    console.log("Question answer: ", question.answer);
}

const submitApplication = async () => {
    const user = store.getUser;
    console.log("Submitting application..");
    const guildID = localStorage.getItem("guildID");
    console.log("Attempting to create guild..");
    const call = {
        GuildID: guildID,
        User: user,
        Questions: questions.value
    };
    console.log("call: ", call);
    const response = await fetch(baseUrl + "/submitGuildApplication", {
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
        console.log("Response from submitApplication: ", data);
    } else {
        console.log("Error during submit application: ", response.statusText);
    }
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
</style>

<template>
    <div class="application-preview goa-container uk-margin-top uk-margin-bottom-large uk-padding">
            <h1 class="uk-text-center text-orange">( Preview )</h1>
            <h2 class="uk-text-center text-orange">Guild Name</h2>
            <h3 class="guild-logo uk-text-center text-orange">logo</h3>
            <!-- <h4 class="text-orange">Description:</h4> -->
            <div v-for="section in description">
                <p class="text-orange uk-text-lead uk-text-bold">{{ section.heading }}</p>
                <p>{{ section.paragraph }}</p>
            </div>
            <ul class="uk-list">
                <p v-if="requirements && requirements.length > 0" class="text-orange uk-text-lead uk-text-bold">Requirements:</p>
                <li v-for="requirement in requirements" class="">
                    <input type="checkbox" class="goa-input uk-margin-right">
                    <span class="requirement">{{ requirement }}</span>
                </li>
            </ul>
            <h3 class="text-orange uk-text-center">Please answer all questions.</h3>
            <div v-for="question in questions" class="app-question uk-margin-bottom">
                <p class="text-orange">{{question.question}}</p>
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
</template>