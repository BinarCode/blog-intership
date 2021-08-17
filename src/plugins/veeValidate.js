import en from 'vee-validate/dist/locale/en.json'
import { extend, localize, ValidationObserver, ValidationProvider } from 'vee-validate'
import {
    alpha,
    email,
    excluded,
    length,
    max,
    max_value,
    min,
    min_value,
    numeric,
    required,
} from 'vee-validate/dist/rules'

extend('required', required)
extend('email', email)
extend('min', min)
extend('max', max)
extend('max_value', max_value)
extend('min_value', min_value)
extend('numeric', numeric)
extend('excluded', excluded)
extend('alpha', alpha)
extend('length', length)

extend('confirmed', {
    params: ['target'],
    validate(value, { target }) {
        return value === target
    },
    message: 'Password confirmation does not match',
})

const dictionary = {
    custom: {},
}

localize({
    en: {
        ...en,
        ...dictionary,
    },
})

export default {
    install(Vue) {
        Vue.component('ValidationObserver', ValidationObserver)
        Vue.component('ValidationProvider', ValidationProvider)
    },
}
