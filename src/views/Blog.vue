<template>
  <div class="container w-full mx-auto flex justify-center">
    <div
      class="content w-3/4 flex flex-col items-start justify-center"
      style="height:fit-content"
    >
      <img
        class="object-cover w-full my-5 rounded-lg max-h-80"
        :src="
          get(blog, 'attributes.image', false) ||
            'https://i.stack.imgur.com/y9DpT.jpg'
        "
      />
      <div class="tags cursor-pointer flex flex-wrap mx-auto space-x-4">
        <div
          class="inline-flex px-4 py-2.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-2"
          v-for="(tag, index) in get(blog, 'attributes.tags', [])"
          :key="index"
        >
          {{ get(tag, 'value', '') }}
        </div>
      </div>
      <div class="title text-5xl my-5 text-center w-full">
        {{ get(blog, 'attributes.title', '') }}
      </div>

      <div class="mb-20" v-html="get(blog, 'attributes.content', '')" />
    </div>
  </div>
</template>

<script>
import { getTagsArray } from '@/utility/tags';
import get from 'lodash/get';
import { getBlog, addViewOnBlog } from '@/api/blogService';

export default {
  name: 'Blog',
  data() {
    return {
      blogId: this.$route.params.blogId,
      blog: null,
    };
  },
  async mounted() {
    try {
      let data = await getBlog(this.blogId);
      data.attributes.tags = getTagsArray(get(data, 'attributes.tags', ''));
      await addViewOnBlog(this.blogId);
      this.blog = data;
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
