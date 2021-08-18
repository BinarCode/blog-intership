<template>
 <button type="button" :class="size" :style="{'background-color':backgroundColor}" >Trimite
     <slot/>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    size: {
        type: String,
        default: 'base-button'
     },
     backgroundColor: {
       type: String,
     }
    }
  }
</script>

<style >
@baseButton component {
  .base-button {
    @apply inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 active:bg-indigo-800 disabled:opacity-50;
  }
  .small-button {
    @apply inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 active:bg-indigo-800 disabled:opacity-50;
  }
}
</style>