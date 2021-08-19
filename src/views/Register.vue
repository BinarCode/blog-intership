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
        {{ $t('Sign Up') }}
      </h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        <ValidationObserver v-slot="{ valid }">
          <form @submit.prevent="handleSubmit">
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
              :name="$t('general.name.password')"
              :label="$t('general.name.password')"
              rules="required|min:6"
              :placeholder="$t('general.placeholder.password')"
            />

            <base-input
              v-model="model.password_confirmation"
              type="password"
              :name="$t('general.name.passwordConfirmation')"
              :label="$t('general.name.passwordConfirmation')"
              rules="required|confirmed:@Password"
              :placeholder="$t('general.placeholder.passwordConfirmation')"
            />

            <button
              type="submit"
              class="flex justify-center w-full px-4 py-2 my-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              :disabled="!valid"
            >
              {{ $t('general.submit') }}
            </button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
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
    handleSubmit() {
      console.log(this.model);
    },
  },
};
</script>

<style scoped></style>
