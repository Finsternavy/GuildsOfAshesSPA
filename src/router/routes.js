import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../components/Login.vue';
import Guilds from '../views/Guilds.vue';
import MyGuild from '../views/MyGuild.vue';
import GuildHome from '../views/GuildHome.vue';
import CreateGuild from '../views/CreateGuild.vue';
import Roster from '../views/Roster.vue';
import Tasks from '../views/Tasks.vue';
import Forums from '../views/Forums.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home',  component: Home },
    { path: '/guilds', name: 'guilds',  component: Guilds },
    { path: '/login', name: 'login',  component: Login },
    { path: '/guild/create', name: 'guild-create',  component: CreateGuild },
    { path: '/guild/home', name: 'guild-home',  component: GuildHome },
    { path: '/guild/news', name: 'guild-news',  component: MyGuild },
    { path: '/guild/forums', name: 'guild-forum',  component: Forums },
    { path: '/guild/roster', name: 'guild-roster',  component: Roster },
    { path: '/guild/tasks', name: 'guild-tasks',  component: Tasks },
    { path: '/guild/about', name: 'guild-about',  component: MyGuild },
    { path: '/guild/calendar', name: 'guild-calendar',  component: MyGuild },
  ]
})

export default router
