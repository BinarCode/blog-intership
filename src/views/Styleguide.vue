<template>
  <div>
    <div>{{ $t('styleguide') }}!</div>
    <p class="font-bold text-red-300">styleguide</p>

    <input-comp />
  </div>
</template>

<script>
import InputComp from '@/views/InputComp.vue';

export default {
  components: { InputComp },
  name: 'Styleguide',
};
</script>
