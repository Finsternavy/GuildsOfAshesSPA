<script setup>
import { ref, onBeforeMount } from "vue";
import Comment from "../components/Comment.vue";
import uikit from "uikit";
import { useUserStore } from "../stores/userStore";

const baseUrl = process.env.APIURL + "Forum";
const store = useUserStore();
let user = ref();
const showThread = ref(false);
const showComments = ref(false);
let commentCount = ref();
let commentMessage = ref("");
let showCreateComment = ref(false);
let showEditcontrols = ref(false);
let threadEditMessage = ref();
let editTitle = ref();

const props = defineProps({
  modelValue: {},
  data: {},
  function: {
    type: Function,
  },
});

const emit = defineEmits(["update:modelValue"], ["parent-get-threads"]);

onBeforeMount(() => {
  commentCount.value = props.data.Comments.length;
  user.value = store.user;
  threadEditMessage.value = props.data.ThreadMessage;
  editTitle.value = props.data.ThreadTitle;
});
const comments = ref();

const toggleChildren = () => {
  // console.log(document.querySelector(`.comments-container${props.data.id}`));
  console.log("Toggling children: ", props.data.ThreadID);
  showComments.value = !showComments.value;
  console.log("showComments: ", showComments.value);
};

const toggleThread = () => {
  console.log("Toggling thread: ", props.data.ThreadID);
  showThread.value = !showThread.value;
  console.log("showThread: ", showThread.value);
  console.log("Checking comments: ", showComments.value);
  if (showComments.value == true) {
    toggleChildren();
  }
};

const showCreateCommentsControls = () => {
  showCreateComment.value = !showCreateComment.value;
  console.log("Toggled show to: ", showCreateComment.value);
};

const getShowCreateCommentsValue = () => {
  return showCreateComment.value;
};


const toggleEditcontrols = () => {
  showEditcontrols.value = !showEditcontrols.value;
};

const postComment = async () => {
  const user = store.getUser;
  const threadID = props.data.ThreadID;
  const date = new Date().toISOString();
  const time = new Date().getMilliseconds();
  // const time = new Date().toTimeString();
  let payload = {
    AuthorID: user.UserID,
    ThreadID: threadID,
    CommentID: user.UserID + time,
    AuthorUsername: user.Username,
    CommentDate: date,
    CommentMessage: commentMessage.value,
  };

  console.log("Posting comment: ", payload);
  const response = await fetch(baseUrl + "/postComment", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
    },
    body: JSON.stringify(payload),
  });

  commentMessage.value = "";
  showCreateComment.value = false;
  emit("parent-get-threads");
};

const deleteThread = async () => {
  const user = store.getUser;
  const threadID = props.data.ThreadID;
  const date = new Date().toISOString();
  // const time = new Date().toTimeString();
  let payload = {
    AuthorID: user.UserID,
    ThreadID: threadID,
  };

  console.log("Deleting thread: ", payload);
  const response = await fetch(baseUrl + "/deleteThread", {
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
    console.log("Response from delete thread: ", data);
    parentFunction();
    // threads.value = data.Data;
  } else {
    console.log("Error deleting thread: ", response.statusText);
  }
};

const editThread = async () => {
  const user = store.getUser;
  const threadID = props.data.ThreadID;
  const date = new Date().toISOString();
  // const time = new Date().toTimeString();
  let payload = {
    AuthorID: user.UserID,
    GuildID: user.GuildID,
    ThreadID: threadID,
    AuthorUsername: user.Username,
    ThreadDate: date,
    ThreadTitle: editTitle.value,
    ThreadMessage: '(Edited)' + threadEditMessage.value,
  };

  console.log("Editing thread: ", payload);
  const response = await fetch(baseUrl + "/editThread", {
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
    console.log("Response from edit thread: ", data);
    parentFunction();
    // threads.value = data.Data;
  } else {
    console.log("Error editing thread: ", response.statusText);
  }
  toggleEditcontrols();
};

const parentFunction = () => {
  console.log("Calling parent function");
  emit("parent-get-threads");
  // () => props.function();
};

const upVote = async () => {
  const user = store.getUser;
  const threadID = props.data.ThreadID;
  const date = new Date().toISOString();
  // const time = new Date().toTimeString();
  let payload = {
    ThreadID: threadID,
  };

  console.log("Up voting: ", payload);
  const response = await fetch(baseUrl + "/upVoteThread", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
    },
    body: JSON.stringify(payload),
  });

  if (response) {
    console.log("Response receieved.");
    emit("parent-get-threads");
  }
};

