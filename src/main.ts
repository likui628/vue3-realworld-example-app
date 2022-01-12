import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { createPinia } from 'pinia'
import { CONFIG } from './config'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $config: Record<string, string>
  }
}
const app = createApp(App)
app.config.globalProperties.$config = CONFIG

app.use(createPinia())
app.use(router)

app.mount('#app')
