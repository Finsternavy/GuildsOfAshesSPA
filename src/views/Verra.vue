<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import Verra from '../public/Images/Verra_Map.png';
import { useUserStore } from "../stores/userStore";
import { useAPI } from '../stores/apiStore';

let api = useAPI();
let baseUrl = api.getAPI + "Guilds";
let store = useUserStore();
let user = store.getUser;
const gridSize = ref(20);
const gridColumns = ref(80);
const gridRows = ref(80);

let warningText = ref(null);

let activeCell = ref({
    guildID: user.GuildID,
    author: user.Username,
    layer: null,
    cell: null,
    name: null,
    description: null,
});

let dataCells = ref([]);
let showHelp = ref(true);
let showKeybinds = ref(true);
let clickMode = ref('add');
let locationDetailsOpen = ref(false);
let locationDetails = ref([])

let hideInstructions = ref(false);
let hideKeybinds = ref(false);


let layer = ref('All');

const layers = [
    'All',
    'Dungeon',
    'Mob',
    'Node',
    'Quest',
    'Resource',
    'Strategy',
]

const dungeons = ref([]);
const mobs = ref([]);
const nodes = ref([]);
const quests = ref([]);
const resources = ref([]);
const strategies = ref([]);



watch(hideInstructions, (value) => {
    if (value){
        localStorage.setItem('hideInstructions', value);
        showHelp.value = false;
    } else {
        localStorage.removeItem('hideInstructions');
        showHelp.value = true;
    }
});

watch(hideKeybinds, (value) => {
    if (value) {
        localStorage.setItem('hideKeybinds', value);
        showKeybinds.value = false;
    } else {
        localStorage.removeItem('hideKeybinds');
        showKeybinds.value = true;
    }
});

const keybinds = [
    {
        bind: 'Ctrl',
        action: 'Toggle Add Location'
    },
    {
        bind: 'Delete',
        action: 'Toggle Remove Location'
    },
    {
        bind: 'Left Click',
        action: 'Add Location (Add Active)'
    },
    {
        bind: 'Left Click',
        action: 'Remove Location (Remove Active)'
    },
    {
        bind: 'Left Click Hold',
        action: 'Move Map'
    },
    {
        bind: 'Arrow Keys',
        action: 'Move Map'
    },
    {
        bind: 'Scroll Wheel Up',
        action: 'Zoom In'
    },
    {
        bind: 'Scroll Wheel Down',
        action: 'Zoom Out'
    },
    {
        bind: 'Scroll Wheel Click',
        action: 'Reset Map'
    }

]

let markMap = ref(false);
let mapWarningText = computed(() => {
    if (markMap.value == true){
        if (clickMode.value == 'add'){
            return 'Add Location enabled!';
        }
        if (clickMode.value == 'remove'){
            return 'Remove Location enabled!';
        }
    }
    return null;
});

let showCellInfoModal = ref(false);
let map = document.getElementById('verraContainer');
let mapCurrentScale = ref(100);
let zoomAmount = ref(15);
let currentX = ref(0);
let currentY = ref(0);
let offset = ref(50);
const startX = ref(0);
const startY = ref(0);

let isDragging = ref(false);

let cellWidth = computed(() => {
    gridSize.value = (mapCurrentScale.value / gridSize.value);
    return gridSize;
});

onMounted(() => {
    console.log("User: ", user);
    getMapData();
    hideInstructions.value = localStorage.getItem('hideInstructions');
    hideKeybinds.value = localStorage.getItem('hideKeybinds');
    // activeCell.layer = layer.value;
    // window.addEventListener('mousedown', handleMouseDown);
    // window.addEventListener('mouseup', handleMouseUp);
    // window.addEventListener('keydown.ctrl', toggleMarkMap);
    clickMode.value = 'add';
    map = document.getElementById('verraContainer');
    document.body.addEventListener('keydown', handleKeyDown);
    // document.body.addEventListener('mouseclick.middle', handleMouseClick);
});

let getMapData = async () => {
    // console.log("Attempting to create guild..");
    let call = user;
    console.log("call: ", call);
    let response = await fetch(baseUrl + "/getMapData", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
      },
      body: JSON.stringify(call),
    });
  
    if (response.ok) {
      let data = await response.json();
      // console.log("Create Guild response data: ", data);
      console.log("data: ", data);
      dataCells.value = formatMapData(data.Data);
      // threads.value = data.Data;
    } else {
      // console.log("Error fetching thread data: ", response.statusText);
    }
};

