import { defineStore } from 'pinia'

export let useUserStore = defineStore('userStore', {

  state: () => ({
    user: localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")) : null,
    authenticated: localStorage.getItem("authenticated") ? true : false,
    guildID: localStorage.getItem("guildID") ? localStorage.getItem("guildID") : null
  }),

  getters: {
    getUser: (state) => state.user,
    getAuthenticated: (state) => state.authenticated,
    getUsername: (state) => state.user['Username'],
    getGuildID: (state) => state.user['GuildID'],
    getGuildRole: (state) => state.user['Rank']['RankName'],
    getUserID: (state) => state.user['UserID'],
    getEmail: (state) => state.user['Email'],
    getGuildName: (state) => state.user['GuildName'],
    getSubclass: (state) => state.user['Subclass'],
    getPrimary: (state) => state.user['Primary'],
    getSecondary: (state) => state.user['Secondary'],
    getProfession1: (state) => state.user['Profession1'],
    getProfession2: (state) => state.user['Profession2'],
  },

  actions: {
    setUser(user) {
      localStorage.setItem("User", JSON.stringify(user));
      localStorage.setItem("authenticated", true);
        localStorage.setItem("guildID", user.GuildID);
      this.user = user;
    },
    setAuthenticated(val) {
      this.authenticated = val;
    },
    setGuildID(val) {
      localStorage.setItem("guildID", val);
      this.guildID = val;
    },
    removeUser() {
      // this.user = '',
      localStorage.removeItem("User");
      localStorage.removeItem("authenticated");
      localStorage.removeItem("guildID");
      this.user = null,
      this.authenticated = false;
    },
    // getUsername() {
    //   if (this.user){
    //     return this.user.Username;
    //   }
    // }

  }
})
