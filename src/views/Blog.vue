<template>
  <div class="container w-full my-20 mr-0 flex justify-center">
    <div
      class="content w-3/4 flex flex-col items-start justify-center"
      style="height:fit-content"
    >
      <div class="title text-5xl mt-10 mb-10 text-center w-full">
        {{ get(blog, 'data.attributes.title', '') }}
      </div>
      <div class="tags flex flex-row items-start cursor-pointer flex-wrap">
        <div
          class="inline-flex items-center px-4 py-2.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-10 mx-2"
          v-for="(tag, index) in get(blog, 'data.attributes.tags', [])"
          :key="index"
        >
          {{ get(tag, 'name', '') }}
        </div>
      </div>
      <div v-html="get(blog, 'data.attributes.content', '')"></div>
    </div>
  </div>
</template>

<script>
import get from 'lodash/get';
import { getBlog } from '@/api/blogService.js';

export default {
  data() {
    return {
      blog: null,
    };
  },
  async mounted() {
    try {
      this.blog = await getBlog(this.$route.params.id);
    } catch (error) {
      this.notifyErrors(error);
    }
  },
  methods: {
    get,
  },
};
</script>

<style scoped></style>
