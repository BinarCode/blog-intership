import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/globalComponents';
import './assets/tailwind.css'
import './api/apiConfig'


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

