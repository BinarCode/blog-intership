<template>
  <div class="flex flex-col justify-center min-h-screen py-12 bg-gray-100">
    <div class="mx-8 text-center sm:mx-auto">
      <img
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
        class="h-12 mx-auto"
      />
      <h2 class="mt-6 text-3xl font-extrabold text-gray-800">
        {{ $t('register.button.label.signUp') }}
      </h2>
    </div>
    <div class="m-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="px-4 py-8 bg-white shadow rounded-lg sm:px-10">
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
              :disabled="!valid"
              :loading="loading"
              class="w-full mt-3"
            >
              {{ $t('register.button.label.signUp') }}
            </base-button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import authService from '@/api/authService';
import { mapActions } from 'vuex';

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
    ...mapActions(['setUserState']),

    async onSubmit() {
      try {
        this.loading = true;

        await authService.register(this.model);

        this.$notify({
          title: this.$t('notifyTitle.succes.register'),
          message: this.$t('notifyMessage.succes.register'),
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
}
</script>

<style scoped></style>
