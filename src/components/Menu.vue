<script setup>
import { onBeforeMount, onMounted, ref, watch, computed } from "vue";
import { RouterLink, RouterView } from "vue-router";
import router from "../router/routes";
import { useUserStore } from "../stores/userStore";

let store = useUserStore();
let user = ref();
let authenticated = ref(false);
let username = ref();
const showMobileNav = ref(false);
let goHome = () => {
  // console.log("Going home");
  router.push("/");
};

onMounted(() => {
  store = useUserStore();
  if (store.user) {
    user.value = store.getUser;
    username.value = store.getUsername;
    // console.log("Username: ", username.value);
    // console.log("User at menu after login: ", user.value);
  }
});

let checkUser = () => {
  user.value = store.getUser;
  // console.log(user);
  if (!user) {
    authenticated.value = false;
    return false;
  }
  authenticated.value = true;
  return true;
};

let logout = () => {
  localStorage.removeItem("User");
  // console.log("Logging out");
  store.removeUser();
  user = null;
  router.push("/");
  // location.reload();
};

let displayUserInfo = () => {
  let displayText = "";
  let tempName = store.getUsername;
  // let tempID = store.getGuildID;
  // if (username.value) {
  //   return username.value;
  // }
  displayText += tempName;
  return displayText;
};

const toggleMobileNav = () => {
  showMobileNav.value = !showMobileNav.value;
};

const navigate = (path) => {
  showMobileNav.value = false;
  router.push(path);
};

</script>

<style scoped>
/* .menu {
  background-color: rgba(0, 0, 0, 0.7) !important;
  padding-inline: 30px;
  padding-block: 20px;
  backdrop-filter: blur(5px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
} */

.sub-menu {
  background-color: transparent !important;
}
.link {
  position: relative;
  color: var(--primary-color);
  margin-right: 20px;
  cursor: pointer;
  margin-bottom: 10px;
}

.link:before {
  content: "";
  position: absolute;
  width: 0;
  height: 3px;
  bottom: -3px;
  left: 50%;
  background-color: var(--accent-color);
  transition: width 0.5s ease, left 0.5s ease;
}

.link:hover:before {
  width: 100%;
  left: 0;
}


.goa-dropnav {
  border-radius: 20px;
  background-color: var(--background-color);
}

.logo {
  height: 40px;
  min-width: 100px;
  width: 100px;
}

.text-default:hover {
  color: var(--primary-color);
}

.mobile-menu-toggle {
  cursor: pointer;
  rotate: 0deg;
  transition: rotate 0.5s ease;
}

.mobile-menu-toggle:hover {
  rotate: 90deg;
}

.mobile-menu-toggle:hover > * {
  background-position: right;
  rotate: -90deg;
}


.box {
  width: 15px;
  aspect-ratio: 1;
  border: 1px solid var(--primary-color);
  background-image: linear-gradient(
    to left,
    var(--primary-color) 0,
    var(--secondary-color) 50%,
    var(--secondary-color) 75%,
    var(--secondary-color) 100%
  );
  background-size: 400%;
  transition: background-position 0.5s ease, rotate 0.5s ease;
  rotate: 0deg;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;
  padding: 0;
  margin: 0;
  height: fit-content;
}

li > a {
  padding: 0px!important;
}

.mobile-sub-nav {
  border-top: 1px solid var(--primary-color);
}

.user-link {
  cursor: pointer;
}
</style>

