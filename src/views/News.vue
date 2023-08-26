<script setup>
import { ref, onBeforeMount } from "vue";
import RssFeed from "../components/RssFeed.vue";
</script>

<style scoped></style>

<template>
  <div class="news expand">
    <!-- <RssFeed /> -->
    <!-- <rssapp-wall id="nNhVs0srO3nwqegD"></rssapp-wall> -->
    <iframe
      class="goa-container expand"
      width="100%"
      height="1740"
      src="https://forums.ashesofcreation.com/"
      frameborder="0"
    ></iframe>
    <!-- <iframe
      class="goa-container"
      SameSite="Lax"
      width="100%"
      height="1740"
      src="https://ashesofcreation.com/news"
      frameborder="0"
    ></iframe> -->
  </div>
</template>
