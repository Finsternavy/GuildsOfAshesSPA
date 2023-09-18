<script setup>
import { ref } from "vue";
import Comment from "../components/Comment.vue";
import uikit from "uikit";

const showThread = ref(false);
const showComments = ref(false);

const props = defineProps({
  modelValue: {},
  data: {},
  // function : {
  //     type: function
  // }
});

const emit = defineEmits(["update:modelValue"]);

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

// const deleteThread = async (toDelete) => {
//   const user = store.getUser;
//   const threadID = toDelete;
//   const date = new Date().toISOString();
//   // const time = new Date().toTimeString();
//   let payload = {
//     UserID: user.UserID,
//     ThreadID: threadID,
//   };

//   console.log("Deleting thread: ", payload);
//   const response = await fetch(baseUrl + "/deleteThread", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Credentials": true,
//       "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
//     },
//     body: JSON.stringify(payload),
//   });

//   if (response.ok) {
//     let data = await response.json();
//     console.log("Response from delete thread: ", data);
//     // threads.value = data.Data;
//   } else {
//     console.log("Error deleting thread: ", response.statusText);
//   }
// };
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
              <button class="goa-button uk-button-small uk-margin-small-right">
                <span uk-icon="icon: arrow-up"></span>
              </button>
              <span>{{ data.UpVotes }}</span>
            </div>
            <div class="dislikes uk-text-center uk-margin-right">
              <button class="goa-button uk-button-small uk-margin-small-right">
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
            <button class="goa-button">Reply</button>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="{
        'comments-container uk-flex uk-flex-top': props,
        show: showComments,
      }"
    >
      <span
        v-if="data.Comments.length > 0"
        class="reply text-orange uk-margin-left uk-margin-right uk-text-center"
        uk-icon="icon: reply; ratio: 2;"
      ></span>
      <div class="uk-width-stretch">
        <Comment
          class="uk-margin-bottom"
          v-for="comment in data.Comments"
          :data="comment"
        />
      </div>
    </div>
  </div>
</template>
