<template>
  <button
    class="flex items-center justify-center mt-1 font-medium text-white rounded-md shadow-sm"
    :class="{
      'cursor-not-allowed': isDisabled,
      'px-2 py-1 text-xs': size === 'sm',
      'px-4 py-2 text-base': size === 'md',
      'px-6 py-3 text-base': size === 'lg',

      'bg-indigo-600 bg-opacity-80': color === 'primary' && isDisabled,
      'text-indigo-600 bg-white border border-indigo-600 bg-transparent hover:bg-indigo-600 font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded':
        color === 'primary' && outline,
      'bg-indigo-600': color === 'primary' && !disabled && !outline,

      'bg-red-600 bg-opacity-80': color === 'danger' && isDisabled,
      'text-red-600 bg-white border border-red-600 bg-transparent hover:bg-red-600 font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded':
        color === 'danger' && outline,
      'bg-red-600': color === 'danger' && !disabled && !outline,

      'bg-green-600 bg-opacity-70': color === 'secondary' && isDisabled,
      'text-green-600 bg-white border border-green-600':
        color === 'secondary' && outline,
      'bg-green-600 active:bg-green-800':
        color === 'secondary' && !disabled && !outline,
    }"
    :type="type"
    v-bind="$attrs"
    v-on="$listeners"
    :disabled="isDisabled"
  >
    <i v-if="loading" class="text-lg leading-none el-icon-loading" />
    <div class="mx-2">
      <slot>{{ label }}</slot>
    </div>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    size: {
      type: String,
      default: 'md', //sm|md|lg
    },
    color: {
      type: String,
      default: 'primary', //primary|secondary
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'button',
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        click: this.onClick,
      };
    },
    isDisabled() {
      return this.disabled || this.loading;
    },
  },
  methods: {
    onClick(event) {
      this.$emit('clicked', event);
    },
  },
};
</script>
