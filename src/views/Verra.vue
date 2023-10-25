<script setup>
import { computed, onMounted, ref } from 'vue';
import Verra from '../public/Images/Verra_Map.png'

const gridSize = ref(20);
const gridColumns = ref(80);
const gridRows = ref(80);

let activeCell = ref(null);

let dataCells = ref([]);
let disableCellClick = ref(false);

let showCellInfoModal = ref(false);
let map = document.getElementById('verraContainer');
let mapCurrentScale = ref(100);
let zoomAmount = ref(15);
let currentX = ref(0);
let currentY = ref(0);
let currentRight = ref(0);
let currentBottom = ref(0);
let offset = ref(10);

let clickX = ref(0);
let clickY = ref(0);
let releaseX = ref(0);
let releaseY = ref(0);

let cellWidth = computed(() => {
    gridSize.value = (mapCurrentScale.value / gridSize.value);
    return gridSize;
});

onMounted(() => {

});

const handleScroll = () => {
    console.log('handleScroll');
    if (map){
        map.style.left = currentX.value + '%';
        map.style.top = currentY.value + '%';
    }
}

const setActiveCell = (index) => {
    if (!disableCellClick.value){
        console.log('setActiveCell: ', index);
        activeCell.value = index;
        if (!dataCells.value.includes(index)) {
            dataCells.value.push(index);
        }
        else if (dataCells.value.includes(index)) {
            dataCells.value.splice(dataCells.value.indexOf(index), 1);
            activeCell.value = null;
        }
    
        showCellInfoModal.value = true;
    }
}

const keyUp = () => {
    console.log('keyUp');
}

const hasContent = (index) => {
    if (dataCells.value.includes(index)) {
        return true;
    }
    return false;
}

const closeCellInfo = () => {
    showCellInfoModal.value = false;
}

const wheelZoom = (event) => {
    console.log('wheelZoom');
    if (event.deltaY < 0){
        zoomIn();
    }
    if (event.deltaY > 0){
        zoomOut();
    }
}

const setClickStart = (event) => {
    let clickX = event.clientX;
    console.log("clickX: ", event.clientX);
}

const zoomIn = () => {
    console.log('testZoom');
    if (!map){
        map = document.getElementById('verraContainer');
    }
    if (map){
        if (mapCurrentScale.value < 300){
                map.style.width = mapCurrentScale.value + zoomAmount.value + '%';
                map.style.height = mapCurrentScale.value + zoomAmount.value + '%';
                map.style.top = currentY.value - (zoomAmount.value / 2) + '%';
                map.style.left = currentX.value - (zoomAmount.value / 2) + '%';
                mapCurrentScale.value += zoomAmount.value;
                currentY.value -= (zoomAmount.value / 2);
                currentX.value -= (zoomAmount.value / 2);
                console.log("currentX: ", currentX.value);
                console.log("mapCurrenScale: ", mapCurrentScale.value);
            }
    }
}

const zoomOut = () => {
    console.log('zoomOut');
    if (!map){
        map = document.getElementById('verraContainer');
    }
    if (map){
        if (mapCurrentScale.value > 100){
                map.style.width = mapCurrentScale.value - zoomAmount.value + '%';
                map.style.height = mapCurrentScale.value - zoomAmount.value + '%';
                map.style.top = currentY.value + (zoomAmount.value / 2) + '%';
                map.style.left = currentX.value + (zoomAmount.value / 2) + '%';
                mapCurrentScale.value -= zoomAmount.value;
                currentY.value += (zoomAmount.value / 2);
                currentX.value += (zoomAmount.value / 2);
                console.log("currentX: ", currentX.value);
                console.log("mapCurrenScale: ", mapCurrentScale.value);
            }
            if (mapCurrentScale.value == 100){
                resetMap();
            }
    }
}


