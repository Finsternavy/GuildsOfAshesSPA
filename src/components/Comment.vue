<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/userStore";

const props = defineProps({
  modelValue: {},
  data: {},
});

const emit = defineEmits(["comment-get-threads"]);

let store = useUserStore();
const baseUrl = process.env.APIURL + "Forum";

onMounted(() => {
  console.log("CommentID: ", props.data.CommentID);
});

const upVote = async () => {
  const user = store.getUser;
  const threadID = props.data.ThreadID;
  const date = new Date().toISOString();
  // const time = new Date().toTimeString();
  let payload = {
    ThreadID: threadID,
    CommentID: props.data.CommentID,
  };

  console.log("Up voting: ", payload);
  const response = await fetch(baseUrl + "/upVoteComment", {
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

const downVote = async () => {
  const user = store.getUser;
  const threadID = props.data.ThreadID;
  const date = new Date().toISOString();
  // const time = new Date().toTimeString();
  let payload = {
    ThreadID: threadID,
    CommentID: props.data.CommentID,
  };

  console.log("Down voting: ", payload);
  const response = await fetch(baseUrl + "/downVoteComment", {
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
</script>
<style scoped>
.comment-container {
  /* outline: 1px solid rgba(255, 255, 255, 0.2); */
  border-radius: 20px;
  overflow: hidden;
}

.comment {
  /* background-color: rgba(0, 0, 0, 0.5); */
}

.thread-footer {
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 0 0 20px 20px;
}

.divider {
  border: 1px solid rgba(0, 0, 0, 0.3);
}
</style>

<template>
  <div class="comment-container map-container map-bottom-left" loading="eager">
    <div class="comment uk-padding-small">
      <div class="author-info">
        <span class="text-black uk-text-bold uk-margin-small-right"
          >{{ data.AuthorUsername }}
        </span>
        <span class="text-black"> {{ data.CommentDate }}</span>
      </div>
      <hr class="divider uk-margin-remove-bottom" />
      <div
        class="uk-padding-small uk-margin-remove uk-padding-remove-bottom text-black uk-text-bold"
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
      </div>
      <div class="uk-text-center uk-width-auto">
        <button class="goa-button">Reply</button>
      </div>
    </div>
  </div>
</template>
