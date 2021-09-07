<template>
  <div id="app" class="w-full bg-gray-100">
    <div class="flex justify-around w-full fixed top-0 left-0 z-50">
      <base-navbar />
    </div>
    <div class="w-11/12 md:w-3/4 mx-auto page-content max-h-full py-10">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
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
  metaInfo() {
    return {
      title: 'Vue - Blog internship project',
      meta: [
        {
          name: 'description',
          content:
            'This blog project was created by Lesan Alexandru, Alexandru Stefan and Lucian Popp',
        },
        {
          property: 'og:title',
          content: 'Vue - Blog internship project',
        },
        { property: 'og:site_name', content: 'Vue' },
        { property: 'og:type', content: 'website' },
        { name: 'robots', content: 'index,follow' },
      ],
    };
  },
};
</script>

<style scoped>
.page-content {
  min-height: calc(100vh - var(--navbarHeight) - var(--footerHeight));
  position: relative;
  margin-top: 64px;
}
</style>
