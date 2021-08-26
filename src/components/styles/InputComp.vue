// InputComp => Input Component, is an demo to see how we can use the BaseInput
// component in a form with a button and vee-validator

<template>
  <div class="px-10 py-5 lg:w-1/3">
    <h1 class="my-5 text-xl font-bold">
      {{ $t('general.styleguide.section.baseInput') }}
    </h1>
    <ValidationObserver v-slot="{ valid }">
      <form @submit.prevent="handleSubmit">
        <base-input
          v-model="email"
          type="email"
          :name="$t('general.name.email')"
          :label="$t('general.name.email')"
          rules="email|required"
          :placeholder="$t('general.placeholder.email')"
          @input="onInput"
        >
          <!-- {{ $t('general.name.email') }} -->
          <!-- also we can send the label as slot -->
        </base-input>

        <base-button type="submit" :disabled="!valid" class="w-full">
          {{ $t('general.submit') }}
        </base-button>
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
