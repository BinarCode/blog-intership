<template>
  <span
    class="inline-flex rounded-full bg-blue-100 text-blue-800"
    :class="{
      'px-3 py-1.5': size === 'sm',
      'px-4 py-2.5': size === 'md'
    }"
  >
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "BaseTag",
  props: {
    size: {
      type: String,
      default: 'md' // | sm
    }
  }
}
</script>

<style scoped>

</style>