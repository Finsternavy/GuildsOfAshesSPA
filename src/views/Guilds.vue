<script setup>
import { ref } from "vue";
import router from "../router/routes";

const visit = () => {
    console.log("visit");
    router.push({ name: "guild-home" });
};
</script>

<style scoped>
.guild-card {
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    border-radius: 30px;
    transition: background-color 0.3s ease-in-out;
}
.guild-card:hover {
    background-color: rgba(255, 255, 255, 0.4);
    color: black;
}
.guild-card:hover > div > p {
    color: black;
}
.guild-card:hover > div > label {
    color: orangered;
}
.label {
    color: orange;
}

.dark-line {
    border: 1px solid rgba(0, 0, 0, 0.5);
}
</style>

<template>
    <div class="uk-container ">
        <h1 class="uk-text-center uk-text-bold">Guild List</h1>
        <hr class="dark-line">
        <button v-for="num in 4"
            class="guild-card uk-margin-bottom uk-flex uk-flex-around uk-padding-small uk-width-1-1"
            @click="visit">
            <div class="guild-name uk-margin-right">
                <label class="label" for="Guild-Name">Name</label>
                <p class="uk-margin-remove uk-light" id="Guild-Name">Guild - {{ num }}</p>
            </div>
            <div class="uk-margin-right">
                <label class="label" for="Guild-Type">Type</label>
                <p class="uk-margin-remove uk-light" id="Guild-Type">PvE</p>
            </div>
            <div class="uk-margin-right">
                <label class="label" for="Guild-Focus">Focus</label>
                <p class="uk-margin-remove uk-light" id="Guild-Focus">Castle Control</p>
            </div>
            <div class="uk-margin-right">
                <label class="label" for="Guild-Region">Region</label>
                <p class="uk-margin-remove uk-light" id="Guild-Region">NA-C</p>
            </div>
            <div>
                <label class="label" for="Guild-Size">Members</label>
                <p class="uk-margin-remove uk-light" id="Guild-Size">48</p>
            </div>
        </button>
       
    </div>
</template>