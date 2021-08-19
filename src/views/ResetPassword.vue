<template>
  <div
    class="flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8"
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
      <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
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

            <button
              type="submit"
              :class="
                loading === valid
                  ? 'cursor-default bg-indigo-500'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              "
              class="flex items-center justify-center w-full px-4 py-2 my-4 text-sm font-medium text-white border border-transparent rounded-md shadow-sm "
              :disabled="loading === valid"
            >
              <i
                v-if="loading"
                class="text-lg leading-none animate-spin el-icon-loading"
              ></i>
              <span class="mx-2">{{ $t('general.resetPassword.title') }}</span>
            </button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import authServices from '@/api/authService';

export default {
  name: 'inputTest',
  data() {
    return {
      loading: false,
      model: {
        email: '',
        token: '',
        password: '',
        password_confirmation: '',
      },
    };
  },
  methods: {
    async onSubmit() {
      this.model.email = this.$route.query.email;
      this.model.token = this.$route.query.token;
      console.log(this.model);
      try {
        this.loading = true;
        await authServices.resetPassword(this.model);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped></style>
