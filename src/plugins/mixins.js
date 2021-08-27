import authService from '@/api/authService';
import get from 'lodash/get';

export default {
    methods: {
        async logIn(model) {
            let { data } = await authService.login(model);
            const token = get(data, 'token.plainTextToken', '');
            this.$notify({
                title: 'Success',
                message: this.$t('notifyMessage.succes.logIn'),
                type: 'success',
            });
            authService.setToken(token);
            await this.setUserState(token);
            this.$router.push('/');
        },
        notifyErrors(error) {
            if (error.errorsArr)
                error.errorsArr.forEach((el) =>
                    this.$notify({
                        title: 'Error',
                        message: el,
                        type: 'error',
                    })
                );
            else if (error.message)
                this.$notify({
                    title: 'Error',
                    message: error.message,
                    type: 'error',
                });
        }
    },
}