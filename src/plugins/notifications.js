import {Notification} from "element-ui";

export default {
    install(Vue) {
        Vue.prototype.$notify = (title, message, type, position = 'top-right', duration = undefined) => {
            Notification({
                title: title,
                message: message,
                type: type, // 'success' | 'error' | 'warning' | 'info'
                position: position, // 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'
                duration: duration // undefined (closing automatically) | 0 (closing manually)
            });
        }
    }
}