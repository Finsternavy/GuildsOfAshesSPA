<script setup>
import { ref, onBeforeMount, watch } from "vue";
import router from "../router/routes";
import { useUserStore } from "../stores/userStore";
import { useAPI } from '../stores/apiStore'

let username = ref("");
let password = ref("");
let api = useAPI();
let baseUrl = api.getAPI + "Users";
let store;

onBeforeMount(() => {
  // api = useAPI();
  // baseUrl = api.getAPI + "Users";
  store = useUserStore();
  // console.log("Store user: ", store.user);
  if (store.user) {
    router.push({ name: "guilds" });
  }
});

let doLogin = async () => {
  // console.log("baseURL: ", baseUrl);
  let hashedPassword = await hash(password.value);
  let call = {
    Username: username.value,
    Password: hashedPassword,
  };
  let response = await fetch(baseUrl + "/authenticate", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
    },
    body: JSON.stringify(call),
  });

  if (response.ok) {
    let data = await response.json();
    if (data.Message == 'User found'){
      let user = data.Data;
      // console.log("data: ", data);
      // store.setUser(
      //   user.UserID,
      //   user.Username,
      //   user.Password,
      //   user.Email,
      //   user.GuildID,
      //   user.GuildName,
      //   user.Role,
      //   user.Subclass,
      //   user.Primary,
      //   user.Secondary,
      //   user.Profession1,
      //   user.Profession2
      // );
      // localStorage.setItem("User", JSON.stringify(data.Data));
      // store.setUser(user);
      store.setUser(data.Data);
      store.setAuthenticated(true);
      store.setGuildID(data.Data.GuildID);
      // console.log("Store authenticated: ", store.getAuthenticated);
      // console.log("GuildID? : ", data.Data.GuildID);
      if (data.Data.GuildID) {
        // location.reload();
        router.push({ name: "guild-home" });
      } else {
        // location.reload();
        router.push({ name: "guilds" });
      }
      // location.reload();
    } else {
      alert("User not found");
    }
  } else {
    // console.log("Error fetching data: ", response.statusText);
  }
};

async function hash(string) {
  let utf8 = new TextEncoder().encode(string);
  let hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
  let hashArray = Array.from(new Uint8Array(hashBuffer));
  let hashHex = hashArray.map((bytes) => bytes.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

let register = () => {
  // add after creating registration page
  router.push({ name: "register" });
};
</script>

<style scoped>
.login {
  border: 1px solid gray;
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>

<template>
  <div>
    <div class="login uk-form uk-padding uk-width-large uk-align-center">
      <div class="uk-margin-bottom">
        <label for="username">Username</label>
        <input
          id="username"
          type="text"
          class="goa-input uk-width-1-1 uk-text-large"
          v-model="username"
        />
      </div>
      <div class="uk-margin-bottom">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          class="goa-input uk-width-1-1 uk-text-large"
          v-model="password"
        />
      </div>
      <div class="login-button-container uk-flex uk-child-width-1-2 uk-width-1-1">
        <button
          class="goa-button uk-light uk-margin-right uk-padding-small"
          @click="doLogin"
        >
          Login
        </button>
        <button class="goa-button uk-light uk-padding-small" @click="register">
          Register
        </button>
      </div>
    </div>
  </div>
</template>
