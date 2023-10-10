import { defineStore } from 'pinia'

export let useAPI = defineStore('api', {

  state: () => ({
    baseURL: 'https://goabackend.azurewebsites.net/', // development deployment URL
    // baseURL: 'http://localhost:5229/',    // local deployment URL
  }),

  getters: {
    getAPI: (state) => state.baseURL,
  },

  actions: {
  }
})
