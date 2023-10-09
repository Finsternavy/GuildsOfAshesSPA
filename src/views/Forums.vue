<script setup>
import { ref, onBeforeMount, onMounted, onUnmounted } from "vue";
import { useUserStore } from "../stores/userStore";
import Thread from "../components/Thread.vue";
import { useAPI } from '../stores/apiStore'

let api = useAPI();
let baseUrl = api.getAPI + "Forum";
let store = null;
let showThreadCreationControls = ref(false);
let threadTitle = ref();
let threadMessage = ref();

let threads = ref([]);
let unreadThreadIDs = ref([]);
let unreadCommentIDs = ref([]);

let readThreadIDs = ref([]);
let readCommentIDs = ref([]);

let alreadyUpdatedIDs = ref([]);

let intervalID = null;

onBeforeMount(() => {
  // console.log("before mount - threads");
  store = useUserStore();
  // This is working!  Need to add create forum button.
  // Before that, need to add create and join guild so I can have a guildID to test forum.
  getThreads();
});

onMounted(() => {
  intervalID = setInterval(() => {
    updateReadTrackers();
  }, 5000);
});

onUnmounted(() => {
  // console.log("unmounted - threads");
  clearInterval(intervalID);
});

const updateReadTrackers = async () => {
  // console.log("Checking for read updates.")

  if (readThreadIDs.value.length > 0 || readCommentIDs.value.length > 0) {
    // console.log("Unpublished changes detected. Updating read trackers.");
    alreadyUpdatedIDs.value.push(...readThreadIDs.value);
    alreadyUpdatedIDs.value.push(...readCommentIDs.value);
    let user = store.getUser;
    let payload = {
      UserID: user.UserID,
      ReadThreadIDs: readThreadIDs.value,
      ReadCommentIDs: readCommentIDs.value
    }
    let response = await fetch(baseUrl + "/updateForumReadTracker", {
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
      // console.log("Update read trackers response data: ", data);
      readThreadIDs.value = [];
      readCommentIDs.value = [];

    } else {
      // console.log("Error updating read trackers: ", response.statusText);
    }
  } else {
    // console.log("No unpublished changes detected.");
  }
}

let getThreads = async () => {
  let user = store.getUser;
  // console.log("Attempting to get threads for guildID: ", user.GuildID);
  let response = await fetch(baseUrl + "/getAllThreads", {
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
    // console.log("Get all threads response data: ", data);
    if (data.Data) {
      threads.value = data.Data.threads;
      // unreadIDs.value = data.Data.unreadIDs;
      if (data.Data.unreadIDs[0].length > 0) {
        unreadThreadIDs.value = data.Data.unreadIDs[0];
      }
      if (data.Data.unreadIDs[1].length > 0) {
        unreadCommentIDs.value = data.Data.unreadIDs[1];
      }
      // unreadThreadIDs.value = data.Data.unreadIDs[0];
      // unreadCommentIDs.value = data.Data.unreadIDs[1];
      // console.log("Unread thread IDs: ", unreadThreadIDs.value);
      // console.log("Unread comment IDs: ", unreadCommentIDs.value);
    } else {
      // console.log("No Threads");
    }
  } else {
    // console.log("Error fetching thread data: ", response.statusText);
  }
};

let postThread = async () => {
  let user = store.getUser;
  let date = new Date().toISOString();
  // let time = new Date().toTimeString();
  let payload = {
    AuthorID: user.UserID,
    GuildID: user.GuildID,
    AuthorUsername: user.Username,
    ThreadDate: date,
    ThreadTitle: threadTitle.value,
    ThreadMessage: threadMessage.value,
  };

  // console.log("Posting thread: ", payload);
  let response = await fetch(baseUrl + "/postThread", {
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
    // console.log("Post new thread test data: ", data);
    // threads.value = data.Data;
  } else {
    // console.log("Error posting thread: ", response.statusText);
  }
  threadTitle.value = "";
  threadMessage.value = "";
  showThreadCreationControls.value = false;
  getThreads();
};

let showThreadCreation = () => {
  // if (showThreadCreationControls)
  showThreadCreationControls.value = !showThreadCreationControls.value;
};

let getThreadFromChild = (event) => {
  // console.log("Fetching threads at childs request.");
  getThreads();
};


const addThreadToRead = (threadID) => {
  if (unreadThreadIDs.value.includes(threadID)){
    // console.log("Adding thread to read: ", threadID)
    readThreadIDs.value.push(threadID);
    unreadThreadIDs.value = unreadThreadIDs.value.filter(id => id !== threadID);
  }
  // if (unreadIDs.value[0].includes(threadID)){
  //   let found = false;
  //   for (let id of readThreadIDs.value) {
  //     if (id === threadID) {
  //       found = true;
  //       break;
  //     }
  //   }
  //   if (!found) {
  //     console.log("Adding thread to read: ", threadID);
  //     if (alreadyUpdatedIDs.value.includes(threadID)) {
  //       console.log("Thread already updated.  Not adding to read.");
  //       return;
  //     }
  //     readThreadIDs.value.push(threadID);
  //   }
  //   console.log("Read thread IDs: ", readThreadIDs.value);
  // }
  // console.log("That thread is not unread")
}

const addCommentToRead = (commentID) => {
  // console.log("UnreadCommentIDs: ", unreadCommentIDs.value);
  // console.log("CommentID: ", commentID);
  if (unreadCommentIDs.value.includes(commentID)){
    // console.log("Adding comment to read: ", commentID)
    readCommentIDs.value.push(commentID);
    unreadCommentIDs.value = unreadCommentIDs.value.filter(id => id !== commentID);
  } else {
    // console.log("That comment is not unread");
  }
  // console.log("Adding comment to read: ", commentID);
  // if (unreadIDs.value[1].includes(commentID)) {
  //   let found = false;
  //   for (let id of readCommentIDs.value) {
  //     if (id === commentID) {
  //       console.log("Comment already read.")
  //       found = true;
  //       break;
  //     }
  //   }
  //   if (!found) {
  //     if (alreadyUpdatedIDs.value.includes(commentID)) {
  //       console.log("Comment already updated.  Not adding to read.");
  //       return;
  //     }
  //     console.log("Adding comment to read: ", commentID);
  //     readCommentIDs.value.push(commentID);
  //   }
  //   console.log("Read comment IDs: ", readCommentIDs.value);
  // }
  // else {
  //   console.log("That comment is not unread");
  // }
}
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
    <h2 class="uk-light text-goa-red uk-text-center">GoA FORUMS</h2>
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
          :unreadThreadIDs="unreadThreadIDs"
          :unreadCommentIDs="unreadCommentIDs"
          :addThreadToRead = "addThreadToRead"
          @comment-add-to-read = "addCommentToRead"
          @parent-get-threads="getThreadFromChild"
        />
      </div>
    </div>
  </div>
</template>