const downVote = async () => {
  const user = store.getUser;
  const threadID = props.data.ThreadID;
  const date = new Date().toISOString();
  // const time = new Date().toTimeString();
  let payload = {
    ThreadID: threadID,
  };

  console.log("Up voting: ", payload);
  const response = await fetch(baseUrl + "/downVoteThread", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
    },
    body: JSON.stringify(payload),
  });

  if (response) {
    console.log("Response receieved.");
    emit("parent-get-threads");
  }
};
</script>
<style scoped>
.thread-body-container {
}

.thread-body {
  /* background-color: rgba(0, 0, 0, 0.5); */
}

.thread-footer {
  background-color: rgba(0, 0, 0, 0.8);
}

.reply {
  transform: rotate(180deg);
}

.divider {
  border: 1px solid rgba(0, 0, 0, 0.3);
}
.thread-toggle {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 30px 30px 0 0;
}

.thread-toggle:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.comment-creation-controls {
  height: 0;
  opacity: 0;
  padding-top: 0px;
  /* overflow: hidden; */
  transition: height 0.3s ease-in-out, opacity 0.3s ease-in, padding-top 0.3s ease-in;
}

.open {
  height: 160px;
  opacity: 1;
  padding-top: 20px;
}

.open-comment {
  height: 160px;
  opacity: 1;
  padding-top: 20px;
}

.goa-delete-button {
  height: fit-content;
  padding-block: 0;
  background-color: black;
  color: orange;
}

.goa-delete-button:hover {
  background-color: red;
  color: white;
}

.goa-edit-button {
  height: fit-content;
  padding-block: 0;
  background-color: black;
  color: orange;
}

.goa-edit-button:hover {
  background-color: orange;
  color: white;
}

.uk-panel-scrollable {
  height: 800px;
  outline: none;
  border: none;
}

.thread-edit-controls {
  height: 0;
  opacity: 0;
  padding-top: 0;
  overflow: hidden;
  transition: height 0.3s ease-in-out, opacity 0.3s ease-in, padding-top 0.3s ease-in;
}
.open {
  height: 240px;
  padding-top: 20px;
  opacity: 1;
}
</style>

