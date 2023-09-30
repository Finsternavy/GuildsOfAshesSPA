<script setup>

import { ref, onBeforeMount, computed } from "vue";

</script>

<style scoped>
.guild-app-header {
    margin-left: auto;
    margin-right: auto;
}
.goa-textarea {
    height: 100px;
}
</style>

<template>
    <div class="guild-application-container goa-container uk-padding uk-margin-bottom-large">
        <div class="guild-app-header uk-text-center">
            <h1 class="text-orange">Guild Name</h1>
            <div class="guild-logo">logo</div>
        </div>
        <div class="guild-brief uk-margin-bottom">
            <p>This is where the guild requirements will go</p>
            <p v-for="num in 10" class="uk-margin-left">
                <span>You must do task {{ num }}</span>
            </p>
        </div>
        <div v-for="num in 5" class="question-container uk-margin-bottom">
            <p>Question {{ num }}:</p>
            <p class="text-orange">This is question number {{num}}?</p>
            <textarea class="goa-textarea goa-input uk-width-1-1" :name="'Question' + num" :id="'Question' + num" cols="30" rows="10"></textarea>
        </div>
        <div>
            <button class="goa-button">Submit Application</button>
        </div>
    </div>
</template>