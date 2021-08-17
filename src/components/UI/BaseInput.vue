<template>
  <div>
    <label
        :for="id"
        class=" block text-sm font-medium text-gray-700"
    >
      <slot>{{ label }}</slot>
    </label>
    <validation-provider v-slot="{ errors }" :name="name" :rules="rules">
      <input
        :value="value"
        :type="type"
        :placeholder="placeholder"
        v-on="listeners"
        class="input-style sm:text-sm"
        v-bind="$attrs"
      />
      <div class="errors-style">
        <div v-for="(error, index) in errors" :key="index">
          {{ error }}
        </div>
      </div>
    </validation-provider>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  inheritAttrs: false,
  props: {
    id: String,
    name: String,
    label: String,
    placeholder: String,
    value: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: "text",
    },
    rules: [String, Object],
    fieldType: {
      type: String,
      default: "",
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
      };
    },
  },
  methods: {
    onInput(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>

<style scoped>
.input-style {
  @apply mt-1 shadow-sm block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500;
}
.errors-style {
  @apply flex text-red-100 h-3 font-normal text-lg;
}
</style>
