<script setup>

import { computed } from 'vue';

const classes = {
    FIGHTER : [
        {
            name : 'WEAPON MASTER',
            primary: 'FIGHTER',
            secondary: 'FIGHTER',
        }, 
        {
            name : 'DREADNOUGHT',
            primary: 'FIGHTER',
            secondary: 'TANK',
        }, 
        {
            name : 'SHADOWBLADE',
            primary: 'FIGHTER',
            secondary: 'ROGUE',
        },
        {
            name : 'HUNTER',
            primary: 'FIGHTER',
            secondary: 'RANGER',
        }, 
        {
            name : 'SPELLSWORD',
            primary: 'FIGHTER',
            secondary: 'MAGE',
        }, 
        {
            name : 'BLADECALLER',
            primary: 'FIGHTER',
            secondary: 'SUMMONER',
        }, 
        {
            name : 'HIGHSWORD',
            primary: 'FIGHTER',
            secondary: 'CLERIC',
        }, 
        {
            name : 'BLADEDANCER',
            primary: 'FIGHTER',
            secondary: 'BARD',
        }
    ],
    TANK : [
        {
            name : 'KNIGHT',
            primary: 'TANK',
            secondary: 'FIGHTER',
        }, 
        {
            name : 'GUARDIAN',
            primary: 'TANK',
            secondary: 'TANK',
        }, 
        {
            name : 'NIGHTSHIELD',
            primary: 'TANK',
            secondary: 'ROGUE',
        }, 
        {
            name : 'WARDEN',
            primary: 'TANK',
            secondary: 'RANGER',
        }, 
        {
            name : 'SPELLSHIELD',
            primary: 'TANK',
            secondary: 'MAGE',
        }, 
        {
            name : 'KEEPER',
            primary: 'TANK',
            secondary: 'SUMMONER',
        }, 
        {
            name : 'PALADIN',
            primary: 'TANK',
            secondary: 'CLERIC',
        }, 
        {
            name : 'ARGENT',
            primary: 'TANK',
            secondary: 'BARD',
        }
    ],
    ROGUE : [
        {
            name : 'DUELIST',
            primary: 'ROGUE',
            secondary: 'FIGHTER',
        }, 
        {
            name : 'SHADOOW GUARDIAN',
            primary: 'ROGUE',
            secondary: 'TANK',
        }, 
        {
            name : 'ASSASSIN',
            primary: 'ROGUE',
            secondary: 'ROGUE',
        }, 
        {
            name : 'PREDATOR',
            primary: 'ROGUE',
            secondary: 'RANGER',
        }, 
        {
            name : 'NIGHTSPELL',
            primary: 'ROGUE',
            secondary: 'MAGE',
        }, 
        {
            name : 'SHADOW LORD',
            primary: 'ROGUE',
            secondary: 'SUMMONER',
        }, 
        {
            name : 'CULTIST',
            primary: 'ROGUE',
            secondary: 'CLERIC',
        }, 
        {
            name : 'CHARLATAN',
            primary: 'ROGUE',
            secondary: 'BARD',
        }
    ],
    RANGER : [
        {
            name : 'STRIDER',
            primary: 'RANGER',
            secondary: 'FIGHTER',
        }, 
        {
            name : 'SENTINEL',
            primary: 'RANGER',
            secondary: 'TANK',
        }, 
        {
            name : 'SCOUT',
            primary: 'RANGER',
            secondary: 'ROGUE',
        }, 
        {
            name : 'HAWKEYE',
            primary: 'RANGER',
            secondary: 'RANGER',
        }, 
        {
            name : 'SCION',
            primary: 'RANGER',
            secondary: 'MAGE',
        }, 
        {
            name : 'FALCONER',
            primary: 'RANGER',
            secondary: 'SUMMONER',
        }, 
        {
            name : 'SOULBOW',
            primary: 'RANGER',
            secondary: 'CLERIC',
        }, 
        {
            name : 'BOWSINGER',
            primary: 'RANGER',
            secondary: 'BARD',
        }
    ],
    MAGE : [
        {
            name : 'BATTLE MAGE',
            primary: 'MAGE',
            secondary: 'FIGHTER',
        }, 
        {
            name : 'SPELLSTONE',
            primary: 'MAGE',
            secondary: 'TANK',
        }, 
        {
            name : 'SHADOW CASTER',
            primary: 'MAGE',
            secondary: 'ROGUE',
        }, 
        {
            name : 'SPELLHUNTER',
            primary: 'MAGE',
            secondary: 'RANGER',
        }, 
        {
            name : 'ARCHWIZARD',
            primary: 'MAGE',
            secondary: 'MAGE',
        }, 
        {
            name : 'WARLOCK',
            primary: 'MAGE',
            secondary: 'SUMMONER',
        }, 
        {
            name : 'ACOLYTE',
            primary: 'MAGE',
            secondary: 'CLERIC',
        }, 
        {
            name : 'SORCERER',
            primary: 'MAGE',
            secondary: 'BARD',
        }
    ],
    SUMMONER : [
        {
            name : 'WILD BLADE',
            primary: 'SUMMONER',
            secondary: 'FIGHTER',
        }, 
        {
            name : 'BROOD WARDEN',
            primary: 'SUMMONER',
            secondary: 'TANK',
        }, 
        {
            name : 'SHADOWMANCER',
            primary: 'SUMMONER',
            secondary: 'ROGUE',
        }, 
        {
            name : 'BEASTMASTER',
            primary: 'SUMMONER',
            secondary: 'RANGER',
        }, 
        {
            name : 'SPELLMANCER',
            primary: 'SUMMONER',
            secondary: 'MAGE',
        }, 
        {
            name : 'CONJURER',
            primary: 'SUMMONER',
            secondary: 'SUMMONER',
        }, 
        {
            name : 'NECROMANCER',
            primary: 'SUMMONER',
            secondary: 'CLERIC',
        }, 
        {
            name : 'ENCHANTER',
            primary: 'SUMMONER',
            secondary: 'BARD',
        }
    ],
    CLERIC : [
        {
            name : 'TEMPLAR',
            primary: 'CLERIC',
            secondary: 'FIGHTER',
        }, 
        {
            name : 'APOSTLE',
            primary: 'CLERIC',
            secondary: 'TANK',
        }, 
        {
            name : 'SHADOW DISCIPLE',
            primary: 'CLERIC',
            secondary: 'ROGUE',
        }, 
        {
            name : 'PROTECTOR',
            primary: 'CLERIC',
            secondary: 'RANGER',
        }, 
        {
            name : 'ORACLE',
            primary: 'CLERIC',
            secondary: 'MAGE',
        }, 
        {
            name : 'SHAMAN',
            primary: 'CLERIC',
            secondary: 'SUMMONER',
        }, 
        {
            name : 'HIGH PRIEST',
            primary: 'CLERIC',
            secondary: 'CLERIC',
        }, 
        {
            name : 'SCRYER',
            primary: 'CLERIC',
            secondary: 'BARD',
        }
    ],
    BARD : [
        {
            name : 'TELLSWORD',
            primary: 'BARD',
            secondary: 'FIGHTER',
        }, 
        {
            name : 'SIREN',
            primary: 'BARD',
            secondary: 'TANK',
        }, 
        {
            name : 'TRICKSTER',
            primary: 'BARD',
            secondary: 'ROGUE',
        }, 
        {
            name : 'SONG WARDEN',
            primary: 'BARD',
            secondary: 'RANGER',
        }, 
        {
            name : 'MAGICIAN',
            primary: 'BARD',
            secondary: 'MAGE',
        }, 
        {
            name : 'SONGCALLER',
            primary: 'BARD',
            secondary: 'SUMMONER',
        }, 
        {
            name : 'SOUL WEAVER',
            primary: 'BARD',
            secondary: 'CLERIC',
        }, 
        {
            name : 'MINSTREL',
            primary: 'BARD',
            secondary: 'BARD',
        }
    ],
}

const headers = computed(() => {
    return Object.keys(classes);
})

const selectClass = (subclass) => {
    console.log(subclass);
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
    padding-left: 0px;
}

.small-text {
    font-size: 12px;
}

.true-class {
    background-color: rgba(255, 165, 0, .1);
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
                        <td v-for="header in headers" class="uk-text-center title">{{ header }}</td>
                    </tr>
                </thead>
                <tbody class="uk-padding">
                    <tr class="uk-text-center" v-for="key, index1 in Object.keys(classes)">
                        <td class="uk-text-middle title">{{ key }}</td>
                        <td v-for="subclass, index2 in classes[key]" 
                            :key="subclass.name + '_tile'"
                            @click="selectClass(subclass)"
                            :class="{'cell uk-text-center uk-text-middle small-text' : {}, 'true-class' : index1 == index2}">
                            {{ subclass.name }}
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                </tfoot>
            </table>
        </div>
    </div>
</template>