const formatMapData = (data) => {
    let allData = [];

    if (data && data.Dungeons){
        data.Dungeons.forEach((dungeon) => {
            allData.push(dungeon);
        });
    };
    if (data && data.Mobs){
        data.Mobs.forEach((mob) => {
            allData.push(mob);
        });
    };
    if (data && data.Nodes){
        data.Nodes.forEach((node) => {
            allData.push(node);
        });
    };
    if (data && data.Quests){
        data.Quests.forEach((quest) => {
            allData.push(quest);
        });
    };
    if (data && data.Resources){
        data.Resources.forEach((resource) => {
            allData.push(resource);
        });
    };
    if (data && data.Strategy){
        data.Strategy.forEach((strategy) => {
            allData.push(strategy);
        });
    };
    console.log("allData: ", allData);
    return allData;
}

let addMapData = async (location) => {
    // console.log("Attempting to create guild..");
    let call = location;
    console.log("call: ", call);
    let response = await fetch(baseUrl + "/addMapData", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
      },
      body: JSON.stringify(call),
    });
  
    if (response.ok) {
      let data = await response.json();
      // console.log("Create Guild response data: ", data);
      console.log("data: ", data);
      // threads.value = data.Data;
    } else {
      // console.log("Error fetching thread data: ", response.statusText);
    }
};


let removeMapData = async (location) => {
    // console.log("Attempting to create guild..");
    let call = location;
    console.log("call: ", call);
    let response = await fetch(baseUrl + "/deleteMapData", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
      },
      body: JSON.stringify(call),
    });
  
    if (response.ok) {
      let data = await response.json();
      // console.log("Create Guild response data: ", data);
      console.log("data: ", data);
      // threads.value = data.Data;
    } else {
      // console.log("Error fetching thread data: ", response.statusText);
    }
};

const handleKeyDown = (event) => {
    // console.log(event.key)
    if (event.key == 'Control'){
        clickMode.value = 'add';
        toggleMarkMap();
    }
    if (event.key == 'ArrowRight'){
        moveRight();
    }
    if (event.key == 'ArrowLeft'){
        moveLeft();
    }
    if (event.key == 'ArrowUp'){
        moveUp();
    }
    if (event.key == 'ArrowDown'){
        moveDown();
    }
    if (event.key == 'Middle'){
        resetMap();
    }
    if (event.key == 'Delete'){
        clickMode.value = 'remove';
        toggleRemoveMap();
    }
}


const handleMouseDown = (event) => {
    // console.log('handleMouseDown', event.button);
    if (event.button == 1){
        resetMap();
        return
    }

    if (!map){
        map = document.getElementById('verraContainer');
    }
    isDragging.value = true;
    startX.value = event.clientX - currentX.value;
    startY.value = event.clientY - currentY.value;
}

const moveImage = (event) => {
    if (isDragging.value) {
        const newLeft = event.clientX - startX.value;
        const newTop = event.clientY - startY.value;
        currentX.value = newLeft;
        currentY.value = newTop;
        map.style.left = `${currentX.value}px`;
        map.style.top = `${currentY.value}px`;
    }
};

const handleMouseUp = () => {
    isDragging.value = false;
}

const handleScroll = () => {
    // console.log('handleScroll');
    if (map){
        map.style.left = currentX.value + '%';
        map.style.top = currentY.value + '%';
    }
}

const setActiveCell = (index) => {
    if (!markMap.value){
        console.log("location click with markMap false")
        showLocationDetails(index);
        return;
    }
    // console.log('setActiveCell: ', index);
    activeCell.value.cell = index;
    activeCell.value.layer = layer.value;
    // console.log("ClickMode: ", clickMode.value);
    if (clickMode.value == 'add'){
        showCellInfoModal.value = true;
    }
    if (clickMode.value == 'remove'){
        removeLocation(index);
    }
    toggleMarkMap();
}

