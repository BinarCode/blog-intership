<template>
  <div>
    <div>{{ $t('styleguide') }}!</div>
    <p class="text-red-300 font-bold">styleguide</p>

    <input-test />
  </div>
</template>

<script>
import inputTest from './inputTest.vue';

export default {
  components: { inputTest },
  name: 'Styleguide',
};
</script>
