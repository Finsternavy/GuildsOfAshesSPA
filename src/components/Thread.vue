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
.thread-toggle {
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 20px;
}

.thread-toggle:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>

<template>
  <div class="thread goa-container uk-padding">
    <div class="thread-header">
      <button
        class="thread-toggle uk-width-stretch uk-padding-small"
        :uk-toggle="
          'target: .thread-body-container' +
          data.id +
          '; animation: uk-animation-fade; duration: 200'
        "
      >
        <h3 class="uk-light uk-margin-remove uk-text-left">
          {{ data.title }}
        </h3>
      </button>
    </div>
    <div
      :class="'thread-body-container' + data.id + '  uk-margin-bottom uk-margin-top'"
      hidden
    >
      <div class="thread-body uk-padding">
        <span class="text-orange uk-margin-small-right"> {{ data.author }} </span>
        <span class="uk-text-muted"> {{ data.timeDate }}</span>
        <hr class="divider" />
        <div class="uk-padding-small uk-margin-top uk-padding-remove-bottom">
          {{ data.message }}
        </div>
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
          <div class="dislikes uk-text-center uk-margin-right">
            <button
              class="goa-button uk-button-small uk-margin-small-right"
              :uk-toggle="
                'target: .comments-container' +
                data.id +
                '; animation: uk-animation-fade; duration: 200'
              "
            >
              <span uk-icon="icon: comment"></span>
            </button>
            <span>{{ data.comments.length }}</span>
          </div>
        </div>
        <div class="comment uk-text-center">
          <button class="goa-button">Reply</button>
        </div>
      </div>
    </div>
    <div :class="'comments-container' + data.id + ' uk-flex uk-flex-top'" hidden>
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
