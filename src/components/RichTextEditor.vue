<script setup>
import { ref, onBeforeMount, watch } from "vue";
// let emit = defineEmits(["input"]);
let props = defineProps(["modelValue"]);
let emits = defineEmits(["update:modelValue"]);
let editableContent = ref(props.modelValue);
onBeforeMount(() => {
//   editableContent.value = props.content;
});

watch(
  () => props.modelValue,
  (value) => {
    nextTick(() => {
      editableContent.value = value;
    });
    // editableContent.value = value;
  }
);

let handleInput = (event) => {
    editableContent.value = event.target.innerHTML;
//   props.modelValue = editableContent.value;
    emits("update:modelValue", editableContent.value);
    editableContent.value = '';
//   console.log("Guild description: ", editableContent.value);
};
</script>

<style scoped>
.editable-content {
  border: 1px solid #ccc;
  min-height: 200px;
  padding: 8px;
}
</style>

<template>
    <div
        id="guild-description"
        contenteditable="true"
        @input="handleInput"
        class="editable-content goa-input"
        ref="editableContent"
    ></div>
</template>