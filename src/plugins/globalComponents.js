import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import { Button, Dropdown, Select } from 'element-ui';
import { ValidationProvider } from 'vee-validate';

Vue.component('el-button', Button);
Vue.component('el-dropdown', Dropdown);
Vue.component('el-select', Select);
Vue.component('validation-provider', ValidationProvider);



