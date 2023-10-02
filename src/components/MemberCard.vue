<script setup>
import { ref, computed, onBeforeMount } from "vue";
import Fighter from "../../public/AOC_Icons/fighter_icon.png";
import Tank from "../../public/AOC_Icons/tank_icon.png";
import Rogue from "../../public/AOC_Icons/rogue_icon.png";
import Ranger from "../../public/AOC_Icons/ranger_icon.png";
import Mage from "../../public/AOC_Icons/mage_icon.png";
import Summoner from "../../public/AOC_Icons/summoner_icon.png";
import Cleric from "../../public/AOC_Icons/cleric_icon.png";
import Bard from "../../public/AOC_Icons/bard_icon.png";

const props = defineProps({
    member: {
        type: Object,
        required: true
    }
});

const getClassIcon = (className) => {
  console.log("className: ", className);
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
label {
  color: orange;
}
.gold {
  border: 2px solid gray;
  border-right: none;
  border-top: none;
  border-radius: 0px 30px 0px 0px;
  height: 75px;
  width: 75px;
  background-color: rgba(0, 0, 0, .5);
  /* overflow: hidden; */
}

.silver {
  border-left: 2px solid gray;
  height: 75px;
  width: 75px;
  /* border-radius: 0px 0px 30px 0px; */
}

.true-class {
  box-shadow: inset 0 0 30px rgba(255, 215, 0, 0.5);
}

.member-list-member {
  border: 1px solid gray;
  border-radius: 30px;
}

.member-card-container {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(3, calc(33% - 10px));
  gap: 20px;
}
.member-card {
  border: 2px solid gray;
  border-radius: 0px 30px 0px 30px;
  /* padding: 10px; */
}

.member-info-container {
    max-height: 150px;
}

.member-name-container {
  display: flex;
  height: 75px;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid gray;
  background-color: rgba(255, 165, 0, .1);
}

.member-professions {
    display: flex;
    flex-direction: column;
    height: 75px;
    justify-content: space-around;
    background-color: rgba(0, 0, 0, .3);
    border-radius: 0 0 0 25px;
}

.xp-container {
  border: 2px solid gray;
  margin-left: auto;
  border-top: none;
  width: fit-content;
  border-radius: 0px 0px 20px 20px;
  overflow: hidden;
}

.xp-label {
  background-color: orange;
  color: black;
}

.xp-value {
    width: 75px;
}

.class-container {
    width: fit-content;
    background-color: orange;
    color: black;
    border: 2px solid gray;
    border-bottom: none;
    padding: 3px 10px;
    border-radius: 20px 20px 0px 0px;
}
</style>

<template>
    <div class="class-container uk-flex">
        <div class="class-label uk-text-center uk-width-auto uk-text-center uk-padding-small uk-padding-remove-vertical">
            <span class="uk-text-bold">{{ member.Subclass }}</span>
        </div>
    </div>
    <div class="member-card uk-flex uk-width-auto">
        <div class="member-info-container uk-width-expand uk-flex uk-flex-column">
            
            <div class="member-name-container uk-text-center uk-flex uk-flex-column">
                <div>
                    <span class="member-name text-orange uk-margin-small-left uk-text-large">{{ member.Username }} </span>
                </div>
                <div>
                    <span class="member-role"> ( {{ member.Role }} )</span>
                </div>
            </div>
            <div class="member-professions uk-flex uk-flex-column">
                <div class="prof-1">
                    <span class="uk-margin-left">Profession 1:</span><span>{{ member.Profession1  }}</span>
                </div>
                <div class="prof-2">
                    <span class="uk-margin-left">Profession 2:</span><span>{{ member.Profession2  }}</span>
                </div>
            </div>
            </div>
            <div class="member-architypes uk-flex uk-flex-column">
            <div class="primary tool-tip">
                <div
                    v-if="member.Primary != member.Secondary"
                    class="uk-background-cover gold tool-tip"
                    :data-src="getClassIcon(member.Primary)"
                    :data="member.Primary"
                    uk-img>
                </div>
                <div v-else>
                <div class="gold uk-flex uk-flex-center uk-flex-middle">
                    <span class="uk-text-lead text-orange">TRUE</span>
                </div>
                </div>
            </div>
            <div class="secondary tool-tip-2">
                <div
                    :class="{'uk-background-cover silver tool-tip-2' : member, 'true-class': member.Primary == member.Secondary}"
                    :data-src="getClassIcon(member.Secondary)"
                    :data="member.Secondary"
                    uk-img>
                </div>
            </div>
        </div>
    </div>
    <div class="xp-container uk-flex">
        <div class="xp-label uk-text-center uk-text-center uk-padding-small uk-padding-remove-vertical">
            <label class="xp-label-text text-black uk-text-default">XP</label>
        </div>
        <div class="xp-value uk-text-center">
            <span class="text-orange">345</span>
        </div>
    </div>
</template>