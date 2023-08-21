<script setup>
import { ref } from "vue";
import router from "../router/routes";

const visit = () => {
    console.log("visit");
    router.push({ name: "guild-home" });
};

const goToCreate = () => {
    console.log("goToCreate");
    router.push({ name: "guild-create" });
};
</script>

<style scoped>
.guild-header {
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    border-radius: 30px;
    transition: background-color 0.3s ease-in-out;
}
.guild-card {
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    border-radius: 30px;
    transition: background-color 0.3s ease-in-out;
}
.guild-card:hover {
    background-color: rgba(0,0,0, 1);
    color: black;
}
.guild-card:hover > div > p {
    /* color: black; */
}
.guild-card:hover > div > label {
    /* color: orangered; */
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
        <div class="guild-header uk-padding-small uk-margin-bottom uk-flex uk-flex-middle uk-flex-between">
            <input class="goa-input" type="text" placeholder="Search...">
            <h3 class="uk-text-center uk-text-bold uk-position-center uk-light uk-margin-remove">Guild List</h3>
            <button class="goa-button" @click="goToCreate"><span uk-icon="icon: plus"> </span> Create Guild</button>
        </div>
        <button v-for="num in 4"
            class="guild-card uk-margin-bottom uk-flex uk-flex-around uk-padding-small uk-width-1-1"
            @click="visit">
            <div class="guild-name">
                <label class="label" for="Guild-Name">Name</label>
                <p class="uk-margin-remove uk-light" id="Guild-Name">Guild - {{ num }}</p>
            </div>
            <div class="">
                <label class="label" for="Guild-Type">Type</label>
                <p class="uk-margin-remove uk-light" id="Guild-Type">PvE</p>
            </div>
            <div class="">
                <label class="label" for="Guild-Focus">Focus</label>
                <p class="uk-margin-remove uk-light" id="Guild-Focus">Castle Control</p>
            </div>
            <div class="">
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