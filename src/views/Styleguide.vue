<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit, valid }">
      <form @submit.prevent="handleSubmit">
        <base-input
          v-model="email"
          id="email"
          type="email"
          name="Email"
          rules="email"
          placeholder="you@example.com"
          @input="clgEmail"
          >Enter email
        </base-input>
        <button
            type="submit"
            :disabled="!valid"
        >
          hello
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import BaseInput from "../components/UI/BaseInput.vue";

export default {
  name: "Styleguide",
  components: { BaseInput },
  data() {
    return {
      email: "",
    };
  },
  methods: {
    handleSubmit() {
      console.log('hello');
    },
    clgEmail() {
      console.log(this.email);
    },
  },
};
</script>

<style scoped>
</style>