const submitLocation = () => {
    // console.log('submitLocation');
    let location = {...activeCell.value};
    location.layer = layer.value;
    if (location.layer == 'All'){
        warningText.value = "You must select a layer to add a location.";
        return;
    }
    if (location.cell && location.name && location.description){
        dataCells.value.push(location);
        console.log("dataCells: ", dataCells.value);
        showCellInfoModal.value = false;
        addMapData(location);
    }
}

const removeLocation = (index) => {
    // console.log('removeLocation');
    activeCell.value.cell = index;
    if (dataCells.value.length > 0){
        dataCells.value.forEach((cell, i) => {
            if (cell.cell == index){
                if (user.Username == cell.author || user.Rank.RankName == 'Guild Leader'){
                    dataCells.value.splice(i, 1);
                    removeMapData(cell);
                } else {
                    warningText.value = "You do not have permission to remove this location.";
                }
            }
        })
    }
    clickMode.value = 'add';
}


const hasContent = (index) => {
    // if (dataCells.value.includes(index)) {
    //     return true;
    // }
    // return false;
    if (dataCells.value.length > 0){
        for (let i = 0; i < dataCells.value.length; i++){
            if (dataCells.value[i].cell == index){
                // console.log('datacells: ', dataCells.value[i], " index: ", index);
                // console.log('datacells: ', dataCells.value);
                if (layer.value == 'All'){
                    return true;
                }
                if (dataCells.value[i].layer == layer.value){
                    return true;
                }
            }
        }
    }
    return false;
}

const closeCellInfo = () => {
    showCellInfoModal.value = false;
}

const wheelZoom = (event) => {
    // console.log('wheelZoom');
    if (event.deltaY < 0){
        zoomIn();
    }
    if (event.deltaY > 0){
        zoomOut();
    }
}

const setClickStart = (event) => {
    let clickX = event.clientX;
    // console.log("clickX: ", event.clientX);
}

const zoomIn = () => {
    // console.log('testZoom');
    if (!map) {
        map = document.getElementById('verraContainer');
    }
    if (map) {
        if (mapCurrentScale.value < 500) {
            const zoomRatio = 1 + zoomAmount.value / mapCurrentScale.value;
            map.style.width = mapCurrentScale.value + zoomAmount.value + '%';
            map.style.height = mapCurrentScale.value + zoomAmount.value + '%';
            const newWidth = map.offsetWidth * zoomRatio;
            const newHeight = map.offsetHeight * zoomRatio;
            const newX = currentX.value - (newWidth - map.offsetWidth) / 2;
            const newY = currentY.value - (newHeight - map.offsetHeight) / 2;
            map.style.top = newY + 'px';
            map.style.left = newX + 'px';
            mapCurrentScale.value += zoomAmount.value;
            currentY.value = newY;
            currentX.value = newX;
            // console.log("currentX: ", currentX.value);
            // console.log("mapCurrentScale: ", mapCurrentScale.value);
            startX.value = currentX.value;
            startY.value = currentY.value;
        }
    }
}

const zoomOut = () => {
    // console.log('zoomOut');
    if (!map) {
        map = document.getElementById('verraContainer');
    }
    if (map) {
        if (mapCurrentScale.value > 100) {
            const zoomRatio = 1 - zoomAmount.value / mapCurrentScale.value;
            map.style.width = mapCurrentScale.value - zoomAmount.value + '%';
            map.style.height = mapCurrentScale.value - zoomAmount.value + '%';
            const newWidth = map.offsetWidth * zoomRatio;
            const newHeight = map.offsetHeight * zoomRatio;
            const newX = currentX.value + (map.offsetWidth - newWidth) / 2;
            const newY = currentY.value + (map.offsetHeight - newHeight) / 2;
            map.style.top = newY + 'px';
            map.style.left = newX + 'px';
            mapCurrentScale.value -= zoomAmount.value;
            currentY.value = newY;
            currentX.value = newX;
            // console.log("currentX: ", currentX.value);
            // console.log("mapCurrentScale: ", mapCurrentScale.value);
        }
        if (mapCurrentScale.value == 100) {
            resetMap();
        }
    }
}

const toggleMarkMap = () => {
    markMap.value = !markMap.value;
}

const toggleRemoveMap = () => {
    clickMode.value = 'remove';
    toggleMarkMap();
}

const moveRight = () => {
    map.style.left = currentX.value - offset.value + 'px';
    currentX.value -= offset.value;
}

