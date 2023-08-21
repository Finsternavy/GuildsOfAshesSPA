<script setup>

</script>

<style scoped>
.goa-container {
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    border-radius: 30px;
    transition: background-color 0.3s ease-in-out;
}

.goa-alert-container {
    background-color: rgba(255, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    border-radius: 30px;
    transition: background-color 0.3s ease-in-out;
}

</style>

<template>
    <div class="guild-home">
        <div class="goa-container uk-padding uk-margin-bottom">
            <h1 class="uk-light uk-text-center uk-margin-remove">Guild Name </h1>
            <button class="goa-button uk-margin-left uk-margin-top uk-light uk-position-top-left">Apply</button>
            <p class="uk-text-small uk-text-warning uk-text-center uk-margin-remove-top"> ( 43 members)</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nobis aperiam quibusdam necessitatibus fuga illum adipisci tempore minus, nihil nemo animi at accusantium voluptates suscipit.</p>
        </div>
        <!-- Only show if guild leader or mod issues alert-->
        <div class="guild-alerts">
            <div class="goa-alert-container uk-padding uk-margin-bottom">
                <h3 class="uk-light uk-text-center uk-margin-remove">GUILD ALERT!</h3>
                <hr>
                <p class="uk-margin-remove-bottom">Alert issued by: <span class="uk-text-secondary uk-text-bold">Guild Leader</span></p>
                <p class="uk-margin-remove-top">Alert will expire at: <span class="uk-text-warning">4:15 PM EST</span></p>
                <p class="uk-margin-remove">The castle is under attack!</p>
                <p class="uk-margin-remove">War has been declaired! Participate in pre-war events. WE MUST PROTECT THIS HOUSE!</p>
            </div>
        </div>
        <div class="guild-main-content uk-flex">
            <div class="left-side uk-width-2-3">
                <div class="goa-container newest-mod-message uk-margin-right uk-padding uk-light">
                    <h3>Get to work!</h3>
                    <p class="uk-text-bold uk-text-warning"> The Leader @<span> 01/01/1901</span></p>
                    <p>We are in need of resources.  Check out the task section, claim a task, gather resources and support the guild!</p>
                </div>
                <div class="popular-threads goa-container uk-margin-top uk-margin-right uk-padding">
                    <h3 class="uk-light">Popular Threads</h3>
                    <a href="#">Character Build Guides</a>
                </div>
            </div>
            <div class="right-side uk-width-1-3">
                <div class="goa-container upcoming-events uk-padding uk-light">
                    <h3>Upcoming Events</h3>
                    <ul>
                        <li>Leadership Planning - 01/01/1901 @ 2:00 PM EST</li>
                        <li>Team Meeting - 01/01/1901 @ 4:00 PM EST</li>
                        <li>Group Play - 01/01/1901 @ All day</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>