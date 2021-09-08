<template>
  <div
    class="flex flex-col overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
  >
    <div class="flex-shrink-0">
      <img
        class="object-cover w-full h-60"
        :src="getCover"
        :alt="$t('blog.image.alt')"
      />
    </div>
    <div class="flex flex-col justify-between flex-1 p-6 bg-white">
      <div class="flex-1">
        <p class="tags cursor-pointer flex flex-wrap mx-auto">
          <span
            v-for="(tag, index) in tagList"
            :key="index"
            class="inline-flex px-4 py-2.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-2 mr-2"
          >
            {{ tag.value }}
          </span>
        </p>
        <router-link :to="getId" class="block mt-2">
          <p class="text-xl font-semibold hover:underline text-gray-900">
            {{ get(post, 'attributes.title', '') }}
          </p>
        </router-link>
      </div>
      <div class="flex items-center justify-between mt-6">
        <div class="flex">
          <avatar
            class="w-10 h-10"
            :path="get(post, 'relationships.creator.attributes')"
          />
          <div class="ml-3">
            <span class="text-sm font-medium text-gray-900">
              <div class="hover:underline">
                {{ getFullName(get(post, 'relationships.creator.attributes')) }}
              </div>
            </span>
            <span class="flex space-x-1 text-sm text-gray-500">
              {{ post.attributes.views || '0' }}
              {{ $t('general.views.text') }}
              <reading-time
                :text="get(post, 'attributes.content', '')"
                class="ml-3"
              ></reading-time>
            </span>
          </div>
        </div>
        <router-link
          v-if="+get(post, 'relationships.creator.id', null) === +userState.id"
          :to="getEditBlogLink"
        >
          <base-button size="sm" outline>
            {{ $t('general.editBlog.title') }}
          </base-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import get from 'lodash/get';
import ReadingTime from '@/components/ReadingTime.vue';

export default {
  name: 'BaseCard',
  components: { ReadingTime },
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    tagList() {
      const tags = get(this.post, 'attributes.tags', []);
      return typeof tags === 'string' ? JSON.parse(tags) : tags;
    },
    getCover() {
      return get(this.post, 'attributes.image', false) || '/no-blog-cover.jpg';
    },
    getId() {
      return `/blogs/${get(this.post, 'id', 'not-found')}`;
    },
    getEditBlogLink() {
      return `/edit-blog/${get(this.post, 'id', 'not-found')}`;
    },
  },
};
</script>

<style scoped></style>
