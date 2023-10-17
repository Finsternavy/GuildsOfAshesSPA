<script setup>
import { onMounted, onBeforeMount, ref, watch, computed } from "vue";
import { useUserStore } from "../stores/userStore";
import { useGuildStore } from "../stores/guildStore";
import { useAPI } from '../stores/apiStore';
import router from "../router/routes";
import Day from "../components/Day.vue";
import EventCreationTool from "../components/EventCreationTool.vue";

let store = useUserStore();
let guildStore;
let user = ref();
let api = useAPI();
let baseURL = api.getAPI + 'Guilds';

let showEventCreationModal = ref(false);
let activeMonth = ref(null);
let activeDay = ref(null);
let activeDate = ref(null);

let showEventDetails = ref(false);
let activeEventDetails = ref(null);

onBeforeMount(()=> {
  user.value = store.getUser;
  guildStore = useGuildStore();
  getEvents();
})

// event model
let events = ref([]);

let dataIn = computed(() => {
  // console.log("Setting data in", activeMonth.value, activeDay.value, activeDate.value)
    return {
        activeMonth: activeMonth.value,
        activeDay: activeDay.value,
        activeDate: activeDate.value,
    }
})

const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

const days = [
    "Sun", "Mon", "Tues", "Wed",
    "Thur", "Fri", "Sat"
];

const showMobileDay = ref(false);
const activeEventData = ref({
  data: [],
  date: null,
  day: null,
});

const month = computed(() => {
    let date = new Date().getMonth();
    // let month = data.getMonth();
    // console.log(date);
    return date;
})

const today = computed(() => {
    let date = new Date().getDate();
    // let month = data.getMonth();
    // console.log(date);
    return date;
})

const getEvents = async () => {
  // console.log("Fetching guild data..");
  let guildID = localStorage.getItem("guildID");
  // console.log("Guild ID: ", guildID);
  let call = {
    GuildID: guildID,
  }
  let response = await fetch(baseURL + "/getEvents", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
    },
    body: JSON.stringify( call),
  });

  if (response.ok) {
    let data = await response.json();
    // console.log("Guild data: ", data);
    events.value = data.Data;
    if (events.value.length < 1){
      events.value = [];
    }
    // sortMembers();

  } else {
    // console.log("Error fetching thread data: ", response.statusText);
  }
}

const getCurrentMonthAsString = (offset) => {
// console.log("Offset: ", offset);
  const today = new Date();
  const currentMonthIndex = today.getMonth();
  const currentMonth = months[currentMonthIndex + offset];
    // console.log(currentMonth)
  return currentMonth;
}


const generateCalendar = (year, month) => {
  const calendarArray = [];

  // Create a Date object for the 1st day of the specified month and year
  const firstDayOfMonth = new Date(year, month - 1, 1);
//   console.log("First day of month: ", firstDayOfMonth);
  const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // Calculate the number of empty entries to insert at the beginning
  const emptyEntriesAtStart = (firstDayOfWeek);
//   console.log("Empty entries at start: ", emptyEntriesAtStart);

  // Calculate the number of days in the specified month and year
  const daysInMonth = new Date(year, month, 0).getDate();
//   console.log("Days in month: ", daysInMonth);

  // Populate the calendarArray with empty entries at the beginning
  for (let i = 0; i < emptyEntriesAtStart; i++) {
    calendarArray.push(null);
  }

  // Populate the calendarArray with the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarArray.push({ day: day, month: month, year: year });
  }

  // Calculate the number of empty entries to insert at the end to ensure it ends on Saturday
  const emptyEntriesAtEnd = (7 - (calendarArray.length % 7)) % 7;

  // Populate the calendarArray with empty entries at the end
  for (let i = 0; i < emptyEntriesAtEnd; i++) {
    calendarArray.push(null);
  }
  return calendarArray;
}

