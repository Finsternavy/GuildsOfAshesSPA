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


const month = computed(() => {
    let date = new Date().getMonth();
    // let month = data.getMonth();
    console.log(date);
    return date;
})

const today = computed(() => {
    let date = new Date().getDate();
    // let month = data.getMonth();
    console.log(date);
    return date;
})

const getEvents = async () => {
  // console.log("Fetching guild data..");
  let guildID = localStorage.getItem("guildID");
  console.log("Guild ID: ", guildID);
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
    console.log("Guild data: ", data);
    events.value = data.Data;
    // sortMembers();

  } else {
    // console.log("Error fetching thread data: ", response.statusText);
  }
}

const getCurrentMonthAsString = (offset) => {
console.log("Offset: ", offset);
  const today = new Date();
  const currentMonthIndex = today.getMonth();
  const currentMonth = months[currentMonthIndex + offset];
    console.log(currentMonth)
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
  console.log("Current date: ", today.getMonth());
  return {
    month: today.getMonth() + 1, // Add 1 because months are 0-based
    day: today.getDate(),
    year: today.getFullYear(),
  };
});

const createEvent = (date) => {
    let monthText = months[date.month - 1];
    activeMonth.value = monthText;
    activeDay.value = date.day;
    activeDate.value = date;
    showEventCreationModal.value = true;
}

const close = () => {
    showEventCreationModal.value = false;
}

const addEvent = async (data) => {
    // events.value.push(data);
    showEventCreationModal.value = false;
    console.log("Adding event: ", data);

    // console.log("Fetching guild data..");
  let guildID = localStorage.getItem("guildID");
  console.log("Guild ID: ", guildID);
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
    console.log("Adding event: ", data);

    // console.log("Fetching guild data..");
  let guildID = localStorage.getItem("guildID");
  console.log("Guild ID: ", guildID);
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
  console.log("Data from recurring event: ", data);
  let startDate = new Date(data.StartDate);
  startDate.setDate(startDate.getDate() + 1);
  let endDate = new Date(data.RecurringEndDate);
  endDate.setDate(endDate.getDate() + 2);
  console.log("Start date: ", startDate);
  console.log("End date: ", endDate);
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
  console.log("Events to add: ", eventsToAdd);
  addRecurringEvents(eventsToAdd);
}

const getDayData = (day) => {
  if (day != null){
    let date = day.year + "-" + day.month + "-" + day.day;
      // console.log("Day: ", date);
      let data = [];
      events.value.forEach(event => {
        if (event.StartDate == date){
          // console.log("Event: ", event);
          data.push(event);
        }
      });
      // console.log("Data: ", data);
      return data;
  }
  return null;
}


const setEventDetails = (event) => {
    // console.log("Event: ", event);
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
  console.log("Guild ID: ", guildID);
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
    width: 50%;
    /* background-color: rgba(0, 0, 0, 0.5); */
    background-color: rgba(0, 0, 0, 1);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    /* display: none; */
    /* visibility: hidden; */
    /* opacity: 0; */
    /* transition: all 0.3s ease-in-out; */
}
.calendar-title {
  border-radius: 20px 20px 0 0;
}
</style>

