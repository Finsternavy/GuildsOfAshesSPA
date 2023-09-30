<script setup>
import { ref, onBeforeMount, computed, watch } from "vue";
import { useUserStore } from "../stores/userStore";

const baseUrl = process.env.APIURL + "Guilds";
let store = useUserStore();
const guildID = ref();
const data = ref([
])

let questionText = ref("");
let questionType = ref("");
let option = ref("");
let options = ref([]);
let finalized = ref(false);

// description
let heading = ref("");
let paragraph = ref("");
let section = ref({
    heading: '',
    paragraph: 'paragraph.value'
})
let description = ref([]);

// Requirements
let requirement = ref("");
let requirements = ref([]);

// the application
let application = ref({
    description: [],
    requirements: [],
    questions: []
})

onBeforeMount(() => {
    store = useUserStore();
    guildID.value = store.getGuildID;
})

watch(questionType, (newVal, oldVal) => {
    console.log("Question type changed");
    if (newVal == "bool") {
        console.log("Adding true false from watcher");
        options.value.push('Yes');
        options.value.push('No');
    }
})
const addToApp = () => {
    console.log("Adding to app");
    let question = {
        id: data.value.length + 1,
        question: questionText.value,
        answerType: questionType.value,
        options: options.value,
        answer: ''
    }
    console.log('Question: ', question);
    data.value.push(question);
    questionText.value = '';
    questionType.value = '';
    options.value = [];
    question = {};
    console.log(data.value);
}

const addRequirement = () => {
    console.log("Adding requirement");
    requirements.value.push(requirement.value);
    requirement.value = '';
}

const addSection = () => {
    console.log("Adding description", section.value);
    section.value.heading = heading.value;
    section.value.paragraph = paragraph.value;
    description.value.push(section.value);
    paragraph.value = '';
    heading.value = '';
    section.value = {};
}

const addOption = () => {
    console.log("Adding option");
    options.value.push(option.value);
    option.value = '';

}

const checkQuestionType = () => {
    if (questionType.value == "multi") {
        console.log("Adding true false from checkQuestionType");
        options.value.push(true);
        options.value.push(false);
        return true;
    }
    return false;
}