const currentDate = computed(() => {
  const today = new Date();
  let day = today.getDate();
  if (day.length == 1){
    day = "0" + day;
  }
  // console.log("Current date: ", today.getMonth());
  return {
    month: today.getMonth() + 1, // Add 1 because months are 0-based
    day: day,
    year: today.getFullYear(),
  };
});

const createEvent = (date) => {
  setActiveDay(date);
  // console.log("Date: ", date);
  if (showMobileDay.value == true) {
    showMobileDay.value = false;
  }
  showEventCreationModal.value = true;
}

const close = () => {
    showEventCreationModal.value = false;
}

const addEvent = async (data) => {
    // events.value.push(data);
    showEventCreationModal.value = false;
    data.RecurringFrequency = 0;
    // console.log("Adding event: ", data);

    // console.log("Fetching guild data..");
  let guildID = localStorage.getItem("guildID");
  // console.log("Guild ID: ", guildID);
  let call = {
    GuildID: guildID,
    GuildEvent: data
  }
  let response = await fetch(baseURL + "/addEvent", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
    },
    body: JSON.stringify( call),
  });

  if (response.ok) {
    let data = await response.json();
    // console.log("Guild data: ", data);
    getEvents();
    // sortMembers();

  } else {
    // console.log("Error fetching thread data: ", response.statusText);
  }
}

const addRecurringEvents = async (data) => {
    // events.value.push(data);
    showEventCreationModal.value = false;
    // console.log("Adding event: ", data);

    // console.log("Fetching guild data..");
  let guildID = localStorage.getItem("guildID");
  // console.log("Guild ID: ", guildID);
  let call = {
    GuildID: guildID,
    GuildEvents: data
  }
  let response = await fetch(baseURL + "/addRecurringEvent", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
    },
    body: JSON.stringify( call),
  });

  if (response.ok) {
    let data = await response.json();
    // console.log("Guild data: ", data);
    getEvents();
    // sortMembers();

  } else {
    // console.log("Error fetching thread data: ", response.statusText);
  }
}

const addRecurringEvent = (data) => {
  // console.log("Data from recurring event: ", data);
  let startDate = new Date(data.StartDate);
  startDate.setDate(startDate.getDate() + 1);
  let endDate = new Date(data.RecurringEndDate);
  endDate.setDate(endDate.getDate() + 2);
  // console.log("Start date: ", startDate);
  // console.log("End date: ", endDate);
  let frequency = 0;
  if (data.RecurringFrequency == 'daily'){
    frequency = 1;
  } else if (data.RecurringFrequency == 'weekly'){
    frequency = 7;
  } else if (data.RecurringFrequency == 'biweekly'){
    frequency = 14;
  } 
  let eventsToAdd = [];
  // based on the frequency, add events to the array until the end date is reached
  while (startDate <= endDate){
    let event = {
      EventType: data.EventType,
      Organizer: data.Organizer,
      Title: data.Title,
      Content: data.Content,
      StartDate: startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(),
      StartTime: data.StartTime,
      EndDate: startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(),
      EndTime: data.EndTime,
      Attending: [],
      Canceled: false,
    }
    eventsToAdd.push(event);
    startDate.setDate(startDate.getDate() + frequency);
  }
  // console.log("Events to add: ", eventsToAdd);
  addRecurringEvents(eventsToAdd);
}

const getDayData = (day) => {
  // console.log("Get day data: ", day);
  if (day != null){
    let date = day.year + "-" + day.month + "-" + day.day;
      // console.log("Day: ", date);
      let data = [];
      events.value.forEach(event => {
        // console.log("Event: ", event.StartDate)
        // console.log("Compared to date: ", date);
        if (event.StartDate == date){
          // console.log("Pushing: ", event.StartDate);
          data.push(event);
        }
      });
      // console.log("Data: ", data);
      return data;
  }
}


