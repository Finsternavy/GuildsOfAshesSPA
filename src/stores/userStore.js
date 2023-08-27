import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  let user = ref({
    username : '',
    email: '',
    userID: '',
    guildID: '',
    guildName: '',
    subclass: '',
    primary: '',
    secondary: '',
    profession_1: '',
    profession_2: '',
    authenticated: false
  });

  let authenticated = ref(false);

  let setUser = (newUserName, newEmail, newUserID) => {
    setUsername(newUserName);
    setUserEmail(newEmail);
    setUserID(newUserID);
    setUserAuthenticationStatus(true);
  };

  let removeUser = () => {
    setUsername(''),
    setUserID(''),
    setUserEmail(''),
    setUserGuildID(''),
    setUserGuildName(''),
    setUserSubclass(''),
    setUserPrimary(''),
    setUserSecondary(''),
    setUserProfession1(''),
    setUserProfession2(''),
    setUserAuthenticationStatus(''),
    setAuthenticated(false)
  }

  let getUser = () => {
    return user.value;
  }

  let setUsername = (username) => {
    user.value.username = username;
  }

  let getUsername = () => {
    return user.value.username;
  }

  let getUserEmail = () => {
    return user.value.email;
  }

  let setUserEmail = (email) => {
    user.value.email = email;
  }

  let getUserID = () => {
    return user.value.userID;
  }

  let setUserID = (userID) => {
    user.value.userID = userID;
  }
  
  let getUserGuildID = () => {
    return user.value.guildID;
  }

  let setUserGuildID = (guildID) => {
    user.value.guildID = guildID;
  }

  let getUserGuildName = () => {
    return user.value.guildName;
  }

  let setUserGuildName = (guildName) => {
    user.value.guildName = guildName;
  }

  let setUserSubclass = (subclass) => {
    user.value.subclass = subclass;
  }

  let getUserSubclass = () => {
    return user.value.subclass;
  }

  let setUserPrimary = (primary) => {
    user.value.primary = primary;
  }

  let getUserPrimary = () => {
    return user.value.primary;
  }

  let setUserSecondary = (secondary) => {
    user.value.secondary = secondary;
  }

  let getUserSecondary = () => {
    return user.value.secondary;
  }

  let setUserProfession1 = (profession_1) => {
    user.value.profession_1 = profession_1;
  }

  let getUserProfession1 = () => {
    return user.value.profession_1;
  }

  let setUserProfession2 = (profession_2) => {
    user.value.profession_2 = profession_2;
  }

  let getUserProfession2 = () => {
    return user.value.profession_2;
  }

  let setUserAuthenticationStatus = (authenticated) => {
    user.value.authenticated = authenticated;
  }

  let getUserAuthenticationStatus = () => {
    return user.value.authenticated;
  }

  let setAuthenticated = (authenticated) => {
    authenticated.value = authenticated;
  }

  let getAuthenticated = () => {
    return authenticated.value;
  }


  return { 
    user, 
    authenticated, 
    setUser,
    removeUser,
    getUser, 
    getUserID,
    setUserID,
    getUsername,
    setUsername,
    getUserEmail,
    setUserEmail,
    getUserGuildID,
    setUserGuildID,
    getUserGuildName,
    setUserGuildName,
    getUserSubclass,
    setUserSubclass,
    getUserPrimary,
    setUserPrimary,
    getUserSecondary,
    setUserSecondary,
    getUserProfession1,
    setUserProfession1,
    getUserProfession2,
    setUserProfession2,
    getUserAuthenticationStatus,
    setUserAuthenticationStatus,
    setAuthenticated,
    getAuthenticated
   }
})
