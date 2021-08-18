<template>
 <button type="button" :class="[size, backgroundColor]" >Trimite
     <slot/>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    size: {
        type: String,
        default: 'button'
     },
     backgroundColor: {
       type: String,
       default: 'primary'
     }
    }
  }
</script>

<style >

  .button {
    @apply inline-flex items-center border border-transparent font-medium rounded-md shadow-sm text-white bg-indigo-600 active:bg-indigo-800 disabled:opacity-50
  }
  .sm {
    @apply  px-3 py-2 text-sm;
  }
  .md {
    @apply  px-4 py-2  text-base;
  }
  .lg {
    @apply  px-6 py-3  text-base;
  }
  .primary {
    @apply bg-indigo-600
  }

</style>