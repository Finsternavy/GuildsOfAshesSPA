import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  
  let user = JSON.parse(localStorage.getItem("User")) ? JSON.parse(localStorage.getItem("User")) : "";

  let authenticated = false;

  let setUser = (userID, username, password, email, guildID, guildName, role, subclass, primary, secondary, prof1, prof2) => {
    setUserID(userID);
    setUsername(username);
    setUserPassword(password)
    setUserEmail(email);
    setUserGuildID(guildID);
    setUserGuildName(guildName);
    setUserRole(role);
    setUserSubclass(subclass);
    setUserPrimary(primary);
    setUserSecondary(secondary);
    setUserProfession1(prof1);
    setUserProfession2(prof2);
  };

  let setUserFromStorage = (temp) => {
    user = temp;
  }

  let removeUser = () => {
    user = null;
  }

  let getUser = () => {
    if (localStorage.getItem("User")) user = JSON.parse(localStorage.getItem("User"));
    return user;
  }

  let setUsername = (username) => {
    user.Username = username;
  }

  let getUsername = () => {
    return user.Username;
  }

  let getUserEmail = () => {
    return user.Email;
  }

  let setUserEmail = (email) => {
    user.Email = email;
  }

  let getUserPassword = () => {
    return user.Password;
  }

  let setUserPassword = (password) => {
    user.Password = password
  }

  let getUserRole = () => {
    return user.Role;
  }

  let setUserRole = (role) => {
    user.Role = role;
  }

  let getUserID = () => {
    return user.UserID;
  }

  let setUserID = (userID) => {
    user.UserID = userID;
  }
  
  let getUserGuildID = () => {
    return user.GuildID;
  }

  let setUserGuildID = (guildID) => {
    user.GuildID = guildID;
  }

  let getUserGuildName = () => {
    return user.GuildName;
  }

  let setUserGuildName = (guildName) => {
    user.GuildName = guildName;
  }

  let setUserSubclass = (subclass) => {
    user.Subclass = subclass;
  }

  let getUserSubclass = () => {
    return user.Subclass;
  }

  let setUserPrimary = (primary) => {
    user.Primary = primary;
  }

  let getUserPrimary = () => {
    return user.Primary;
  }

  let setUserSecondary = (secondary) => {
    user.Secondary = secondary;
  }

  let getUserSecondary = () => {
    return user.Secondary;
  }

  let setUserProfession1 = (profession_1) => {
    user.Profession1 = profession_1;
  }

  let getUserProfession1 = () => {
    return user.Profession1;
  }

  let setUserProfession2 = (profession_2) => {
    user.Profession2 = profession_2;
  }

  let getUserProfession2 = () => {
    return user.Profession2;
  }

  let setAuthenticated = (authenticated) => {
    authenticated = authenticated;
  }

  let getAuthenticated = () => {
    return authenticated;
  }


  return { 
    user, 
    authenticated, 
    setUser,
    setUserFromStorage,
    removeUser,
    getUser, 
    getUserID,
    setUserID,
    getUsername,
    setUsername,
    getUserEmail,
    setUserEmail,
    getUserPassword,
    setUserPassword,
    getUserRole,
    setUserRole,
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
    setAuthenticated,
    getAuthenticated
   }
})
