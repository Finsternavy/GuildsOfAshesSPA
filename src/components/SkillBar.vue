<script setup>
import { ref } from 'vue';
import FireBalls from '../public/Ability_Icons/fireBalls.jpg';
import HealthPot from '../public/Ability_Icons/healthPot.jpg';
import IceShard from '../public/Ability_Icons/iceShard.jpg';
import IceSpike from '../public/Ability_Icons/IceSpike.jpg';
import IceStorm from '../public/Ability_Icons/IceStorm.jpg';
import LavaRocks from '../public/Ability_Icons/lavaRocks.jpg';
import LightningStrike from '../public/Ability_Icons/lightningStrike.jpg';
import LightRock from '../public/Ability_Icons/lightRocks.jpg';
import ManaPot from '../public/Ability_Icons/manaPot.jpg';
import Meteor from '../public/Ability_Icons/meteor.jpg';
import MoonKnight from '../public/Ability_Icons/moonKnight.jpg';
import Shield from '../public/Ability_Icons/shield.jpg';
import Shock from '../public/Ability_Icons/shock.jpg';
import ShockOrb from '../public/Ability_Icons/shockOrb.jpg';
import Slash from '../public/Ability_Icons/slash.jpg';
import Sparks from '../public/Ability_Icons/sparks.jpg';
import Spikes from '../public/Ability_Icons/spikes.jpg';
import Teleport from '../public/Ability_Icons/teleport.jpg';

let showAbilitySelectionBox = ref(false);
let activeAbility = ref();
let activeAbilityIndex = ref();
let activeBar = ref(1);

const abilities = ref([
    
    {
        name: 'Slash',
        icon: Slash,
        description: 'Shoots a slash at the target',
        damage: 10,
        manaCost: 10,
        cooldown: 5,
    },
    {
        name: 'Fire Balls',
        icon: FireBalls,
        description: 'Shoots 3 fire balls at the target',
        damage: 10,
        manaCost: 10,
        cooldown: 5,
    },
    {
        name: 'Health Potion',
        icon: HealthPot,
        description: 'Heals the player for 50 health',
        damage: 0,
        manaCost: 0,
        cooldown: 5,
    },
    {
        name: 'Ice Shard',
        icon: IceShard,
        description: 'Shoots a shard of ice at the target',
        damage: 10,
        manaCost: 10,
        cooldown: 5,
    },
    {
        name: 'Ice Spike',
        icon: IceSpike,
        description: 'Shoots a spike of ice at the target',
        damage: 10,
        manaCost: 10,
        cooldown: 5,
    },
    {
        name: 'Ice Storm',
        icon: IceStorm,
        description: 'Shoots a storm of ice at the target',
        damage: 10,
        manaCost: 10,
        cooldown: 5,
    },
    {
        name: 'Lava Rocks',
        icon: LavaRocks,
        description: 'Shoots a rock of lava at the target',
        damage: 10,
        manaCost: 10,
        cooldown: 5,
    },
    {
        name: 'Lightning Strike',
        icon: LightningStrike,
        description: 'Shoots a lightning strike at the target',
        damage: 10,
        manaCost: 10,
        cooldown: 5,
    },
    {
        name: 'Light Rock',
        icon: LightRock,
        description: 'Shoots a rock of light at the target',
        damage: 10,
        manaCost: 10,
        cooldown: 5,
    },
    {
        name: 'Mana Potion',
        icon: ManaPot,
        description: 'Restores 50 mana',
        damage: 0,
        manaCost: 0,
        cooldown: 5,
    },
    {
        name: 'Meteor',
        icon: Meteor,
        description: 'Shoots a meteor at the target',
        damage: 10,
        manaCost: 10,
        cooldown: 5,
    },
    {
        name: 'Moon Knight',
        icon: MoonKnight,
        description: 'Shoots a moon knight at the target',
        damage: 10,
        manaCost: 10,
        cooldown: 5,
    },
    {
        name: 'Shield',
        icon: Shield,
        description: 'Creates a shield around the player',
        damage: 0,
        manaCost: 10,
        cooldown: 5,
    },
    {
        name: 'Shock',
        icon: Shock,
        description: 'Shoots a shock at the target',
        damage: 10,
        manaCost: 10,
        cooldown: 5,
    },
    {
        name: 'Shock Orb',
        icon: ShockOrb,
        description: 'Shoots a shock orb at the target',
        damage: 10,
        manaCost: 10,
        cooldown: 5,
    },
    {
        name: 'Sparks',
        icon: Sparks,
        description: 'Shoots sparks at the target',
        damage: 10,
        manaCost: 10,
        cooldown: 5,
    },
    {
        name: 'Spikes',
        icon: Spikes,
        description: 'Shoots spikes at the target',
        damage: 10,
        manaCost: 10,
        cooldown: 5,
    },
    {
        name: 'Teleport',
        icon: Teleport,
        description: 'Teleports the player to the target',
        damage: 0,
        manaCost: 10,
        cooldown: 5,
    },
])

