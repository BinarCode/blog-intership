<template>
  <div>
    <div class="content flex flex-col items-start justify-center">
      <div class="p-8 bg-white shadow rounded-lg sm:p-12 lg:px-20">
        <img
          class="object-cover mx-auto my-5 rounded-lg max-h-80"
          :src="
            get(blog, 'attributes.image', false) ||
              'https://i.stack.imgur.com/y9DpT.jpg'
          "
          :alt="$t('blog.image.alt')"
        />
        <div class="tags flex justify-center flex-wrap mx-auto space-x-4">
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

        <div class="text-sm" v-html="get(blog, 'attributes.content', '')" />
        <div class="mt-7 w-full text-sm text-right font-medium text-gray-600">
          <span class="text-indigo-500">
            {{ getFullName(get(blog, 'relationships.creator.attributes')) }}
          </span>
          <span>{{ $t('blogPage.postedOn.text') }} {{ getDate() }}</span>
        </div>
      </div>
      <div class="p-8 bg-white shadow rounded-lg sm:p-12 lg:px-20 mt-10">
        <add-comment :blogId="blogId" class="mb-8"></add-comment>
        <comments :comments="comments"></comments>
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
import { getBlogComments } from '@/api/commentsService';
import BackToTop from '@/components/BackToTop';
import Comments from '@/components/Comments';
import AddComment from '@/components/AddComment';
import { VueScrollProgressBar } from '@guillaumebriday/vue-scroll-progress-bar';

export default {
  name: 'Blog',
  components: { VueScrollProgressBar, BackToTop, Comments, AddComment },
  data() {
    return {
      blogId: this.$route.params.blogId,
      blog: null,
      comments: null,
    };
  },
  async mounted() {
    this.parseBlogData();
    this.getComments();
    await addViewOnBlog(this.blogId);
  },
  methods: {
    get,
    async getComments() {
      this.comments = await getBlogComments(this.blogId);
      this.comments = this.comments.sort((a, b) => b.id - a.id);
    },
    async parseBlogData() {
      try {
        this.blog = await getBlog(this.blogId);
        this.blog.attributes.tags = getTagsArray(
          get(this.blog, 'attributes.tags', '')
        );
      } catch (error) {
        this.notifyErrors(error);
      }
    },
    getFullName(user) {
      return `@${this.get(user, 'first_name', 'Unknown')} ${this.get(
        user,
        'last_name',
        ''
      )}`;
    },
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
  watch: {
    async $route() {
      this.parseBlogData();
    },
  },
};
</script>

<style scoped></style>
