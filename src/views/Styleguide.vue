<template>
  <div>
    <base-input
      v-model="email"
      id="email"
      type="email"
      name="emailInput"
      rules="'required|email'"
      placeholder="you@example.com"
      @input="clgEmail"
      >Enter email
    </base-input>
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
    clgEmail() {
      console.log(this.email);
    },
  },
};
</script>

<style scoped>
</style>