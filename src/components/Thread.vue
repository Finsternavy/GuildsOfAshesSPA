<script setup>
import { ref } from "vue";
import Comment from "../components/Comment.vue";

const props = defineProps({
  modelValue: {},
  data: {},
  // function : {
  //     type: function
  // }
});

const emit = defineEmits(["update:modelValue"]);

const comments = ref();
</script>
<style scoped>
.thread-body-container {
  outline: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  overflow: hidden;
}

.thread-body {
  background-color: rgba(0, 0, 0, 0.5);
}

.thread-footer {
  background-color: rgba(0, 0, 0, 0.8);
}

.reply {
  transform: rotate(180deg);
}

.divider {
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>

<template>
  <div class="thread goa-container uk-padding">
    <div class="thread-header uk-margin-bottom">
      <h3 class="uk-light">
        {{ data.title }}
      </h3>
    </div>
    <div class="thread-body-container uk-margin-bottom">
      <div class="thread-body uk-padding">
        <span class="text-orange uk-margin-small-right"> {{ data.author }} </span>
        <span class="uk-text-muted"> {{ data.timeDate }}</span>
        <hr class="divider" />
        <p class="uk-margin-remove">{{ data.message }}</p>
      </div>
      <div class="thread-footer uk-flex uk-flex-middle uk-flex-between uk-padding-small">
        <div class="button-container uk-flex">
          <div class="likes uk-text-center uk-margin-right">
            <button class="goa-button uk-button-small uk-margin-small-right">
              <span uk-icon="icon: arrow-up"></span>
            </button>
            <span>{{ data.likes }}</span>
          </div>
          <div class="dislikes uk-text-center uk-margin-right">
            <button class="goa-button uk-button-small uk-margin-small-right">
              <span uk-icon="icon: arrow-down"></span>
            </button>
            <span>{{ data.dislikes }}</span>
          </div>
        </div>
        <div class="comment uk-text-center">
          <button class="goa-button">Reply</button>
        </div>
      </div>
    </div>
    <div class="comments-container uk-flex uk-flex-top">
      <span
        v-if="data.comments.length > 0"
        class="reply text-orange uk-margin-left uk-margin-right uk-text-center"
        uk-icon="icon: reply; ratio: 2;"
      ></span>
      <div v-for="comment in data.comments" class="uk-width-stretch">
        <Comment :data="comment" />
      </div>
    </div>
  </div>
</template>
