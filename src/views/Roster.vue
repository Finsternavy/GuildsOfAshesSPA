<script setup>

import { computed, ref } from 'vue';

const selectedClass = ref();

const classes = {
    FIGHTER : [
        {
            name : 'WEAPON MASTER',
            primary: 'FIGHTER',
            secondary: 'FIGHTER',
            index: 0,
        }, 
        {
            name : 'DREADNOUGHT',
            primary: 'FIGHTER',
            secondary: 'TANK',
            index: 1,
        }, 
        {
            name : 'SHADOWBLADE',
            primary: 'FIGHTER',
            secondary: 'ROGUE',
            index: 2,
        },
        {
            name : 'HUNTER',
            primary: 'FIGHTER',
            secondary: 'RANGER',
            index: 3,
        }, 
        {
            name : 'SPELLSWORD',
            primary: 'FIGHTER',
            secondary: 'MAGE',
            index: 4
        }, 
        {
            name : 'BLADECALLER',
            primary: 'FIGHTER',
            secondary: 'SUMMONER',
            index: 5
        }, 
        {
            name : 'HIGHSWORD',
            primary: 'FIGHTER',
            secondary: 'CLERIC',
            index: 6
        }, 
        {
            name : 'BLADEDANCER',
            primary: 'FIGHTER',
            secondary: 'BARD',
            index: 7
        }
    ],
    TANK : [
        {
            name : 'KNIGHT',
            primary: 'TANK',
            secondary: 'FIGHTER',
            index: 0
        }, 
        {
            name : 'GUARDIAN',
            primary: 'TANK',
            secondary: 'TANK',
            index: 1
        }, 
        {
            name : 'NIGHTSHIELD',
            primary: 'TANK',
            secondary: 'ROGUE',
            index: 2
        }, 
        {
            name : 'WARDEN',
            primary: 'TANK',
            secondary: 'RANGER',
            index: 3
        }, 
        {
            name : 'SPELLSHIELD',
            primary: 'TANK',
            secondary: 'MAGE',
            index: 4
        }, 
        {
            name : 'KEEPER',
            primary: 'TANK',
            secondary: 'SUMMONER',
            index: 5
        }, 
        {
            name : 'PALADIN',
            primary: 'TANK',
            secondary: 'CLERIC',
            index: 6
        }, 
        {
            name : 'ARGENT',
            primary: 'TANK',
            secondary: 'BARD',
            index: 7
        }
    ],
    ROGUE : [
        {
            name : 'DUELIST',
            primary: 'ROGUE',
            secondary: 'FIGHTER',
            index: 0
        }, 
        {
            name : 'SHADOOW GUARDIAN',
            primary: 'ROGUE',
            secondary: 'TANK',
            index: 1
        }, 
        {
            name : 'ASSASSIN',
            primary: 'ROGUE',
            secondary: 'ROGUE',
            index: 2
        }, 
        {
            name : 'PREDATOR',
            primary: 'ROGUE',
            secondary: 'RANGER',
            index: 3
        }, 
        {
            name : 'NIGHTSPELL',
            primary: 'ROGUE',
            secondary: 'MAGE',
            index: 4
        }, 
        {
            name : 'SHADOW LORD',
            primary: 'ROGUE',
            secondary: 'SUMMONER',
            index: 5
        }, 
        {
            name : 'CULTIST',
            primary: 'ROGUE',
            secondary: 'CLERIC',
            index: 6
        }, 
        {
            name : 'CHARLATAN',
            primary: 'ROGUE',
            secondary: 'BARD',
            index: 7
        }
    ],
    RANGER : [
        {
            name : 'STRIDER',
            primary: 'RANGER',
            secondary: 'FIGHTER',
            index: 0
        }, 
        {
            name : 'SENTINEL',
            primary: 'RANGER',
            secondary: 'TANK',
            index: 1
        }, 
        {
            name : 'SCOUT',
            primary: 'RANGER',
            secondary: 'ROGUE',
            index: 2
        }, 
        {
            name : 'HAWKEYE',
            primary: 'RANGER',
            secondary: 'RANGER',
            index: 3
        }, 
        {
            name : 'SCION',
            primary: 'RANGER',
            secondary: 'MAGE',
            index: 4
        }, 
        {
            name : 'FALCONER',
            primary: 'RANGER',
            secondary: 'SUMMONER',
            index: 5
        }, 
        {
            name : 'SOULBOW',
            primary: 'RANGER',
            secondary: 'CLERIC',
            index: 6
        }, 
        {
            name : 'BOWSINGER',
            primary: 'RANGER',
            secondary: 'BARD',
            index: 7
        }
    ],
    MAGE : [
        {
            name : 'BATTLE MAGE',
            primary: 'MAGE',
            secondary: 'FIGHTER',
            index: 0
        }, 
        {
            name : 'SPELLSTONE',
            primary: 'MAGE',
            secondary: 'TANK',
            index: 1
        }, 
        {
            name : 'SHADOW CASTER',
            primary: 'MAGE',
            secondary: 'ROGUE',
            index: 2
        }, 
        {
            name : 'SPELLHUNTER',
            primary: 'MAGE',
            secondary: 'RANGER',
            index: 3
        }, 
        {
            name : 'ARCHWIZARD',
            primary: 'MAGE',
            secondary: 'MAGE',
            index: 4
        }, 
        {
            name : 'WARLOCK',
            primary: 'MAGE',
            secondary: 'SUMMONER',
            index: 5
        }, 
        {
            name : 'ACOLYTE',
            primary: 'MAGE',
            secondary: 'CLERIC',
            index: 6
        }, 
        {
            name : 'SORCERER',
            primary: 'MAGE',
            secondary: 'BARD',
            index: 7
        }
    ],
    SUMMONER : [
        {
            name : 'WILD BLADE',
            primary: 'SUMMONER',
            secondary: 'FIGHTER',
            index: 0
        }, 
        {
            name : 'BROOD WARDEN',
            primary: 'SUMMONER',
            secondary: 'TANK',
            index: 1
        }, 
        {
            name : 'SHADOWMANCER',
            primary: 'SUMMONER',
            secondary: 'ROGUE',
            index: 2
        }, 
        {
            name : 'BEASTMASTER',
            primary: 'SUMMONER',
            secondary: 'RANGER',
            index: 3
        }, 
        {
            name : 'SPELLMANCER',
            primary: 'SUMMONER',
            secondary: 'MAGE',
            index: 4
        }, 
        {
            name : 'CONJURER',
            primary: 'SUMMONER',
            secondary: 'SUMMONER',
            index: 5
        }, 
        {
            name : 'NECROMANCER',
            primary: 'SUMMONER',
            secondary: 'CLERIC',
            index: 6
        }, 
        {
            name : 'ENCHANTER',
            primary: 'SUMMONER',
            secondary: 'BARD',
            index: 7
        }
    ],
    CLERIC : [
        {
            name : 'TEMPLAR',
            primary: 'CLERIC',
            secondary: 'FIGHTER',
            index: 0
        }, 
        {
            name : 'APOSTLE',
            primary: 'CLERIC',
            secondary: 'TANK',
            index: 1
        }, 
        {
            name : 'SHADOW DISCIPLE',
            primary: 'CLERIC',
            secondary: 'ROGUE',
            index: 2
        }, 
        {
            name : 'PROTECTOR',
            primary: 'CLERIC',
            secondary: 'RANGER',
            index: 3
        }, 
        {
            name : 'ORACLE',
            primary: 'CLERIC',
            secondary: 'MAGE',
            index: 4
        }, 
        {
            name : 'SHAMAN',
            primary: 'CLERIC',
            secondary: 'SUMMONER',
            index: 5
        }, 
        {
            name : 'HIGH PRIEST',
            primary: 'CLERIC',
            secondary: 'CLERIC',
            index: 6
        }, 
        {
            name : 'SCRYER',
            primary: 'CLERIC',
            secondary: 'BARD',
            index: 7
        }
    ],
    BARD : [
        {
            name : 'TELLSWORD',
            primary: 'BARD',
            secondary: 'FIGHTER',
            index: 0
        }, 
        {
            name : 'SIREN',
            primary: 'BARD',
            secondary: 'TANK',
            index: 1
        }, 
        {
            name : 'TRICKSTER',
            primary: 'BARD',
            secondary: 'ROGUE',
            index: 2
        }, 
        {
            name : 'SONG WARDEN',
            primary: 'BARD',
            secondary: 'RANGER',
            index: 3
        }, 
        {
            name : 'MAGICIAN',
            primary: 'BARD',
            secondary: 'MAGE',
            index: 4
        }, 
        {
            name : 'SONGCALLER',
            primary: 'BARD',
            secondary: 'SUMMONER',
            index: 5
        }, 
        {
            name : 'SOUL WEAVER',
            primary: 'BARD',
            secondary: 'CLERIC',
            index: 6
        }, 
        {
            name : 'MINSTREL',
            primary: 'BARD',
            secondary: 'BARD',
            index: 7
        }
    ],
}

