import VueI18n from 'vue-i18n'
import Vue from 'vue'
import enLocaleFile from '@/assets/lang/en-US.json'

export default function ({ app }) {
  Vue.use(VueI18n)
  app.i18n = new VueI18n({
    messages: {
      en: enLocaleFile
    },
    locale: 'en',
    fallbackLocale: 'en',
    silentTranslationWarn: true
  })
}