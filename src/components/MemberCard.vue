<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { useGuildStore } from "../stores/guildStore";
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
    },
    viewer: {
        type: String,
    },
    function: {
        type: Function
    }
});

const emits = ['getGuildData'];

const baseUrl = process.env.APIURL;

const showRole = ref(false);
let guildStore;
const guild = ref({});

onBeforeMount(() => {
    guildStore = useGuildStore();
    guild.value = guildStore.getGuild;
    if (props.member.Role == "Guild Leader") {
        showRole.value = true;
    }
})

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

const removeFromGuild = async () => {
  console.log("Leaving guild..");
  let guildID = localStorage.getItem("guildID");
  const call = {
    User: props.member,
    GuildID: guildID,
  };
  const response = await fetch(baseUrl + "Guilds/leaveGuild", {
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
    console.log("Removed member: ", data);
    props.function();

  } else {
    console.log("Error fetching thread data: ", response.statusText);
  }
};
</script>

<style scoped>
/* @import '../assets/main.css'; */

label {
  color: rgb(255, 65, 65);
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
  /* gold */
  /* background-color: rgba(255, 165, 0, .1);  */
  /* Silver */
  /* background-color: rgba(192, 192, 192, .2); */
  /* Green */
}

.leader {
    background-color: rgba(255, 165, 0, .1);
    color: rgb(255, 190, 68);
}

.member {
  background-color: rgba(255, 65, 65, .1);
  color: lightgray;
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
  display: flex;
  align-items: center;
  overflow: hidden;
}

.xp-label {
    width: 75px;
    padding: 3px 20px;
    background-color: rgb(255, 65, 65);
    /* color: white; */
}

.xp-label-text {
  color: white;
}

.xp-value {
    padding-inline: 20px;
    /* padding: 3px 20px; */
    /* width: 200px; */
    min-width: 75px;
    width: fit-content;
}

.class-container {
    width: fit-content;
    background-color: rgb(255, 65, 65);
    color: white;
    border: 2px solid gray;
    border-bottom: none;
    padding: 3px 10px;
    border-radius: 20px 0px 0px 0px;
}

.rank-container {
    border: 2px solid gray;
    border-left: none;
    border-bottom: none;
    border-radius: 0 10px 0 0;
    padding: 3px 20px;
    padding-top: 1px;
    color: orange;
    background-color: rgba(0, 0, 0, .5);
}

.card-guild {
    border: 2px solid gray;
    border-left: none;
    border-bottom: none;
    padding: 3px 20px;
    padding-top: 1px;
    color: orange;
    background-color: rgba(0, 0, 0, .5);
}

.card-logo {
    background-size: contain;
    background-repeat: no-repeat;
    height: 75px;
    width: 75px;
}

.uk-icon-button {
  background-color: transparent;
}

.uk-icon-button:hover {
  background-color: rgba(255, 255, 255, .1);
  font-weight: bolder;

  /* color: red; */
}
</style>

<template>
    <div class="uk-flex">
        <div class="class-container class-label">
            <span v-if="member.Subclass" class="uk-text-bold">{{ member.Subclass }}</span>
            <span v-else class="uk-text-bold">None</span>
        </div>
        <div v-if="member.Role == 'Guild Leader'" class="rank-container">
            <span uk-icon="icon: star"></span>
            <span uk-icon="icon: star"></span>
            <span uk-icon="icon: star"></span>
            <span uk-icon="icon: star"></span>
            <span uk-icon="icon: star"></span>
        </div>
        <div v-if="member.Role == 'Member'" class="rank-container">
            <span uk-icon="icon: star"></span>
        </div>
        <div v-if="member.Role == ''" class="rank-container">
            <span>No Guild Rank</span>
        </div>
        <span v-if="props.viewer == 'Guild Leader'" class="uk-icon-button uk-position-right uk-margin-small-left" uk-icon="icon: cog; ratio: 1.3" :uk-toggle="'target: #' +  member.Username + 'options; position: top'"></span>
    </div>
    <div class="member-card uk-flex uk-width-auto">
            

        <div class="member-info-container uk-width-expand uk-flex uk-flex-column">
            <div :class="{'member-name-container uk-text-center uk-flex uk-overflow-hidden': member,
                'leader' : member.Role == 'Guild Leader',
                'member' : member.Role == 'Member'}">
                <!-- <div>
                    <div class="card-logo " :data-src="guild.Logo" alt="Uploaded Image" uk-img></div>
                </div> -->
                <div class="uk-width-expand">
                    <span class="member-name uk-margin-small-left uk-text-large">{{ member.Username }} </span>
                </div>
              </div>
              <div>
                <div :id="member.Username + 'options'" class="goa-container uk-padding uk-position-top uk-width-medium" hidden>
                  <div class="uk-position-relative">
                    <button class="uk-button uk-button-small goa-edit-button text-goa-red uk-position-top-right" :uk-toggle="'target: #' +  member.Username + 'options;'">X</button>
                    <p class="text-goa-red uk-margin-remove">Member Options</p>
                    <button @click="removeFromGuild" class="goa-button uk-margin-top">Remove From Guild</button>
                  </div>
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
                <div v-if="member.Primary == ''">
                  <div class="gold uk-flex uk-flex-center uk-flex-middle">
                      <span class=" text-orange">No Class</span>
                  </div>
                </div>
                <div v-if="member.Primary == member.Secondary && member.Primary != ''">
                  <div class="gold true-class uk-flex uk-flex-center uk-flex-middle">
                      <span class=" text-orange">TRUE</span>
                  </div>
                </div>
            </div>
            <div class="secondary tool-tip">
                <div
                    :class="{'uk-background-cover silver tool-tip' : member, 'true-class': member.Primary == member.Secondary && member.Primary != ''}"
                    :data-src="getClassIcon(member.Secondary)"
                    :data="member.Secondary"
                    uk-img>
                </div>
            </div>
        </div>
    </div>
    <div class="xp-container uk-flex">
        <div class="xp-value uk-text-center">
            <span class="text-goa-red uk-width-auto">555</span>
        </div>
        <div class="xp-label uk-text-center uk-text-center uk-padding-small uk-padding-remove-vertical">
            <label class="xp-label-text uk-text-default uk-text-bold">XP</label>
        </div>
    </div>
</template>