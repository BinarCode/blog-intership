<template>
  <button
    class="border-2 rounded-sm bg-gray-50 hover:bg-gray-100 px-3 py-2"
    :class="{ 'bg-gray-200': isActive ? isActive() : null }"
    @click="action"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'TiptapMenuItem',
  props: {
    action: {
      type: Function,
      required: true,
    },
    isActive: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped></style>
