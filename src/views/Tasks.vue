<script setup></script>

<style scoped>
.completed {
  /* background-color: rgba(0, 100, 0, 0.5); */
  /* border: 3px solid green; */
  box-shadow: inset 0 0 30px rgba(0, 128, 0, 0.5);
  border: 1px solid rgba(0, 128, 0, 1);
}
.pending {
  box-shadow: inset 0 0 30px rgba(255, 187, 1, 0.5);
  border: 1px solid rgba(255, 187, 1, 1);
}
</style>

<template>
  <div class="tasks uk-light">
    <div class="task-menu goa-container uk-padding uk-margin-bottom">
      <h3>Task Board</h3>
      <div class="task-filters uk-flex uk-child-width-1-4">
        <div v-for="nums in 4" class="uk-flex uk-flex-column">
          <label class="text-orange uk-margin-small-left" :for="'task-type-filter' + nums"
            >Filter {{ nums }}
          </label>
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
    <div class="task-list uk-flex uk-child-width-1-2">
      <div class="active-tasks uk-margin-right">
        <h3><span class="text-color">Active Tasks</span></h3>
        <ul class="uk-list uk-flex uk-child-width-1-1" uk-grid>
          <li v-for="num in 3" class="uk-margin-top">
            <div class="goa-container uk-padding pending">
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
      <div class="completed-tasks">
        <h3><span class="text-color">Completed Tasks</span></h3>
        <ul class="uk-list uk-flex uk-child-width-1-1" uk-grid>
          <li v-for="num in 2" class="uk-margin-top">
            <div class="goa-container uk-padding completed">
              <h3><span class="text-orange">Task Name</span></h3>
              <p class="uk-margin-remove-bottom">We need to gather iron.</p>
              <div class="resources-stats uk-flex uk-flex-between uk-flex-middle">
                <p class="uk-margin-remove">
                  <span class="text-orange">Resources need: </span>500
                </p>
                <p><span class="text-orange">Obtained: </span> 200</p>
              </div>
              <progress class="uk-progress" :value="100" max="100"></progress>
              <p>Volunteers:</p>
              <div class="task-takers uk-flex uk-child-width-1-4" uk-grid>
                <div v-for="num in 3" class="member">
                  <p class="uk-background-primary goa-container uk-text-center">
                    <span>Member {{ num }} </span>
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
