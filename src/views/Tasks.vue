<script setup>
const randomBackground = () => {
  let random = Math.floor(Math.random() * 6);
  const root = "map-";
  let locations = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
    "center-left",
    "center-right",
  ];
  console.log("Setting random location: ", root + locations[random]);
  return root + locations[random];
};
</script>

<style scoped>
.completed {
  /* background-color: rgba(0, 100, 0, 0.5); */
  /* border: 3px solid black; */
  box-shadow: inset 0 0 30px 0px rgba(0, 255, 0, 0.5);
}

.in-progress {
  /* box-shadow: inset 0 0 30px 0px rgb(249, 220, 0); */
  /* outline: 3px solid rgba(249, 220, 0, 0.4);
  outline-offset: -10px; */
}
</style>

<template>
  <!-- This needs to be converted to data driven.  Create a Task component and mock data -->
  <div class="tasks">
    <div class="task-menu goa-container uk-padding uk-margin-bottom">
      <h3 class="uk-light">Task Board</h3>
      <div class="task-filters uk-flex uk-child-width-1-4">
        <div v-for="nums in 4" class="uk-flex uk-flex-column">
          <label class="text-goa-red uk-margin-small-left" :for="'task-type-filter' + nums"
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
        <ul class="uk-list uk-flex uk-child-width-1-3" uk-grid>
          <!-- Need to replace this with a task component -->
          <li v-for="num in 3" class="uk-margin-top">
            <div
              :class="
                'map-container uk-padding in-progress uk-position-relative edge-shadow ' +
                randomBackground()
              "
            >
              <div class="mission-accomplished"></div>
              <h3><span class="text-black uk-text-bold">Task Name</span></h3>
              <p class="uk-margin-remove-bottom text-black uk-text-bold">
                We need to gather iron.
              </p>
              <div class="resources-stats uk-flex uk-flex-between uk-flex-middle">
                <p class="uk-margin-remove text-black uk-text-bold">
                  <span class="text-black uk-text-bold">Obtained: </span> 200
                </p>
                <p class="text-black uk-text-bold">
                  <span class="text-black uk-text-bold">Resources needed: </span>500
                </p>
              </div>
              <progress class="" :value="100" max="100"></progress>
              <p class="text-black uk-text-bold">Volunteers:</p>
              <div class="task-takers uk-flex uk-child-width-1-2" uk-grid>
                <div v-for="num in 5" class="member uk-margin-small-top">
                  <p class="uk-text-center text-black">
                    <span class="uk-text-bold">Member {{ num }} </span>
                  </p>
                </div>
              </div>
              <div class="volunteer uk-flex uk-flex-right">
                <button class="goa-button uk-margin-top">Volunteer</button>
              </div>
              <!-- <div
                class="completed-stamp uk-background-contain uk-height-medium uk-width-large"
                :data-src="'../../public/Images/mission_accomplished.png'"
                uk-img
              ></div> -->
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