const setEventDetails = (event) => {
    // console.log("Event: ", event);
    // console.log("Event startdate: ", event.StartDate);
    let startDate = event.StartDate;
    // console.log("Day string: ", startDate.substring(startDate.length - 2, startDate.length));
    if (startDate.substring(startDate.length - 2, startDate.length).startsWith("-")){
      // console.log("Single digit day")
      event.StartDate = startDate.substring(0, startDate.length - 1) + "0" + startDate.substring(startDate.length - 1, startDate.length);
    }
    activeEventDetails.value = event;
    showEventDetails.value = true;
}

const openEventDetails = () => {
    // console.log("Opening event details");
    showEventDetails.value = true;
}

const addUserToAttending = async () => {
  if (activeEventDetails.value.Attending.includes(user.value.Username)){
    alert("You are already attending this event");
    return;
  }
  activeEventDetails.value.Attending.push(user.value.Username);

  updateEvent(activeEventDetails.value);
}

const updateEvent = async (eventToUpdate) => {
  let guildEvent = eventToUpdate;

  let guildID = localStorage.getItem("guildID");
  // console.log("Guild ID: ", guildID);
  let call = {
    GuildID: guildID,
    GuildEvent: guildEvent
  }
  let response = await fetch(baseURL + "/updateEvent", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
    },
    body: JSON.stringify( call),
  });

  if (response.ok) {
    let data = await response.json();
    // console.log("Guild data: ", data);
    getEvents();
    // sortMembers();

  } else {
    // console.log("Error fetching thread data: ", response.statusText);
  }
}

const cancelEvent = () => {
  activeEventDetails.value.Canceled = true;
  updateEvent(activeEventDetails.value);
}

const setActiveDay = (date, index) => {
  // let doc = document.getElementById(date + index);
  // if (doc.classList.contains("disabled")){
  //   return;
  // }
  let screenwidth = window.innerWidth;
  // console.log("Screen width: ", screenwidth);
      let monthText = months[date.month - 1];
      // console.log("Setting active date to: ", date)
      activeMonth.value = monthText;
      activeDay.value = date.day;
      activeDate.value = date;
      // console.log("activeDate: ", activeDate.value);
      // activeEventData.value.data = getDayData(date);
      // activeEventData.value.day = newData.day;
      // activeEventData.value.date = newData;
      // console.log("Active event data: ", activeEventData.value);
      // if (screenwidth < 960){
      if (screenwidth < 960){
        showMobileDay.value = true;
      }
  // showMobileDay.value = !showMobileDay.value;
}

// const showEventTool = () => {
//   showMobileDay.value = true;
// }

const closeMobilePopup = () => {
  showMobileDay.value = false;
}

</script>

<style scoped>
.calendar-container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
}

.bg-black {
    background-color: black;
}

.event-details-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform:translate(-50%, -50%);
    width: 600px;
    max-width: 90%;
    /* background-color: rgba(0, 0, 0, 0.5); */
    background-color: rgba(0, 0, 0, 1);
    z-index: 1000!important;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 550px;
    height: 700px;
    max-height: 70%;
    /* display: none; */
    /* visibility: hidden; */
    /* opacity: 0; */
    /* transition: all 0.3s ease-in-out; */
}
.day-container{
    position: relative;
    border: 2px solid gray;
    border-radius: 5px;
    margin: 5px;
    display: flex;
    min-height: 160px;
    height: auto;
    /* max-height: 160px; */
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.7);
    cursor: pointer;
}

/* .day-container:hover{
    border-color: var(--secondary-color);
} */

.day-number{
    border: 2px solid gray;
    border-left: none;
    border-top: none;
    aspect-ratio: 1;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--text-color);
    background-color: rgba(0, 0, 0, 0.7)!important;
}
textarea {
    resize: none;
}

.bg-transparent {
    background-color: transparent;
}

input, textarea {
    border: none;
}

.day-label{
    border: 1px solid var(--secondary-color);
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    top: -40px;
    color: var(--button-hover-text-color);
    background-color: var(--secondary-color);
}

