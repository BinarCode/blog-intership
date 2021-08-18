<template>
  <div
    class="
      min-h-screen
      bg-gray-50
      flex flex-col
      justify-center
      py-12
      sm:px-6
      lg:px-8
    "
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
        class="mx-auto h-12 w-auto"
      />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign up
      </h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <ValidationObserver v-slot="{ valid }">
          <form @submit.prevent="handleSubmit">
            <base-input
              v-model="model.first_name"
              type="text"
              :name="$t('First Name')"
              :label="$t('First Name')"
              rules="required"
              placeholder="John"
            />

            <base-input
              v-model="model.last_name"
              type="text"
              :name="$t('Last Name')"
              :label="$t('Last Name')"
              rules="required"
              placeholder="Kennedy"
            />

            <base-input
              v-model="model.email"
              type="email"
              :name="$t('Email')"
              :label="$t('Email')"
              rules="required|email"
              placeholder="you@example.com"
            />

            <base-input
              v-model="model.password"
              type="password"
              :name="$t('Password')"
              :label="$t('Password')"
              rules="required|min:6"
              :placeholder="$t('password')"
            />

            <base-input
              v-model="model.password_confirmation"
              type="password"
              :name="$t('Password confirmation')"
              :label="$t('Password confirmation')"
              rules="required|confirmed:@Password"
              :placeholder="$t('password confirmation')"
            />

            <div class="flex items-center justify-between text-sm">
              <a
                href="#"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
            <button
              type="submit"
              class="
                my-4
                w-full
                flex
                justify-center
                py-2
                px-4
                border border-transparent
                rounded-md
                shadow-sm
                text-sm
                font-medium
                text-white
                bg-indigo-600
                hover:bg-indigo-700
                focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              "
              :disabled="!valid"
            >
              Submit
            </button>
          </form>
        </ValidationObserver>
        <form action="#" method="POST" class="space-y-6"></form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "inputTest",
  data() {
    return {
      model: {
        first_name: null,
        last_name: null,
        email: null,
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

<style scoped>
</style>