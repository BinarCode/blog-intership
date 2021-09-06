<template>
  <div class="flex flex-col justify-center my-auto bg-gray-100 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="h-10 mx-auto"
        src="https://www.binarcode.com/img/brand/logo-dark.png"
        alt="BinarCode"
      />
      <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">
        {{ $t('general.forgotPassword.title') }}
      </h2>
    </div>
    <div class="m-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="px-4 py-8 bg-white shadow rounded-lg sm:px-10">
        <ValidationObserver v-slot="{ valid }" ref="form">
          <form @submit.prevent="handleSubmit">
            <base-input
              v-model="model.email"
              type="email"
              :name="$t('general.name.email')"
              :label="$t('general.name.email')"
              rules="email|required"
              :placeholder="$t('general.placeholder.email')"
            />

            <router-link
              class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              to="/login"
            >
              {{ $t('app.routerTitle.login') }}
            </router-link>

            <base-button
              type="submit"
              :disabled="!valid"
              :loading="loading"
              class="w-full"
            >
              {{ $t('general.submit') }}
            </base-button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import authService from '@/api/authService';

export default {
  name: 'ForgotPassword',
  data() {
    return {
      loading: false,
      model: {
        email: '',
      },
    };
  },
  methods: {
    async handleSubmit() {
      const valid = await this.$refs.form.validate();

      if (!valid) {
        return;
      }

      try {
        this.loading = true;
        await authService.forgotPassword(this.model);
        this.$notify({
          title: this.$t('general.notify.succesTitle'),
          message: this.$t('notifyMessage.succes.forgotPassword'),
          type: 'success',
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
