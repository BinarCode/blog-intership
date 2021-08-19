// InputComp => Input Component, is an demo to see how we can use the BaseInput
// component in a form with a button and vee-validator

<template>
  <div class="w-1/3 px-10 py-5">
    <h1 class="my-5 text-xl font-bold">
      {{ $t('general.styleguide.section.baseInput') }}
    </h1>
    <ValidationObserver v-slot="{ valid }">
      <form @submit.prevent="handleSubmit">
        <base-input
          v-model="email"
          type="email"
          :name="$t('Email')"
          :label="$t('emailLabel')"
          rules="email|required"
          :placeholder="$t('emailPH')"
          @input="onInput"
        >
          <!-- {{ $t('emailLabel') }} -->
          <!-- also we can send the label as slot -->
        </base-input>
        <button
          type="submit"
          class="flex justify-center w-full px-4 py-2 mt-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          :disabled="!valid"
        >
          {{ $t('general.submit') }}
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  name: 'inputComp',
  data() {
    return {
      email: '',
    };
  },
  methods: {
    handleSubmit() {
      console.log('hello');
    },
    onInput() {
      console.log(this.email);
    },
  },
};
</script>

<style scoped></style>
