<template>
  <div class="flex justify-center">
    <div class="content flex flex-col items-start justify-center">
      <img
        class="object-cover w-full my-5 rounded-lg max-h-80"
        :src="
          get(blog, 'attributes.image', false) ||
            'https://i.stack.imgur.com/y9DpT.jpg'
        "
        :alt="$t('blog.image.alt')"
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

      <div v-html="get(blog, 'attributes.content', '')" />
      <div class="mt-7 w-full text-sm text-right font-medium text-gray-600">
        <a href="#" class="text-indigo-500">
          {{
            `@${get(
              blog,
              'relationships.creator.attributes.first_name',
              'Unknown'
            )} ${get(blog, 'relationships.creator.attributes.last_name')}`
          }}
        </a>
        <span>{{ $t('blogPage.postedOn.text') }} {{ getDate() }}</span>
      </div>
    </div>
    <vue-scroll-progress-bar
      backgroundColor="linear-gradient(to right, #BFDBFE,#4F46E5)"
      height=".3rem"
    />
    <back-to-top />
  </div>
</template>

<script>
import { getTagsArray } from '@/utility/tags';
import get from 'lodash/get';
import { getBlog, addViewOnBlog } from '@/api/blogService';
import BackToTop from '@/components/BackToTop';
import { VueScrollProgressBar } from '@guillaumebriday/vue-scroll-progress-bar';

export default {
  name: 'Blog',
  components: { VueScrollProgressBar, BackToTop },
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
    getDate() {
      let date = new Date(get(this.blog, 'attributes.created_at'));
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      return date.toLocaleDateString(this.$t('locales'), options);
    },
  },
};
</script>

<style scoped></style>
