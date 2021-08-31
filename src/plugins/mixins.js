import authService from '@/api/authService';
//import userService from '@/api/userService';
import get from 'lodash/get';

export default {
    methods: {
        async logIn(model) {
            try {
                let { data } = await authService.login(model);
                const token = get(data, 'token.plainTextToken', '');
                const user = get(data, 'user', {});
                user.avatar = `https://api-internship.binarcode.com/storage/${user.avatar}`;

                this.$notify({
                    title: this.$t('notifyMessage.success.title'),
                    message: this.$t('notifyMessage.succes.logIn'),
                    type: 'success',
                });

                authService.setToken(token);
                await this.setUserState(user);
                await this.setTokenState(token);
                await this.setLoggedInState(true);

                this.$router.push('/');
            } catch (error) { this.notifyErrors(error) }
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