import Vue from 'vue';
import App from './App.vue';
import router from './router';
import veeValidate from "@/plugins/veeValidate";
import globalComponents from './plugins/globalComponents';
import i18n from '@/plugins/vue-i18n';
import './api/apiConfig';
import './assets/tailwind.css';

Vue.use(veeValidate);
Vue.use(globalComponents);

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
