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

const baseUrl = process.env.APIURL;
const selectedClass = ref();
const store = useUserStore();
let guildStore;
const user = store.getUser;
let guild = ref({});
let membersList = ref();
let guildLeader = ref({});
let guildMembers = ref([]);
const architypes = ref(['FIGHTER', 'TANK', 'ROGUE', 'RANGER', 'MAGE', 'SUMMONER', 'CLERIC', 'BARD'])

onBeforeMount(() => {
  guildStore = useGuildStore();
  membersList.value = guildStore.getGuild.MemberList;
  sortMembers();
  console.log("membersList: ", membersList.value);
});

const getGuildData = async () => {
  console.log("Fetching guild data..");
  let guildID = store.getGuildID;
  const call = {
    GuildID: guildID,
  };
  const response = await fetch(baseUrl + "Guilds/fetchGuildData", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
    },
    body: JSON.stringify(call),
  });

  if (response.ok) {
    let data = await response.json();
    console.log("Guild data: ", data);
    membersList.value = data.Data.MemberList;
    sortMembers();

  } else {
    console.log("Error fetching thread data: ", response.statusText);
  }
};

const sortMembers = () => {
  console.log("membersList: ", membersList.value);
  let leader = membersList.value.find((member) => {
    return member.Role == "Guild Leader";
  });
  guildLeader.value = leader;
  console.log("guildLeader: ", guildLeader.value);
  let members = membersList.value.filter((member) => {
    return member.Role == "Member";
  });
  guildMembers.value = members;
  console.log("guildMembers: ", guildMembers.value);
}

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
  grid-template-columns: repeat(2, calc(50% - 20px));
  gap: 40px;
}

.guild-stats {
  /* background-color: rgb(11, 11, 11); */
}

.cell {
  border: 1px solid gray;
}

.background-black {
  background-color: rgba(0, 0, 0, 1);
}
</style>

<template>
  <div class="roster">
    <div class="guild-stats goa-container uk-padding uk-flex uk-flex-column uk-width-1-1">
      <h3 class="text-goa-red uk-text-center">Guild Character Data</h3>
      <div class="uk-flex uk-flex-around goa-container-no-radius">
        <div class="">Architypes</div>
        <div
          v-for="architype in architypes"
          style="height: 50px"
          :class="{
            'tool-tip uk-text-center uk-padding-remove gradient-black': architype,
          }">
          <div
            style="height: 50px; width: 50px"
            :class="{
              'tool-tip uk-background-contain uk-align-center shadow uk-margin-remove-bottom': architype,
            }"
            :data-src="getClassIcon(architype.toLocaleLowerCase())"
            :data="architype"
            uk-img
          ></div>
        </div>
      </div>
      <div class="uk-flex uk-width-1-1 uk-flex-around">
        <div class="uk-width-small uk-text-center background-black">Primary</div>
        <div v-for="num in architypes.length" class="cell  uk-width-expand uk-padding-small text-goa-red">{{ num }}</div>
      </div>
      <div class="uk-flex uk-width-1-1 uk-flex-around">
        <div class="uk-width-small uk-text-center background-black">Secondary</div>
        <div v-for="num in architypes.length" class="cell  uk-width-expand uk-padding-small text-goa-red">{{ num }}</div>
      </div>
    </div>
    <div class="guild-roster">
      <div class="header goa-container uk-margin-top uk-padding uk-margin-large-top">
        <h2 class="uk-light uk-text-center uk-text-bold">Chain of Command</h2>
        <hr class="uk-margin-large-bottom">
        <div class="member-card-container uk-flex uk-flex-column">
          <h3 class="text-goa-red uk-margin-remove-bottom">Guild Leader</h3>
          <div class="uk-margin-bottom uk-width-1-1 uk-child-width-1-2">
            <div class="uk-align-center uk-margin-remove-top">
              <MemberCard  :member="guildLeader" />
            </div>
          </div>
          <h3 class="text-goa-red">Members</h3>
          <div class="uk-width-1-1 grid" >
            <div v-for="member in guildMembers" class="uk-position-relative">
              <MemberCard v-if="member.Role == 'Member'" :viewer="user.Role" :member="member" :function="getGuildData" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