<template>
  <div class="uk-visible@m goa-container-no-radius" uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky;">
    <nav id="Menu" class="uk-navbar-container sub-menu container uk-flex uk-flex-middle uk-margin-remove-top">
      <div class="left-nav uk-flex uk-flex-middle uk-width-small">
        <div class="remove-background uk-margin-right" @click="goHome">
          <img class="logo" src="../public/Images/GoALogoFinalShadow.png" alt="LOGO" />
        </div>
      </div>
      <div class="right-nav uk-text-center uk-width-expand">
        <div v-if="!store.getAuthenticated || !store.getGuildID" class="page-links-container ">
          <div @click="navigate('/guilds')" >
            <span class="link uk-margin-remove">Browse Guilds</span>
          </div>
        </div>

        <!-- Need to add to this if. If member is not in a guild most of these should not show -->
        <div v-if="store.getAuthenticated && store.getGuildID" class="uk-flex uk-flex-center">
          <div class="dev-links uk-margin-right">
            <div @click="navigate('/feedback')" v-if="store.getAuthenticated">
              <span class="goa-button">Feedback</span>
            </div>
          </div>
          <div @click="navigate('/guild/home')"><span class="link">Guild Home</span></div>
          <!-- <RouterLink to="/guild/news"><span class="link">News</span></RouterLink> -->
          <div @click="navigate('/guild/forums')"><span class="link">Forums</span></div>
          <div @click="navigate('/guild/roster')" ><span class="link">Roster</span></div>
          <!-- <RouterLink to="/guild/tasks"><span class="link">Tasks</span></RouterLink>
          <RouterLink to="/guild/about"><span class="link">About</span></RouterLink> -->
          <div @click="navigate('/guild/calendar')"><span class="link">Calendar</span></div>
          <div @click="navigate('/guild/verra')"><span class="link">Map</span></div>
        </div>
      </div>
      <div class="login-profile-container uk-width-small">
        <div class="uk-flex uk-flex-right">
          <div v-if="!store.getAuthenticated" class="not-logged-in">
            <div @click="navigate('/login')" class="text-default">
              <div class="uk-flex uk-flex-column uk-text-center">
                <span class="text-default" uk-icon="icon: user"></span>
                <span class="text-primary">Login</span>
              </div>
            </div>
          </div>
          <div
            v-if="store.getAuthenticated"
            class="logged-in"
            uk-dropnav="mode: hover; offset: 50">
            <ul class="uk-margin-remove">
              <div class="uk-flex uk-flex-column uk-text-center">
                <span uk-icon="icon: user" class="text-default"></span>
                <span class="text-primary uk-margin-remove">{{ displayUserInfo() }}</span>
              </div>
              <div class="uk-dropdown uk-background-secondary goa-dropnav">
                <ul class="uk-nav uk-dropdown-nav uk-flex uk-flex-middle uk-flex-column uk-width-1-1">
                  <!-- <li class="uk-active"><a href="#">Active</a></li> -->
                  <!-- <li class="">
                    <RouterLink to="/guild/about">
                      <span class="">
                        Settings
                      </span>
                    </RouterLink>
                  </li> -->
                  <li>
                    <div @click="navigate('/profile')">
                      <span class="text-primary user-link">
                        Profile
                      </span>
                    </div>
                  </li>
                  <li>
                    <div @click="navigate('/')">
                      <span class="text-primary user-link" @click="logout">
                          Log Out
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
  <div class="mobile-menu goa-container-no-radius uk-hidden@m" uk-sticky="start: 0">
    <div class="uk-flex uk-flex-between uk-flex-middle">
      <div class="remove-background uk-margin-right " @click="goHome">
        <img class="logo" src="../public/Images/GoALogoFinalShadow.png" alt="LOGO" />
      </div>
      <div @click="toggleMobileNav" class="mobile-menu-toggle grid">
        <div class="box box1"></div>
        <div class="box box2"></div>
        <div class="box box3"></div>
        <div class="box box4"></div>
      </div>
    </div>
    <div v-if="showMobileNav" class="mobile-sub-nav uk-padding uk-padding-remove-horizontal uk-hidden@m uk-margin-top uk-flex uk-flex-around">
      <div class="">
        <div v-if="!store.getAuthenticated || !store.getGuildID" class="page-links-container uk-link uk-width-1-1">
          <div class="uk-margin-bottom">
            <div @click="navigate('/guilds')">
              <span class="link">Browse Guilds</span>
            </div>
          </div>
        </div>
        <div v-if="store.getAuthenticated" class="uk-flex uk-flex-around">
          <div class="uk-flex uk-flex-column uk-flex-middle">
            <div class="dev-links uk-margin-small-bottom">
              <div @click="navigate('/feedback')">
                <span class="goa-button">Feedback</span>
              </div>
            </div>
            <div v-if="store.getGuildID" class="uk-flex uk-flex-column uk-flex-center">
              <div @click="navigate('/guild/home')" ><span class="link">Guild Home</span></div>
              <!-- <RouterLink to="/guild/news"><span class="link">News</span></RouterLink> -->
              <div @click="navigate('/guild/forums')" ><span class="link">Forums</span></div>
              <div @click="navigate('/guild/roster')"><span class="link">Roster</span></div>
              <!-- <RouterLink to="/guild/tasks"><span class="link">Tasks</span></RouterLink>
              <RouterLink to="/guild/about"><span class="link">About</span></RouterLink> -->
              <div @click="navigate('/guild/calendar')"><span class="link">Calendar</span></div>
              <div @click="navigate('/guild/verra')"><span class="link">Map</span></div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div v-if="!store.getAuthenticated" @click="navigate('/login')" class="text-primary">
          <div class="uk-flex uk-flex-column uk-text-center">
            <span class="text-default" uk-icon="icon: user"></span>
            <span class="text-primary">Login</span>
          </div>
        </div>
        <div v-if="store.getAuthenticated" class="uk-flex uk-flex-column uk-flex-middle">
          <div class="uk-flex uk-flex-column uk-text-center">
            <span uk-icon="icon: user" class="text-default"></span>
            <span class="text-primary uk-margin-remove">{{ displayUserInfo() }}</span>
          </div>
          <div>
            <div class=" uk-flex uk-flex-center uk-flex-column">
              <div @click="navigate('/profile')" class="uk-margin-small-top">
                <span class="uk-align-center uk-margin-small text-primary">
                  Profile
                </span>
              </div>
              <div @click="navigate('/')" class="uk-margin-small-top">
                <span class="uk-align-center uk-margin-small text-primary uk-margin-remove-bottom" @click="logout">
                    Log Out
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
