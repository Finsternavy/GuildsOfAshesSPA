<script setup>
defineProps({
  siteName: String,
  siteUrl: String,
  siteImage: String,
});
</script>

<style scoped>
.web-link-container {
  position: relative;
  padding: 3px;
  margin-block: 0px!important;
  /* width: 200px; */
  /* height: 150px; */
  /* margin: 10px; */
}
.web-link {
  background-color: gray;
  aspect-ratio: 16/9;
  border: 2px solid black;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  filter: brightness(2);
  transition: filter 0.2s ease-in-out;
}

.web-link:hover {
  filter: brightness(3);
}

.web-link::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: radial-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
  pointer-events: none;
}

</style>

<template>
  <div class="web-link-container">
    <a :href="siteUrl" target="_blank">
      <div
        class="web-link"
        target="_blank"
        :href="siteUrl"
        :data-src="siteImage"
        uk-img
      ></div>
    </a>
  </div>
</template>
