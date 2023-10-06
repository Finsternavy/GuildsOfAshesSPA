<script setup>
import { ref } from 'vue'
let props = defineProps({
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
        <span class="text-goa-red" uk-spinner="ratio: 4.5"></span>
        <p class="uk-text-lead text-goa-red">{{ props.message }}</p>
    </div>
</template>