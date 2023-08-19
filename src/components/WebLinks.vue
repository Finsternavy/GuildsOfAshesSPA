<script setup>
import { ref } from "vue";
import WebLink from "./WebLink.vue";
let props = defineProps({
  sites : Array
});

const webLinks = ref(props.sites)

let sname = ref('')
let surl = ref('')
let simage = ref('')

const addWebLink = async () => {
  console.log('name: ', sname)
  console.log('url: ', surl)
  console.log('image: ', simage)
  webLinks.value.push({
     siteName: sname.value, 
     siteUrl: surl.value, 
     siteImage : simage.value,
  })
}
</script>

<style scoped>

.add-web-link-container {
  background-color: rgb(20, 20, 20);
  border-radius: 20px;
  border: 1px solid gray;
}

.add-web-link-button {
  background-color: transparent;
  border: none;
  color: #d6662b;
}
.web-links {
  padding: 10px;
  border-radius: 30px;
  border: 1px solid black;
  color: #d6662b; ;
}

.pill {
  border-radius: 30px;
  padding: 5px 10px;
}

.create-button {
  background-color: #d6662b;
  color: white;
}

.web-link-header {
  color: #d6662b;
}
</style>

<template>
  <div class="web-links uk-margin-bottom uk-width-1-1 uk-padding">
    <div class="web-links-header uk-flex uk-flex-between uk-padding-small uk-padding-remove-bottom">
      <h3 class="web-link-header">Web Links</h3>
      <div class="web-links-controls">
        <button class="web-links-control-button" uk-icon="icon: plus; ratio: 1.5"></button>
        <div class="add-web-link-container uk-width-large" uk-drop="mode: click; pos: bottom-right">
          <div class="uk-form add-social-modal uk-text-center uk-flex uk-flex-middle uk-padding">
            <div class="modal-container uk-flex uk-flex-column uk-width-1-1">
              <div class="input-group">
                <label class="uk-text-center" for="site-name">Name</label>
                <input class="pill uk-input uk-margin-bottom uk-margin-small-top" id="site-name" type="text" v-model="sname" />
              </div>
              <div class="input-group">
                <label class="uk-text-center uk-margin-small-bottom" for="site-url">URL</label>
                <input class="pill uk-input uk-margin-bottom uk-margin-small-top" id="site-url" type="text" v-model="surl" />
              </div>
              <div class="input-group">
                <label class="uk-text-center uk-margin-small-bottom" for="site-image">Site Logo Link</label>
                <input class="pill uk-input uk-margin-bottom uk-margin-small-top" id="site-image" type="text" v-model="simage" />
              </div>
              <button  class="pill create-button uk-button uk-background-secondary uk-margin-top"
                @click="addWebLink" >
                 Add Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div  class="web-links-container uk-flex uk-grid-small uk-child-width-1-4 uk-width-1-1 uk-margin-remove uk-padding-small" uk-grid>
      <WebLink v-for="site in $props.sites" :siteName="site.siteName" :siteImage="site.siteImage" :siteUrl="site.siteUrl"/>
    </div>
  </div>
</template>
