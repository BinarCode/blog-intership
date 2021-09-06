import 'element-ui/lib/theme-chalk/index.css';
import { Button, Dropdown, Select, DropdownItem, DropdownMenu } from 'element-ui';
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import BackToTop from '@/components/BackToTop';
import PageFooter from '@/components/PageFooter';
import BCLogo from '@/components/BCLogo'

export default {
    install(Vue) {
        Vue.component('el-button', Button);
        Vue.component('el-dropdown', Dropdown);
        Vue.component('el-dropdown-item', DropdownItem);
        Vue.component('el-dropdown-menu', DropdownMenu);
        Vue.component('el-select', Select);
        Vue.component('base-input', BaseInput);
        Vue.component('base-button', BaseButton);
        Vue.component('back-to-top', BackToTop);
        Vue.component('page-footer', PageFooter);
        Vue.component('bc-logo', BCLogo);
    },
}




