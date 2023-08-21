<script setup>

import { computed, ref, watch, reactive } from 'vue';
import CharacterMatrix from '../components/CharacterMatrix.vue';

import Fighter from '../../public/AOC_Icons/fighter_icon.png';
import Tank from '../../public/AOC_Icons/tank_icon.png';
import Rogue from '../../public/AOC_Icons/rogue_icon.png';
import Ranger from '../../public/AOC_Icons/ranger_icon.png';
import Mage from '../../public/AOC_Icons/mage_icon.png';
import Summoner from '../../public/AOC_Icons/summoner_icon.png';
import Cleric from '../../public/AOC_Icons/cleric_icon.png';
import Bard from '../../public/AOC_Icons/bard_icon.png';

const selectedClass = ref();


const membersList = [
    {
        ID: 1234,
        name : 'CyFinXP',
        subclass : 'SOULBOW',
        primary : 'RANGER',
        secondary : 'CLERIC',
        role : 'Guild Leader',
        trade1 : 'Leatherworker',
        trade2 : 'Weaponsmith',
        favoriteActivity: 'Dungeons',
    },
    {
        ID: 1236,
        name : 'Mason',
        subclass : 'DREADNOUGHT',
        primary : 'FIGHTER',
        secondary : 'TANK',
        role : 'Marshall',
        trade1 : 'Armorsmith',
        trade2 : 'Enchanter',
        favoriteActivity: 'Sieges',
    },
    {
        ID: 1237,
        name : 'Player3',
        subclass : 'ORACLE',
        primary : 'CLERIC',
        secondary : 'MAGE',
        role : 'Soldier',
        trade1 : 'Shipbuilder',
        trade2 : 'Carpenter',
        favoriteActivity: 'Ship Battles',
    },
    {
        ID: 1238,
        name : 'Player4',
        subclass : 'ENCHANTER',
        primary : 'SUMMONER',
        secondary : 'BARD',
        role : 'Soldier',
        trade1 : 'Enchanter',
        trade2 : 'Jeweler',
        favoriteActivity: 'Dungeons',
    },
    {
        ID: 1239,
        name : 'Player5',
        subclass : 'GUARDIAN',
        primary : 'TANK',
        secondary : 'TANK',
        role : 'Soldier',
        trade1 : 'Armorsmith',
        trade2 : 'Alchemist',
        favoriteActivity: 'Caravans',
    },
    {
        ID: 1240,
        name : 'Player6',
        subclass : 'NIGHTSPELL',
        primary : 'ROGUE',
        secondary : 'MAGE',
        role : 'Soldier',
        trade1 : 'Leathersmith',
        trade2 : 'Alchemist',
        favoriteActivity: 'Sieges',
    },
    {
        ID: 1241,
        name : 'Player7',
        subclass : 'TELLSWORD',
        primary : 'BARD',
        secondary : 'FIGHTER',
        role : 'Soldier',
        trade1 : 'Alchemist',
        trade2 : 'Enchanter',
        favoriteActivity: 'Dungeons',
    },
    {
        ID: 1242,
        name : 'Player',
        subclass : 'SHADOWBLADE',
        primary : 'FIGHTER',
        secondary : 'ROGUE',
        role : 'Soldier',
        trade1 : 'Jeweler',
        trade2 : 'Weaponsmith',
        favoriteActivity: 'Sieges',
    },
]

const getClassIcon = (className) => {
    if( className.toLowerCase() === 'fighter'){
        return Fighter;
    }
    if( className.toLowerCase() === 'tank'){
        return Tank;
    }
    if( className.toLowerCase() === 'rogue'){
        return Rogue;
    }
    if( className.toLowerCase() === 'ranger'){
        return Ranger;
    }
    if( className.toLowerCase() === 'mage'){
        return Mage;
    }
    if( className.toLowerCase() === 'summoner'){
        return Summoner;
    }
    if( className.toLowerCase() === 'cleric'){
        return Cleric;
    }
    if( className.toLowerCase() === 'bard'){
        return Bard;
    }
}
</script>

<style scoped>
label {
    color: orange;
}
.gold {
    border: 1px solid gold;
}

.silver {
    border: 1px solid silver;
}
</style>

<template>
<div class="roster">
    <div class="goa-container">
        <!-- <h3 class="uk-light uk-text-center">{ Guild name } Roster</h3> -->
        <h3 class="uk-light uk-text-center uk-padding uk-padding-remove-bottom uk-text-bold">Character Matrix</h3>
        <div class="uk-padding uk-padding-remove-top">
            <CharacterMatrix v-model="selectedClass"/>
            <div class="uk-flex uk-flex-center">
                <div v-if="selectedClass"  class="uk-flex-column uk-width-1-2@l">
                    <div class="uk-flex uk-flex-between uk-margin-bottom">
                        <label for="selected-primary text-orange">Primary Archetype</label>
                        <input class="goa-input uk-text-center" type="text" id="selected-primary" disabled v-model="selectedClass.primary">
                    </div>
                    <div class="uk-flex uk-flex-between">
                        <label for="selected-secondary text-orange">Secondary Archetype</label>
                        <input class="goa-input uk-text-center" type="text" id="selected-secondary" disabled v-model="selectedClass.secondary">
                    </div>
                    <div class="uk-flex uk-flex-between uk-child-width-1- uk-margin-top">
                        <button class="goa-button uk-margin-right">Filter Roster</button>
                        <button class="goa-button ">Update My Class</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="guild-roster">
        <div class="header goa-container uk-margin-top uk-padding uk-margin-large-top">
            <h3 class="uk-light uk-text-center   uk-text-bold">Guild Roster</h3>
            <div class="uk-flex uk-child-width-1-4 uk-text-center">
                <span class="uk-text-warning uk-text-large">Member</span>
                <span class="uk-text-warning uk-text-large">Class</span>
                <span class="uk-text-warning uk-text-large">Professions</span>
                <span class="uk-text-warning uk-text-large">Favorite Activity</span>
            </div>
        </div>
        <ul class="guild-members-list uk-list uk-margin-top">
            <li v-for="member in membersList" class="goa-container padding-small">
                <div :key="member.ID" class="uk-flex uk-child-width-1-4">
                    <div class="member-name uk-text-center">
                        <label class="uk-margin-remove">{{ member.name }} ( {{ member.role }} )</label>
                        <p class="uk-margin-remove">XP: 345</p>
                    </div>
                    <div class="class-info uk-flex uk-flex-column">
                        <div class="uk-text-center">
                            <label class="uk-margin-remove">{{ member.subclass }}</label>
                        </div>
                        <div class="member-class-info uk-flex uk-flex-center">
                            <div class="uk-background-cover gold" style="width: 40px; height: 40px" :data-src="getClassIcon(member.primary)" uk-img></div>
                            <div class="uk-background-cover silver" style="width: 40px; height: 40px" :data-src="getClassIcon(member.secondary)" uk-img></div>
                        </div>
                    </div>
                    <div class="trades-info uk-flex uk-flex-column uk-text-center">
                        <div class="trade-label uk-text-center">
                            <label>Professions</label>
                        </div>
                        <div>
                            <p class="uk-margin-remove">Trade 1: {{ member.trade1 }}</p>
                            <p class="uk-margin-remove">Trade 2: {{ member.trade2 }}</p>
                        </div>
                    </div>
                    <div class="activities-info  uk-text-center">
                        <label class="uk-margin-remove">Favorite Activity</label>
                        <p class="uk-margin-remove">{{ member.favoriteActivity }}</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>