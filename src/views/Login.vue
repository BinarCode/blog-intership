<template>
  <div class="flex flex-col h-full my-auto justify-center">
    <div class="mx-8 text-center sm:mx-auto">
      <bc-logo class="h-10" />
      <h2 class="mt-6 text-3xl font-extrabold text-gray-800">
        {{ $t('register.button.label.signIn') }}
      </h2>
    </div>
    <div class="m-2 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="py-8 px-4 bg-white shadow rounded-lg sm:px-10">
        <ValidationObserver v-slot="{ valid }">
          <form @submit.prevent="handleSubmit">
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
              :placeholder="$t('general.name.password')"
            />
            <router-link
              class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              to="/forgot-password"
            >
              {{ $t('general.forgotPassword.text') }}
            </router-link>

            <base-button
              type="submit"
              :disabled="!valid"
              :loading="loading"
              class="w-full"
            >
              {{ $t('signIn.button.label') }}
            </base-button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      model: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapActions(['setUserState']),
    async handleSubmit() {
      try {
        this.loading = true;
        this.logIn(this.model);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
