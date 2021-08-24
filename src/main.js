import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import veeValidate from "@/plugins/veeValidate";
import globalComponents from '@/plugins/globalComponents';
import i18n from '@/plugins/vue-i18n';
import store from '@/store/store';
import './api/apiConfig';
import './assets/tailwind.css';

import authMiddleware from "@/router/middleware/authMiddleware"
authMiddleware(router, store);

Vue.use(veeValidate);
Vue.use(globalComponents);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

