import authService from '@/api/authService';
import userService from '@/api/userService';
import get from 'lodash/get';
import { mapGetters } from 'vuex';


export default {
    methods: {
        async logIn(model) {
            try {
                let { data } = await authService.login(model);

                const token = get(data, 'token.plainTextToken', '');
                authService.setToken(token);
                await this.setTokenState(token);

                const profile = await userService.getProfile();
                const user = get(profile, 'data.attributes', {});
                user.created_at = data.user.created_at;
                user.updated_at = data.user.updated_at;
                await this.setUserState(user);

                await this.setLoggedInState(true);

                this.$notify({
                    title: this.$t('general.notify.succesTitle'),
                    message: this.$t('notifyMessage.succes.logIn'),
                    type: 'success',
                });

                this.$router.push('/');
            } catch (error) { this.notifyErrors(error) }
        },

        notifyErrors(error) {
            if (error.errorsArr)
                error.errorsArr.forEach((el) =>
                    this.$notify({
                        title: this.$t('general.notify.errorTitle'),
                        message: el,
                        type: 'error',
                    })
                );
            else if (error.message)
                this.$notify({
                    title: this.$t('general.notify.errorTitle'),
                    message: error.message,
                    type: 'error',
                });
        }
    },
    computed: {
        ...mapGetters(['userState']),
    }
}