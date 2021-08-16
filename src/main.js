import Vue from 'vue';
import App from './App.vue';
import { Button, Dropdown, Select } from 'element-ui';
import _ from 'lodash';
Vue.prototype._ = _;

Vue.use(Button);
Vue.use(Dropdown);
Vue.use(Select);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
