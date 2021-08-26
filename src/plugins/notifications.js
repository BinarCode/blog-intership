import {Notification} from "element-ui";

export default {
    install(Vue) {
        Vue.prototype.showSuccessNotification = () => {
            Notification({
                title: 'Success',
                message: 'This is a success notification',
                type: 'success',
                position: 'top-right',
                duration: 0
            });
        }

        Vue.prototype.showWarningNotification = () => {
            Notification({
                title: 'Warning',
                message: 'This is a warning notification',
                type: 'warning',
                position: 'top-right',
                duration: 0
            });
        }

        Vue.prototype.showInfoNotification = () => {
            Notification({
                title: 'Info',
                message: 'This is a info notification',
                type: 'info',
                position: 'top-right',
                duration: 0
            });
        }

        Vue.prototype.showErrorNotification = () => {
            Notification({
                title: 'Error',
                message: 'This is a error notification',
                type: 'error',
                position: 'top-right',
                duration: 0
            });
        }
    }
}