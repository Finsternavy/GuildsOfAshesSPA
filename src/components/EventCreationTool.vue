<script setup>
import { onMounted, onBeforeMount, ref, watch, computed } from "vue";
import { useUserStore } from "../stores/userStore";

let store = useUserStore();
let user = ref();

const props = defineProps({
    data: {
    },
    close: {
        type: Function
    },
    parentFunction: {
        type: Function
    },
})

let eventType = ref(null);
let eventOrganizer = ref(null);
let eventTitle = ref(null);
let eventContent = ref(null);
let eventStartDate = ref(null);
let eventStartTime = ref(null);
let eventEndDate = ref(null);
let eventEndTime = ref(null);

onBeforeMount(() => {
  user.value = store.getUser;
  console.log("User: ", user.value);
  eventOrganizer.value = user.value.Username;
  eventStartDate.value = props.data.activeDate.year + '-' + props.data.activeDate.month + '-' + props.data.activeDate.day;
  eventEndDate.value = props.data.activeDate.year + '-' + props.data.activeDate.month + '-' + props.data.activeDate.day;
})


let dataOut = computed(() => {
    return {
        eventType: eventType.value,
        eventOrganizer: eventOrganizer.value,
        eventTitle: eventTitle.value,
        eventContent: eventContent.value,
        eventStartDate: eventStartDate.value,
        eventStartTime: eventStartTime.value,
        eventEndDate: eventEndDate.value,
        eventEndTime: eventEndTime.value,
        attending: [],
    }
})

const clearEventTool = () => {
    eventType.value = null;
    eventOrganizer.value = null;
    eventTitle.value = null;
    eventContent.value = null;
    eventStartDate.value = null;
    eventStartTime.value = null;
    eventEndDate.value = null;
    eventEndTime.value = null;
}

const createEvent = () => {
    // console.log("DataOut: ", dataOut.value);
    if (props.parentFunction) {
        props.parentFunction(dataOut.value);
        clearEventTool();
    }
}

const close = () => {
    if (props.close) {
        props.close();
        clearEventTool();
    }
}
</script>

<style scoped>
.bg-black {
    background-color: black;
}
</style>

<template>
    <div class="event-creation-tool uk-position-center uk-position-fixed">
        <div class="goa-container uk-padding uk-width-large">
            <button @click="close" class="goa-button">Cancel</button>
            <h3 class="text-goa-red">This will be the event creator</h3>
            <p>Creating event for {{ data.activeMonth + ', ' + data.activeDay }}</p>
            <div class="uk-flex uk-flex-column">
              <label class="text-goa-red" for="EventTypeSelect">Event Type</label>
              <select class="goa-input" name="EventTypeSelect" id="EventTypeSelect" v-model="eventType">
                <option class="bg-black" value="meeting">Meeting</option>
                <option class="bg-black" value="guildPlay">Guild Play</option>
                <option class="bg-black" value="deadline">Deadline Reminder</option>
                <option class="bg-black" value="startDate">Start Date Reminder</option>
              </select>
            </div>
            <div class="uk-flex uk-flex-column">
              <label class="text-goa-red" for="EventOrganizer">Organizer</label>
              <input class="goa-input" type="text" name="EventOrganizer" id="EventOrganizer" v-model="eventOrganizer">
            </div>
            <div class="uk-flex uk-flex-column">
              <label class="text-goa-red" for="EventTitle">Event Title</label>
              <input class="goa-input" type="text" name="EventTitle" id="EventTitle" v-model="eventTitle">
            </div>
            <div class="uk-flex uk-flex-column">
              <label class="text-goa-red" for="EventContent">Event Message</label>
              <textarea class="goa-input" name="EventContent" id="EventContent" cols="30" rows="10" v-model="eventContent"></textarea>
            </div>
            <div class="uk-flex uk-child-width-1-2">
              <div class="uk-flex uk-flex-column uk-margin-small-right">
                <label class="text-goa-red" for="EventStartDate">Start Date</label>
                <input class="goa-input" type="date" name="EventStartDate" id="EventStartDate" v-model="eventStartDate">
              </div>
              <div class="uk-flex uk-flex-column">
                <label class="text-goa-red" for="EventStartTime">Start Time</label>
                <input class="goa-input" type="time" name="EventStartTime" id="EventStartTime" v-model="eventStartTime">
              </div>
            </div>
            <div class="uk-flex uk-child-width-1-2">
              <div class="uk-flex uk-flex-column uk-margin-small-right">
                <label class="text-goa-red" for="EventEndDate">End Date</label>
                <input class="goa-input" type="date" name="EventEndDate" id="EventEndDate" v-model="eventEndDate">
              </div>
              <div class="uk-flex uk-flex-column">
                <label class="text-goa-red" for="EventEndTime">End Time</label>
                <input class="goa-input" type="time" name="EventEndTime" id="EventEndTime" v-model="eventEndTime">
              </div>
            </div>
            <div class="uk-margin-top">
              <button @click="createEvent" class="goa-button uk-width-1-1">Create Event</button>
            </div>
        </div>
    </div>
</template>