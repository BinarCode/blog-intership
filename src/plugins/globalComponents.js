import 'element-ui/lib/theme-chalk/index.css';
import { Button, Dropdown, Select, DropdownItem, DropdownMenu } from 'element-ui';
import BaseInput from '@/components/BaseInput.vue';


export default {
    install(Vue) {
        Vue.component('el-button', Button);
        Vue.component('el-dropdown', Dropdown);
        Vue.component('el-dropdown-item', DropdownItem);
        Vue.component('el-dropdown-menu', DropdownMenu);
        Vue.component('el-select', Select);
        Vue.component('base-input', BaseInput);
    },
}