.disabled {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    pointer-events: none!important;
}

.hidden {
    display: none;
}

.today {
    --w-alpha: var(--primary-color) + 'e6';
    border: 3px solid var(--primary-color)!important;
    background-color: var(--w-alpha)!important;
}

.past {
    color: var(--primary-color);
    --w-alpha: var(--primary-color) + 'e6';
    background-color: var(--w-alpha);
    pointer-events: none;
}

.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* grid-template-rows: 1fr; */
    grid-gap: 5px;
    padding: 5px;
}

.event-icon {
    position: relative;
    height: auto;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding: 5px; */
    aspect-ratio: 1;
    transition: border-radius 0.3s ease-in-out;
    /* border: 1px solid gray; */
}

/* .event-icon:hover {
    background-color: rgba(255, 255, 255, 0.3);
} */

.guild-play{
    border: 1px solid white;
    color: white;
    transition: border-radius 0.3s ease, background-color 0.3s ease;
    background-color: rgba(255, 115, 0, 1);  
}

.guild-play:hover {
    background-color: rgba(255, 146, 57, 1);
    border-radius: 50%;
}

.meeting {
    border: 1px solid white;
    color: black;
    transition: border-radius 0.3s ease, background-color 0.3s ease;
    background-color: rgba(255, 238, 0, 1);
}

.meeting:hover {
    background-color: rgba(255, 246, 126, 1);
    border-radius: 50%;
}

.deadline {
    border: 1px solid red;
    color: red;
    transition: border-radius 0.3s ease, background-color 0.3s ease;
    background-color: rgba(0, 0, 0, 1);
}

.deadline:hover {
    background-color: rgb(59, 59, 59);
    border-radius: 50%;
}

.startDate {
    border: 1px solid white;
    color: white;
    transition: border-radius 0.3s ease, background-color 0.3s ease;
    background-color: rgba(98, 146, 31, 1);
}

.startDate:hover {
    background-color: rgba(149, 255, 0, 0.5);
    border-radius: 50%;
}

.icon-container {
    transition: border-radius 0.3s ease;
}

.icon-container:hover > *  {
    background-color: rgba(255, 255, 255, 0.1);
    overflow: hidden;
    border-radius: 50%;
}

.uk-position-absolute {
    width: 100vw;
}

.add-event-button {
    /* background-color: white; */
    border: 1px solid var(--primary-color);
    border-top: none;
    border-right: none;
    /* border-radius: 0 0 0 50%; */
    padding: 7px 7px 7px 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--primary-color);
    transition: background-color 0.3s ease, color 0.3s ease;
}

.add-event-button:hover {
    background-color: var(--secondary-color);
    color: white;
   
}

.day-container {
    max-height: fit-content;
}

.canceled {
    position: absolute;
    font-weight: 900;
    color: red;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    transition: background-color 0.3s ease, color 0.3s ease;
    pointer-events: none;
}

.canceled-icon {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    transition: background-color 0.3s ease, color 0.3s ease;
}

.canceled:hover {
    background-color: rgba(255, 255, 255, 0.4);
    /* color: white; */
}

.mobile-day-container {
    padding: 2px;
}
.day-mobile {
    border: 1px solid var(--secondary-color);
}

.popup-day {
  background-color: black;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 70%;
  width: 300px;
  max-height: fit-content;
  min-height: 300px;
}

.calendar-title {
  border-radius: 20px 20px 0 0;
  overflow: hidden;
}
</style>

