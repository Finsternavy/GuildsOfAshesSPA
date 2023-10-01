<script setup>
import { ref, onBeforeMount } from "vue";
import { useUserStore } from "../stores/userStore";
import Thread from "../components/Thread.vue";

const baseUrl = process.env.APIURL + "Forum";
let store = null;
let showThreadCreationControls = ref(false);
let threadTitle = ref();
let threadMessage = ref();

const threads = ref([
  // {
  //   id: 12345,
  //   title: "Cleric Build",
  //   author: "CyFinXP",
  //   timeDate: "1/1/2021 12:00:00",
  //   message: "Anyone have a good cleric build?.",
  //   likes: 12,
  //   dislikes: 2,
  //   comments: [
  //     {
  //       id: 12345 - 1, // comment Id's should be linked to their parent thread Id.
  //       threadId: 12345,
  //       author: "CyFinXP",
  //       timeDate: "1/1/2021 12:00:00",
  //       message: "I've been looking for a good one too :(.",
  //       likes: 12,
  //       dislikes: 2,
  //     },
  //   ],
  // },
]);

onBeforeMount(() => {
  console.log("before mount - threads");
  store = useUserStore();
  // This is working!  Need to add create forum button.
  // Before that, need to add create and join guild so I can have a guildID to test forum.
  getThreads();
});

const getThreads = async () => {
  const user = store.getUser;
  console.log("Attempting to get threads for guildID: ", user.GuildID);
  const response = await fetch(baseUrl + "/getAllThreads", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
    },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    let data = await response.json();
    console.log("Get all threads response data: ", data);
    threads.value = data.Data;
  } else {
    console.log("Error fetching thread data: ", response.statusText);
  }
};

const postThread = async () => {
  const user = store.getUser;
  const date = new Date().toISOString();
  // const time = new Date().toTimeString();
  let payload = {
    AuthorID: user.UserID,
    GuildID: user.GuildID,
    AuthorUsername: user.Username,
    ThreadDate: date,
    ThreadTitle: threadTitle.value,
    ThreadMessage: threadMessage.value,
  };

  console.log("Posting thread: ", payload);
  const response = await fetch(baseUrl + "/postThread", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    let data = await response.json();
    console.log("Post new thread test data: ", data);
    // threads.value = data.Data;
  } else {
    console.log("Error posting thread: ", response.statusText);
  }
  threadTitle.value = "";
  threadMessage.value = "";
  showThreadCreationControls.value = false;
  getThreads();
};

const showThreadCreation = () => {
  // if (showThreadCreationControls)
  showThreadCreationControls.value = !showThreadCreationControls.value;
};

const getThreadFromChild = (event) => {
  console.log("Fetching threads at childs request.");
  getThreads();
};
</script>

<style scoped>
.thread-creation-controls {
  height: 0;
  opacity: 0;
  overflow: hidden;
  transition: height 0.3s ease-in-out, opacity 0.3s ease-in;
}

.open {
  height: 240px;
  opacity: 1;
}

</style>

<template>
  <div class="forums goa-container uk-padding uk-margin-xlarge-bottom">
    <h2 class="uk-light text-orange uk-text-center">GoA FORUMS</h2>
    <button class="goa-button uk-margin-bottom" @click="showThreadCreation()">
      Create Thread
    </button>
    <div :class="{ 'thread-creation-controls': {}, open: showThreadCreationControls }">
      <div class="title-input uk-flex uk-flex-column uk-margin-bottom">
        <label class="uk-margin-small-left" for="ThreadTitle">Title</label>
        <input id="ThreadTitle" class="goa-input" type="text" v-model="threadTitle" />
      </div>
      <div class="title-input uk-flex uk-flex-column">
        <label class="uk-margin-small-left" for="ThreadMessage">Message</label>
        <textarea
          id="ThreadMessage"
          class="goa-input"
          rows="4"
          cols="50"
          v-model="threadMessage"
        ></textarea>
      </div>
      <div class="create-thread-button uk-margin-top">
        <button @click="postThread" class="goa-button">Post Thread</button>
      </div>
    </div>
    <div class="uk-margin-top">
      <div
        v-for="thread in threads"
        :key="thread.ThreadID + thread.AuthorUsername"
        class="uk-margin-bottom uk-flex"
      >
        <Thread
          class="uk-flex-1"
          :data="thread"
          @parent-get-threads="getThreadFromChild"
        />
      </div>
    </div>
  </div>
</template>
