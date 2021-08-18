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
    @apply inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 active:bg-indigo-800 disabled:opacity-50;
  }
  .sm {
    @apply inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 active:bg-indigo-800 disabled:opacity-50;
  }
  .md {
    @apply inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 active:bg-indigo-800 disabled:opacity-50;
  }
  .lg {
    @apply inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 active:bg-indigo-800 disabled:opacity-50;
  }
  .primary {
    @apply bg-indigo-600
  }

</style>