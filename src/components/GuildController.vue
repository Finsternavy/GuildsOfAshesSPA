<script setup>

let ranks = ref([
    {name: 'Guild Leader', level: 0}, 
    {name: 'Member', level: 1}, 
    {name: 'Recruit', level: 2}
    ])
</script>

<style scoped>

</style>

<template>
    <div class="goa-container uk-padding">
        <!-- need to create controls to allow guild leader to set a rank structure for their guild -->
        <h1>Guild Settings</h1>
        <div class="rank-structure-container">

        </div>

    </div>
</template>