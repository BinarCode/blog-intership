<template>
  <div
    class="flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="w-auto h-12 mx-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
      <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-800">
        {{ $t('register.button.label.signIn') }}
      </h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        <ValidationObserver v-slot="{ valid }">
          <form class="space-y-6" @submit.prevent="handleSubmit">
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
              :placeholder="$t('password')"
            />
            <router-link
              class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              to="/forgot-password"
            >
              {{ $t('forgotPassword.text') }}
            </router-link>
            <div class="flex justify-center w-full">
              <base-button
                type="submit"
                :disabled="loading === valid"
                size="lg"
                color="primary"
                :loading="loading"
              >
                {{ $t('register.button.label.signIn') }}
              </base-button>
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
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.loading = true;
        let { data } = await authService.login(this.model);
        const token = get(data, 'token.plainTextToken', '');
        authService.setToken(token);
        this.$store.commit('setUserState', token);
        this.$router.push('/');
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
