<script setup>
import { ref, onBeforeMount } from "vue";
// const emit = defineEmits(["input"]);
const props = defineProps(["content", "modelValue"]);
const emits = defineEmits(["update:modelValue"]);
let editableContent = ref();
onBeforeMount(() => {
  editableContent.value = props.content;
});

const handleInput = (event) => {
  editableContent.value = event.target.innerHTML;
  props.modelValue = editableContent.value;
  emits("update:modelValue", editableContent.value);
  console.log("Guild description: ", editableContent.value);
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