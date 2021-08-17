import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enLocaleFile from '@/locales/en.json'

Vue.use(VueI18n);

export default new VueI18n({
    messages: {
        en: enLocaleFile
    },
    locale: 'en',
    fallbackLocale: 'en',
    silentFallbackWarn: true,
});
