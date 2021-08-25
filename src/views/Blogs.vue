<template>
  <div class="max-h-full py-5">
    <div class="w-5/6 mx-auto grid gap-5 lg:grid-cols-3  print:grid-cols-2">
      <base-card v-for="blog in list" :post="blog" :key="blog.id" />
    </div>

    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard';
import axios from 'axios';
import InfiniteLoading from 'vue-infinite-loading';

export default {
  components: { BaseCard, InfiniteLoading },
  name: 'Blogs',
  data() {
    return {
      page: 1,
      list: [],
      perPage: 9,
      token: localStorage.getItem('token'),
    };
  },
  methods: {
    infiniteHandler($state) {
      axios
        .get('/api/restify/blogs', {
          headers: {
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/json',
          },
          params: {
            page: this.page,
            perPage: this.perPage,
            sort: '-views',
          },
        })
        .then(({ data }) => {
          if (data.length) {
            this.page += 1;
            this.list.push(...data);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
  },
};
</script>