const headers = computed(() => {
    return Object.keys(classes);
})

const selectClass = (subclass) => {
    console.log(subclass);
    selectedClass.value = subclass;
}
</script>

<style scoped>
.cell {
    border: 1px solid rgba(255, 255, 255, .2);
    height: 50px;
}
.cell:hover {
    background-color: orange;
    color: black;
}

.title {
    color: orange;
}

.small-text {
    font-size: 12px;
}

.true-class {
    background-color: rgba(255, 165, 0, .1);
}

.selected-types {
    background-color: rgba(255, 165, 0, .3);
    /* color: black; */
}

.selected {
    background-color: orange;
    color: black;
}

.between {
    background-color: rgba(255, 255, 255, .2);
}
</style>

<template>
    <div class="roster goa-container">
        <!-- <h3 class="uk-light uk-text-center">{ Guild name } Roster</h3> -->
        <h3 class="uk-light uk-text-center uk-padding uk-padding-remove-bottom uk-text-bold">Character Matrix</h3>
        <div class="uk-padding uk-padding-remove-top">
            <table class="uk-table uk-table-justified uk-light">
    
                <thead>
                    <tr>
                        <td></td>
                        <td v-for="header in headers" :class="{'uk-text-center title' : header, 'selected-types' : selectedClass && header == selectedClass.secondary}">{{ header }}</td>
                    </tr>
                </thead>
                <tbody class="uk-padding">
                    <tr class="uk-text-center" v-for="key, index1 in Object.keys(classes)">
                        <td :class="{
                            'uk-text-middle title uk-padding-remove-left' : key, 
                            'selected-types' : selectedClass && key == selectedClass.primary}">{{ key }}</td>
                        <td v-for="subclass, index2 in classes[key]" 
                            :key="subclass.name + '_tile'"
                            @click="selectClass(subclass)"
                            :class="{
                                'cell uk-text-center uk-text-middle small-text' : subclass, 
                                'true-class' : index1 == index2,
                                'between' : selectedClass && selectedClass.primary == key && index2 < selectedClass.index || 
                                    selectedClass && selectedClass.secondary == subclass.secondary && headers.indexOf(selectedClass.primary) > headers.indexOf(subclass.primary),
                                    'selected' : selectedClass && subclass.name == selectedClass.name
                                }">
                            {{ subclass.name }}
                            {{ index1 }} | {{ index2 }}
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                </tfoot>
            </table>
        </div>
    </div>
</template>