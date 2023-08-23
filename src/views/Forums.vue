<script setup>
import { ref } from "vue";
import Thread from "../components/Thread.vue";
import Comment from "../components/Comment.vue";

const threads = ref([
  {
    id: 12345,
    title: "Cleric Build",
    author: "CyFinXP",
    timeDate: "1/1/2021 12:00:00",
    message: "Anyone have a good cleric build?.",
    likes: 12,
    dislikes: 2,
    comments: [
      {
        id: 12345 - 1, // comment Id's should be linked to their parent thread Id.
        threadId: 12345,
        author: "CyFinXP",
        timeDate: "1/1/2021 12:00:00",
        message: "I've been looking for a good one too :(.",
        likes: 12,
        dislikes: 2,
      },
    ],
  },
  {
    id: 2,
    title: "Best ways to make money",
    author: "CyFinXP",
    timeDate: "1/1/2021 12:00:00",
    message: "Post your best ways to make money in game.",
    likes: 0,
    dislikes: 0,
    comments: [],
  },
  {
    id: 3,
    title: "Bugs",
    author: "CyFinXP",
    timeDate: "1/1/2021 12:00:00",
    message: "Bugs we should be aware of.",
    likes: 0,
    dislikes: 0,
    comments: [],
  },
]);
</script>

<style scoped></style>

<template>
  <!-- Need to make thread and comments sections collapsible-->
  <div class="forums uk-padding">
    <h2 class="goa-container uk-padding uk-light text-orange uk-text-center">
      GoA FORUMS
    </h2>
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
