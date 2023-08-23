<script setup></script>

<style scoped>
.completed {
  /* background-color: rgba(0, 100, 0, 0.5); */
  /* border: 3px solid black; */
  box-shadow: inset 0 0 30px 0px rgba(0, 255, 0, 0.5);
}

.in-progress {
  /* box-shadow: inset 0 0 30px 0px rgb(249, 220, 0); */
  outline: 3px solid rgba(249, 220, 0, 0.4);
  outline-offset: -10px;
}
</style>

<template>
  <!-- This needs to be converted to data driven.  Create a Task component and mock data -->
  <div class="tasks uk-light">
    <div class="task-menu goa-container uk-padding uk-margin-bottom">
      <h3>Task Board</h3>
      <div class="task-filters uk-flex uk-child-width-1-4">
        <div v-for="nums in 4" class="uk-flex uk-flex-column">
          <label class="text-orange uk-margin-small-left" :for="'task-type-filter' + nums"
            >Filter {{ nums }}</label
          >
          <select
            :name="'task-type-filter' + nums"
            :id="'task-type-filter' + nums"
            class="uk-margin-right goa-input"
          >
            <option value=""></option>
            <option class="goa-input" v-for="num in 4" :value="num">{{ num }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="task-list uk-flex">
      <div class="active-tasks">
        <ul class="uk-list uk-flex uk-child-width-1-1" uk-grid>
          <li v-for="num in 3" class="uk-margin-top">
            <div class="goa-container uk-padding in-progress">
              <h3><span class="text-orange">Task Name</span></h3>
              <p class="uk-margin-remove-bottom">We need to gather iron.</p>
              <div class="resources-stats uk-flex uk-flex-between uk-flex-middle">
                <p class="uk-margin-remove">
                  <span class="text-orange">Resources need: </span>500
                </p>
                <p><span class="text-orange">Obtained: </span> 200</p>
              </div>
              <progress
                class="uk-progress"
                :value="(200 / 500) * 100"
                max="100"
              ></progress>
              <p>Volunteers:</p>
              <div class="task-takers uk-flex uk-child-width-1-4" uk-grid>
                <div v-for="num in 5" class="member uk-margin-small-top">
                  <p class="uk-background-primary goa-container uk-text-center">
                    <span>Member {{ num }} </span>
                  </p>
                </div>
              </div>
              <div class="volunteer uk-flex uk-flex-right">
                <button class="goa-button uk-margin-top">Volunteer</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
