<template>
  <div id="app" class="w-full">
    <div id="nav" class="flex justify-around w-full fixed top-0 left-0 z-50">
      <base-navbar/>
    </div>
    <router-view class="page-content" />
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
  height: calc(100vh - 64px);
  margin-top: 64px;
}
</style>
