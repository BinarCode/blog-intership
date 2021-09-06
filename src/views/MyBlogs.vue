<template>
  <div class="w-full">
    <div class="flex justify-between">
      <div class="text-5xl sm:text-6xl mb-5">
        {{ $t('general.myBlogs.title') }}
      </div>
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
    <div class="w-full text-center" v-if="noBlogs != ''">{{ noBlogs }}</div>
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard';
import { getMyBlogs } from '@/api/blogService.js';
import get from 'lodash/get';

export default {
  components: { BaseCard },
  name: 'Blogs',
  data() {
    return {
      list: [],
      noBlogs: '',
    };
  },
  async created() {
    let blogs = await getMyBlogs();
    let data = get(blogs, 'data.relationships.blogs', []);
    if (data.length) {
      this.list = data;
    } else {
      this.noBlogs = "You didn't publish anything yet";
    }
  },
  methods: {
    get,
  },
};
</script>
