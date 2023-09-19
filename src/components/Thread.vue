<script setup>
import { ref, onBeforeMount } from "vue";
import Comment from "../components/Comment.vue";
import uikit from "uikit";
import { useUserStore } from "../stores/userStore";

const baseUrl = process.env.APIURL + "Forum";
const store = useUserStore();
const showThread = ref(false);
const showComments = ref(false);
let commentCount = ref();
let commentMessage = ref("");
let showCreateComment = ref(false);

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
};

const postComment = async () => {
  const user = store.getUser;
  const threadID = props.data.ThreadID;
  const date = new Date().toISOString();
  // const time = new Date().toTimeString();
  let payload = {
    AuthorID: user.UserID,
    ThreadID: threadID,
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

const parentFunction = () => {
  () => props.function();
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
  /* overflow: hidden; */
  transition: height 0.3s ease-in-out, opacity 0.3s ease-in;
}

.open {
  height: 160px;
  opacity: 1;
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
</style>

<template>
  <div class="thread">
    <div class="thread-header">
      <div class="uk-width-stretch uk-padding-small" @click="toggleThread()">
        <h4 class="uk-light uk-margin-remove uk-text-left text-orange">
          <span>{{ data.ThreadTitle }} - </span>
          <span class="uk-text-muted uk-text-small"
            >Author: {{ data.AuthorUsername }}</span
          >
          <span class="interactions uk-float-right uk-text-primary"
            >Interactions:
            <span class="text-orange">{{
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
        <div
          class="thread-footer uk-flex uk-flex-middle uk-flex-between uk-padding-small"
        >
          <div class="button-container uk-flex">
            <div class="likes uk-text-center uk-margin-right">
              <button
                @click="upVote"
                class="goa-button uk-button-small uk-margin-small-right"
              >
                <span uk-icon="icon: arrow-up"></span>
              </button>
              <span>{{ data.UpVotes }}</span>
            </div>
            <div class="dislikes uk-text-center uk-margin-right">
              <button
                @click="downVote"
                class="goa-button uk-button-small uk-margin-small-right"
              >
                <span uk-icon="icon: arrow-down"></span>
              </button>
              <span>{{ data.DownVotes }}</span>
            </div>
            <div class="dislikes uk-text-center uk-margin-right">
              <button
                @click="toggleChildren"
                class="goa-button uk-button-small uk-margin-small-right"
              >
                <span uk-icon="icon: comment"></span>
              </button>
              <span>{{ data.Comments.length }}</span>
            </div>
          </div>
          <div class="comment uk-text-center">
            <button class="goa-button" @click="showCreateCommentsControls()">
              Reply
            </button>
          </div>
        </div>
      </div>
      <div
        :class="{
          'comment-creation-controls uk-margin-top': {},
          open: showCreateComment,
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
          <button @click="postComment" class="goa-button">Post Reply</button>
        </div>
      </div>
    </div>
    <div
      :class="{
        'comments-container uk-flex uk-flex-top uk-height-auto uk-panel': props,
        show: showComments,
      }"
      :data-size="commentCount"
    >
      <span
        v-if="data.Comments.length > 0"
        class="reply text-orange uk-margin-left uk-margin-right uk-text-center"
        uk-icon="icon: reply; ratio: 2;"
      ></span>
      <div class="uk-width-stretch">
        <div v-for="comment in props.data.Comments">
          <Comment class="uk-margin-bottom" :data="comment" />
        </div>
      </div>
    </div>
  </div>
</template>
