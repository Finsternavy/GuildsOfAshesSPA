<script setup>
import { ref } from "vue";
import Thread from "../components/Thread.vue";

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
    id: 12346,
    title: "Best ways to make money",
    author: "CyFinXP",
    timeDate: "1/1/2021 12:00:00",
    message: "Post your best ways to make money in game.",
    likes: 87,
    dislikes: 0,
    comments: [
      {
        id: 12346 - 1, // comment Id's should be linked to their parent thread Id.
        threadId: 12346,
        author: "CyFinXP",
        timeDate: "1/1/2021 12:00:00",
        message:
          "I don't really know a good way to make money. Primary, this is because the game is not out yet and know one really knows.  We could sit here and speculate forever but that won't really help anyone.  I think we should wait until the game is out and then we can start talking about it. ",
        likes: 12,
        dislikes: 2,
      },
    ],
  },
  {
    id: 12347,
    title: "Bugs",
    author: "CyFinXP",
    timeDate: "1/1/2021 12:00:00",
    message: "Bugs we should be aware of.",
    likes: 3,
    dislikes: 1,
    comments: [
      {
        id: 12347 - 1, // comment Id's should be linked to their parent thread Id.
        threadId: 12347,
        author: "CyFinXP",
        timeDate: "1/1/2021 12:00:00",
        message: "I keep dying. Pretty sure it's a bug.",
        likes: 12,
        dislikes: 2,
      },
      {
        id: 12346 - 2, // comment Id's should be linked to their parent thread Id.
        threadId: 12346,
        author: "CyFinXP",
        timeDate: "1/1/2021 12:00:00",
        message: "@CyFinXP it's not a bug, it's a 'feature'.",
        likes: 12,
        dislikes: 2,
      },
    ],
  },
]);
</script>

<style scoped></style>

<template>
  <!-- Need to make thread and comments sections collapsible-->
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
