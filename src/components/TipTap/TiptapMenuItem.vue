<template>
  <button class="border rounded-sm bg-gray-200 p-5">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "TiptapMenuItem",
  props: {
    label: {
      type: String,
      default: ''
    },
    action: Function
  }
}
</script>

<style scoped>

</style>