<template>
  <div class="thread">
    <div class="thread-header">
      <div class="uk-width-stretch uk-padding-small" @click="toggleThread()">
        <h4 class="uk-light uk-margin-remove uk-text-left text-goa-red">
          <span>{{ data.ThreadTitle }} - </span>
          <span class="uk-text-muted uk-text-small"
            >Author: {{ data.AuthorUsername }}</span
          >
          <span class="interactions uk-float-right uk-text-primary"
            >Interactions:
            <span class="text-goa-red">{{
              data.Comments.length + data.UpVotes + data.DownVotes
            }}</span></span
          >
        </h4>
      </div>
    </div>
    <div
      :class="{
        'thread-body-container': props,
        show: showThread,
      }"
    >
      <div class="map-container map-top-left">
        <div class="thread-body uk-padding text-black">
          <span class="text-black uk-text-bold uk-margin-small-right">
            {{ data.AuthorUsername }}
          </span>
          <span class="text-black"> {{ data.ThreadDate }}</span>
          <hr class="divider" />
          <div
            class="uk-padding-small uk-margin-top uk-padding-remove-bottom text-black uk-text-bold"
          >
            {{ data.ThreadMessage }}
          </div>
        </div>
        <div class="thread-footer uk-flex uk-flex-middle uk-flex-between uk-padding-small">
          <div class="button-container uk-flex">
            <div class="likes uk-text-center uk-margin-right">
              <button @click="upVote" class="goa-button uk-button-small uk-margin-small-right">
                <span uk-icon="icon: arrow-up"></span>
              </button>
              <span>{{ data.UpVotes }}</span>
            </div>
            <div class="dislikes uk-text-center uk-margin-right">
              <button @click="downVote" class="goa-button uk-button-small uk-margin-small-right">
                <span uk-icon="icon: arrow-down"></span>
              </button>
              <span>{{ data.DownVotes }}</span>
            </div>
            <div class="dislikes uk-text-center uk-margin-right">
              <button  @click="toggleChildren" class="goa-button uk-button-small uk-margin-small-right">
                <span uk-icon="icon: comment"></span>
              </button>
              <span>{{ data.Comments.length }}</span>
            </div>
            <div v-if="data.AuthorID == user.UserID" class="thread-controls uk-flex uk-margin-small-left">
              <button @click="deleteThread" class="goa-button goa-delete-button uk-button-small uk-margin-small-right">
                Delete
              </button>
              <!-- This is not implemented yet -->
              <button @click="toggleEditcontrols" class="goa-button goa-edit-button uk-button-small uk-margin-small-right"> 
                Edit
              </button>
            </div>
          </div>
          <div class="comment uk-text-center">
            <button class="goa-button" @click="showCreateCommentsControls()">
              Reply
            </button>
          </div>
        </div>
      </div>
      <div :class="{ 'thread-edit-controls': {}, open: showEditcontrols}">
        <div class="title-input uk-flex uk-flex-column uk-margin-bottom">
          <label class="uk-margin-small-left" for="ThreadTitle">Title</label>
          <input id="ThreadTitle" class="goa-input" type="text" v-model="editTitle" />
        </div>
        <div class="title-input uk-flex uk-flex-column">
          <label class="uk-margin-small-left" for="ThreadEditMessage">Message</label>
          <textarea
            id="ThreadEditMessage"
            class="goa-input"
            rows="4"
            cols="50"
            v-model="threadEditMessage"
          ></textarea>
        </div>
        <div class="create-thread-button uk-margin-top">
          <button @click="editThread" class="goa-button" :disabled="!showEditcontrols">Update Thread</button>
        </div>
      </div>
      <!-- This could be a component. I use it in 5 different places.. -->
      <div
        :class="{
          'comment-creation-controls': {},
          'open-comment uk-padding-top': showCreateComment,
        }"
      >
        <div class="title-input uk-flex uk-flex-column">
          <label class="uk-margin-small-left" for="CommentMessage">Message</label>
          <textarea
            id="CommentMessage"
            class="goa-input"
            rows="4"
            cols="50"
            v-model="commentMessage"
          ></textarea>
        </div>
        <div class="create-thread-button uk-margin-top">
          <button @click="postComment" class="goa-button" :disabled="!showCreateComment">Post Reply</button>
        </div>
      </div>
    </div>
    <div
      :class="{
        'comments-container uk-flex uk-flex-top uk-height-auto uk-panel': props,
        showComment: showComments,
      }"
      :data-size="commentCount"
    >
      <span
        v-if="data.Comments.length > 0"
        class="reply text-goa-red uk-margin-left uk-margin-right uk-text-center"
        uk-icon="icon: reply; ratio: 2;"
      ></span>
      <div class="uk-width-stretch">
        <div v-for="comment in props.data.Comments">
          <Comment :data="comment" @comment-get-threads="parentFunction" />
        </div>
      </div>
    </div>
  </div>
</template>
