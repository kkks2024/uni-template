import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import App from './App.vue'
import 'uno.css'
import i18n from './i18n'

export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia.createPinia())
  app.use(i18n)
  return {
    app,
    Pinia,
  }
}
