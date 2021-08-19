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
        {{ $t('register.button.label.signUp') }}
      </h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        <ValidationObserver v-slot="{ valid }">
          <form @submit.prevent="onSubmit">
            <base-input
              v-model="model.first_name"
              :name="$t('register.name.firstName')"
              :label="$t('register.name.firstName')"
              rules="required"
              placeholder="John"
            />

            <base-input
              v-model="model.last_name"
              :name="$t('register.name.lastName')"
              :label="$t('register.name.lastName')"
              rules="required"
              placeholder="Kennedy"
            />

            <base-input
              v-model="model.email"
              type="email"
              :name="$t('general.name.email')"
              :label="$t('general.name.email')"
              rules="required|email"
              :placeholder="$t('general.placeholder.email')"
            />

            <base-input
              v-model="model.password"
              type="password"
              name="password"
              :label="$t('general.name.password')"
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
              :disabled="loading === valid"
              class="flex items-center justify-center w-full px-4 py-2 my-4 text-sm font-medium text-white border border-transparent rounded-md shadow-sm"
            >
              <i
                v-if="loading"
                class="text-lg leading-none el-icon-loading"
              ></i>
              <span class="mx-2">{{ $t('register.button.label.signUp') }}</span>
            </base-button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import authServices from '@/api/authService';

export default {
  name: 'Register',
  data() {
    return {
      loading: false,
      model: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        this.loading = true;
        await authServices.register(this.model);
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
