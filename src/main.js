import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import veeValidate from '@/plugins/veeValidate';
import globalComponents from '@/plugins/globalComponents';
import i18n from '@/plugins/vue-i18n';
import store from '@/store/store';
import axios from '@/api/axiosConfig';
import '@/assets/tailwind.css';
import '@/assets/base/common.css';
import notifications from '@/plugins/notifications.js';
import mixins from '@/utility/mixins';
import VueMeta from 'vue-meta';

import authMiddleware from '@/middleware/authMiddleware';

authMiddleware(router, store);

Vue.use(axios);
Vue.use(veeValidate);
Vue.use(globalComponents);
Vue.use(notifications);
Vue.mixin(mixins);
Vue.use(VueMeta);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
