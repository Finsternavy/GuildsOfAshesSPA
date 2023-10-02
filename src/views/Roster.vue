<script setup>
import { computed, ref, watch, reactive, onBeforeMount } from "vue";
import CharacterMatrix from "../components/CharacterMatrix.vue";
import { useUserStore } from "../stores/userStore";
import { useGuildStore } from "../stores/guildStore";
import Fighter from "../../public/AOC_Icons/fighter_icon.png";
import Tank from "../../public/AOC_Icons/tank_icon.png";
import Rogue from "../../public/AOC_Icons/rogue_icon.png";
import Ranger from "../../public/AOC_Icons/ranger_icon.png";
import Mage from "../../public/AOC_Icons/mage_icon.png";
import Summoner from "../../public/AOC_Icons/summoner_icon.png";
import Cleric from "../../public/AOC_Icons/cleric_icon.png";
import Bard from "../../public/AOC_Icons/bard_icon.png";
import MemberCard from "../components/MemberCard.vue";

const baseUrl = process.env.APIURL + "Users";
const selectedClass = ref();
const store = useUserStore();
let guildStore;
const user = store.getUser;
let membersList = ref();

onBeforeMount(() => {
  guildStore = useGuildStore();
  membersList.value = guildStore.getGuild.MemberList;
  console.log("membersList: ", membersList.value);
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

/* .member-card-container {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(3, calc(33% - 10px));
  gap: 20px;
} */
.member-card {
  border: 2px solid gray;
  border-radius: 30px 30px 0px 30px;
  /* padding: 10px; */
}

.member-name-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 67px;
  border-bottom: 2px solid gray;
}

.xp-container {
  border: 2px solid gray;
  margin-left: auto;
  border-top: none;
  min-width: 150px;
  width: fit-content;
  border-radius: 0px 0px 20px 20px;
  overflow: hidden;
}

.xp-label {
  background-color: orange;
  color: black;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, calc(50% - 20px));
  gap: 40px;
}

</style>

<template>
  <div class="roster">
    
    <div class="guild-roster">
      <div class="header goa-container uk-margin-top uk-padding uk-margin-large-top">
        <h2 class="uk-light uk-text-center uk-text-bold">Chain of Command</h2>
        <hr class="uk-margin-large-bottom">
        <div class="member-card-container uk-flex uk-flex-column">
          <h3 class="text-orange uk-text-center uk-margin-remove-bottom">Guild Leader</h3>
          <div class="uk-margin-bottom uk-width-1-1 uk-child-width-1-2">
            <div v-for="member in membersList" class="uk-align-center uk-margin-remove-top">
              <MemberCard v-if="member.Role == 'Guild Leader'" :member="member" />
            </div>
          </div>
          <h3 class="text-orange">Guild Members</h3>
          <div class="uk-width-1-1 grid" >
            <div v-for="member in membersList">
              <MemberCard v-if="member.Role == 'Member'" :member="member" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
