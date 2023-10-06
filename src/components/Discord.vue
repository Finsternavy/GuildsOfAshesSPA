<script setup>
import { ref } from "vue";
import DiscordServer from "../components/DiscordServer.vue";

let props = defineProps(["modelValue"]);

let discord_ID = ref();

let discordServers = ref(props.modelValue);

let createDiscordWidget = async () => {
  let Id = this.discord_ID.value;
  console.log(Id);
  fetch(`https://discord.com/api/guilds/${Id}/widget.json`).then((response) => {
    response;
    console.log(response);
    if (response.status === 200) {
      console.log(
        "Pushing to discordServers: ",
        `https://discord.com/widget?id=${Id}&theme=dark`
      );
      discordServers.value.push({
        embedSrc: `https://discord.com/widget?id=${Id}&theme=dark`,
      });
      return;
    }

    if (response.status === 404) {
      return alert("Server not found. Please check the ID and try again.");
    }
    if (response.status === 403) {
      return alert(
        "Server owner has not enabled widget. You will need to request this feature to be enabled on your discord server."
      );
    } else {
      return alert("Unexpected error occured. ");
    }
  });
};
</script>
<style scoped>
.discord-container {
  border: 1px solid black;
  border-radius: 20px;
  padding: 20px;
  font-size: 20px;
  color: #d6662b;
}

.add-server-container {
  background-color: rgb(20, 20, 20);
  border-radius: 20px;
  border: 1px solid gray;
}
.add-server-button {
  background-color: transparent;
  border: none;
  color: #d6662b;
}

.pill {
  border-radius: 30px;
  padding: 5px 10px;
}

.create-button {
  background-color: #d6662b;
  color: white;
}
</style>

<template>
  <div class="discord-container">
    <div class="header uk-flex uk-flex-middle uk-flex-between uk-margin-bottom">
      <div class="header-text">
        <span>Discord</span>
      </div>
      <div class="add-social-tool uk-text-right">
        <button class="add-server-button" type="button">
          <span uk-icon="icon: plus; ratio:1.5"> </span>
        </button>
        <div
          class="add-server-container uk-width-large"
          uk-drop="mode: click; pos: bottom-right"
        >
          <div
            class="uk-form add-social-modal uk-text-center uk-flex uk-flex-middle uk-padding"
          >
            <div class="modal-container uk-flex uk-flex-column uk-width-1-1">
              <label class="uk-text-center uk-margin-small-bottom" for="discord_ID"
                >Enter Discord Server ID</label
              >
              <input
                class="pill uk-input uk-margin-bottom"
                id="discord_ID"
                type="number"
                v-model="discord_ID"
              />
              <button
                class="pill create-button uk-button uk-background-secondary"
                @click="createDiscordWidget"
              >
                Add Server
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="discord-servers-container uk-margin-remove">
      <DiscordServer v-for="servers in discordServers" :embedSrc="servers.embedSrc" />
    </div>
  </div>
</template>
