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
  border: 1px solid gold;
  border-right: none;
  border-top: none;
  border-radius: 0px 30px 0px 0px;
  /* overflow: hidden; */
}

.silver {
  border: 1px solid silver;
  border-right: none;
  border-bottom: none;
  border-radius: 0px 0px 30px 0px;
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

</style>

<template>
  <div class="roster">
    
    <div class="guild-roster">
      <div class="header goa-container uk-margin-top uk-padding uk-margin-large-top">
        <h3 class="uk-light uk-text-center uk-text-bold">Guild Roster</h3>
        <div class="member-card-container uk-flex uk-width-1-1">
          <div v-for="member in membersList">
            <div class="member-card uk-flex">
              <div class="member-info-container uk-width-expand uk-flex uk-flex-column uk-flex-around">
                <div class="member-name-container uk-text-center">
                  <span class="member-name text-orange uk-margin-small-right uk-text-large">{{ member.Username }} </span><span class="member-role"> ( {{ member.Role }} )</span>
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
                    style="width: 75px; height: 75px"
                    :data-src="getClassIcon(member.Primary)"
                    :data="member.Primary"
                    uk-img
                  ></div>
                  <div v-else>
                    <span class="uk-text-lead uk-margin-small-right text-orange"
                      >TRUE
                    </span>
                  </div>
                </div>
                <div class="secondary tool-tip-2">
                  <div
                    class="uk-background-cover silver tool-tip-2"
                    style="width: 75px; height: 75px"
                    :data-src="getClassIcon(member.Secondary)"
                    :data="member.Secondary"
                    uk-img
                  ></div>
                </div>
              </div>
            </div>
            <div class="xp-container uk-flex">
              <div class="xp-label uk-text-center uk-width-auto uk-text-center uk-padding-small uk-padding-remove-vertical">
                <label class="xp-label-text text-black uk-text-default">XP</label>
              </div>
              <div class="xp-value uk-text-center uk-width-expand">
                <span class="text-orange">345</span>
              </div>
            </div>
          </div>
        </div>
        <!-- <ul v-if="membersList" class="guild-members-list uk-list uk-margin-top">
          <li
            v-for="member in membersList"
            :class="{
              'member-list-member padding-small uk-padding-remove-horizontal': member,
              'true-class': member.Primary == member.Secondary,
            }"
          >
            <div :key="member.ID" class="uk-flex uk-child-width-1-3">
              <div class="member-name uk-text-center">
                <label class="uk-margin-remove"
                  >{{ member.Username }} ( {{ member.Role }} )</label
                >
                <p class="uk-margin-remove">XP: 345</p>
              </div>
              <div class="class-info uk-flex uk-flex-column uk-flex-middle">
                <div class="uk-text-center">
                  <label class="uk-margin-remove">{{ member.Subclass }}</label>
                </div>
                <div class="tool-tip tool-tip-2 member-class-info uk-flex uk-flex-center">
                  <div
                    v-if="member.Primary != member.Secondary"
                    class="uk-background-cover gold tool-tip"
                    style="width: 40px; height: 40px"
                    :data-src="getClassIcon(member.Primary)"
                    :data="member.Primary"
                    uk-img
                  ></div>
                  <div v-else>
                    <span class="uk-text-lead uk-margin-small-right text-orange"
                      >TRUE
                    </span>
                  </div>
                  <div
                    class="uk-background-cover silver tool-tip-2"
                    style="width: 40px; height: 40px"
                    :data-src="getClassIcon(member.Secondary)"
                    :data="member.Secondary"
                    uk-img
                  ></div>
                </div>
              </div>
              <div class="trades-info uk-flex uk-flex-column uk-text-center">
                <div class="trade-label uk-text-center">
                  <label>Professions</label>
                </div>
                <div>
                  <p class="uk-margin-remove">Trade 1: {{ member.Profession1 }}</p>
                  <p class="uk-margin-remove">Trade 2: {{ member.Profession2 }}</p>
                </div>
              </div>
            </div>
          </li>
        </ul> -->
      </div>
    </div>
  </div>
</template>
