import {Notification} from "element-ui";

export default {
    install(Vue) {
        Vue.prototype.$notify = (notifications) => {
            Notification({
                title: notifications.title,
                message: notifications.message,
                type: notifications.type, // 'success' | 'error' | 'warning' | 'info'
                position: notifications.position || 'top-left', // 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'
                duration: notifications.duration || 4500 // number of milliseconds | 0 (closing manually)
            });
        }
    }
}