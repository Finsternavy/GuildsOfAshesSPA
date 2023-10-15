<script setup>
import { computed, ref, watch, onBeforeMount } from "vue";
import Fighter from "../public/AOC_Icons/fighter_icon.png";
import Tank from "../public/AOC_Icons/tank_icon.png";
import Rogue from "../public/AOC_Icons/rogue_icon.png";
import Ranger from "../public/AOC_Icons/ranger_icon.png";
import Mage from "../public/AOC_Icons/mage_icon.png";
import Summoner from "../public/AOC_Icons/summoner_icon.png";
import Cleric from "../public/AOC_Icons/cleric_icon.png";
import Bard from "../public/AOC_Icons/bard_icon.png";

let props = defineProps({
  modelValue: {},
  // selectedClass: {
  //     type: Object,
  //     default: null
  // }
});

let emit = defineEmits(["update:modelValue"]);

onBeforeMount(() => {
  // console.log("Selected Class: ", props.modelValue);
});

let selectedClass = ref(props.modelValue);
const primaryLight = ref(document.querySelector(":root").style.getPropertyValue("--accent-color") + "33");
const selected = ref(document.querySelector(":root").style.getPropertyValue("--primary-color") + "e6");
const trueBG = ref(document.querySelector(":root").style.getPropertyValue("--primary-color") + "33");

