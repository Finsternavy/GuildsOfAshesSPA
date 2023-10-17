<script setup>
import { ref, onBeforeMount } from "vue";
import router from "../router/routes";
import { useAPI } from '../stores/apiStore'
import { useUserStore } from '../stores/userStore'

const baseURL = useAPI().getAPI;

const feedbackText = ref();
const featureRequestText = ref();
let thankYouMessage = ref();
const showThankYou = ref(false);
const feedback = ref();
let devUser = ref(false);
let store;
let user;

onBeforeMount(() => {
    store = useUserStore();
    user = store.getUser;
    if (user.Username == 'CyFinXP') {
        console.log("devUser: ", devUser);
        devUser.value = true;
    }
    getFeedback();
});

const submitFeedback = async () => {
    
  let call = {
    MessageType: "Feedback",
    Message: feedbackText.value,
  };

  console.log("call: ", call);
  let response = await fetch(baseURL + "Users/submitFeedback", {
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
    thankYouMessage.value = "Thank you for submitting a bug report! We will look into the issue as soon as possible";
    showThankYou.value = true;
    getFeedback();
  } else {
    // console.log("Error fetching thread data: ", response.statusText);
  }

};

const submitFeatureRequest = async () => {

    let call = {
        MessageType: "FeatureRequest",
        Message: featureRequestText.value,
    };
    console.log("call: ", call);
    let response = await fetch(baseURL + "Users/submitFeedback", {
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
        thankYouMessage.value = "Thank you for your feature request!";
        showThankYou.value = true;
        getFeedback();
    } else {
        // console.log("Error fetching thread data: ", response.statusText);
    }    
};

const getFeedback = async () => {
    let response = await fetch(baseURL + "Users/getFeedback", {
        method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
        },
    });

    if (response.ok) {
        let data = await response.json();
        let responseData = data.Data;
        feedback.value = sortFeedback(responseData);
        // showThankYou.value = true;
    } else {
        // console.log("Error fetching thread data: ", response.statusText);
    }  
}

const goHome = () => {
    router.push("/");
};

const sortFeedback = (data) => {
    let bugs = data.filter((item) => item.MessageType == "Feedback");
    bugs.sort((a, b) => (a.Status < b.Status) ? 1 : -1);
    let featureRequests = data.filter((item) => item.MessageType == "FeatureRequest");
    featureRequests.sort((a, b) => (a.Status < b.Status) ? 1 : -1);
    let allFeedback = {
        bugs: bugs,
        featureRequests: featureRequests
    }

    console.log("allFeedback: ", allFeedback)
    return allFeedback;
}

const updateFeedback = async (item) => {

    if (item.Progress == "Completed" || item.Progress == "Rejected") {
        item.Status = "Closed";
    } 
    let call = {
        FeedbackID: item.FeedbackID,
        MessageType: item.MessageType,
        Message: item.Message,
        Progress: item.Progress,
        Status: item.Status
    };
    console.log("call: ", call);
    let response = await fetch(baseURL + "Users/updateFeedback", {
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
        getFeedback();
    } else {
        // console.log("Error fetching thread data: ", response.statusText);
    }  
}

const formatType = (type) => {
    if (type == "Feedback") {
        return "Bug Reports";
    } else {
        return "Feature Requests";
    }
}
</script>
<style scoped>
.background-black {
    background-color: black;
}
.closed {
    background-color: rgba(144, 238, 144, 0.3);
}

.report {
    border: 1px solid var(--accent-color);
    border-radius: 20px;
}
</style>

<template>
    <div class="feedback-page goa-container uk-padding uk-margin-bottom">
        <h1 class="text-goa-red">Feedback</h1>
        <p>Have a suggestion or found a bug?  Let us know!</p>
        <div class="uk-flex uk-flex-between uk-child-width-1-1 uk-child-width-1-2@s" uk-grid>
            <div class="uk-margin uk-margin-top">
                <label class="text-goa-red" for="feedback">Report a Bug</label>
                <textarea class="goa-input goa-textarea uk-width-1-1 uk-margin-small-bottom" id="feedback" rows="5" placeholder="Enter your feedback here..." v-model="feedbackText"></textarea>
                <button @click="submitFeedback" class="goa-button">Submit Report</button>
            </div>
            <div class="uk-margin">
                <label class="text-goa-red" for="feedback">Feature Request</label>
                <textarea class="goa-input goa-textarea uk-width-1-1 uk-margin-small-bottom" id="feedback" rows="5" placeholder="Enter your feature request here..." v-model="featureRequestText"></textarea>
                <button @click="submitFeatureRequest" class="goa-button">Submit Feature</button>
            </div>
        </div>
    </div>

    <div class="goa-container uk-padding">
        <div v-if="showThankYou" class="thank-you-container goa-container uk-padding uk-margin-bottom">
            <h3 class="text-goa-red">Thank you!</h3>
            <p>{{ thankYouMessage }}</p>
            <button @click="goHome" class="goa-button">Home</button>
        </div>
        <div v-for="item, index in feedback" class="">
            <div v-if="item.MessageType == 'Feedback'">
                <div v-if="item.MessageType == 'Feedback'" class="uk-flex">
                    <p>{{ item.Message }}</p>
                </div>
            </div>
            <div v-if="item.MessageType == 'FeatureRequest'">
                <h3 v-if="index == 0" class="text-goa-red">Feature Requests:</h3>
                <div v-if="item.MessageType == 'FeatureRequest'">
                    <p>{{ item.Message }}</p>
                </div>
            </div>
        </div>

        <div>
            <table class="uk-table uk-visible@s" v-for="data in feedback">
                <!-- <title class="text-primary">Bug Reports</title> -->
                <thead>
                    <tr class="">
                        <th v-if="data[0]" class="text-primary">
                            <span class="text-primary">{{ formatType(data[0].MessageType) }}</span>
                        </th>
                        <th class="text-goa-red">
                            <span class="text-primary">Progress</span></th>
                        <th class="text-goa-red">
                            <span class="text-primary">Status</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in data" :class="{closed : item.Status == 'Closed'}">
                        <td class="uk-width-1-2">{{ item.Message }}</td>
                        <td>
                            <select class="goa-input" name="" id="" v-model="item.Progress" :disabled="!devUser || item.Status == 'Closed'">
                                <option class="background-black text-goa-red" value="Pending">Pending</option>
                                <option class="background-black text-goa-red" value="Accepted">Accepted</option>
                                <option class="background-black text-goa-red" value="Backlogged">Backlogged</option>
                                <option class="background-black text-goa-red" value="In Progress">In Progress</option>
                                <option class="background-black text-goa-red" value="Rejected">Rejected</option>
                                <option class="background-black text-goa-red" value="Completed">Completed</option>
                            </select>
                        </td>
                        <td>
                            {{ item.Status }}
                        </td>
                        <td>
                            <button v-if="devUser && item.Status == 'Open'" @click="updateFeedback(item)" class="goa-button" :disabled="!devUser">
                                Update
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-for="data in feedback" class="mobile-feedback-table uk-hidden@s uk-margin-large-bottom">
                <div>
                    <div>
                        <div colspan="3" v-if="data[0]" class="text-primary uk-text-center uk-margin-bottom">
                            <h3 class="text-primary">{{ formatType(data[0].MessageType) }}</h3>
                        </div>
                    </div>
                </div>
                <div>
                    <div v-for="item in data" :class="{'report uk-padding-small uk-margin-bottom' : item, closed : item.Status == 'Closed'}">
                        <label class="text-primary" for="">Report:</label>
                        <div class="uk-margin-small-bottom">{{ item.Message }}</div>
                        <div class="uk-flex uk-flex-between">
                            <div class="uk-flex uk-flex-column">
                                <label class="text-primary uk-margin-small-bottom" for="">Progress:</label>
                                <select class="goa-input" name="" id="" v-model="item.Progress" :disabled="!devUser || item.Status == 'Closed'">
                                    <option class="background-black text-goa-red" value="Pending">Pending</option>
                                    <option class="background-black text-goa-red" value="Accepted">Accepted</option>
                                    <option class="background-black text-goa-red" value="Backlogged">Backlogged</option>
                                    <option class="background-black text-goa-red" value="In Progress">In Progress</option>
                                    <option class="background-black text-goa-red" value="Rejected">Rejected</option>
                                    <option class="background-black text-goa-red" value="Completed">Completed</option>
                                </select>
                            </div>
                            <div class="uk-flex uk-flex-column">
                                <label class="text-primary uk-margin-small-bottom" for="">Status:</label>
                                <span>{{ item.Status }}</span>
                            </div>
                        </div>
                        <div class="uk-margin-top">
                            <button v-if="devUser && item.Status == 'Open'" @click="updateFeedback(item)" class="goa-button uk-width-1-1" :disabled="!devUser">
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>