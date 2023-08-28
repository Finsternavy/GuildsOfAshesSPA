import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  
  let user = ref({
    // Username : '',
    // Password: '',
    // Email: '',
    // UserID: '',
    // GuildID: '',
    // GuildName: '',
    // Role: '',
    // Subclass: '',
    // Primary: '',
    // Secondary: '',
    // Profession1: '',
    // Profession2: ''
  });

  let authenticated = ref(false);

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
    user.value = temp;
  }

  let removeUser = () => {
    setUsername('');
    setUserID('');
    setUserEmail('');
    setUserPassword('');
    setUserRole('');
    setUserGuildID('');
    setUserGuildName('');
    setUserSubclass('');
    setUserPrimary('');
    setUserSecondary('');
    setUserProfession1('');
    setUserProfession2('');
    setAuthenticated(false);
  }

  let getUser = () => {
    return user.value;
  }

  let setUsername = (username) => {
    user.value.Username = username;
  }

  let getUsername = () => {
    return user.value.Username;
  }

  let getUserEmail = () => {
    return user.value.Email;
  }

  let setUserEmail = (email) => {
    user.value.Email = email;
  }

  let getUserPassword = () => {
    return user.value.Password;
  }

  let setUserPassword = (password) => {
    user.value.Password = password
  }

  let getUserRole = () => {
    return user.value.Role;
  }

  let setUserRole = (role) => {
    user.value.Role = role;
  }

  let getUserID = () => {
    return user.value.UserID;
  }

  let setUserID = (userID) => {
    user.value.UserID = userID;
  }
  
  let getUserGuildID = () => {
    return user.value.GuildID;
  }

  let setUserGuildID = (guildID) => {
    user.value.GuildID = guildID;
  }

  let getUserGuildName = () => {
    return user.value.GuildName;
  }

  let setUserGuildName = (guildName) => {
    user.value.GuildName = guildName;
  }

  let setUserSubclass = (subclass) => {
    user.value.Subclass = subclass;
  }

  let getUserSubclass = () => {
    return user.value.Subclass;
  }

  let setUserPrimary = (primary) => {
    user.value.Primary = primary;
  }

  let getUserPrimary = () => {
    return user.value.Primary;
  }

  let setUserSecondary = (secondary) => {
    user.value.Secondary = secondary;
  }

  let getUserSecondary = () => {
    return user.value.Secondary;
  }

  let setUserProfession1 = (profession_1) => {
    user.value.Profession1 = profession_1;
  }

  let getUserProfession1 = () => {
    return user.value.Profession1;
  }

  let setUserProfession2 = (profession_2) => {
    user.value.Profession2 = profession_2;
  }

  let getUserProfession2 = () => {
    return user.value.Profession2;
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
