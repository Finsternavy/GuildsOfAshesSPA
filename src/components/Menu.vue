<script setup>
import { onBeforeMount, ref, watch, computed } from "vue";
import { RouterLink, RouterView } from "vue-router";
import router from "../router/routes";
import { useUserStore } from "../stores/userStore";

const store = useUserStore();
const user = store.getUser();
const goHome = () => {
  console.log("Going home");
  router.push("/");
};

onBeforeMount(() => {
  store.value = useUserStore();
});

// watch(user, (newval, oldval) => {
//   console.log("New Val: ", newval);
//   console.log("Old Val: ", oldval);
// });

const logout = () => {
  console.log("Logging out");
  store.removeUser();
  router.push("/");
};
</script>

<style scoped>
.menu {
  background-color: rgba(0, 0, 0, 0.7) !important;
  padding-inline: 30px;
  padding-block: 20px;
  backdrop-filter: blur(5px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.sub-menu {
  background-color: transparent !important;
}
.link {
  color: white;
  margin-right: 20px;
}

.goa-dropnav {
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>

<template>
  <div
    class="menu"
    uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky;"
  >
    <nav
      id="Menu"
      class="uk-navbar-container sub-menu uk-flex uk-flex-between uk-flex-middle"
    >
      <div class="left-nav uk-width-1-6">
        <button class="logo-container" @click="goHome">
          <img src="" alt="LOGO" />
        </button>
      </div>
      <div class="right-nav uk-text-center uk-width-2-3">
        <div v-if="user.username && !user.guildID" class="page-links-container uk-link">
          <RouterLink to="/guilds"
            ><span class="link uk-margin-right">Browse Guilds</span></RouterLink
          >
        </div>

        <!-- Need to add to this if. If member is not in a guild most of these should not show -->
        <div v-if="user.username && user.guildID" class="uk-flex uk-flex-center">
          <RouterLink to="/guild/home"><span class="link">Guild Home</span></RouterLink>
          <RouterLink to="/guild/news"><span class="link">News</span></RouterLink>
          <RouterLink to="/guild/forums"><span class="link">Forums</span></RouterLink>
          <RouterLink to="/guild/roster"><span class="link">Roster</span></RouterLink>
          <RouterLink to="/guild/tasks"><span class="link">Tasks</span></RouterLink>
          <RouterLink to="/guild/about"><span class="link">About</span></RouterLink>
          <RouterLink to="/guild/calendar"><span class="link">Calendar</span></RouterLink>
        </div>
      </div>
      <div class="login-profile-container uk-text-right uk-width-1-6">
        <div v-if="!user.username" class="not-logged-in">
          <RouterLink to="/login" class="uk-link">
            <div class="uk-flex uk-flex-column">
              <span class="text-orange uk-margin-small-right" uk-icon="icon: user"></span>
              <span class="text-orange">Login</span>
            </div>
          </RouterLink>
        </div>
        <div v-if="user.username" class="logged-in" uk-dropnav="mode: hover; offset: 50">
          <ul class="uk-margin-remove">
            <div class="uk-flex uk-flex-column">
              <span uk-icon="icon: user" class="uk-margin-right"></span>
              <span class="text-orange uk-margin-remove">{{ user.username }}</span>
            </div>
            <div class="uk-dropdown uk-background-secondary goa-dropnav">
              <ul class="uk-nav uk-dropdown-nav uk-flex uk-flex-center uk-flex-column">
                <!-- <li class="uk-active"><a href="#">Active</a></li> -->
                <li>
                  <RouterLink to="/guild/about"
                    ><span class="uk-align-center uk-margin-small uk-margin-remove-bottom"
                      >Settings</span
                    ></RouterLink
                  >
                </li>
                <li>
                  <RouterLink to="/guild/about"
                    ><span class="uk-align-center uk-margin-small uk-margin-remove-bottom"
                      >Profile</span
                    ></RouterLink
                  >
                </li>
                <li>
                  <RouterLink to="/"
                    ><span
                      class="uk-align-center uk-margin-small uk-margin-remove-bottom"
                      @click="logout"
                      >Log Out</span
                    ></RouterLink
                  >
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