const finalizeApplication = async () => {
    console.log("Finalizing application");
    console.log(data.value);
    application.value.description = description.value;
    application.value.requirements = requirements.value;
    application.value.questions = data.value;
    console.log("Application: ", application.value);

    const user = store.getUser;
    console.log("Attempting to create guild..");
    const call = {
        GuildID: guildID.value,
        Description: description.value,
        Requirements: requirements.value,
        Questions: data.value
    };
    console.log("call: ", call);
    const response = await fetch(baseUrl + "/addGuildApplication", {
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
        console.log("Data from save guild application: ", data);
        finalized.value = true;
    } else {
        console.log("Error saving guild application: ", response.statusText);
    }
}
</script>

<style scoped>
.goa-textarea {
    height: 100px;
}

.dark-background {
    background-color: black;
}

.requirement {
    background-color: rgba(255, 165, 0, 0.5);
    color: black;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 10px;
    width: fit-content;
}
</style>

<template>
    <div class="guild-application-creator">
        <div v-if="finalized" class="goa-container uk-padding">
            <h1 class="uk-text-center text-orange">Application Finalized</h1>
        </div>
        <div v-if="!finalized" class="application-controls goa-container uk-padding">
            <h2 class="uk-light uk-text-center">Application Creation Controls</h2>
            <div class="control-button-container">
                <div class="uk-flex uk-flex-center">
                    <span class="uk-margin-right text-orange">Step 1: </span><button class="goa-button add-question uk-width-medium uk-margin-small-bottom" uk-toggle="target: #AddDescription; animation: uk-animation-fade">Add Guild Description</button>
                </div>
                <div class="uk-flex uk-flex-center">
                    <span class="uk-margin-right text-orange">Step 2: </span><button class="goa-button add-question uk-width-medium uk-margin-small-bottom" uk-toggle="target: #AddParagraph; animation: uk-animation-fade">Add Requirements</button>
                </div>
                <div class="uk-flex uk-flex-center">
                    <span class="uk-margin-right text-orange">Step 3: </span><button class="goa-button add-question uk-width-medium uk-margin-small-bottom" uk-toggle="target: #AddQuestion; animation: uk-animation-fade">Add Question</button>
                </div>
                <div class="uk-flex uk-flex-center">
                    <span class="uk-margin-right text-orange">Step 4: </span><button @click="finalizeApplication" class="goa-button add-question uk-width-medium uk-margin-small-bottom" >Finalize Application</button>
                </div>
            </div>
            <div class="uk-margin-small-bottom">
                <div id="AddDescription" class="uk-padding uk-flex uk-flex-column" hidden>
                    <h2 class="text-orange uk-text-center">Description Creator</h2>
                    <p class="uk-text-center uk-text-danger">Note: This form does not maintain format. Please add each section individually.</p>
                    <div class="uk-margin-bottom uk-flex uk-flex-column">
                        <label class="text-orange" for="">Heading: <span class="uk-text-muted">( Leave blank if adding a paragraph with no title. )</span></label>
                        <input class="goa-input" type="text" v-model="heading">
                    </div>
                    <div class="uk-margin-bottom uk-flex uk-flex-column">
                        <label class="text-orange" for="">Paragraph: <span class="uk-text-muted">( Leave blank if only adding a heading )</span></label>
                        <textarea class="goa-textarea goa-input uk-width-1-1" name="Description-creator" id="Description-creator" v-model="paragraph"></textarea>
                    </div>
                    <div class="uk-margin-bottom">
                        <button @click="addSection" class="goa-button">Add Requirement</button>
                    </div>
                </div>
            </div>
            <div class="uk-margin-small-bottom">
                
                <div v-if="!finalized" id="AddParagraph" class="uk-padding uk-flex uk-flex-column" hidden>
                    <h2 class="text-orange uk-text-center">Requirements Creator</h2>
                    <div class="uk-margin-bottom uk-flex uk-flex-column">
                        <label class="text-orange" for="">Requirements</label>
                        <textarea class="goa-textarea goa-input uk-width-1-1" name="Question-creator" id="Question-creator" v-model="requirement"></textarea>
                    </div>
                    <div>
                        <ul>
                            <li v-for="option in options" class="uk-margin-small-bottom">{{ option }}</li>
                        </ul>
                    </div>
                    <div class="uk-margin-bottom">
                        <button @click="addRequirement" class="goa-button">Add Requirement</button>
                    </div>
                </div>
            </div>
            <div class="uk-margin-small-bottom">
                
                <div v-if="!finalized" id="AddQuestion" class="uk-padding uk-flex uk-flex-column" hidden>
                    <h2 class="text-orange uk-text-center">Question Creator</h2>
                    <div class="uk-margin-bottom uk-flex uk-flex-column">
                        <label class="text-orange" for="">Question</label>
                        <textarea class="goa-textarea goa-input uk-width-1-1" name="Question-creator" id="Question-creator" v-model="questionText"></textarea>
                    </div>
                    <div class="uk-margin-bottom uk-flex uk-flex-column">
                        <label class="text-orange" for="">Answer Type</label>
                        <select class="goa-input" v-model="questionType">
                            <option class="dark-background" value=""></option>
                            <option class="dark-background" value="typed">Typed Response</option>
                            <option class="dark-background" value="multi">Multiple Choice</option>
                            <option class="dark-background" value="bool">True / False</option>
                        </select>   
                    </div>
                    <div v-if="questionType == 'multi'" class="uk-flex uk-flex-column uk-width-medium">
                        <label class="text-orange" for="">Option</label>
                        <input class="goa-input uk-margin-small-bottom" type="text" v-model="option">
                        <button @click="addOption" class="goa-button uk-margin-small-bottom">Add Option</button>
                    </div>
                    <div>
                        <ul>
                            <li v-for="option in options" class="uk-margin-small-bottom">{{ option }}</li>
                        </ul>
                    </div>
                    <div class="uk-margin-bottom">
                        <button @click="addToApp" class="goa-button">Add to Application</button>
                    </div>
                    
                </div>
            </div>
            <!-- <div>
                <button @click="finalizeApplication" class="goa-button">Finalize Application</button>
            </div> -->
        </div>
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
                <p v-if="requirements.length > 0" class="text-orange uk-text-lead uk-text-bold">Requirements:</p>
                <li v-for="requirement in requirements" class="">
                    <input type="checkbox" class="goa-input uk-margin-right">
                    <span class="requirement">{{ requirement }}</span>
                </li>
            </ul>
            <h3 class="text-orange uk-text-center">Please answer all questions.</h3>
            <div v-for="question in data" class="app-question uk-margin-bottom">
                <p class="text-orange">{{question.question}}</p>
                <textarea v-if="question.answerType == 'typed'" class="goa-textarea goa-input uk-width-1-1" :name="'Question' +question.id" :id="'Question' +question.id" cols="30" rows="10"></textarea>
                <select v-else class="goa-input uk-width-medium" >
                    <option class="dark-background" value=""></option>
                    <option class="dark-background" v-for="option in question.answers" :value="question.id + option">
                        <span>{{ option }}</span>
                    </option>
                </select>
            </div>
            <!-- <div>
                <button @click="finalizeApplication" class="goa-button">Finalize Application</button>
            </div> -->
        </div>
    </div>
</template>