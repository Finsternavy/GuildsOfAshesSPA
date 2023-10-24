<script setup>
import { computed, ref } from 'vue';
import Verra from '../public/Images/Verra_Map.png'

const gridSize = ref(20);
const gridColumns = ref(80);
const gridRows = ref(80);

let activeCell = ref(null);

let dataCells = ref([]);

let showCellInfoModal = ref(false);

const setActiveCell = (index) => {
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

const hasContent = (index) => {
    if (dataCells.value.includes(index)) {
        return true;
    }
    return false;
}

const closeCellInfo = () => {
    showCellInfoModal.value = false;
}
</script>

<style scoped>
.verra-map-container {
    height: 100%;
    width: 100%;
    background-color: aqua;
    
    outline: 5px solid black;
}

.verra-map::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0px, rgba(0, 0, 0, 0.2) 1px, transparent 1px, transparent  v-bind(gridSize + 'px')), repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0px, rgba(0, 0, 0, 0.2) 1px, transparent 1px, transparent v-bind(gridSize + 'px'));
    
    outline: 10px solid black;
}
.verra-map {
    aspect-ratio: 1;
    width: 100%;
    background-color: rgba(0, 115, 222, 0.4);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
}

.map-grid {
    position: absolute;
    top: 0;
    left: 0;
    display: grid;
    width: v-bind(gridColumns * gridSize + 'px' + gridColumns + 'px');
    grid-template-columns: repeat(v-bind(gridColumns), 1fr);
    grid-template-rows: repeat(v-bind(gridRows), 1fr);
    /* background-color: blue; */
    gap: 1px;
    aspect-ratio: 1;
}
.map-cell {
    width: calc(v-bind(gridSize + 'px') - 1px);
    height: calc(v-bind(gridSize + 'px') - 1px);
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
</style>

<template>
    <div class="verra uk-position-relative">
        <div class="vera-map-container uk-flex uk-flex-center">
            <div class="verra-map uk-position-relative" :data-src="Verra" uk-img>
    
            </div>
        </div>
        <div class="">
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