const moveLeft = () => {
    map.style.left = currentX.value + offset.value + 'px';
    currentX.value += offset.value;
}

const moveUp = () => {
    map.style.top = currentY.value + offset.value + 'px';
    currentY.value += offset.value;
}

const moveDown = () => {
    map.style.top = currentY.value - offset.value + 'px';
    currentY.value -= offset.value;
}

const resetMap = () => {
    // disableCellClick.value = false;
    // console.log('resetMap');
    if (!map){
        map = document.getElementById('verraContainer');
    }
    if (map){
        map.style.width = '100%';
        map.style.height = '100%';
        map.style.left = '0px';
        map.style.top = '0px';
        map.style.right = '0px';
        map.style.bottom = '0px';
        mapCurrentScale.value = 100;
        currentX.value = 0;
        currentY.value = 0;
    }
}

const toggleHelp = () => {
    showHelp.value = !showHelp.value;
}

const toggleKeybinds = () => {
    showKeybinds.value = !showKeybinds.value;
}

const showLocationDetails = (index) => {
    console.log('showLocationDetails');
    locationDetails.value = [];
    // get all data from dataCells that have a cell number matching the index
    dataCells.value.forEach((cell) => {
        if (cell.cell == index){
            if (layer.value == 'All'){
                locationDetails.value.push(cell);

            } else if (cell.layer == layer.value){
                locationDetails.value.push(cell);
            }
        }
    });

    toggleLocationDetails();
}

const getLocationIcon = (index) => {
    let matches = [];
    dataCells.value.forEach((cell) => {
        if (cell.cell == index){
            matches.push(cell);
        }
    });

    let icon = 'question';
    let match = null;
    let tempLayer = null;
    if (layer.value != 'All'){
        match = matches.find((match) => match.layer == layer.value);
        tempLayer = match.layer;
    } else {
        match = matches[0];
        tempLayer = match.layer;
    }

    if (tempLayer){
        if (tempLayer == 'Dungeon'){
            icon = 'world';
        }
        if (tempLayer == 'Mob'){
            icon = 'github';
        }
        if (tempLayer == 'Node'){
            icon = 'home';
        }
        if (tempLayer == 'Quest'){
            icon = 'location';
        }
        if (tempLayer == 'Resource'){
            icon = 'apple';
        }
        if (tempLayer == 'Strategy'){
            icon = 'info';
        }
        return icon;
    }


    return icon;
}

const toggleLocationDetails = () => {
    locationDetailsOpen.value = !locationDetailsOpen.value;
}
</script>

<style scoped>
.map-board-container {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    background-color: rgba(0, 115, 222, 0.4);
    outline: 10px solid black;
}
.verra-map-container {
    /* height: 100%;
    width: 100%;
    background-color: aqua;
    outline: 5px solid black; */
}