let abilityBar1 = ref([
    {
        name: 'Slash',
        icon: Slash,
        description: 'Shoots a slash at the target',
        damage: 10,
        manaCost: 10,
        cooldown: 5,
    },
    {
        name: 'Fire Balls',
        icon: FireBalls,
        description: 'Shoots 3 fire balls at the target',
        damage: 10,
        manaCost: 10,
        cooldown: 5,
    },
    {
        name: 'Health Potion',
        icon: HealthPot,
        description: 'Heals the player for 50 health',
        damage: 0,
        manaCost: 0,
        cooldown: 5,
    },
    {
        name: 'Ice Shard',
        icon: IceShard,
        description: 'Shoots a shard of ice at the target',
        damage: 10,
        manaCost: 10,
        cooldown: 5,
    },
    {
        name: 'Ice Spike',
        icon: IceSpike,
        description: 'Shoots a spike of ice at the target',
        damage: 10,
        manaCost: 10,
        cooldown: 5,
    },
    {
        name: 'Ice Storm',
        icon: IceStorm,
        description: 'Shoots a storm of ice at the target',
        damage: 10,
        manaCost: 10,
        cooldown: 5,
    },
])

let abilityBar2 = ref([
    {
        name: 'Lava Rocks',
        icon: null,
        description: 'Shoots a rock of lava at the target',
        damage: 10,
        manaCost: 10,
        cooldown: 5,
    },
    {
        name: 'Lightning Strike',
        icon: null,
        description: 'Shoots a lightning strike at the target',
        damage: 10,
        manaCost: 10,
        cooldown: 5,
    },
    {
        name: 'Light Rock',
        icon: null,
        description: 'Shoots a rock of light at the target',
        damage: 10,
        manaCost: 10,
        cooldown: 5,
    },
    {
        name: 'Mana Potion',
        icon: null,
        description: 'Restores 50 mana',
        damage: 0,
        manaCost: 0,
        cooldown: 5,
    },
    {
        name: 'Meteor',
        icon: null,
        description: 'Shoots a meteor at the target',
        damage: 10,
        manaCost: 10,
        cooldown: 5,
    },
    {
        name: 'Moon Knight',
        icon: null,
        description: 'Shoots a moon knight at the target',
        damage: 10,
        manaCost: 10,
        cooldown: 5,
    },
])

const showAbilities = () => {
    showAbilitySelectionBox.value = !showAbilitySelectionBox.value;
}

const setActiveAbility = (ability) => {
    if (activeBar.value == 1) {
        abilityBar1.value[activeAbilityIndex.value] = ability;
    } else {
        abilityBar2.value[activeAbilityIndex.value] = ability;
    }
    showAbilitySelectionBox.value = false;
    activeBar.value = null;
    activeAbilityIndex.value = null;
}

const changeAbility = (bar, index) => {
    activeBar.value = bar;
    activeAbilityIndex.value = index;
    if (showAbilitySelectionBox.value == false) {
        showAbilitySelectionBox.value = true;
    }
    // abilityBar1.value[index] = abilities.value[index];
    // showAbilitySelectionBox.value = false;
}
</script>

<style scoped>
.select-ability-box {
    width: fit-content;
    background-color: #2f2f2f;
    border-radius: 40px;
    margin-left: auto;
    margin-right: auto;
}
.ability-icon-container {
    height: 75px;
    width: 75px;
    margin-inline: 3px;
    outline: 2px solid #4f4f4f;
    cursor: pointer;
}
.ability-icon {
    width: 75px;
    height: 75px;
}

.ability-option {
    max-width: fit-content;
    margin: 3px!important;
    outline: 2px solid #4f4f4f;
    cursor: pointer;
}

.ability-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr 1fr);
}

.ability-selection-container {
    margin-left: auto;
    margin-right: auto;
    max-width: 800px;
}

.selected-ability::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 5px;
    right: 5px;
    bottom: 2px;
    background-color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
    .ability-icon-container {
        height: 40px;
        width: 40px;
        margin-inline: 3px;
        outline: 2px solid #4f4f4f;
    }
    .ability-icon {
        width: 40px;
        height: 40px;
    }

    .select-ability-box {
        border-radius: 20px;
        padding: 10px;
    }
}
</style>

<template>
    <div class="ability-bar">
        <div v-show="showAbilitySelectionBox" class="select-ability-box uk-padding">
            <h4 class="uk-text-center">Select A New Skill</h4>
            <div class="ability-selection-container uk-margin-bottom uk-flex uk-flex-center" uk-grid>
                <div class="ability-option  uk-flex uk-padding-remove" v-for="ability in abilities" :key="ability.name"
                @click="setActiveAbility(ability)">
                    <div class="ability-icon uk-background-cover" :data-src="ability.icon" alt="ability icon" uk-img></div>
                </div>
            </div>
        </div>
        <div class="my-abilities-container uk-width-1-1">
            <h4 class="uk-text-center uk-margin-small-top">My Skill Bar</h4>
            <div class="ability-bar-1 uk-flex uk-flex-center uk-width-1-1 uk-margin-small-bottom">
                <div class="ability uk-position-relative" v-for="(ability, index) in abilityBar1" :key="'bar-1-ability-slot-' + index"
                @click="changeAbility(1, index)">
                    <div class="ability-icon-container" :class="{'selected-ability': activeBar == 1 && activeAbilityIndex == index}" >
                        <img class="ability-icon" :src="ability.icon" alt="ability icon">
                    </div>
                </div>
            </div>
            <div class="ability-bar-2 uk-flex uk-flex-center uk-width-1-1 uk-margin-small-bottom">
                <div class="ability uk-position-relative" v-for="(ability, index) in abilityBar2" :key="'bar-2-ability-slot-' + index"
                @click="changeAbility(2 , index)">
                    <div class="ability-icon-container" :class="{'selected-ability': activeBar == 2 && activeAbilityIndex == index}" >
                        <img class="ability-icon" :src="ability.icon" alt="ability icon">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>