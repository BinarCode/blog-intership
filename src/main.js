import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui'
import _ from 'lodash';
Vue.prototype._ = _;

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
