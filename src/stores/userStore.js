import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {

  state: () => ({
    user: localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")) : null,
    authenticated: localStorage.getItem("authenticated") ? true : false
  }),

  getters: {
    getUser: (state) => state.user,
    getAuthenticated: (state) => state.authenticated,
    getUsername: (state) => state.user['Username'],
  },

  actions: {
    setUser(user) {
      localStorage.setItem("User", JSON.stringify(user));
      localStorage.setItem("authenticated", true);
      this.user = user;
    },
    setAuthenticated(val) {
      this.authenticated = val;
    },
    removeUser() {
      // this.user = '',
      localStorage.removeItem("User");
      localStorage.removeItem("authenticated");
      this.user = null,
      this.authenticated = false;
    },
    // getUsername() {
    //   if (this.user){
    //     return this.user.Username;
    //   }
    // }

  }
  
  // let authenticated = ref(false);

  // let setUser = (user) => {
  //   localStorage.setItem("User", user);
  // };

  // let setUserFromStorage = (temp) => {
  //   user = temp;
  // }

  // let removeUser = () => {
  //   user = null;
  // }

  // let getUser = () => {
  //   if (localStorage.getItem("User")) user = JSON.parse(localStorage.getItem("User"));
  //   return user;
  // }

  // let setUsername = (username) => {
  //   user.Username = username;
  // }

  // let getUsername = () => {
  //   return user.Username;
  // }

  // let getUserEmail = () => {
  //   return user.Email;
  // }

  // let setUserEmail = (email) => {
  //   user.Email = email;
  // }

  // let getUserPassword = () => {
  //   return user.Password;
  // }

  // let setUserPassword = (password) => {
  //   user.Password = password
  // }

  // let getUserRole = () => {
  //   return user.Role;
  // }

  // let setUserRole = (role) => {
  //   user.Role = role;
  // }

  // let getUserID = () => {
  //   return user.UserID;
  // }

  // let setUserID = (userID) => {
  //   user.UserID = userID;
  // }
  
  // let getUserGuildID = () => {
  //   return user.GuildID;
  // }

  // let setUserGuildID = (guildID) => {
  //   user.GuildID = guildID;
  // }

  // let getUserGuildName = () => {
  //   return user.GuildName;
  // }

  // let setUserGuildName = (guildName) => {
  //   user.GuildName = guildName;
  // }

  // let setUserSubclass = (subclass) => {
  //   user.Subclass = subclass;
  // }

  // let getUserSubclass = () => {
  //   return user.Subclass;
  // }

  // let setUserPrimary = (primary) => {
  //   user.Primary = primary;
  // }

  // let getUserPrimary = () => {
  //   return user.Primary;
  // }

  // let setUserSecondary = (secondary) => {
  //   user.Secondary = secondary;
  // }

  // let getUserSecondary = () => {
  //   return user.Secondary;
  // }

  // let setUserProfession1 = (profession_1) => {
  //   user.Profession1 = profession_1;
  // }

  // let getUserProfession1 = () => {
  //   return user.Profession1;
  // }

  // let setUserProfession2 = (profession_2) => {
  //   user.Profession2 = profession_2;
  // }

  // let getUserProfession2 = () => {
  //   return user.Profession2;
  // }

  // function setAuthenticated (authenticated) {
  //   authenticated.value = authenticated;
  // }

  // function getAuthenticated() {
  //   return authenticated.value;
  // } 


  // return { 
  //   user, 
  //   authenticated, 
  //   setUser,
  //   setUserFromStorage,
  //   removeUser,
  //   getUser, 
  //   getUserID,
  //   setUserID,
  //   getUsername,
  //   setUsername,
  //   getUserEmail,
  //   setUserEmail,
  //   getUserPassword,
  //   setUserPassword,
  //   getUserRole,
  //   setUserRole,
  //   getUserGuildID,
  //   setUserGuildID,
  //   getUserGuildName,
  //   setUserGuildName,
  //   getUserSubclass,
  //   setUserSubclass,
  //   getUserPrimary,
  //   setUserPrimary,
  //   getUserSecondary,
  //   setUserSecondary,
  //   getUserProfession1,
  //   setUserProfession1,
  //   getUserProfession2,
  //   setUserProfession2,
  //   setAuthenticated,
  //   getAuthenticated
  //  }
})
