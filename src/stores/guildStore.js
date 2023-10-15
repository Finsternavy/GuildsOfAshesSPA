import { defineStore } from 'pinia'

export let useGuildStore = defineStore('guildStore', {

  state: () => ({
    Guild: {

    }
  }),

  getters: {
    getGuild: (state) => state.Guild,
    getGuildID: (state) => state.Guild.GuildID,
    getGuildName: (state) => state.Guild.Name,
    getGuildBackground: (state) => state.Guild.Background,
    getGuildCategory: (state) => state.Guild.Category,
    getGuildFocus: (state) => state.Guild.Focus,
    getGuildDescription: (state) => state.Guild.Description,
    getGuildLogo: (state) => state.Guild.Logo,
    getGuildLogoBorder: (state) => state.Guild.LogoBorder,
    getPrimaryRace: (state) => state.Guild.PrimaryRace,
    getRegion: (state) => state.Guild.Region,
    getXP: (state) => state.Guild.XP,
    getAlerts: (state) => state.Guild.Alerts,
    getMembers: (state) => state.Guild['MemberList'],
    getApplications: (state) => state.Guild.Applications,
    getLeader: (state) => state.Guild.Leader,
    getTasks: (state) => state.Guild.Tasks,
    getEvents: (state) => state.Guild.Events,
    getColors: (state) => state.Guild.Colors,
  },

  actions: {
    async setGuild(guild) {
        this.Guild = guild;
    },
    setGuildBackground(val) {
        this.guild.Background = val;
    },
    setAlerts(alerts) {
        this.alerts = alerts;
    },
    setMembers(members) {
        this.members = members;
    },
    setApplications(applications) {
        this.applications = applications;
    },
    setLeader(leader) {
        this.leader = leader;
    },
    setTasks(tasks) {
        this.tasks = tasks;
    },
    setGuildID(val) {
        this.guild.guildID = val;
    },
    setGuildName(val) {
        this.guild.guildName = val;
    },
    setGuildCategory(val) {
        this.guild.guildCategory = val;
    },
    setGuildFocus(val) {
        this.guild.guildFocus = val;
    },
    setGuildDescription(val) {
        this.guild.guildDescription = val;
    },
    setGuildLogo(val) {
        this.guild.guildLogo = val;
    },
    setGuildLogoBorder(val) {
        this.guild.guildLogoBorder = val;
    },
    setPrimaryRace(val) {
        this.guild.PrimaryRace = val;
    },
    setRegion(val) {
        this.guild.Region = val;
    },
    setXP(val) {
        this.guild.XP = val;
    },
    removeGuild() {
        this.guild = null;
    }
  }
})
