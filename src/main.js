import Vue from 'vue';
import App from './App.vue';
import router from './router';
import veeValidate from "@/plugins/veeValidate";
import './assets/tailwind.css'
import './plugins/globalComponents';
import i18n from '@/plugins/vue-i18n';
import './api/apiConfig'

Vue.use(veeValidate);
Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
