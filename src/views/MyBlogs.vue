<template>
  <div>
    <div class="flex justify-between">
      <div class="text-5xl sm:text-6xl">
        {{ $t('general.myBlogs.title') }}
      </div>
      <router-link to="/create-blog" class="self-end">
        <base-button size="md" outline>
          {{ $t('general.createBlog.title') }}
        </base-button>
      </router-link>
    </div>
    <div
      v-if="list.length > 0"
      class="mt-10 mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3  print:grid-cols-2"
    >
      <base-card v-for="blog in list" :post="blog" :key="blog.id" />
    </div>
    <div v-else class="w-full text-center">
      {{ $t('general.noBlogAdded') }}
    </div>
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
      list: ['placeholder'],
    };
  },
  async created() {
    let blogs = await getMyBlogs();
    this.list = get(blogs, 'data.relationships.blogs', []);
  },
  methods: {
    get,
  },
};
</script>
