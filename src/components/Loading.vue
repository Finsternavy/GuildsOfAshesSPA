<script setup>
import { ref } from 'vue'
const props = defineProps({
    modelValue: {
    },
    message: {
        type: String,
        default: 'Loading...'
    }

})
</script>

<style scoped>

</style>

<template>
    <div v-if="!props.modelValue" class="loading goa-container uk-padding uk-flex uk-flex-column uk-text-center">
        <span class="text-orange" uk-spinner="ratio: 4.5"></span>
        <p class="uk-text-lead text-orange">{{ props.message }}</p>
    </div>
</template>