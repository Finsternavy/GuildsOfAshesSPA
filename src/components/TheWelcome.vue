<script setup>
import { ref } from "vue";
import WebLink from "./WebLink.vue";
import SocialLink from "./SocialLink.vue";
import Discord from "./Discord.vue";
import WebLinks from "./WebLinks.vue";

const user = ref({
  firstName: "Christopher",
  lastName: "Finster",
  image: "https://source.unsplash.com/featured/250x350",
});

const sites = ref([
  {
    siteName: "twitch",
    siteUrl: "https://www.twitch.tv/",
    siteImage:
      "https://1000logos.net/wp-content/uploads/2018/08/Twitch-emblem-500x281.jpg",
  },
  {
    siteName: "youtube",
    siteUrl: "https://www.youtube.com/",
    siteImage:
      "https://1000logos.net/wp-content/uploads/2021/04/YouTube-logo-500x281.png",
  },
  {
    siteName: "twitch",
    siteUrl: "https://www.twitch.tv/",
    siteImage:
      "https://1000logos.net/wp-content/uploads/2018/08/Twitch-emblem-500x281.jpg",
  },
  {
    siteName: "youtube",
    siteUrl: "https://www.youtube.com/",
    siteImage:
      "https://1000logos.net/wp-content/uploads/2021/04/YouTube-logo-500x281.png",
  },
  {
    siteName: "youtube",
    siteUrl: "https://www.youtube.com/",
    siteImage:
      "https://1000logos.net/wp-content/uploads/2021/04/YouTube-logo-500x281.png",
  },
  {
    siteName: "twitch",
    siteUrl: "https://www.twitch.tv/",
    siteImage:
      "https://1000logos.net/wp-content/uploads/2018/08/Twitch-emblem-500x281.jpg",
  },
  {
    siteName: "youtube",
    siteUrl: "https://www.youtube.com/",
    siteImage:
      "https://1000logos.net/wp-content/uploads/2021/04/YouTube-logo-500x281.png",
  },
  {
    siteName: "twitch",
    siteUrl: "https://www.twitch.tv/",
    siteImage:
      "https://1000logos.net/wp-content/uploads/2018/08/Twitch-emblem-500x281.jpg",
  },
]);

const socialLinks = ref([
  {
    siteName: "LinkedIn",
    siteUrl: "https://www.linkedin.com/in/christopher-finster/",
    showStatus: false,
    active: false,
  },
  {
    siteName: "Facebook",
    siteUrl: "https://www.facebook.com/",
    showStatus: false,
    active: false,
  },
  {
    siteName: "Instagram",
    siteUrl: "https://www.instagram.com/",
    showStatus: false,
    active: false,
  },
  {
    siteName: "Twitter",
    siteUrl: "https://twitter.com/",
    showStatus: false,
    active: false,
  },
  {
    siteName: "Xbox Live",
    siteUrl: "https://www.xbox.com/en-US/live",
    showStatus: true,
    active: false,
  },
  {
    siteName: "Playstation Network",
    siteUrl: "https://www.playstation.com/en-us/network/",
    showStatus: true,
    active: true,
  },
]);

const discordServers = ref([
  {
    embedSrc: "https://discord.com/widget?id=340337686059548672&theme=dark",
  },
  {
    embedSrc: "https://discord.com/widget?id=267111225245040641&theme=dark",
  },
]);
</script>

<style scoped>
.hero {
  box-shadow: inset 0 0 10px 10px var(--vt-c-black);
}

.shadow-text {
  color: orange;
  text-shadow: 0 7px 10px black;
}
</style>

<template>
  <div class="">
    <h1 class="shadow-text uk-text-center uk-text-bold">GUILDS OF ASHES</h1>
  </div>
</template>
