import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const user = ref({
    username : '',
    email: '',
    password: '',
    guild: 'aetherius'
  })
  const authenticated = ref(false)
  const setUser = (newUserName, newEmail, newPassword) => {
    user = {
      username : newUserName, 
      email: newEmail, 
      password: newPassword
    };
  };

  const getUser = () => {
    return user;
  }

  const setAuthenticated = (trueOrFalse) => {
    authenticated.value = trueOrFalse;
  }

  const getAuthenticated = () => {
    return authenticated;
  }



  return { user, authenticated, setUser, getUser, setAuthenticated, getAuthenticated }
})
