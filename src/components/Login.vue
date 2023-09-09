<script setup>
import { ref } from "vue";
import router from "../router/routes";
import { useUserStore } from "../stores/userStore";

const username = ref("");
const password = ref("");
const baseUrl = process.env.APIURL + "Users";
const store = useUserStore();

const doLogin = async () => {
  console.log("baseURL: ", baseUrl);
  let hashedPassword = await hash(password.value);
  const call = {
    Username: username.value,
    Password: hashedPassword,
  };
  const response = await fetch(baseUrl + "/authenticate", {
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
    let user = data.Data;
    console.log("data: ", data);
    store.setUser(
      user.UserID,
      user.Username,
      user.Password,
      user.Email,
      user.GuildID,
      user.GuildName,
      user.Role,
      user.Subclass,
      user.Primary,
      user.Secondary,
      user.Profession1,
      user.Profession2
    );
    localStorage.setItem("User", JSON.stringify(data.Data));
    console.log("Store user: ", store.getUser());
    store.setAuthenticated(true);
    if (data.Data.guildID) {
      router.push({ name: "guild-home" });
    } else {
      router.push({ name: "guilds" });
    }
  } else {
    console.log("Error fetching data: ", response.statusText);
  }
};

async function hash(string) {
  const utf8 = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((bytes) => bytes.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

const register = () => {
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
