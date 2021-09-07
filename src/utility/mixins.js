import authService from '@/api/authService';
import get from 'lodash/get';
import { mapGetters } from 'vuex';
import userService from "../api/userService";


export default {
    methods: {
        async logIn(model) {
            try {
                let { data } = await authService.login(model);
                const token = get(data, 'token.plainTextToken', '');
                const user = get(data, 'user', {});

                authService.setToken(token);

                console.log(data);

                let profile = await userService.getProfile();
                user.avatar = get(profile, 'data.attributes.avatar', '');

                await this.setUserState({ token, user });

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