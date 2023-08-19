<script setup>
defineProps({
  embedSrc: String,
});
</script>

<style scoped>
.iframe {
  box-sizing: border-box !important;
}
</style>

<template>
  <div class="uk-card uk-card-body uk-padding-small">
    <iframe
      class="iframe uk-width-1-1"
      :src="embedSrc"
      height="500"
      allowtransparency="true"
      frameborder="0"
      SameSite = "None"
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
    ></iframe>
  </div>
</template>
