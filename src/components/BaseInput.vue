<template>
  <div>
    <label class="block text-sm font-medium text-gray-700">
      <slot>{{ label }}</slot>
    </label>
    <validation-provider v-slot="{ errors }" :name="name" :rules="rules">
      <div class="mt-1 relative rounded-md shadow-sm">
        <input
          :value="value"
          :type="type"
          :placeholder="placeholder"
          v-on="listeners"
          class="w-full block sm:text-sm rounded-md"
          :class="
            errors.length
              ? 'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
              : 'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300'
          "
          v-bind="$attrs"
        />
        <div
          v-show="errors.length"
          class="
            absolute
            inset-y-0
            right-0
            pr-3
            flex
            items-center
            pointer-events-none
          "
        >
          <ExclamationCircleIcon
            class="h-5 w-5 text-red-500"
            aria-hidden="true"
          />
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
import { ExclamationCircleIcon } from "@vue-hero-icons/solid";

export default {
  name: "BaseInput",
  components: { ExclamationCircleIcon },
  inheritAttrs: false,
  props: {
    name: String,
    label: String,
    placeholder: String,
    value: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: "text", // text | email | textarea
    },
    rules: [String, Object],
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

