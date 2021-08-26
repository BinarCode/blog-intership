<template>
  <div class="flex flex-col justify-center min-h-screen py-12 bg-gray-100">
    <div class="mx-8 text-center sm:mx-auto">
      <img
        class="h-12 mx-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
      <h2 class="mt-6 text-3xl font-extrabold text-gray-800">
        {{ $t('register.button.label.signIn') }}
      </h2>
    </div>
    <div class="m-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="px-4 py-8 bg-white shadow rounded-lg sm:px-10">
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
            <div>
              <p class="text-sm text-red-600">
                {{ error }}
              </p>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import authService from '@/api/authService';
import get from 'lodash/get';
import { mapActions } from 'vuex';

export default {
  components: {},
  name: 'Login',
  data() {
    return {
      loading: false,
      model: {
        email: '',
        password: '',
      },
      error: '',
    };
  },
  methods: {
    ...mapActions(['setUserState']),
    async handleSubmit() {
      try {
        this.error = '';
        this.loading = true;
        let { data } = await authService.login(this.model);
        const token = get(data, 'token.plainTextToken', '');
        authService.setToken(token);
        await this.setUserState(token);
        this.$router.push('/');
      } catch (error) {
        console.log(error);
        this.error = error.errors || $t('signIn.invalidCredentials.text');
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