let classes = {
  FIGHTER: [
    {
      name: "WEAPON MASTER",
      primary: "FIGHTER",
      secondary: "FIGHTER",
      index: 0,
    },
    {
      name: "DREADNOUGHT",
      primary: "FIGHTER",
      secondary: "TANK",
      index: 1,
    },
    {
      name: "SHADOWBLADE",
      primary: "FIGHTER",
      secondary: "ROGUE",
      index: 2,
    },
    {
      name: "HUNTER",
      primary: "FIGHTER",
      secondary: "RANGER",
      index: 3,
    },
    {
      name: "SPELLSWORD",
      primary: "FIGHTER",
      secondary: "MAGE",
      index: 4,
    },
    {
      name: "BLADECALLER",
      primary: "FIGHTER",
      secondary: "SUMMONER",
      index: 5,
    },
    {
      name: "HIGHSWORD",
      primary: "FIGHTER",
      secondary: "CLERIC",
      index: 6,
    },
    {
      name: "BLADEDANCER",
      primary: "FIGHTER",
      secondary: "BARD",
      index: 7,
    },
  ],
  TANK: [
    {
      name: "KNIGHT",
      primary: "TANK",
      secondary: "FIGHTER",
      index: 0,
    },
    {
      name: "GUARDIAN",
      primary: "TANK",
      secondary: "TANK",
      index: 1,
    },
    {
      name: "NIGHTSHIELD",
      primary: "TANK",
      secondary: "ROGUE",
      index: 2,
    },
    {
      name: "WARDEN",
      primary: "TANK",
      secondary: "RANGER",
      index: 3,
    },
    {
      name: "SPELLSHIELD",
      primary: "TANK",
      secondary: "MAGE",
      index: 4,
    },
    {
      name: "KEEPER",
      primary: "TANK",
      secondary: "SUMMONER",
      index: 5,
    },
    {
      name: "PALADIN",
      primary: "TANK",
      secondary: "CLERIC",
      index: 6,
    },
    {
      name: "ARGENT",
      primary: "TANK",
      secondary: "BARD",
      index: 7,
    },
  ],
  ROGUE: [
    {
      name: "DUELIST",
      primary: "ROGUE",
      secondary: "FIGHTER",
      index: 0,
    },
    {
      name: "SHADOOW GUARDIAN",
      primary: "ROGUE",
      secondary: "TANK",
      index: 1,
    },
    {
      name: "ASSASSIN",
      primary: "ROGUE",
      secondary: "ROGUE",
      index: 2,
    },
    {
      name: "PREDATOR",
      primary: "ROGUE",
      secondary: "RANGER",
      index: 3,
    },
    {
      name: "NIGHTSPELL",
      primary: "ROGUE",
      secondary: "MAGE",
      index: 4,
    },
    {
      name: "SHADOW LORD",
      primary: "ROGUE",
      secondary: "SUMMONER",
      index: 5,
    },
    {
      name: "CULTIST",
      primary: "ROGUE",
      secondary: "CLERIC",
      index: 6,
    },
    {
      name: "CHARLATAN",
      primary: "ROGUE",
      secondary: "BARD",
      index: 7,
    },
  ],
  RANGER: [
    {
      name: "STRIDER",
      primary: "RANGER",
      secondary: "FIGHTER",
      index: 0,
    },
    {
      name: "SENTINEL",
      primary: "RANGER",
      secondary: "TANK",
      index: 1,
    },
    {
      name: "SCOUT",
      primary: "RANGER",
      secondary: "ROGUE",
      index: 2,
    },
    {
      name: "HAWKEYE",
      primary: "RANGER",
      secondary: "RANGER",
      index: 3,
    },
    {
      name: "SCION",
      primary: "RANGER",
      secondary: "MAGE",
      index: 4,
    },
    {
      name: "FALCONER",
      primary: "RANGER",
      secondary: "SUMMONER",
      index: 5,
    },
    {
      name: "SOULBOW",
      primary: "RANGER",
      secondary: "CLERIC",
      index: 6,
    },
    {
      name: "BOWSINGER",
      primary: "RANGER",
      secondary: "BARD",
      index: 7,
    },
  ],
  MAGE: [
    {
      name: "BATTLE MAGE",
      primary: "MAGE",
      secondary: "FIGHTER",
      index: 0,
    },
    {
      name: "SPELLSTONE",
      primary: "MAGE",
      secondary: "TANK",
      index: 1,
    },
    {
      name: "SHADOW CASTER",
      primary: "MAGE",
      secondary: "ROGUE",
      index: 2,
    },
    {
      name: "SPELLHUNTER",
      primary: "MAGE",
      secondary: "RANGER",
      index: 3,
    },
    {
      name: "ARCHWIZARD",
      primary: "MAGE",
      secondary: "MAGE",
      index: 4,
    },
    {
      name: "WARLOCK",
      primary: "MAGE",
      secondary: "SUMMONER",
      index: 5,
    },
    {
      name: "ACOLYTE",
      primary: "MAGE",
      secondary: "CLERIC",
      index: 6,
    },
    {
      name: "SORCERER",
      primary: "MAGE",
      secondary: "BARD",
      index: 7,
    },
  ],
  SUMMONER: [
    {
      name: "WILD BLADE",
      primary: "SUMMONER",
      secondary: "FIGHTER",
      index: 0,
    },
    {
      name: "BROOD WARDEN",
      primary: "SUMMONER",
      secondary: "TANK",
      index: 1,
    },
    {
      name: "SHADOWMANCER",
      primary: "SUMMONER",
      secondary: "ROGUE",
      index: 2,
    },
    {
      name: "BEASTMASTER",
      primary: "SUMMONER",
      secondary: "RANGER",
      index: 3,
    },
    {
      name: "SPELLMANCER",
      primary: "SUMMONER",
      secondary: "MAGE",
      index: 4,
    },
    {
      name: "CONJURER",
      primary: "SUMMONER",
      secondary: "SUMMONER",
      index: 5,
    },
    {
      name: "NECROMANCER",
      primary: "SUMMONER",
      secondary: "CLERIC",
      index: 6,
    },
    {
      name: "ENCHANTER",
      primary: "SUMMONER",
      secondary: "BARD",
      index: 7,
    },
  ],
  CLERIC: [
    {
      name: "TEMPLAR",
      primary: "CLERIC",
      secondary: "FIGHTER",
      index: 0,
    },
    {
      name: "APOSTLE",
      primary: "CLERIC",
      secondary: "TANK",
      index: 1,
    },
    {
      name: "SHADOW DISCIPLE",
      primary: "CLERIC",
      secondary: "ROGUE",
      index: 2,
    },
    {
      name: "PROTECTOR",
      primary: "CLERIC",
      secondary: "RANGER",
      index: 3,
    },
    {
      name: "ORACLE",
      primary: "CLERIC",
      secondary: "MAGE",
      index: 4,
    },
    {
      name: "SHAMAN",
      primary: "CLERIC",
      secondary: "SUMMONER",
      index: 5,
    },
    {
      name: "HIGH PRIEST",
      primary: "CLERIC",
      secondary: "CLERIC",
      index: 6,
    },
    {
      name: "SCRYER",
      primary: "CLERIC",
      secondary: "BARD",
      index: 7,
    },
  ],
  BARD: [
    {
      name: "TELLSWORD",
      primary: "BARD",
      secondary: "FIGHTER",
      index: 0,
    },
    {
      name: "SIREN",
      primary: "BARD",
      secondary: "TANK",
      index: 1,
    },
    {
      name: "TRICKSTER",
      primary: "BARD",
      secondary: "ROGUE",
      index: 2,
    },
    {
      name: "SONG WARDEN",
      primary: "BARD",
      secondary: "RANGER",
      index: 3,
    },
    {
      name: "MAGICIAN",
      primary: "BARD",
      secondary: "MAGE",
      index: 4,
    },
    {
      name: "SONGCALLER",
      primary: "BARD",
      secondary: "SUMMONER",
      index: 5,
    },
    {
      name: "SOUL WEAVER",
      primary: "BARD",
      secondary: "CLERIC",
      index: 6,
    },
    {
      name: "MINSTREL",
      primary: "BARD",
      secondary: "BARD",
      index: 7,
    },
  ],
};

let subclasses = computed(() => {
  let subclasses = [];
  let keys = Object.keys(classes);
  // console.log("Keys: ", keys);
  keys.forEach((key) => {
    classes[key].forEach((subclass) => {
      // console.log("Subclass: ", subclass);
      subclasses.push(subclass);
    });
  });
  return subclasses.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    return 1;
  });
});

