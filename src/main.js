import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './GuildsOfAshes.vue/'
import router from './router/routes'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

import './assets/main.css'
import 'uikit/dist/css/uikit.css'

UIkit.use(Icons)

// get rid of feature flag warning in browser
globalThis.__VUE_OPTIONS_API__ = false;
globalThis.__VUE_PROD_DEVTOOLS__ = true;

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
