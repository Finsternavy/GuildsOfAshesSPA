<script setup>
import { ref } from 'vue';

const props = defineProps({
    modelValue : {

    },
    data : {

    },
    // function : {
    //     type: function
    // }
});

const emit = defineEmits(['update:modelValue']);

const comments = ref();


</script>

<style scoped>

</style>

<template>
    <div class="thread goa-container uk-padding">
        <div class="thread-header">
            <p>{{ data.author }} <span>{{ data.timeDate }}</span></p>
        </div>
        <div class="thread-body goa-container-no-radius uk-padding-small">
            <p>{{ data.message }}</p>
        </div>
        <div class="thread-footer uk-flex uk-child-width-1-3 uk-flex-middle">
            <div class="likes uk-text-center">
                <button class="goa-button">
                    <span uk-icon="icon: arrow-up"></span>
                </button>
                <span>{{ data.likes }}</span>
            </div>
            <div class="dislikes uk-text-center">
                <button class="goa-button">
                    <span uk-icon="icon: arrow-down"></span>
                </button>
                <span>{{ data.dislikes }}</span>
            </div>
            <div class="comment uk-text-center">
                <button class="goa-button">Reply</button>
            </div>
        </div>
    </div>
</template>