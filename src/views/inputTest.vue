<template>
  <div class="w-1/3 px-10 py-5">
    <h1 class="text-xl font-bold my-5">
      {{ $t('BaseInput example') }}
    </h1>
    <ValidationObserver v-slot="{ valid }">
      <form @submit.prevent="handleSubmit">
        <base-input
          v-model="email"
          type="email"
          :name="$t('Email')"
          rules="email|required"
          :placeholder="$t('emailPH')"
          @input="onInput"
        >
          {{ $t('emailLabel') }}
        </base-input>
        <button
          type="submit"
          class="mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          :disabled="!valid"
        >
          {{ $t('Submit') }}
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  name: 'inputTest',
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
