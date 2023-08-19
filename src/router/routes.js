import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../components/Login.vue';
import Guilds from '../views/Guilds.vue';
import MyGuild from '../views/MyGuild.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home',  component: Home },
    { path: '/guilds', name: 'guilds',  component: Guilds },
    { path: '/login', name: 'login',  component: Login },
    { path: '/guild/home', name: 'guild-home',  component: MyGuild },
    { path: '/guild/news', name: 'guild-news',  component: MyGuild },
    { path: '/guild/forums', name: 'guild-forum',  component: MyGuild },
    { path: '/guild/roster', name: 'guild-roster',  component: MyGuild },
    { path: '/guild/apply', name: 'guild-apply',  component: MyGuild },
    { path: '/guild/about', name: 'guild-about',  component: MyGuild },
    { path: '/guild/calendar', name: 'guild-calendar',  component: MyGuild },
  ]
})

export default router
