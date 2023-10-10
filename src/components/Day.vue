<script setup>
import { onMounted, onBeforeMount, ref, watch, computed } from "vue";

const props = defineProps({
    modelValue: {},
    Index: {
        type: Number,
    },
    Data: {
        type: Object,
    },
    Date: {
        type: Object,
    },
    Title: {
        type: String,
    },
    Content: {
        type: String,
    },
    DayText: {
        type: String,
    },
    Today: {
        type: Number,
    },
    setEventDetails: {
        type: Function,
    },
    createEvent: {
        type: Function,
    },
})

const day = ref(props.Date ? props.Date.day : null);
const date = ref(props.Date ? props.Date.year + '-' + props.Date.month + '-' + props.Date.day : null);
const title = ref(props.Title ? props.Title : "");
const content = ref(props.Content ? props.Content : "");
const dayText = ref(props.DayText ? props.DayText : "");
const index = ref(props.Index ? props.Index : null);

const activeEventDetails = ref(null);

const showDetails = ref(false);

const today = computed(() => {
    // console.log("Today: ", props.Today, ' - ', day.value);
    if (props.Today && day.value == props.Today) {
        // console.log("days match, returning true");
        return true;
    } else {
        return false;
    }
})

const past = computed(() => {
    // console.log("Has this day passed?: ", props.Today, ' - ', day.value);
    if (props.Today && day.value < props.Today) {
        // console.log("This day has past, returning true");
        return true;
    } else {
        return false;
    }
})

onMounted(() => {
    // console.log("Props: ", props.Date);
})

const showEventDetails = (event) => {
    props.setEventDetails(event);
}

const createEvent = () => {
    props.createEvent(props.Date);
}

</script>

<style scoped>
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

.day-container:hover{
    background-color: rgba(255, 255, 255, 0.5);
}

.day-number{
    border: 2px solid gray;
    border-left: none;
    border-top: none;
    aspect-ratio: 1;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
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
    border: 1px solid gray;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    position: absolute;
    top: -40px;
    color: white;
    background-color: red;
}

.disabled {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    pointer-events: none;
}

.hidden {
    display: none;
}

.today {
    border: 3px solid green!important;
    background-color: rgba(70, 115, 2, 0.3);
}

.past {
    color: red;
    background-color: rgba(44, 0, 0, 0.5);
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
    border: 1px solid red;
    border-top: none;
    border-right: none;
    /* border-radius: 0 0 0 50%; */
    padding: 7px 7px 7px 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: red;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.add-event-button:hover {
    background-color: rgba(255, 0, 0, 0.5);
    color: white;
   
}

.day-container {
    max-height: fit-content;
}

/* .guild-play-bg {
    background-color: rgba(255, 115, 0, 1);
    transition: border-radius 0.3s ease;
}

.meeting-bg {
    background-color: rgba(255, 238, 0, 1);
    transition: border-radius 0.3s ease;
}

.deadline-bg {
    background-color: rgba(0, 0, 0, 1);
    transition: border-radius 0.3s ease;
}

.start-date-bg {
    background-color: rgba(98, 146, 31, 1);
    transition: border-radius 0.3s ease;
} */
</style>

<template>
    <div :class="{'day-container uk-position-relative uk-flex uk-flex-column' : {}, 'past': past && day, 'today' : today, 'disabled' : !day}" @click="showEventTool">
        <label v-if="index < 7 " class="day-label">{{ dayText }}</label> <!-- This is the day of the week label-->
        <div class="uk-flex">
            <div :class="{'uk-flex' : day, hidden : !day}">
                <span class="day-number">{{ day }}</span>
            </div>
            <div v-if="day && !past" class="add-event-button uk-position-top-right" @click="createEvent">
                <span class="uk-color-secondary" uk-icon="icon: plus; ratio: 1"></span>
            </div>
        </div>
        <span v-if="past && day" class="uk-position-center" uk-icon="icon: close; ratio: 6;"></span> <!-- This is overlay for passed days-->
        <div class="event-icon-container uk-flex uk-height-auto grid">
            <div v-for="event in props.Data" @click="showEventDetails(event)" class="uk-text-center">
                <div class="guild-play-bg">
                    <span v-if="event.eventType == 'guildPlay'" class="guild-play event-icon" uk-icon="icon: play; ratio: 1"></span>
                </div>
                <div class="meeting-bg">
                    <span v-if="event.eventType == 'meeting'" class="meeting event-icon" uk-icon="icon: users; ratio: 1"></span>
                </div>
                <div class="deadline-bg">
                    <span v-if="event.eventType == 'deadline'" class="deadline event-icon" uk-icon="icon: clock; ratio: 1"></span>
                </div>
                <div class="start-date-bg">
                    <span v-if="event.eventType == 'startDate'" class="startDate event-icon" uk-icon="icon: clock; ratio: 1"></span>
                </div>
            </div>
        </div>
        
    </div>
</template>