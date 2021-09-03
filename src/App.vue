<template>
  <div id="app" class="w-full bg-gray-100">
    <div class="flex justify-around w-full fixed top-0 left-0 z-50">
      <base-navbar />
    </div>
    <div class="w-11/12 md:w-3/4 mx-auto page-content max-h-full py-10">
      <router-view />
    </div>
    <page-footer></page-footer>
  </div>
</template>

<script>
import BaseNavbar from '@/components/BaseNavbar.vue';

export default {
  name: 'App',
  components: {
    BaseNavbar,
  },
};
</script>

<style scoped>
.page-content {
  min-height: calc(100vh - 64px - 80px);
  position: relative;
  margin-top: 64px;
}
</style>
