<script setup>
import { ref, onBeforeMount } from "vue";
import { useUserStore } from "../stores/userStore";
import Thread from "../components/Thread.vue";

const baseUrl = process.env.APIURL + "Forum";
let store = null;

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
  const user = store.getUser();
  const response = await fetch(baseUrl + "/getAllThreads", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
    },
    body: JSON.stringify(user.GuildID),
  });

  if (response.ok) {
    let data = await response.json();
    console.log("Get all threads response data: ", data);
    threads.value = data.Data;
  } else {
    console.log("Error fetching thread data: ", response.statusText);
  }
};
</script>

<style scoped></style>

<template>
  <div class="forums goa-container uk-padding">
    <h2 class="uk-light text-orange uk-text-center">GoA FORUMS</h2>
    <div class="uk-margin-top">
      <div
        v-for="thread in threads"
        :key="thread.id + thread.author"
        class="uk-margin-bottom"
      >
        <Thread :data="thread" />
      </div>
    </div>
  </div>
</template>
