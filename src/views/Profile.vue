<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../stores/userStore";

const store = useUserStore();
const user = store.getUser();

const hiddenKeys = ["Password", "GuildID", "UserID"];

const keys = computed(() => {
  let returnKeys = [];
  let keys = Object.keys(user);

  keys.forEach((key) => {
    if (checkHide(key)) {
      returnKeys.push(key);
    }
  });
  return returnKeys;
});

const checkHide = (key) => {
  let found = false;
  hiddenKeys.forEach((item) => {
    // console.log("Key: ", key, " check key: ", item);
    if (item == key) {
      // console.log("Match found. Key: ", key, " matches.");
      found = true;
    }
  });
  if (found) {
    return false;
  }
  return true;
};
</script>

<style scoped></style>

<template>
  <div class="profile">
    <div
      class="uk-form goa-container uk-padding uk-padding-remove-left uk-flex uk-child-width-1-2"
      uk-grid
    >
      <div v-for="key in keys" :key="key" class="input-container uk-flex uk-flex-column">
        <label :for="key + user[key]">{{ key }}</label>
        <input
          class="goa-input uk-padding-small uk-text-large"
          type="text"
          :value="user[key]"
        />
      </div>
    </div>
  </div>
</template>
