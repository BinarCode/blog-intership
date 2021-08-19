<template>
  <button
    class="inline-flex items-center font-medium text-white rounded-md shadow-sm"
    type="button"
    :class="{
      'cursor-not-allowed': disabled,
      'px-3 py-2 text-sm': size === 'sm',
      'px-4 py-2 text-base': size === 'md',
      'px-6 py-3 text-base': size === 'lg',

      'bg-indigo-600 bg-opacity-70': color === 'primary' && disabled,
      'text-indigo-600 bg-white border border-indigo-600':
        color === 'primary' && outline,
      'bg-indigo-600 active:bg-indigo-800':
        color === 'primary' && !disabled && !outline,

      'bg-green-600 bg-opacity-70': color === 'secondary' && disabled,
      'text-green-600 bg-white border border-green-600':
        color === 'secondary' && outline,
      'bg-green-600 active:bg-green-800':
        color === 'secondary' && !disabled && !outline,
    }"
    v-bind="$attrs"
    v-on="$listeners"
    :disabled="disabled"
  >
    <slot>{{ label }}</slot>
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
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        click: this.onClick,
      };
    },
  },
  methods: {
    onClick(event) {
      this.$emit('clicked', event);
    },
  },
};
</script>
