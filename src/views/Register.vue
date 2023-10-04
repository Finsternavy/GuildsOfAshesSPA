<script setup>
import { ref, computed } from "vue";
import router from "../router/routes";

const username = ref();
const email = ref();
const password = ref();
const confirmPassword = ref();

const baseUrl = process.env.APIURL + "Users";

const formChecked = ref(false);

let errorMessage = ref([]);

const registrationForm = computed(() => {
  let formObject = {};
  formObject.Username = username;
  formObject.Email = email;
  formObject.Password = password;
  formObject.ConfirmPassword = confirmPassword;

  return formObject;
});

const register = async () => {
  console.log("baseURL: ", baseUrl);
  let hashedPassword = await hash(password.value);
  const call = {
    Username: username.value,
    Email: email.value,
    Password: hashedPassword,
  };
  console.log("call: ", call);
  const response = await fetch(baseUrl + "/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
    },
    body: JSON.stringify(call),
  })
    .then((response) => {
      // console.log("appLogin", response);
      if (response.ok) {
        router.push({ name: "login" });
      }
    })
    .catch((error) => {
      console.log("Error: ", error);
      return error;
    });
  returnValue = await response;

  return returnValue;
};

async function hash(string) {
  const utf8 = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((bytes) => bytes.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

const checkForm = () => {
  formChecked.value = true;
  errorMessage.value = [];
  console.log("Checking form...");
  const keys = Object.keys(registrationForm.value);
  console.log(keys);
  let found = true;
  keys.forEach((key) => {
    if (!registrationForm.value[key].value) {
      errorMessage.value.push(key + " is required!");
      found = false;
    }
  });
  if (!found) {
    console.log("Missing value");
    return false;
  }
  if (
    registrationForm.value["Password"].value !=
    registrationForm.value["ConfirmPassword"].value
  ) {
    errorMessage.value.push("Password do not match!");
    return false;
  }
  console.log("Registration Form is good!: ", registrationForm.value);
  register();
  return true;
};
</script>
<style scoped>
.error {
  background-color: rgb(255, 136, 136);
}
</style>

<template>
  <div class="register uk-flex uk-flex-center">
    <div class="uk-form goa-container uk-padding uk-width-large uk-child-width-1-1">
      <h3 class="uk-text-center text-goa-red">REGISTRATION</h3>
      <div
        class="input-container uk-flex uk-flex-column uk-flex-center uk-child-width-auto uk-margin-bottom"
      >
        <label for="UsernameInput">Username</label>
        <input
          class="goa-input"
          :class="{ error: formChecked && !username }"
          id="UsernameInput"
          type="text"
          v-model="username"
        />
      </div>
      <div
        class="input-container uk-flex uk-flex-column uk-flex-center uk-child-width-auto uk-margin-bottom"
      >
        <label for="EmailInput">Email</label>
        <input
          class="goa-input"
          :class="{ error: formChecked && !email }"
          id="EmailInput"
          type="text"
          v-model="email"
        />
      </div>
      <div
        class="input-container uk-flex uk-flex-column uk-flex-center uk-child-width-auto uk-margin-bottom"
      >
        <label for="PasswordInput">Password</label>
        <input
          class="goa-input"
          :class="{
            error:
              (formChecked && !password) || (formChecked && confirmPassword != password),
          }"
          id="PasswordInput"
          type="password"
          v-model="password"
        />
      </div>
      <div
        class="input-container uk-flex uk-flex-column uk-flex-center uk-child-width-auto uk-margin-large-bottom"
      >
        <label for="ConfirmPasswordInput">Confirm Password</label>
        <input
          class="goa-input"
          :class="{
            error:
              (formChecked && !confirmPassword) ||
              (formChecked && confirmPassword != password),
          }"
          id="ConfirmPasswordInput"
          type="password"
          v-model="confirmPassword"
        />
      </div>
      <div
        v-if="errorMessage.length > 0"
        class="message-container uk-form uk-form-danger uk-margin-large-bottom"
      >
        <p v-for="error in errorMessage">{{ error }}</p>
      </div>
      <div class="button-container uk-flex uk-child-width-1-2">
        <button class="goa-button uk-margin-right uk-padding-small" @click="checkForm">
          Register
        </button>
        <button class="goa-button uk-padding-small" @click="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>
