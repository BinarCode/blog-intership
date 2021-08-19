<template>
  <div class="flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" class="w-auto h-12 mx-auto">
      <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">
        {{ $t('general.forgotPassword.title') }}
      </h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
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

            <button
                type="submit"
                class="flex justify-center w-full px-4 py-2 my-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                :disabled="!valid"
            >
              {{ $t('general.resetPassword.title') }}
            </button>
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
      model: {
        email: ''
      },
    };
  },
  methods: {
    async handleSubmit() {
      const valid = await this.$refs.form.validate()

      if (valid) {
        try {
          const result = await authService.forgotPassword(this.model);
          console.log(result);
        }
        catch (error) { console.log(error) }
      }
    },
  },
};
</script>

<style scoped>

</style>
