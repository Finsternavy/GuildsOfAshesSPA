<script setup>
import { ref, onBeforeMount } from "vue";
import Parser from "rss-parser";

let parser = new Parser();
let feedItems = [];
// const feed = await parser.parseURL('https://forums.ashesofcreation.com//feed.rss');

onBeforeMount(() => {
  console.log("Fetching Rss Feed");
  getFeed();
});
const getFeed = async () => {
  let feed = await parser
    .parseURL("https://nitter.net/AshesofCreation", {
      // mode: "no-cors",https://nitter.net/AshesofCreation/rss
    })
    .then((feed) => {
      console.log("feed: ", feed);
    });
  feedItems = feed;
};
</script>

<style scoped></style>

<template>
  <div class="rss-feed">
    <ul>
      <li v-for="item in feedItems" :key="item.guid">
        <h3>{{ item.title }}</h3>
        <p>{{ ite.contentSnippet }}</p>
      </li>
    </ul>
  </div>
</template>