.varra {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.verra::after {
    --width: v-bind(mapCurrentScale / 5 + 'px');
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    /* background-image: 
        repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0px, rgba(0, 0, 0, 0.2) 1px, transparent 1px, transparent v-bind(mapCurrentScale / 5 + 'px')), 
        repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0px, rgba(0, 0, 0, 0.2) 1px, transparent 1px, transparent v-bind(mapCurrentScale / 5 + 'px')); */
    /* outline: 1px solid black; */
    pointer-events: none;
}
.verra-map {
    aspect-ratio: 1;
    width: 100%;
    left: 0;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    /* background-position-x: v-bind(currentX + '%');
    background-position-y: v-bind(currentY + '%'); */
}

.testZoom {
    width: 120%;
    height: 120%;
}

.map-grid {
    position: absolute;
    width: v-bind(mapCurrentScale + '%');
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(v-bind(gridColumns), 1fr);
    grid-template-rows: repeat(v-bind(gridColumns), 1fr);
    /* background-color: blue; */
    gap: 1px;
    aspect-ratio: 1;
}
.map-cell {
    width: v-bind(cellWidth + '%');
    height: v-bind(cellWidth + '%');
    /* aspect-ratio: 1; */
    /* background-color: rgba(56, 56, 56, 0.8); */
}

.map-cell:hover {
    /* box-sizing: border-box; */
    background-color: rgba(119, 13, 13, 0.8);
}

.circle::after {
    content: '';
    top: 0;
    left: 0;
    width: 50%;
    height: 50%;
    border-radius: 50%;
    background-color: red;
}

.location-container {
    max-height: 100%;
    max-width: 100%;
    overflow: hidden;
}
.location {
    position: absolute;
    box-sizing: border-box;
    color: red;
    background-color: black;
    border-radius: 50%;
    margin: none;
    scale: 3;
    left: 50%;
    top: 50%;
    /* padding: 2%; */
    transform: translate(-17%, -17%);
    /* z-index: 20000; */
    pointer-events: all;
    /* padding: 2px; */
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
}

.location:hover {
    background-color: red;
    color: black;
}

.cell-info-modal {
    position: fixed;
    width: 95%;
    max-width: 800px;
    height: fit-content;
    max-height: 75%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

}

.map-warnings-container {
    position: absolute;
    top: 65px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px;
    width: fit-content;
    height: fit-content;
    border-radius: 30px;
    background-color: rgb(255, 255, 200);
    border: 2px solid orangered;
    color: orangered;
    overflow: hidden;
}
.instructions {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 10px;
    width: fit-content;
    height: fit-content;
    border-radius: 30px;
    overflow: hidden;
}


.help {
    border-radius: 30px;
    padding: 5px;
    height: fit-content;
    width: fit-content;
    background-color: var(--background-color-alpha);
    transition: padding 0.3s ease-in-out;
}
.instructions-open {
    padding: 10px;
}

.keybinds-menu {
    padding: 20px;
    width: 400px;
}

.settings-icon {
    padding: 2px;
}
.top-controls {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px;
    border-radius: 30px;
    background-color: var(--background-color-alpha);
}

.controls {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    padding: 10px;
    width: fit-content;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    border: 2px solid rgba(0, 0, 0, 0.8);
}

.bottom-controls {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(50%);
    padding: 10px;
    width: fit-content;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    border: 2px solid rgba(0, 0, 0, 0.8);
}

.disabled {
    pointer-events: none;
}

.key {
    border: 1px solid gray;
    border-radius: 10px;
    padding: 5px;
    margin-bottom: 5px;
}

.goa-input {
    border: 10px;
    /* background-color: var(--background-color-alpha); */
}

.map-option {
    background-color: var(--background-color-alpha);
}

.location-details {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: fit-content;
    height: fit-content;
    border-radius: 30px;
    background-color: var(--background-color-alpha);
    /* padding: 10px; */
    overflow: hidden;
}

.icon-key {
    border-radius: 50%;
    background-color: black;
    color: red;
}

.map-key {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.8);
    border: 5px solid rgba(0, 0, 0, 0.8);
    border-bottom: none;
    border-left: none;
    color: white;
}
</style>

