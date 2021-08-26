<template>
  <div class="max-h-full py-5">
    <div class="w-5/6 mx-auto grid gap-5 lg:grid-cols-3  print:grid-cols-2">
      <base-card v-for="blog in list" :post="blog" :key="blog.id" />
    </div>

    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import BaseCard from '@/components/BaseCard';
import { getBlogs } from '@/api/blogService.js';

export default {
  components: { BaseCard, InfiniteLoading },
  name: 'Blogs',
  data() {
    return {
      page: 1,
      list: [],
      perPage: 9,
    };
  },
  methods: {
    async infiniteHandler($state) {
      let { data } = await getBlogs({
        page: this.page,
        perPage: this.perPage,
        sort: '-views',
      });

      if (data.length) {
        this.page += 1;
        this.list.push(...data);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
  },
};
</script>
