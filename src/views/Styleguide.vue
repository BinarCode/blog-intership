<template>
  <div>
    <div>{{ $t('styleguide') }}!</div>
    <p class="font-bold text-red-300">styleguide</p>

    <input-test />
  </div>
</template>

<script>
import InputTest from './InputTest.vue';

export default {
  components: { InputTest },
  name: 'Styleguide',
};
</script>
