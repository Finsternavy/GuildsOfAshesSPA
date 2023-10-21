<script setup>
import { computed, ref, watch, reactive, onBeforeMount } from "vue";
import CharacterMatrix from "../components/CharacterMatrix.vue";
import { useUserStore } from "../stores/userStore";
import { useGuildStore } from "../stores/guildStore";
import Fighter from "../public/AOC_Icons/fighter_icon.png";
import Tank from "../public/AOC_Icons/tank_icon.png";
import Rogue from "../public/AOC_Icons/rogue_icon.png";
import Ranger from "../public/AOC_Icons/ranger_icon.png";
import Mage from "../public/AOC_Icons/mage_icon.png";
import Summoner from "../public/AOC_Icons/summoner_icon.png";
import Cleric from "../public/AOC_Icons/cleric_icon.png";
import Bard from "../public/AOC_Icons/bard_icon.png";
import MemberCard from "../components/MemberCard.vue";
import { useAPI } from '../stores/apiStore'

let api = useAPI();
let baseUrl = api.getAPI;
let selectedClass = ref();
let store = useUserStore();
let guildStore;
let user = store.getUser;
let guild = ref({});
let guildLeader = ref({});
let guildMembers = ref([]);
let architypes = ref(['FIGHTER', 'TANK', 'ROGUE', 'RANGER', 'MAGE', 'SUMMONER', 'CLERIC', 'BARD'])
let secondaryFilter = ref();
let primaryFilter = ref();


onBeforeMount(() => {
  guildStore = useGuildStore();
  guild.value = guildStore.getGuild;
  if (!guild.value.GuildID){
    // console.log("No guild found, fetching guild data..");
    getGuildData();
  }
  // sortMembers();
  // console.log("membersList: ", membersList.value);
});

