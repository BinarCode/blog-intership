<template>
  <div class="mt-1">
    <label class="text-sm font-medium text-gray-700 flex justify-between">
      <slot>{{ label }}</slot>
    </label>
    <validation-provider v-slot="{ errors }" :name="name" :rules="rules">
      <div class="relative mt-1 rounded-md shadow-sm">
        <textarea
          :value="value"
          :name="name"
          :placeholder="placeholder"
          v-on="listeners"
          class="block w-full rounded-md sm:text-sm md:h-28"
          :class="
            errors.length
              ? 'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
              : 'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300'
          "
          v-bind="$attrs"
        />
        <div class="absolute inset-y-0 right-0 flex items-baseline p-3">
          <svg
            v-show="errors.length"
            fill="currentColor"
            class="w-5 h-5 text-red-500 bi bi-exclamation-circle"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
            />
          </svg>
        </div>
      </div>
      <div class="h-4">
        <p
          v-for="(error, index) in errors"
          :key="index"
          class="text-sm text-red-600"
        >
          {{ error }}
        </p>
      </div>
    </validation-provider>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  inheritAttrs: false,
  data() {
    return {};
  },
  props: {
    name: String,
    label: String,
    placeholder: String,
    value: {
      type: String,
      default: null,
    },
    rules: [String, Object],
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
      this.$emit('input', event.target.value);
    },
  },
};
</script>
