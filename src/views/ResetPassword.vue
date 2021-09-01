<template>
  <div
    class="flex flex-col justify-center min-h-screen py-12 bg-gray-100 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
        class="w-auto h-12 mx-auto"
      />
      <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">
        {{ $t('general.resetPassword.title') }}
      </h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="px-4 py-8 bg-white shadow rounded-lg sm:px-10">
        <ValidationObserver v-slot="{ valid }">
          <form @submit.prevent="onSubmit">
            <base-input
              v-model="model.password"
              type="password"
              name="password"
              :label="$t('resetPassword.name.newPassword')"
              rules="required|min:6"
              :placeholder="$t('general.placeholder.password')"
            />

            <base-input
              v-model="model.password_confirmation"
              type="password"
              :name="$t('general.name.passwordConfirmation')"
              :label="$t('general.name.passwordConfirmation')"
              rules="required|confirmed:@password"
              :placeholder="$t('general.placeholder.passwordConfirmation')"
            />

            <base-button
              type="submit"
              :disabled="!valid"
              :loading="loading"
              class="w-full"
            >
              {{ $t('general.resetPassword.title') }}
            </base-button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import authServices from '@/api/authService';
import get from 'lodash/get';

export default {
  name: 'ResetPassword',
  data() {
    return {
      loading: false,
      model: {
        email: get(this.$route, 'query.email', ''),
        token: get(this.$route, 'query.token', ''),
        password: '',
        password_confirmation: '',
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        this.loading = true;
        await authServices.resetPassword(this.model);
        this.$notify({
          title: this.$t('general.notify.succesTitle'),
          message: this.$t('notifyMessage.succes.resetPassword'),
          type: 'success',
        });
        await this.logIn({
          email: this.model.email,
          password: this.model.password_confirmation,
        });
      } catch (error) {
        this.notifyErrors(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped></style>
