<template>
  <div>
    <div>{{ $t('general.styleguide.title') }}!</div>
    <p class="font-bold text-red-300">{{ $t('general.styleguide.title') }}</p>

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