const moveRight = () => {
    // disableCellClick.value = true;
    console.log('moveRight');
    if (!map){
        map = document.getElementById('verraContainer');
    }
    if (map){
        if (mapCurrentScale.value == 100){
            resetMap();
            return;
        }
        console.log("currentX: ", currentX.value);
        // if (currentRight.value < 0) {
        //     currentRight.value = 0;
        // }
        if (mapCurrentScale.value > 250){
            if (currentX.value < 10 && currentX.value > -200){
                console.log("currentX: ", currentX.value);
                let Xoffset = currentX.value - offset.value;
                console.log("Xoffset: ", Xoffset);
                // if (Xoffset > currentRight.value) Xoffset = 0;
                map.style.left = Xoffset + '%';
                currentX.value -= offset.value;
                // currentRight.value -= offset.value;
            }
        }
        if (mapCurrentScale.value <= 250 && mapCurrentScale.value > 150){
            if (currentX.value < 10 && currentX.value > -150){
                console.log("currentX: ", currentX.value);
                let Xoffset = currentX.value - offset.value;
                console.log("Xoffset: ", Xoffset);
                // if (Xoffset > currentRight.value) Xoffset = 0;
                map.style.left = Xoffset + '%';
                currentX.value -= offset.value;
                // currentRight.value -= offset.value;
            }
        }
        if (mapCurrentScale.value <= 150 && mapCurrentScale.value > 100){
            if (currentX.value < 10 && currentX.value > -46){
                console.log("currentX: ", currentX.value);
                let Xoffset = currentX.value - offset.value;
                console.log("Xoffset: ", Xoffset);
                // if (Xoffset > currentRight.value) Xoffset = 0;
                map.style.left = Xoffset + '%';
                currentX.value -= offset.value;
                currentRight.value -= offset.value;
            }
        }
        // console.log("currentX: ", currentX.value);
        // map.style.left = currentX.value - offset.value + '%';
        // currentX.value -= offset.value;
    }
}

const moveLeft = () => {
    // disableCellClick.value = true;
    console.log('moveLeft');
    if (!map){
        map = document.getElementById('verraContainer');
    }
    if (map){
        if (mapCurrentScale.value == 100){
            resetMap();
            return;
        }
        if (currentX.value < 0 && currentX.value >= -220){
            console.log("currentX: ", currentX.value);
            let Xoffset = currentX.value + offset.value;
            if (Xoffset > 0) Xoffset = 0;
            map.style.left = Xoffset + '%';
            currentX.value += offset.value;
            currentRight.value += offset.value;
        }
        // console.log("currentX: ", currentX.value);
        // map.style.left = currentX.value + offset.value + '%';
        // currentX.value += offset.value;
    }
}

const moveUp = () => {
    // disableCellClick.value = true;
    console.log('moveUp');
    if (!map){
        map = document.getElementById('verraContainer');
    }
    if (map){
        if (mapCurrentScale.value == 100){
            return;
        }
        if (currentY.value < 0){
            console.log("currentY: ", currentY.value);
            let Yoffset = currentY.value + offset.value;
            if (Yoffset > 0) Yoffset = 0;
            map.style.top = Yoffset + '%';
            currentY.value += offset.value;
        }
    }
}

const moveDown = () => {
    // disableCellClick.value = true;
    console.log('moveDown');
    if (!map){
        map = document.getElementById('verraContainer');
    }
    if (map){
        if (mapCurrentScale.value == 100){
            return;
        }
        if (currentY.value <= 85 && currentY.value >= -175){
            console.log("currentY: ", currentY.value);
            map.style.top = currentY.value - offset.value + '%';
            currentY.value -= offset.value;
        }
    }
}

const resetMap = () => {
    // disableCellClick.value = false;
    console.log('resetMap');
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
    --width: v-bind(mapCurrentScale * 0.2 + 'px');
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-image: repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0px, rgba(0, 0, 0, 0.2) 1px, transparent 1px, transparent var(--width)), repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0px, rgba(0, 0, 0, 0.2) 1px, transparent 1px, transparent var(--width));
    outline: 1px solid black;
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
    background-color: rgba(119, 13, 13, 0.8);
}

