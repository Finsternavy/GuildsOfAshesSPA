<script setup>
import { RouterLink, RouterView } from "vue-router";
import router from "../router/routes";
import { useUserStore } from "../stores/userStore";

const store = useUserStore();

const goHome = () => {
  console.log("Going home");
  router.push("/");
};

const logout = () => {
  console.log("Logging out");
  store.setAuthenticated(false);
  router.push("/");
};
</script>

<style scoped>

.menu {
  background-color: rgba(0, 0, 0, 0.7)!important;
  padding-inline: 30px;
  padding-block: 20px;
  backdrop-filter: blur(5px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.sub-menu {
  background-color: transparent!important;
}
.link {
  color: white;
}
</style>

<template>
  <div class="menu" uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky;">
    <nav
      id="Menu"
      class="uk-navbar-container sub-menu uk-flex uk-flex-between uk-flex-middle"
    >
      <div class="left-nav uk-width-1-6">
        <button class="logo-container" @click="goHome">
          <img  src="" alt="LOGO" />
        </button>
      </div>
      <div class="right-nav uk-text-center uk-width-2-3">
        <div v-if="!store.authenticated" class="page-links-container uk-link">
          <RouterLink to="/guilds"><span class="link uk-margin-right">Browse Guilds</span></RouterLink>
          <RouterLink to="/login"><span class="link">Login</span></RouterLink>
        </div>
        <div v-if="store.authenticated && !store.user.guild" class="page-links-container uk-link">
          <RouterLink to="/"><span class="link">Home</span></RouterLink>
          <RouterLink to="/guilds"><span class="link uk-margin-right">Browse Guilds</span></RouterLink>
          
        </div>
        <div v-if="store.authenticated && store.user.guild" class="uk-flex uk-flex-between">
          <RouterLink to="/guild/home"><span class="link">Home</span></RouterLink>
          <RouterLink to="/guild/news"><span class="link">News</span></RouterLink>
          <RouterLink to="/guild/forums"><span class="link">Forums</span></RouterLink>
          <RouterLink to="/guild/roster"><span class="link">Roster</span></RouterLink>
          <RouterLink to="/guild/apply"><span class="link">Apply</span></RouterLink>
          <RouterLink to="/guild/about"><span class="link">About</span></RouterLink>
          <RouterLink to="/guild/calendar"><span class="link">Calendar</span></RouterLink>
        </div>
      </div>
      <div class="login-profile-container uk-text-right uk-width-1-6">
        <RouterLink v-if="!store.authenticated" to="/login"><span class="link" uk-icon="icon: user" style="color: red"></span></RouterLink>
        <RouterLink v-if="store.authenticated" to="/" @click="logout"><span class="link" uk-icon="icon: user" style="color: green"></span></RouterLink>
      </div>
    </nav>

  </div>
</template>
