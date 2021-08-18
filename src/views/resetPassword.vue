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
        {{ $t('Reset password') }}
      </h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        <ValidationObserver v-slot="{ valid }">
          <form @submit.prevent="handleSubmit">
            <base-input
              v-model="model.password"
              type="password"
              :name="$t('Password')"
              :label="$t('Reset password')"
              rules="required|min:6"
              :placeholder="$t('password')"
            />

            <base-input
              v-model="model.password_confirmation"
              type="password"
              :name="$t('Password confirmation')"
              :label="$t('Confirm reset password')"
              rules="required|confirmed:@Password"
              :placeholder="$t('password confirmation')"
            />
            <button
              type="submit"
              class="flex justify-center w-full px-4 py-2 my-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              :disabled="!valid"
            >
              {{ $t('Reset password') }}
            </button>
            <div class="flex justify-between text-sm">
              <a
                href="#"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {{ $t('Sign in') }}
              </a>
              <div>
                {{ $t("Don't have an account?") }}
                <a
                  href="/register"
                  class="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {{ $t('Sign up') }}
                </a>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inputTest',
  data() {
    return {
      model: {
        email: null,
        token: null,
        password: null,
        password_confirmation: null,
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