<template>
  <div class="">
    <div class="goa-container uk-padding-small uk-margin-large-bottom ">
      <h1 class="calendar-title goa-container-no-radius uk-padding-small text-goa-red uk-text-center uk-margin-bottom">{{ getCurrentMonthAsString(0) }}</h1>
      <div class="uk-flex uk-flex-around uk-width-1-1 text-default">
        <div v-for="day in days" class="day-label uk-width-1-1 uk-text-center border-black">{{ day }}</div>
      </div>
      <div class="calendar-container">
        <!-- @click="openMenu(date, 10)" -->
        <div v-for="date, index in generateCalendar(2023, 10)" @click="setActiveDay(date)" :class="{'disabled' : !date}">
          <Day v-model="events" :Data="getDayData(date)" :setEventDetails="setEventDetails" :createEvent="createEvent" :Index="index" :Date="date" :DayText="days[index]" :Today="today"/>
        </div>
      </div>
    </div>
    <div class="goa-container uk-padding-small uk-margin-large-bottom">
      <h1 class="calendar-title goa-container-no-radius uk-padding-small text-goa-red uk-text-center uk-margin-bottom">{{ getCurrentMonthAsString(1) }}</h1>
      <div class="uk-flex uk-flex-around uk-width-1-1 text-default">
        <div v-for="day in days" class="day-label uk-width-1-1 uk-text-center border-black">{{ day }}</div>
      </div>
        <div class="calendar-container">
          <!-- @click="openMenu(date, 10)" -->
          <div v-for="date, index in generateCalendar(2023, 11)" @click="setActiveDay(date)">
            <Day  v-model="events" :Data="getDayData(date)" :setEventDetails="setEventDetails" :createEvent="createEvent" :Index="index" :Date="date" :DayText="days[index]"/>
          </div>
        </div>
    </div>
    <div class="goa-container uk-padding-small uk-margin-large-bottom">
      <h1 class="calendar-title goa-container-no-radius uk-padding-small text-goa-red uk-text-center uk-margin-bottom">{{ getCurrentMonthAsString(2) }}</h1>
      <div class="uk-flex uk-flex-around uk-width-1-1 text-default">
        <div v-for="day in days" class="day-label uk-width-1-1 uk-text-center border-black">{{ day }}</div>
      </div>
        <div class="calendar-container">
          <!-- @click="openMenu(date, 10)" -->
          <div v-for="date, index in generateCalendar(2023, 12)" @click="setActiveDay(date)">
            <Day v-model="events" :Data="getDayData(date)" :setEventDetails="setEventDetails" :createEvent="createEvent" :Index="index" :Date="date" :DayText="days[index]"/>
          </div>
        </div>
    </div>
  </div>
  <div v-if="showMobileDay" class="popup-day day-container uk-flex uk-flex-column" @click="showEventTool">
      <div class="uk-position-relative">
        <div class="uk-flex uk-flex-between">
            <div :class="{'uk-flex' : dataIn}">
                <span class="day-number">{{ dataIn.activeDay}}</span>
            </div>
            <div class="add-event-button" @click="createEvent(dataIn.activeDate)">
                <span class="uk-color-secondary" uk-icon="icon: plus; ratio: 1"></span>
            </div>
        </div>
        <div class="event-icon-container uk-flex uk-height-auto grid">
            <div v-for="event in getDayData(dataIn.activeDate)" @click="setEventDetails(event)" class="uk-text-center">
              <div v-if="event.EventType == 'guildPlay'"  class="guild-play-bg uk-position-relative">
                  <span :class="{'event-icon': {}, 'guild-play' : !event.Canceled, 'canceled-icon' : event.Canceled}" uk-icon="icon: play; ratio: 1"></span>
                  <span v-if="event.Canceled" class="canceled uk-width-1-1 uk-height-1-1" uk-icon="icon: ban; ratio: 5"></span>
              </div>
              <div v-if="event.EventType == 'meeting'" class="meeting-bg uk-position-relative">
                  <span :class="{'event-icon': {}, 'meeting' : !event.Canceled, 'canceled-icon' : event.Canceled}" uk-icon="icon: users; ratio: 1"></span>
                  <span v-if="event.Canceled" class="canceled uk-width-1-1 uk-height-1-1" uk-icon="icon: ban; ratio: 5"></span>
              </div>
              <div v-if="event.EventType == 'deadline'" class="deadline-bg uk-position-relative">
                  <span  :class="{' event-icon' : {}, 'deadline': !event.Canceled, 'canceled-icon' : event.Canceled}" uk-icon="icon: clock; ratio: 1"></span>
                  <span v-if="event.Canceled" class="canceled" uk-icon="icon: ban; ratio: 5"></span>
              </div>
              <div v-if="event.EventType == 'startDate'"  class="start-date-bg uk-position-relative">
                  <span :class="{' event-icon': {}, 'startDate' : !event.Canceled, 'canceled-icon' : event.Canceled}" uk-icon="icon: clock; ratio: 1"></span>
                  <span v-if="event.Canceled" class="canceled uk-width-1-1 uk-height-1-1" uk-icon="icon: ban; ratio: 5"></span>
              </div>
            </div>
        </div>
      </div>
      <div class="uk-margin-medium-top">
        <button @click="closeMobilePopup" class="goa-button-no-radius uk-position-bottom">Close</button>
      </div>
    </div>
    <div v-if="showEventDetails" class="goa-container uk-padding event-details-modal uk-flex uk-flex-column uk-child-width-1-1 uk-panel-scrollable" :hidden="!showEventDetails">
      <button @click="showEventDetails = false" class="goa-button uk-width-auto uk-position-top-right uk-margin-top uk-margin-right">Close</button>
      <h1 class="text-header uk-text-center uk-margin-remove-bottom">{{ activeEventDetails.Title }} </h1>
      <span v-if="activeEventDetails.Canceled" class="uk-text-center uk-margin-bottom uk-text-lead uk-text-warning">( Canceled )</span>
      <div class="uk-flex uk-child-width-1-2 uk-margin-top">
        <div class="uk-flex uk-flex-column uk-margin-small-right">
            <label class="text-accent" for="EventTypeDisplay">Event Type</label>
            <input class="goa-input" type="text" name="EventTypeDisplay" id="EventTypeDisplay" v-model="activeEventDetails.EventType">
        </div>
        <div class="uk-flex uk-flex-column">
            <label class="text-accent" for="EventOrganizer">Organizer</label>
            <input class="goa-input" type="text" name="EventOrganizer" id="EventOrganizer" v-model="activeEventDetails.Organizer">
        </div>
      </div>
      <div class="uk-flex uk-flex-column">
          <label class="text-accent" for="EventContent">Event Message</label>
          <textarea class="goa-input" name="EventContent" id="EventContent" cols="30" rows="10" v-model="activeEventDetails.Content"></textarea>
      </div>
      <div class="uk-flex uk-child-width-1-2">
          <div class="uk-flex uk-flex-column uk-margin-small-right">
              <label class="text-accent" for="EventStartDate">Start Date</label>
              <input class="goa-input" type="date" name="EventStartDate" id="EventStartDate" v-model="activeEventDetails.StartDate">
          </div>
          <div class="uk-flex uk-flex-column">
              <label class="text-accent" for="EventStartTime">Start Time</label>
              <input class="goa-input" type="time" name="EventStartTime" id="EventStartTime" v-model="activeEventDetails.StartTime">
          </div>
      </div>
      <div class="uk-margin-top uk-margin-bottom">
        <button @click="addUserToAttending" class="goa-button uk-margin-right">Interested</button>
        <button v-if="user.Username == activeEventDetails.Organizer" @click="cancelEvent" class="goa-button">Cancel Event</button>
      </div>
      <div class="attending-list">
        <h3 class="text-accent">Attending</h3>
        <div class="uk-flex uk-flex-column">
          <div v-for="person in activeEventDetails.Attending" class="uk-flex uk-flex-row">
            <span class="text-primary">{{ person }}</span>
          </div>
        </div>
      </div>
    </div>
    <EventCreationTool v-if="showEventCreationModal" :data="dataIn" :close="close" :parentFunction="addEvent" :recurring="addRecurringEvent"/>
</template>