<template>
  <button
    class="inline-flex items-center font-medium text-white rounded-md shadow-sm"
    :class="{
      'cursor-not-allowed': disabled || loading,
      'px-3 py-2 text-sm': size === 'sm',
      'px-4 py-2 text-base': size === 'md',
      'px-6 py-3 text-base': size === 'lg',

      'bg-indigo-600 bg-opacity-70':
        color === 'primary' && (disabled || loading),
      'text-indigo-600 bg-white border border-indigo-600':
        color === 'primary' && outline,
      'bg-indigo-600 active:bg-indigo-800':
        color === 'primary' && !disabled && !outline,

      'bg-green-600 bg-opacity-70':
        color === 'secondary' && (disabled || loading),
      'text-green-600 bg-white border border-green-600':
        color === 'secondary' && outline,
      'bg-green-600 active:bg-green-800':
        color === 'secondary' && !disabled && !outline,
    }"
    :type="type"
    v-bind="$attrs"
    v-on="$listeners"
    :disabled="disabled || loading"
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
  },
  methods: {
    onClick(event) {
      this.$emit('clicked', event);
    },
  },
};
</script>
