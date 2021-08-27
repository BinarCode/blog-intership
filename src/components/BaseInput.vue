<template>
  <div class="mt-1">
    <label class="text-sm font-medium text-gray-700 flex justify-between">
      <slot>{{ label }}</slot>
      <label
        v-if="type === 'password'"
        @click="switchType"
        class="bg-gray-200 hover:bg-gray-300 rounded px-2 py-1 text-xs text-gray-600 font-mono cursor-pointer"
        for="toggle"
      >
        {{ typePassword === 'password' ? 'show' : 'hide' }}
      </label>
    </label>
    <validation-provider v-slot="{ errors }" :name="name" :rules="rules">
      <div class="relative mt-1 rounded-md shadow-sm">
        <input
          :value="value"
          :type="type === 'password' ? typePassword : type"
          :name="name"
          :placeholder="placeholder"
          v-on="listeners"
          class="block w-full rounded-md sm:text-sm"
          :class="
            errors.length
              ? 'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
              : 'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300'
          "
          v-bind="$attrs"
        />
        <div class="absolute inset-y-0 right-0 flex items-center pr-3">
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
    return {
      typeCopy: this.type,
      typePassword: this.type,
    };
  },

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
      default: 'text', // text | email | textarea
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
    switchType() {
      this.typePassword =
        this.typePassword === 'password' ? 'text' : 'password';
    },

    onInput(event) {
      this.$emit('input', event.target.value);
    },
  },
}
</script>
