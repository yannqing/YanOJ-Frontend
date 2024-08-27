import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ArcoVue from '@arco-design/web-vue'
import App from './App.vue'
import '@arco-design/web-vue/dist/arco.css'
import router from './router'
import './utils/globalRoutingGuard'
import 'bytemd/dist/index.css'
import 'animate.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ArcoVue)
app.mount('#app')
