<script setup>
import { onMounted, ref, watch, computed } from "vue";

const props = defineProps({
    Index: {
        type: Number,
    },
    Day: {
        type: Number,
    },
    Title: {
        type: String,
    },
    Content: {
        type: String,
    },
    DayText: {
        type: String,
    }
})

const day = ref(props.Day ? props.Day : null);
const title = ref(props.Title ? props.Title : "");
const content = ref(props.Content ? props.Content : "");
const dayText = ref(props.DayText ? props.DayText : "");
const index = ref(props.Index ? props.Index : null);

onMounted(() => {
    console.log("Props: ", props);
})

</script>

<style scoped>
.day-container{
    position: relative;
    border: 2px solid gray;
    border-radius: 5px;
    margin: 5px;
    display: flex;
    height: calc((100vw / 7) - 60px);
    max-height: 160px;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.7);
    cursor: pointer;
}

.day-container:hover{
    background-color: rgba(70, 11, 11, 0.5);
}

.day-number{
    border: 2px solid gray;
    border-left: none;
    border-top: none;
    /* padding: 0px 7px; */
    min-height: 40px;
    min-width: 40px;
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
</style>

<template>
    <div :class="{'day-container' : {}, 'disabled' : !day}" @click="showEventTool">
        <label v-if="index < 7 " class="day-label">{{ dayText }}</label>
        <div :class="{'uk-flex' : day, hidden : !day}">
            <span class="day-number">{{ day }}</span>
        </div>
    </div>
</template>