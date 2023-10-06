<script setup>
import { ref, onBeforeMount } from "vue";
import { useUserStore } from "../stores/userStore";

let props = defineProps({
  modelValue: {},
  data: {},
});

let emit = defineEmits(["comment-get-threads"]);

let store = useUserStore();
let user = ref();
let baseUrl = process.env.APIURL + "Forum";
let showReplyControl = ref(false);
let replyMessage = ref("");
let commentEditMessage = ref();
let showEditcontrols = ref(false);
let replyText = ref();

onBeforeMount(() => {
  console.log("CommentID: ", props.data.CommentID);
  user.value = store.getUser;
  commentEditMessage.value = props.data.CommentMessage;
});

let postComment = async () => {
  let user = store.getUser;
  let threadID = props.data.ThreadID;
  let date = new Date().toISOString();
  let time = new Date().getMilliseconds();
  // let time = new Date().toTimeString();
  let payload = {
    AuthorID: user.UserID,
    ThreadID: threadID,
    CommentID: user.UserID + time,
    AuthorUsername: user.Username,
    CommentDate: date,
    CommentMessage: replyMessage.value,
    QuoteText: replyText.value,
    QuoteAuthor: props.data.AuthorUsername,
  };

  console.log("Posting comment: ", payload);
  let response = await fetch(baseUrl + "/postComment", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
    },
    body: JSON.stringify(payload),
  });

  replyMessage.value = "";
  showReplyControl.value = false;
  emit("comment-get-threads");
};

