<script setup>
import { onMounted, ref, watch, computed } from "vue";
import Day from "../components/Day.vue";

let showEventCreationModal = ref(false);
let activeMonth = ref(null);
let activeDay = ref(null);

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


const monthDays = computed(() => {
    let date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    let days = new Date(year, month, 0).getDate();
    return days;
})

function getCurrentMonthAsString(offset) {
console.log("Offset: ", offset);
  const today = new Date();
  const currentMonthIndex = today.getMonth();
  const currentMonth = months[currentMonthIndex + offset];
    console.log(currentMonth)
  return currentMonth;
}

// get data to build a calender for November 2023. Return the days as an array inserting blank entries to start month on the correct day of the week.



// const days = computed(() => {
//     let date = new Date();
//     let month = date.getMonth();
//     let year = date.getFullYear();
//     let days = new Date(year, month, 0).getDate();
//     let dayOfWeek = new Date(year, month, 1).getDay();
//     let daysArray = [];
//     for (let i = 0; i < dayOfWeek; i++) {
//         daysArray.push("");
//     }
//     for (let i = 1; i <= days; i++) {
//         daysArray.push(i);
//     }
//     return daysArray;
// })

function generateCalendar(year, month) {
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
    calendarArray.push(day);
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

const openMenu = (day, month) => {
    console.log("Day: ", day);
    console.log("Month: ", month);
    let monthText = months[month - 1];
    activeMonth.value = monthText;
    activeDay.value = day;
    showEventCreationModal.value = true;
}

const close = () => {
    showEventCreationModal.value = false;
}

</script>

<style scoped>
.calendar-container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
}
</style>

<template>
    <div>
        <h1 class="goa-container-no-radius uk-padding-small text-goa-red uk-text-center uk-margin-medium-bottom">{{ getCurrentMonthAsString(0) }}</h1>

        <div class="calendar-container">
            <Day @click="openMenu(num, 10)" v-for="num, index in generateCalendar(2023, 10)" :Index="index" :Day="num" :DayText="days[index]"/>
        </div>
        <h1 class="goa-container-no-radius uk-padding-small text-goa-red uk-text-center uk-margin-medium-bottom">{{ getCurrentMonthAsString(1)  }}</h1>
        <div class="calendar-container">
            <Day @click="openMenu(num, 11)" v-for="num, index in generateCalendar(2023, 11)" :Index="index" :Day="num" :DayText="days[index]"/>
        </div>
        <h1 class="goa-container-no-radius uk-padding-small text-goa-red uk-text-center uk-margin-medium-bottom">{{ getCurrentMonthAsString(2) }}</h1>
        <div class="calendar-container">
            <Day @click="openMenu(num, 12)" v-for="num, index in generateCalendar(2023, 12)" :Index="index" :Day="num" :DayText="days[index]"/>
        </div>
    </div>
    <div v-if="showEventCreationModal" class="uk-position-center uk-position-fixed">
        <div class="goa-container uk-padding">
            <button @click="close" class="goa-button">Close</button>
            <h3 class="text-goa-red">This will be the event creator</h3>
            <p>Creating event for {{ activeMonth + ', ' + activeDay }}</p>
        </div>
    </div>
</template>