let getGuildData = async () => {
  // console.log("Fetching guild data..");
  let guildID = localStorage.getItem("guildID");
  let call = {
    GuildID: guildID,
  };
  let response = await fetch(baseUrl + "Guilds/fetchGuildData", {
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
    // console.log("Guild data: ", data);
    guild.value = data.Data;
    // sortMembers();

  } else {
    // console.log("Error fetching thread data: ", response.statusText);
  }
};

let sortMembers = () => {
  let returnValue = [];
  // console.log("guild: ", guild.value);
  if (!guild.value.Ranks) return returnValue;
  guild.value.Ranks.forEach((rank) => {
    let rankLevel = [];
    guild.value.MemberList.forEach((member) => {
      if (member.Rank.RankLevel === rank.RankLevel) {
        if (primaryFilter.value) {
          if (primaryFilter.value === member.Primary) {
            // console.log("primaryFilter: ", primaryFilter.value);
            // console.log("member.Primary: ", member.Primary);
            rankLevel.push(member);
            return;
          }
          return;
        } 
        if (secondaryFilter.value) {
          if (secondaryFilter.value === member.Secondary) {
            // console.log("secondaryFilter: ", secondaryFilter.value);
            // console.log("member.Secondary: ", member.Secondary);
            rankLevel.push(member);
            return;
          }
          return;
        } else {

          rankLevel.push(member);
        }
      }
    });
    if (rankLevel.length > 0) {
      returnValue.push(rankLevel);
    }
  });

  return returnValue;
}

let getClassIcon = (className) => {
  // console.log("className: ", className);
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

const getPrimaryArchiteypeCount = (architype) => {
  let count = 0;
  if (!guild.value.MemberList) return count;
  guild.value.MemberList.forEach((member) => {
    if (member.Primary === architype) {
      count++;
    }
  });
  return count;
};

const getSecondaryArchiteypeCount = (architype) => {
  let count = 0;
  if (!guild.value.MemberList) return count;
  guild.value.MemberList.forEach((member) => {
    if (member.Secondary === architype) {
      count++;
    }
  });
  return count;
};

const setPrimaryFilter = (architype) => {
  secondaryFilter.value = null;
  primaryFilter.value = architype;
  // console.log("setPrimaryFilter: ", primaryFilter.value);
};

const setSecondaryFilter = (architype) => {
  primaryFilter.value = null;
  secondaryFilter.value = architype;
  // console.log("setSecondaryFilter: ", secondaryFilter.value);
};

const clearFilter = () => {
  primaryFilter.value = null;
  secondaryFilter.value = null;
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
  background-color: var(--text-color);
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

/* .cell {
  border: 1px solid gray;
} */

.background-black {
  background-color: rgba(0, 0, 0, 1);
}

.uk-button {
  background-color: var(--primary-color);
  color: white;
  padding: 5px 10px;
}

.uk-button:hover {
  background-color: var(--secondary-color);
}

.selected {
  background-color: var(--primary-color);
  color: var(--button-text-color);
}

</style>

<template>
  <div class="roster">
    <div class="guild-stats goa-container uk-padding uk-flex uk-flex-column uk-width-1-1">
      <h3 class="text-goa-red uk-text-center">Guild Class Filter</h3>
      <span class="uk-text-center uk-margin-bottom text-accent">Click a cell to filter the guild list</span>
      <table class="uk-table uk-visible@s">
        <thead>
          <tr class="uk-text-center"> <!-- Add something here to change the background behind the images -->
            <th class="uk-width-small">
              <button @click="clearFilter" class="goa-button">Clear Filter</button>
            </th>
            <th v-for="architype in architypes" style="height: 50px"
            :class="{'tool-tip background-black uk-text-center uk-padding-remove gradient-black': architype}">
              <div style="height: 50px; width: 50px"
                :class="{'tool-tip uk-background-contain uk-align-center shadow uk-margin-remove-bottom': architype}"
                :data-src="getClassIcon(architype.toLocaleLowerCase())"
                :data="architype"
                uk-img>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="uk-text-center">
            <td class="text-header">Primary</td>
            <td v-for="architype in architypes" @click="setPrimaryFilter(architype)" class="cell" :class="{'selected' : primaryFilter == architype}">
              {{ getPrimaryArchiteypeCount(architype) }}
            </td>
          </tr>
          <tr class="uk-text-center">
            <td class="text-header">Secondary</td>
            <td v-for="architype in architypes" @click="setSecondaryFilter(architype)" class="cell" :class="{'selected' : secondaryFilter == architype}">
              {{ getSecondaryArchiteypeCount(architype) }}
            </td>
          </tr>
        </tbody>
      </table>
      <table class="mobile-class-filter uk-hidden@s">
        <thead>
          <tr class="">
            <td colspan="3"><button @click="clearFilter" class="goa-button text-button uk-margin-bottom uk-width-1-1"><span class="text-button">Clear Filter</span></button></td>
          </tr>
          <tr>
            <th class="uk-text-center uk-text-bold text-header">Primary</th>
            <th></th>
            <th class="uk-text-center uk-text-bold text-header">Secondary</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="architype in architypes" class="">
            <td class="cell uk-width-1-2" @click="setPrimaryFilter(architype)" :class="{'selected' : primaryFilter == architype}">
              {{ getPrimaryArchiteypeCount(architype) }}
            </td>
            <td class="tool-tip">
              <div style="height: 50px; width: 50px"
                :class="{'tool-tip uk-background-contain shadow uk-margin-remove-bottom': architype}"
                :data-src="getClassIcon(architype.toLocaleLowerCase())"
                :data="architype"
                uk-img>
              </div>
            </td>
            <td class="cell uk-width-1-2" @click="setSecondaryFilter(architype)" :class="{'selected' : secondaryFilter == architype}">
              {{ getSecondaryArchiteypeCount(architype) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="guild-roster uk-margin-large-bottom">
      <div class="header goa-container uk-margin-top uk-padding uk-margin-large-top">
        <h2 class="uk-light uk-text-center uk-text-bold">Chain of Command</h2>
        <hr class="uk-margin-large-bottom">
        <div v-for="rank, index in sortMembers()">
          <h3 class="text-goa-red">{{rank[0].Rank.RankName}}</h3>
          <div v-for="member in rank" class="uk-margin-medium-bottom">
            <MemberCard :viewer="user.Rank.RankName" :member="member" :function="getGuildData" />
          </div>
            <!-- {{ member.Username }} -->
        </div>
        <div v-if="sortMembers().length == 0">
          <h3 class="text-goa-red uk-text-center">No members play that class...</h3>
        </div>
      </div>
    </div>
  </div>
</template>