<template>
    <div class="goa-container uk-padding-small uk-margin-large-bottom">
      <h1 class="calendar-title goa-container-no-radius uk-padding-small text-goa-red uk-text-center uk-margin-medium-bottom">{{ getCurrentMonthAsString(0) }}</h1>
        <div class="calendar-container">
          <!-- @click="openMenu(date, 10)" -->
            <Day v-for="date, index in generateCalendar(2023, 10)" v-model="events" :Data="getDayData(date)" :setEventDetails="setEventDetails" :createEvent="createEvent" :Index="index" :Date="date" :DayText="days[index]" :Today="today"/>
        </div>
    </div>
    <div class="goa-container uk-padding-small uk-margin-large-bottom">
      <h1 class="calendar-title goa-container-no-radius uk-padding-small text-goa-red uk-text-center uk-margin-medium-bottom">{{ getCurrentMonthAsString(1) }}</h1>
        <div class="calendar-container">
          <!-- @click="openMenu(date, 10)" -->
            <Day v-for="date, index in generateCalendar(2023, 11)" v-model="events" :Data="getDayData(date)" :setEventDetails="setEventDetails" :createEvent="createEvent" :Index="index" :Date="date" :DayText="days[index]"/>
        </div>
    </div>
    <div class="goa-container uk-padding-small uk-margin-large-bottom">
      <h1 class="calendar-title goa-container-no-radius uk-padding-small text-goa-red uk-text-center uk-margin-medium-bottom">{{ getCurrentMonthAsString(2) }}</h1>
        <div class="calendar-container">
          <!-- @click="openMenu(date, 10)" -->
            <Day v-for="date, index in generateCalendar(2023, 12)" v-model="events" :Data="getDayData(date)" :setEventDetails="setEventDetails" :createEvent="createEvent" :Index="index" :Date="date" :DayText="days[index]"/>
        </div>
    </div>
    <EventCreationTool v-if="showEventCreationModal" :data="dataIn" :close="close" :parentFunction="addEvent" :recurring="addRecurringEvent"/>
    <div v-if="showEventDetails" class="goa-container uk-padding event-details-modal uk-flex uk-flex-column uk-child-width-1-1" :hidden="!showEventDetails">
        <button @click="showEventDetails = false" class="goa-button uk-width-auto uk-position-top-right uk-margin-top uk-margin-right">Close</button>
        <h1 class="text-goa-red uk-text-center uk-margin-remove-bottom">{{ activeEventDetails.Title }} </h1>
        <span v-if="activeEventDetails.Canceled" class="uk-text-center uk-margin-bottom uk-text-lead uk-text-warning">( Canceled )</span>
        <div class="uk-flex uk-child-width-1-2">
          <div class="uk-flex uk-flex-column uk-margin-small-right">
              <label class="text-goa-red" for="EventTypeDisplay">Event Type</label>
              <input class="goa-input" type="text" name="EventTypeDisplay" id="EventTypeDisplay" v-model="activeEventDetails.EventType">
          </div>
          <div class="uk-flex uk-flex-column">
              <label class="text-goa-red" for="EventOrganizer">Organizer</label>
              <input class="goa-input" type="text" name="EventOrganizer" id="EventOrganizer" v-model="activeEventDetails.Organizer">
          </div>
        </div>
        <div class="uk-flex uk-flex-column">
            <label class="text-goa-red" for="EventContent">Event Message</label>
            <textarea class="goa-input" name="EventContent" id="EventContent" cols="30" rows="10" v-model="activeEventDetails.Content"></textarea>
        </div>
        <div class="uk-flex uk-child-width-1-2">
            <div class="uk-flex uk-flex-column uk-margin-small-right">
                <label class="text-goa-red" for="EventStartDate">Start Date</label>
                <input class="goa-input" type="date" name="EventStartDate" id="EventStartDate" v-model="activeEventDetails.StartDate">
            </div>
            <div class="uk-flex uk-flex-column">
                <label class="text-goa-red" for="EventStartTime">Start Time</label>
                <input class="goa-input" type="time" name="EventStartTime" id="EventStartTime" v-model="activeEventDetails.StartTime">
            </div>
        </div>
        <div class="uk-margin-top uk-margin-bottom">
          <button @click="addUserToAttending" class="goa-button uk-margin-right">Interested</button>
          <button v-if="user.Username == activeEventDetails.Organizer" @click="cancelEvent" class="goa-button">Cancel Event</button>
        </div>
        <div class="attending-list">
          <h3 class="text-goa-red">Attending</h3>
          <div class="uk-flex uk-flex-column">
            <div v-for="person in activeEventDetails.Attending" class="uk-flex uk-flex-row">
              <span class="text-goa-red">{{ person }}</span>
            </div>
          </div>
        </div>
    </div>
</template>