let headers = computed(() => {
  return Object.keys(classes);
});

let selectClass = (subclass) => {
  // console.log(subclass);
  selectedClass.value = subclass;
  // emit('update:modelValue', subclass);
};

watch(selectedClass, (newVal, oldVal) => {
  // console.log("Selected Class: ", newVal);

  emit("update:modelValue", newVal);
});

// let checkWidthForTable = () => {
//   let width = window.innerWidth;
//   if (width > 1300) {
//     return true;
//   }
//   return false;
// };

let getClassIcon = (className) => {
  if (className.toLowerCase() === "fighter") {
    return Fighter;
  }
  if (className.toLowerCase() === "tank") {
    return Tank;
  }
  if (className.toLowerCase() === "rogue") {
    return Rogue;
  }
  if (className.toLowerCase() === "ranger") {
    return Ranger;
  }
  if (className.toLowerCase() === "mage") {
    return Mage;
  }
  if (className.toLowerCase() === "summoner") {
    return Summoner;
  }
  if (className.toLowerCase() === "cleric") {
    return Cleric;
  }
  if (className.toLowerCase() === "bard") {
    return Bard;
  }
};
</script>

<style scoped>
.title {
  color: var(--primary-color);
}

.small-text {
  font-size: 12px;
}

.true-class {
  background-color: v-bind(trueBG);
}

.selected-types {
  /* background-color: rgba(255, 165, 0, .3); */
  outline: 1px solid var(--primary-color) !important;
  /* color: black; */
}

.selected {
  background-color: v-bind(selected);
  color: var(--button-text-color);
}

.between {
  background-color: v-bind(primaryLight);
}

.orange {
  outline: 1px solid var(--primary-color) !important;
}

label {
  color: var(--accent-color);
}

.gradient-black {
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 40%,
    rgba(0, 0, 0, 1) 60%,
    rgba(0, 0, 0, 0) 100%
  );
}



@media (max-width: 1274px) {
  .character-matrix-selection {
    display: none;
  }
}

@media (min-width: 1275px) {
  .character-matrix-dropdown {
    display: none;
  }
}
</style>

<template>
  <div class="character-matrix">
    <table class="character-matrix-selection uk-table uk-table-justified uk-light">
      <thead>
        <tr>
          <td></td>
          <td
            v-for="header in headers"
            style="height: 50px"
            :class="{
              'tool-tip uk-text-center uk-padding-remove gradient-black': header,
              'selected-types': selectedClass && header == selectedClass.secondary,
            }"
          >
            <div
              style="height: 50px; width: 50px"
              :class="{
                'tool-tip uk-background-contain uk-align-center shadow uk-margin-remove-bottom': header,
              }"
              :data-src="getClassIcon(header.toLocaleLowerCase())"
              :data="header"
              uk-img
            ></div>
          </td>
        </tr>
      </thead>
      <tbody class="uk-padding">
        <tr class="uk-text-center" v-for="(key, index1) in Object.keys(classes)">
          <td
            :class="{
              'tool-tip uk-text-middle title uk-padding-remove-left uk-background-contain': key,
              'selected-types': selectedClass && key == selectedClass.primary,
            }"
            style="width: 50px"
            :data-src="getClassIcon(key)"
            :data="key"
            uk-img
          ></td>
          <td
            v-for="(subclass, index2) in classes[key]"
            :key="subclass.name + '_tile'"
            @click="selectClass(subclass)"
            :class="{
              'cell uk-text-center uk-text-middle small-text': subclass,
              'true-class': index1 == index2,
              between:
                (selectedClass &&
                  selectedClass.primary == key &&
                  index2 < selectedClass.index) ||
                (selectedClass &&
                  selectedClass.secondary == subclass.secondary &&
                  headers.indexOf(selectedClass.primary) >
                    headers.indexOf(subclass.primary)),
              selected: selectedClass && subclass.name == selectedClass.name,
            }"
          >
            {{ subclass.name }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <!-- <tr>
                    <td></td>
                    <td colspan="4">
                        <span>Primary Archetype</span>{{ selectedClass ? selectedClass.primary : ''}}
                    </td>
                    <td colspan="4">
                        <span>Secondary Archetype</span>{{ selectedClass ? selectedClass.secondary : ''}}
                    </td>
                </tr> -->
      </tfoot>
    </table>

    <div class="character-matrix-dropdown">
      <h3 class="uk-light">Select a Class</h3>
      <div class="uk-flex uk-flex-column uk-margin-bottom">
        <label for="class-select">Select a Class</label>
        <select
          class="goa-input"
          name="class-select"
          id="class-select"
          v-model="selectedClass"
        >
          <option class="uk-background-secondary" value=""></option>
          <option
            class="uk-background-secondary uk-text-center"
            v-for="subclass in subclasses"
            :value="subclass"
            @click="selectClass(subclass)"
          >
            {{ subclass.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
