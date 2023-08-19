<script setup>
defineProps({
  showStatus: Boolean,
  active: Boolean,
  siteName: String,
  siteUrl: String,
  embedSrc: String,
});
</script>

<style scoped>
.social-link {
  /* height: 40px; */
  width: 100%;
  border-radius: 20px;
  border: 1px solid black;
  box-shadow: inset 0 0 7px 7px rgba(0, 0, 0, 0.2), 0 0 3px 3px rgba(0, 0, 0, 0.2);
  /* background-color: #d6662b; */
}
.online-status {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: greenyellow;
}
.active {
  background-color: greenyellow;
}

.not-active {
  background-color: red;
}

.site-name {
  color: gray;
}
</style>

<template>
  <div class="social-link uk-margin-bottom uk-flex uk-flex-center uk-flex-middle">
    <div v-if="showStatus" class="status-container uk-margin-right">
      <div :class="{ active: active, 'not-active': !active }" class="online-status"></div>
    </div>
    <a target="_blank" :href="siteUrl"
      ><span class="site-name">{{ siteName }}</span></a
    >
    <div v-if="embedSrc" class="uk-position-relative">
      <button type="button">
        <span uk-icon="icon: chevron-down"></span>
      </button>
    </div>
  </div>
</template>
https://discord.com/api/guilds/790063760861429771/widget.json