let deleteComment = async () => {
  let user = store.getUser;
  let threadID = props.data.ThreadID;
  // let date = new Date().toISOString();
  // let time = new Date().toTimeString();
  let payload = {
    AuthorID: user.UserID,
    CommentID: props.data.CommentID,
    ThreadID: threadID,
  };

  console.log("Deleting comment: ", payload);
  let response = await fetch(baseUrl + "/deleteComment", {
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
    console.log("Response from delete comment: ", data);
    emit("comment-get-threads");
    // threads.value = data.Data;
  } else {
    console.log("Error deleting comment: ", response.statusText);
  }
};

let editComment = async () => {
  let user = store.getUser;
  let threadID = props.data.ThreadID;
  // let date = new Date().toISOString();
  // let time = new Date().toTimeString();
  let payload = {
    AuthorID: user.UserID,
    ThreadID: threadID,
    CommentID: props.data.CommentID,
    // AuthorUsername: user.Username,
    // CommentDate: date,
    CommentMessage: '(Edited) ' + commentEditMessage.value,
  };

  console.log("Editing thread: ", payload);
  let response = await fetch(baseUrl + "/editComment", {
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
    console.log("Response from edit comment: ", data);
    emit("comment-get-threads");
    // threads.value = data.Data;
  } else {
    console.log("Error editing comment: ", response.statusText);
  }
  toggleEditCommentControls();
};

let upVote = async () => {
  let user = store.getUser;
  let threadID = props.data.ThreadID;
  let date = new Date().toISOString();
  // let time = new Date().toTimeString();
  let payload = {
    ThreadID: threadID,
    CommentID: props.data.CommentID,
  };

  console.log("Up voting: ", payload);
  let response = await fetch(baseUrl + "/upVoteComment", {
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
    emit("comment-get-threads");
  }
};

let downVote = async () => {
  let user = store.getUser;
  let threadID = props.data.ThreadID;
  let date = new Date().toISOString();
  // let time = new Date().toTimeString();
  let payload = {
    ThreadID: threadID,
    CommentID: props.data.CommentID,
  };

  console.log("Down voting: ", payload);
  let response = await fetch(baseUrl + "/downVoteComment", {
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
    emit("comment-get-threads");
  }
};

let showReplyControls = () => {
  replyText.value = props.data.CommentMessage;
  showReplyControl.value = !showReplyControl.value;
};

let toggleEditCommentControls = () => {
  showEditcontrols.value = !showEditcontrols.value;
};
</script>
<style scoped>
.comment-container {
  /* outline: 1px solid rgba(255, 255, 255, 0.2); */
  border-radius: 20px;
  overflow: hidden;
}

.comment {
  /* background-color: rgba(0, 0, 0, 0.5); */
  /* color: red; */
}

.thread-footer {
  background-color: rgba(0, 0, 0, 0.6);
  /* background-color: orange; */
  border-radius: 0 0 20px 20px;
}

.divider {
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin-top: 10px;
}

.reply-creation-controls {
  height: 0;
  opacity: 0;
  width: 90%;
  padding-top: 0px;
  margin-left: auto;
  margin-bottom: 20px;
  /* overflow: hidden; */
  transition: height 0.3s ease-in-out, opacity 0.3s ease-in, padding-top 0.3s ease-in;
}

.open {
  height: 160px;
  padding-top: 20px;
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

.comment-edit-controls {
  height: 0;
  opacity: 0;
  padding-top: 0;
  overflow: hidden;
  transition: height 0.3s ease-in-out, opacity 0.3s ease-in, padding-top 0.3s ease-in;
}
.open {
  height: 180px;
  padding-top: 20px;
  opacity: 1;
}

.in-response-container {
  border-radius: 10px;
  background-color: rgba(255, 165, 0, 0.1);
}
</style>

<template>
  <div
    class="comment-container uk-background-secondary uk-light map-bottom-left"
    loading="eager"
  >
    <div class="comment uk-padding-small">
      <div class="author-info">
        <span class="uk-text-bold uk-margin-small-right">{{ data.AuthorUsername }} </span>
        <span class=""> {{ data.CommentDate }}</span>
      </div>
      <hr class="divider uk-margin-remove-bottom" />
      <div
        v-if="props.data.QuoteText"
        class="in-response-container uk-padding-small uk-margin-small-top"
      >
        <span v-if="props.data.QuoteAuthor" class="text-goa-red uk-text-bold"
          >@{{ props.data.QuoteAuthor }}:
        </span>
        <span>{{ props.data.QuoteText }}</span>
      </div>
      <div
        class="uk-padding-small uk-margin-remove uk-padding-remove-bottom uk-text-bold"
      >
        {{ data.CommentMessage }}
      </div>
    </div>
    <div
      class="thread-footer uk-flex uk-child-width-1-3 uk-padding-small uk-flex-middle uk-flex-between"
    >
      <div class="button-container uk-flex uk-flex-1">
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
            class="goa-button uk-button-small uk-margin-small-right uk-padding-small-top"
          >
            <span uk-icon="icon: arrow-down"></span>
          </button>
          <span>{{ data.DownVotes }}</span>
        </div>
        <div
          v-if="data.AuthorID == user.UserID"
          class="thread-controls uk-flex uk-margin-small-left"
        >
          <button
            @click="deleteComment"
            class="goa-button goa-delete-button uk-button-small uk-margin-small-right"
          >
            Delete
          </button>
          <!-- This is not implemented yet -->
          <button
            @click="toggleEditCommentControls"
            class="goa-button goa-edit-button uk-button-small uk-margin-small-right"
          >
            Edit
          </button>
        </div>
      </div>
      <div class="uk-text-center uk-width-auto">
        <button @click="showReplyControls" class="goa-button">Reply</button>
      </div>
    </div>
  </div>
  <div
    :class="{
      'comment-edit-controls': {},
      open: showEditcontrols,
    }"
  >
    <div class="title-input uk-flex uk-flex-column">
      <label class="uk-margin-small-left" for="CommentEditMessage">Message</label>
      <textarea
        id="CommentEditMessage"
        class="goa-input"
        rows="4"
        cols="50"
        v-model="commentEditMessage"
      ></textarea>
    </div>
    <div class="create-thread-button uk-margin-top">
      <button @click="editComment" class="goa-button" :disabled="!showEditcontrols">Update comment</button>
    </div>
  </div>
  <div
    :class="{
      'reply-creation-controls ': {},
      open: showReplyControl,
    }"
  >
    <div class="title-input uk-flex uk-flex-column">
      <label class="uk-margin-small-left" for="ReplyMessage">Message</label>
      <textarea
        id="ReplyMessage"
        class="goa-input"
        rows="4"
        cols="50"
        v-model="replyMessage"
      ></textarea>
    </div>
    <div class="create-thread-button uk-margin-top">
      <button @click="postComment" class="goa-button" :disabled="!showReplyControl">Post Reply</button>
    </div>
  </div>
</template>