<template>
    <div @wheel="wheelZoom" class=" map-board-container uk-overflow-hidden uk-margin-bottom">
        <div id="verraContainer" class="verra uk-position-relative">
            <div class="verra-map-container uk-flex uk-flex-center">
                <div id="VerraMap" class="verra-map uk-position-relative" :data-src="Verra" uk-img></div>
            </div>
            <div class="uk-margin-bottom">
                <div class="map-grid uk-width-1-1"
                @mousedown="handleMouseDown"
                @mousemove="moveImage"
                @mouseup="handleMouseUp">
                    <div v-for="row, index in (gridColumns * gridRows)" 
                        :key="index" 
                        class="map-cell uk-flex uk-flex-center uk-flex-middle uk-margin-remove uk-padding-remove uk-position-relative"
                        :class="{'disabled' : !markMap,}"
                        @click="setActiveCell(index)">
                            <span class="location" v-if="hasContent(index)" :uk-icon="'icon:' + getLocationIcon(index) + '; ratio: 1'"></span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="mapWarningText" class="map-warnings-container">
            <span>{{ mapWarningText }}</span>
        </div>
        <div v-if="warningText" class="map-warnings-container">
            <span>{{ warningText }} <span @click="warningText = null" class="uk-icon-button">X</span></span>
        </div>
        <div class="instructions uk-flex uk-flex-column">
            <div class="help uk-flex uk-flex-column uk-position-relative uk-margin-small-right uk-margin-small-bottom" :class="{'instructions-open' : showHelp}">
                <!-- Add checkbox for user to select to start this menu as closed next load -->
                <span @click="toggleHelp" class="text-primary" uk-icon="icon: question; ratio: 1.5"></span>
                <ul v-if="showHelp" >
                    <div class="uk-position-top-right uk-margin-small-top uk-margin-small-right">
                        <input class="uk-checkbox uk-margin-small-right" type="checkbox" v-model="hideInstructions">
                        <span class="text-primary">Hide Instructions at load? </span>
                        <button @click="toggleHelp" class="goa-button">Close</button>
                    </div>
                    <h3 class="text-primary uk-margin-remove-top">Instructions:</h3>
                    <li class="uk-text-bold text-button">Use the filter in the top-center to filter map data.</li>
                    <li class="uk-text-bold text-button">Click the 
                        <button class="uk-icon-button uk-margin-small-bottom" disabled>
                            <span uk-icon="icon: location"></span>
                        </button>
                        button to enable/disable adding markers to the map.</li>
                    <li class="uk-text-bold text-button">With adding marks enabled, click the map to add a location marker.</li>
                    <li class="uk-text-bold text-button">Click and drag the map to move it around.</li>
                    <li class="uk-text-bold text-button">Use the scroll wheel to zoom in and out.</li>
                    <li class="uk-text-bold text-button">You can also navigate with the control cluster in the upper right corner.</li>
                </ul>
            </div>
            <div class="help uk-position-relative" :class="{'instructions-open' : showKeybinds}">
                <span @click="toggleKeybinds" class="text-primary settings-icon" uk-icon="icon: settings; ratio: 1.3"></span>
                <div v-if="showKeybinds" class="keybinds-menu">
                    <div class="uk-position-top-right uk-margin-small-top uk-margin-small-right">
                        <input class="uk-checkbox uk-margin-small-right" type="checkbox" v-model="hideKeybinds">
                        <span class="text-primary">Hide keybinds at load? </span>
                        <button @click="toggleKeybinds" class="goa-button">Close</button>
                    </div>
                    <h3 class="text-primary uk-margin-remove-top">Keybinds:</h3>
                    <div v-for="key in keybinds" class="uk-flex uk-flex-middle uk-flex-between uk-width-expand">
                        <span class="key">{{ key.bind }}</span><span>{{ key.action }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="top-controls">
            <select class="goa-input" name="layerSelect" id="layerSelect" v-model="layer">
                <option class="map-option" v-for="layer in layers">{{ layer }}</option>
            </select>
        </div>
        <div class="controls uk-flex uk-flex-column uk-flex-middle">
            <button class="uk-icon-button uk-margin-small-bottom" @click="zoomIn"><span uk-icon="icon: plus-circle"></span></button>
            <button class="uk-icon-button uk-margin-small-bottom" @click="zoomOut"><span uk-icon="icon: minus-circle"></span></button>
            <button class="uk-icon-button uk-margin-small-bottom" @click="resetMap"><span uk-icon="icon: refresh"></span></button>
            <button class="uk-icon-button uk-margin-small-bottom" @click="moveUp"><span uk-icon="icon: chevron-up"></span></button>
            <button class="uk-icon-button uk-margin-small-bottom" @click="moveDown"><span uk-icon="icon: chevron-down"></span></button>
            <button class="uk-icon-button uk-margin-small-bottom" @click="moveLeft"><span uk-icon="icon: chevron-left"></span></button>
            <button class="uk-icon-button" @click="moveRight"><span uk-icon="icon: chevron-right"></span></button>
        </div>
        <div class="bottom-controls uk-flex uk-flex-column uk-flex-middle">
            <button @click="toggleMarkMap()" class="uk-icon-button uk-margin-small-bottom">
                <span uk-icon="icon: location"></span>
            </button>
            <button @click="toggleRemoveMap()" class="uk-icon-button">
                <span uk-icon="icon: trash"></span>
            </button>
        </div>
        <div class="map-key">
            <div class="map-key-item uk-flex uk-flex-middle uk-margin-small-bottom">
                <span class="icon-key uk-margin-right" uk-icon="icon: world; ratio: 1.5"></span>
                <span class="text-primary">Dungeon</span>
            </div>
            <div class="map-key-item uk-flex uk-flex-middle uk-margin-small-bottom">
                <span class="icon-key uk-margin-right" uk-icon="icon: github; ratio: 1.5"></span>
                <span class="text-primary">Mob</span>
            </div>
            <div class="map-key-item uk-flex uk-flex-middle uk-margin-small-bottom">
                <span class="icon-key uk-margin-right" uk-icon="icon: home; ratio: 1.5"></span>
                <span class="text-primary">Node</span>
            </div>
            <div class="map-key-item uk-flex uk-flex-middle uk-margin-small-bottom">
                <span class="icon-key uk-margin-right" uk-icon="icon: location; ratio: 1.5"></span>
                <span class="text-primary">Quest</span>
            </div>
            <div class="map-key-item uk-flex uk-flex-middle uk-margin-small-bottom">
                <span class="icon-key uk-margin-right" uk-icon="icon: apple; ratio: 1.5"></span>
                <span class="text-primary">Resource</span>
            </div>
            <div class="map-key-item uk-flex uk-flex-middle">
                <span class="icon-key uk-margin-right" uk-icon="icon: info; ratio: 1.5"></span>
                <span class="text-primary">Strategy</span>
            </div>
        </div>
    </div>
    <div v-if="showCellInfoModal" id="cellModal" class="cell-info-modal goa-container uk-padding uk-width-1-1 uk-panel-scrollable" >
        <button @click="closeCellInfo" class="goa-button uk-float-right">X</button>
        <div class="uk-width-1-1">
            <div class="cell-data uk-margin-bottom">
                <span class="text-primary">Active Cell: </span><span>{{ activeCell.cell  }}</span>
                <div class="coordinates">
                    <span class="text-primary">Coordinates: </span><span>X: {{ Math.floor(activeCell.cell / gridColumns) }}, Y: {{ activeCell.cell % gridColumns }}</span>
                </div>
            </div>
            <div class="uk-width-1-1 uk-flex uk-flex-column uk-margin-small-bottom">
                <label class="text-primary" for="markerLayer">Layer</label>
                <select class="goa-input"  id="markerLayer" name="markerLayer" v-model="layer">
                    <option class="map-option" v-for="layer in layers">{{ layer }}</option>
                </select>
            </div>
            <div class="uk-flex uk-flex-column uk-margin-small-bottom">
                <label class="text-primary" for="markerCell">Cell</label>
                <input class="goa-input" type="text" name="markerCell" id="markerCell" readonly v-model="activeCell.cell">
            </div>
            <div class="uk-flex uk-flex-column uk-margin-small-bottom">
                <label class="text-primary" for="markerName">{{ layer != 'Strategy' ? layer : 'Location' }} Name</label>
                <input class="goa-input" type="text" name="markerName" id="markerName" v-model="activeCell.name">
            </div>
            <div class="uk-flex uk-flex-column uk-margin-small-bottom">
                <label class="text-primary" for="markerDescription">Description</label>
                <textarea class="goa-input" type="text" name="markerDescription" rows="10" id="markerDescription" v-model="activeCell.description"></textarea>
            </div>
        </div>
        <div>
            <button @click="submitLocation" class="goa-button">Submit Location</button>
        </div>
    </div>
    <div v-if="locationDetailsOpen && locationDetails.length > 0" class="location-details uk-margin-bottom uk-padding-small">
        <button @click="toggleLocationDetails" class="goa-button uk-float-right">Close</button>
        <div class="uk-flex">
            <div class="uk-flex uk-flex-column uk-margin-right uk-margin-bottom">
                <label class="text-primary" for="locationCell">Location #</label>
                <input id="locationCell" class="goa-input" type="text" :value="locationDetails[0].cell">
            </div>
        </div>
        <div v-for="location in locationDetails" class="uk-margin-top">
            <div class="uk-flex uk-flex-column">
                <label class="text-primary" for="locationLayer">Layer</label>
                <input id="locationLayer" class="goa-input" type="text" :value="location.layer">    
            </div>
            <div class="uk-flex uk-flex-column">
                <label class="text-primary" for="locationName">Name</label>
                <input id="locationName" class="goa-input" type="text" :value="location.name">
            </div>
            <div class="uk-flex uk-flex-column">
                <label class="text-primary" for="locationDescription">Description</label>
                <textarea id="locationDescription" class="goa-input" type="text"  :value="location.description"></textarea>
            </div>
        </div>
    </div>
</template>