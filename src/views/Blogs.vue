<template>
  <div class="max-h-full py-10">
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
import eventBus from '@/api/eventBus.js';
export default {
  components: { BaseCard, InfiniteLoading },
  name: 'Blogs',
  data() {
    return {
      list: [],
      page: 1,
      searchTerm: '',
    };
  },
  methods: {
    async infiniteHandler($state) {
      let data = await getBlogs(this.searchTerm, {
        page: this.page,
        perPage: 9,
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
  watch: {
    searchTerm: async function() {
      this.page = 1;
      let data = await getBlogs(this.searchTerm, {
        page: this.page,
        perPage: 9,
        sort: '-views',
      });
      if (data.length) {
        this.page += 1;
        this.list = data;
      }
    },
  },
  created() {
    eventBus.$on('update:searchTerm', (searchTerm) => {
      this.searchTerm = searchTerm;
    });
  },
};
</script>
