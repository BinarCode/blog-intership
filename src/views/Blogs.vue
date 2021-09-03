<template>
  <div class="w-5/6 mx-auto max-h-full py-10">
    <div class="flex justify-between">
      <div class="text-5xl sm:text-6xl">{{ $t('general.blogs.title') }}</div>
      <router-link to="/create-blog" class="self-end">
        <base-button size="md" outline>
          {{ $t('general.createBlog.title') }}
        </base-button>
      </router-link>
    </div>
    <div
      class="my-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3  print:grid-cols-2"
    >
      <base-card v-for="blog in list" :post="blog" :key="blog.id" />
    </div>
    <p class="w-full text-center">{{ searchTermError }}</p>
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
      searchTermError: 'title',
    };
  },
  methods: {
    async infiniteHandler($state) {
      let data = await getBlogs({
        search: this.searchTerm,
        page: this.page,
        perPage: 9,
        sort: '-id',
        related: 'creator',
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
      let data = await getBlogs({
        search: this.searchTerm,
        page: this.page,
        perPage: 9,
        sort: '-id',
        related: 'creator',
      });
      if (data.length == 0) {
        this.list = [];
        this.searchTermError = `There were 0 search results for "${this.searchTerm}"`;
      } else {
        this.searchTermError = '';
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
