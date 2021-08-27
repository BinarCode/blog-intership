import {Notification} from "element-ui";

export default {
    install(Vue) {
        Vue.prototype.$notify = (notification) => {
            Notification({
                title: notification.title,
                message: notification.message,
                type: notification.type, // 'success' | 'error' | 'warning' | 'info'
                position: notification.position || 'top-right', // 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'
                duration: notification.duration || 4500, // number of milliseconds | 0 (closing manually)
                offset: (
                        notification.position === 'top-right'
                        || notification.position === 'top-left'
                        || !notification.position
                        ) ? 64 : 0
            });
        }
    }
}