<script setup>
import { ref } from 'vue';

const props = defineProps ({
    modelValue : {

    },
    data : {

    },
})
</script>

<style scoped>

</style>

<template>
    <div class="comment goa-container uk-padding">
        <div class="author-info">
            
        </div>
        <div class="message goa-container uk-padding-small">

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