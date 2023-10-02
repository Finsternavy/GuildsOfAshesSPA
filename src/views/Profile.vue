<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../stores/userStore";
import CharacterMatrix from "../components/CharacterMatrix.vue";

const store = useUserStore();
const user = store.getUser;
const selectedClass = ref();
const baseUrl = process.env.APIURL + "Users";

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

const updateUserClass = async () => {
  // console.log("baseURL: ", baseUrl);
  // let hashedPassword = await hash(password.value);
  console.log(selectedClass.value);
  console.log("Name: ", selectedClass.value.name);
  user.Subclass = selectedClass.value.name;
  user.Primary = selectedClass.value.primary;
  user.Secondary = selectedClass.value.secondary;
  console.log("User now: ", user);
  // const call = {
  //   User: user,
  // };
  const response = await fetch(baseUrl + "/updateUser/" + user.UserID, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
    },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    let data = await response.json();
    console.log("data: ", data);
    localStorage.setItem("User", JSON.stringify(data.Data));
    // store.setUserSubclass(data.Data.Subclass);
    // store.setUserPrimary(data.Data.Primary);
    // store.setUserSecondary(data.Data.Secondary);
  } else {
    console.log("Error fetching data: ", response.statusText);
  }
};
</script>

<style scoped></style>

<template>
  <div class="profile">
    <div class="goa-container uk-margin-bottom">
      <!-- <h3 class="uk-light uk-text-center">{ Guild name } Roster</h3> -->
      <h3
        class="uk-light uk-text-center uk-padding uk-padding-remove-bottom uk-text-bold"
      >
        Character Matrix
      </h3>
      <div class="uk-padding uk-padding-remove-top">
        <CharacterMatrix v-model="selectedClass" />
        <div class="uk-flex uk-flex-center">
          <div v-if="selectedClass" class="uk-flex-column uk-width-1-2@l">
            <div class="uk-flex uk-flex-between uk-margin-bottom">
              <label for="selected-primary text-orange">Primary Archetype</label>
              <input
                class="goa-input uk-text-center"
                type="text"
                id="selected-primary"
                disabled
                v-model="selectedClass.primary"
              />
            </div>
            <div class="uk-flex uk-flex-between">
              <label for="selected-secondary text-orange">Secondary Archetype</label>
              <input
                class="goa-input uk-text-center"
                type="text"
                id="selected-secondary"
                disabled
                v-model="selectedClass.secondary"
              />
            </div>
            <div class="uk-flex uk-flex-between uk-child-width-1- uk-margin-top">
              <button @click="updateUserClass" class="goa-button">Update My Class</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="goa-container uk-padding user-info uk-flex uk-flex-column">
      <h4 class="text-orange">User Details</h4>
      <div class="user-details uk-flex uk-margin-bottom uk-child-width-1-4">
        <div class="input-container uk-padding-small uk-flex uk-flex-column">
          <label for="">Username</label>
          <input class="goa-input" type="text" v-model="user.Username">
        </div>
        <div class="input-container uk-padding-small uk-flex uk-flex-column">
          <label for="">Email</label>
          <input class="goa-input" type="text" v-model="user.Email">
        </div>
        <div class="input-container uk-padding-small uk-flex uk-flex-column">
          <label for="">Guild Name</label>
          <input class="goa-input" type="text" v-model="user.GuildName">
        </div>
        <div class="input-container uk-padding-small uk-flex uk-flex-column">
          <label for="">Guild Role</label>
          <input class="goa-input" type="text" v-model="user.Role">
        </div>
      </div>
      <h4 class="text-orange">User Character Details</h4>
      <div class="class-details uk-flex uk-margin-bottom uk-child-width-1-4">
        <div class="input-container uk-padding-small uk-flex uk-flex-column">
          <label for="">Class</label>
          <input class="goa-input" type="text" v-model="user.Subclass">
        </div>
        <div class="input-container uk-padding-small uk-flex uk-flex-column">
          <label for="">Primary Architype</label>
          <input class="goa-input" type="text" v-model="user.Primary">
        </div>
        <div class="input-container uk-padding-small uk-flex uk-flex-column">
          <label for="">Secondary Architype</label>
          <input class="goa-input" type="text" v-model="user.Secondary">
        </div>
      </div>
      <h4 class="text-orange">Profession Details</h4>
      <div class="user-professions uk-flex uk-child-width-1-4">
        <div class="input-container uk-padding-small uk-flex uk-flex-column">
          <label for="">Profession 1</label>
          <input class="goa-input" type="text" v-model="user.Profession1">
        </div>
        <div class="input-container uk-padding-small uk-flex uk-flex-column">
          <label for="">Profession 2</label>
          <input class="goa-input" type="text" v-model="user.Profession2">
        </div>
      </div>
    </div>
  </div>
</template>
