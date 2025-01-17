import { createI18n } from 'vue-i18n'
import en from './locales/en'
import zhCN from './locales/zh-CN'

const messages = {
  en,
  'zh-CN': zhCN,
}

const i18n = createI18n({
  locale: uni.getStorageSync('language') || 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages,
})

export default i18n