.circle {
    border-radius: 50%;
    background-color: red;
    min-height: 50%;
    min-width: 50%;
    max-height: 50%;
    max-width: 50%;
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

.controls {
    position: absolute;
    bottom: 40px;
    right: 50%;
    transform: translateX(50%);
    padding: 20px;
    width: fit-content;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    border: 2px solid rgba(0, 0, 0, 0.8);
}
</style>

<template>
    <div @wheel="wheelZoom" class="map-board-container uk-overflow-hidden uk-margin-bottom">
        <div id="verraContainer" class="verra uk-position-relative">
            <div class="verra-map-container uk-flex uk-flex-center">
                <div id="VerraMap" class="verra-map uk-position-relative" :data-src="Verra" uk-img></div>
            </div>
            <div class=" uk-margin-bottom">
                <div  class="map-grid uk-width-1-1">
                    <div v-for="row, index in (gridColumns * gridRows)" 
                        :key="index" 
                        class="map-cell uk-flex uk-flex-center uk-flex-middle"
                        @click="setActiveCell(index)">
    
                        <div v-if="hasContent(index)" class="circle">
                            <div class="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="controls uk-flex uk-flex-column uk-flex-middle">
            <div class="zoom-buttons">
                <button class="uk-icon-button" @click="zoomIn"><span uk-icon="icon: plus-circle"></span></button>
                <button class="uk-icon-button" @click="zoomOut"><span uk-icon="icon: minus-circle"></span></button>
            </div>
            <div class="direction-buttons uk-flex uk-flex-middle">
                <button class="uk-icon-button" @click="moveLeft"><span uk-icon="icon: chevron-left"></span></button>
                <div class="up-down-buttons uk-flex uk-flex-column">
                    <button class="uk-icon-button" @click="moveUp"><span uk-icon="icon: chevron-up"></span></button>
                    <button class="uk-icon-button" @click="resetMap"><span uk-icon="icon: refresh"></span></button>
                    <button class="uk-icon-button" @click="moveDown"><span uk-icon="icon: chevron-down"></span></button>
                </div>
                <button class="uk-icon-button" @click="moveRight"><span uk-icon="icon: chevron-right"></span></button>
            </div>
        </div>
    </div>
    <div v-if="showCellInfoModal" id="cellModal" class="cell-info-modal goa-container uk-padding uk-width-1-1 uk-panel-scrollable" >
        <button @click="closeCellInfo" class="goa-button uk-float-right">X</button>
        <div class="uk-width-1-1">
            <div class="cell-data uk-margin-bottom">
                <span>Active Cell: </span><span class="text-primary">{{ activeCell  }}</span>
                <div class="coordinates">
                    <span>Coordinates: </span><span class="text-primary">X: {{ Math.floor(activeCell / gridColumns) }}, Y: {{ activeCell % gridColumns }}</span>
                </div>
            </div>
            <div class="location-information-container">
                <span>Location Information:</span>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus veniam neque possimus at obcaecati provident culpa. Laboriosam, incidunt! Praesentium accusamus aliquid ut cum consequatur sequi?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A architecto ipsa fuga facere. Ad, iste possimus at delectus laborum eligendi cupiditate rerum voluptates distinctio! Pariatur!</p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est explicabo quibusdam, ab perspiciatis repellendus in minima repudiandae. Fugit hic perferendis, quidem vitae nisi unde nulla esse exercitationem mollitia voluptas ad temporibus autem architecto et vero optio error amet minima, veniam placeat doloribus sapiente natus! In eaque ut praesentium cum labore beatae repellat delectus dolorum facere possimus. Ea a unde tempora aspernatur veritatis doloribus ducimus consequatur, minus et labore necessitatibus aliquam ipsam? Sequi vero maxime, quod neque, rem accusantium facere commodi sit eum dolore placeat quia ut? Consectetur reiciendis aut beatae saepe dolore porro architecto repudiandae tempore natus libero? Incidunt, fugiat.
            </div>
        </div>
    </div>
</template>