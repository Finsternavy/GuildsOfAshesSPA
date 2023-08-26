<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: {},
  data: {},
});
</script>
<style scoped>
.comment-container {
  /* outline: 1px solid rgba(255, 255, 255, 0.2); */
  border-radius: 20px;
  overflow: hidden;
}

.comment {
  /* background-color: rgba(0, 0, 0, 0.5); */
}

.thread-footer {
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 0 0 20px 20px;
}

.divider {
  border: 1px solid rgba(0, 0, 0, 0.3);
}
</style>

<template>
  <div class="comment-container map-container map-bottom-left">
    <div class="comment uk-padding">
      <div class="author-info">
        <span class="text-black uk-text-bold uk-margin-small-right"
          >{{ data.author }}
        </span>
        <span class="text-black"> {{ data.timeDate }}</span>
      </div>
      <hr class="divider" />
      <div
        class="uk-padding-small uk-margin-top uk-padding-remove-bottom text-black uk-text-bold"
      >
        {{ data.message }}
      </div>
    </div>
    <div
      class="thread-footer uk-flex uk-child-width-1-3 uk-padding-small uk-flex-middle uk-flex-between"
    >
      <div class="button-container uk-flex">
        <div class="likes uk-text-center uk-margin-right">
          <button class="goa-button uk-button-small uk-margin-small-right">
            <span uk-icon="icon: arrow-up"></span>
          </button>
          <span>{{ data.likes }}</span>
        </div>
        <div class="dislikes uk-text-center uk-margin-right">
          <button
            class="goa-button uk-button-small uk-margin-small-right uk-padding-small-top"
          >
            <span uk-icon="icon: arrow-down"></span>
          </button>
          <span>{{ data.dislikes }}</span>
        </div>
      </div>
      <div class="uk-text-center uk-width-auto">
        <button class="goa-button">Reply</button>
      </div>
    </div>
  </div>
</template>
