import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import { messages } from './lib/translations'

const app = createApp(App)
const i18n = createI18n({
  messages,
  legacy: false,
})

app.use(i18n)
app.mount('#app')
