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

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
