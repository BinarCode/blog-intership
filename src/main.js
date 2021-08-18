import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/globalComponents';
import i18n from '@/plugins/vue-i18n';
import './assets/tailwind.css'
import i18n from '@/plugins/vue-i18n';
import './api/apiConfig'

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')

