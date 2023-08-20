<script setup>

</script>

<style scoped>
.goa-container {
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    border-radius: 30px;
    transition: background-color 0.3s ease-in-out;
}

.input {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

input,
textarea,
select,
button {
    border-radius: 20px;
    padding-left: 20px;
}

label {
    padding-left: 20px;
    color: orange;
}
.input > input,
.input > textarea {
    /* padding: 3px; */
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
}
select {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
}

textarea {
    min-height: 100px;
}

.goa-button {
    border-radius: 20px;
    background-color: transparent;
    color: white;
    padding: 5px 30px;
    /* height: 40px; */
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.goa-button:hover {
    background-color: gold;
    color: black;
}
</style>

<template>
    <div class="create-guild goa-container">
        <div class="goa-header uk-padding uk-padding-remove-bottom">
            <h3 class="uk-light uk-text-center uk-margin-remove">GUILD CREATION</h3>
            <hr class="uk-margin-remove-bottom">
        </div>
        <div class="uk-form uk-padding uk-grid-small" uk-grid>
            <div class="input uk-width-1-2">
                <label for="guild-name">Guild Name</label>
                <input type="text" id="guild-name" class="goa-input uk-input">
            </div>
            <div class="js-upload uk-light uk-width-1-2" uk-form-custom>
                <label for="guild-logo">Guild Logo</label>
                <input type="file" multiple>
                <button class="uk-button uk-button-default uk-width-stretch" type="button" tabindex="-1">Upload</button>
            </div>
            <div class="input uk-width-1-1">
                <label for="guild-description">Guild Description</label>
                <textarea id="guild-description" class="goa-input uk-input"></textarea>
            </div>
            <div class="input uk-width-1-4">
                <label for="guild-type">Guild Type</label>
                <select id="guild-type" class="goa-input uk-input">
                    <option value=""></option>
                    <option value="rp">RP</option>
                    <option value="casual">Casual</option>
                    <option value="hardcore">Hardcore</option>
                    <option value="social">Social</option>
                </select>
            </div>
            <div class="input uk-width-1-4">
                <label for="guild-focus">Focus</label>
                <select id="guild-focus" class="goa-input uk-input">
                    <option value=""></option>
                    <option value="pvp">PvP</option>
                    <option value="pve">PvE</option>
                    <option value="crafting">Crafting</option>
                    <option value="trading">Trading</option>
                    <option value="exploration">Exploration</option>
                    <option value="mercenary">Mercenary</option>
                    <option value="sailing">Sailing</option>
                </select>
            </div>
            <div class="input uk-width-1-4">
                <label for="guild-race">Primary Race</label>
                <select id="guild-race" class="goa-input uk-input">
                    <option value=""></option>
                    <option value="aelune">Aelune</option>
                    <option value="kaelar">Kaelar</option>
                    <option value="pyrian">Pyrian</option>
                    <option value="renkai">Ren'Kai</option>
                    <option value="vaelune">Vaelune</option>
                </select>
            </div>
            <div class="input uk-width-1-4">
                <label for="guild-region">Region</label>
                <select id="guild-region" class="goa-input uk-input">
                    <option value=""></option>
                    <option value="na-east">NA-East</option>
                    <option value="na-west">NA-West</option>
                    <option value="oceania">Oceania</option>
                    <option value="south-america">South America</option>
                    <option value="europe">Europe</option>
                    <option value="asia">Asia</option>
                </select>
            </div>
        </div>
        <button class="uk-button uk-button-default goa-button uk-margin-medium-left uk-margin-bottom uk-light">Create Guild</button>
    </div>
</template>