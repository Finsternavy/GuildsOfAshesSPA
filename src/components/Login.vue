<script setup>
import { ref } from 'vue';
import router from '../router/routes';
import { useUserStore } from '../stores/userStore';

const username = ref('');
const password = ref('');

const store = useUserStore();

const doLogin = () => {
    // for now just login no matter what.
    const userStore = useUserStore;
    store.setAuthenticated(true);
    console.log("Authenticated: ", store.getAuthenticated());
    console.log("User: ", store.getUser());
    router.push('/guild/home');
}
</script>

<style scoped>
.login {
    border: 1px solid gray;
    border-radius: 30px;
    background-color: rgba(0, 0, 0, 0.7);
}
</style>

<template>
    <div>
        <div class="login uk-padding uk-width-medium uk-align-center">
            <div class="uk-margin-bottom">
                <label for="username">Username</label>
                <input id="username" type="text" class="goa-input uk-width-1-1">
            </div>
            <div class="uk-margin-bottom">
                <label for="password">Password</label>
                <input id="password" type="password" class="goa-input uk-width-1-1">
            </div>
            <button 
                class="goa-button uk-width-1-1 uk-light uk-margin-top"
                @click="doLogin">Login</button>
        </div>
    </div>
</template>