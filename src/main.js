import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import Toaster from "@meforma/vue-toaster"

import '@/assets/global.css'
import store from './store'

createApp(App)
    .use(store)
    .use(Toaster)
    .use(VueAxios, axios)
    .mount('#app')

// const app = createApp(App)
// app.use(store)
// app.use(VueToast)
// app.mount('#app')