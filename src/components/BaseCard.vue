<template>
  <router-link
      :to="getId"
  >
    <div
      class="flex flex-col overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow h-full"
    >
      <div class="flex-shrink-0">
        <img
          class="object-cover w-full h-60"
          :src="getCover"
        />
      </div>
      <div class="flex flex-col justify-between flex-1 p-6 bg-white">
        <div class="flex-1">
          <p>
            <base-tag v-for="(tag, index) in tagList" :key="index" size="sm" class="text-sm mb-2 mr-1">
              {{ tag.value }}
            </base-tag>
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
                {{ $tc('blog.views', post.attributes.views) }}
                <reading-time
                  :text="get(post, 'attributes.content', '')"
                  class="ml-3"
                ></reading-time>
              </span>
            </div>
            <router-link
                v-if="isCreator"
                :to="getEditBlogLink"
            >
              <base-button size="sm" outline>
                {{ $t('general.editBlog.title') }}
              </base-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import get from 'lodash/get';
import ReadingTime from '@/components/ReadingTime.vue';
import BaseTag from '@/components/BaseTag';

export default {
  name: 'BaseCard',
  components: { ReadingTime, BaseTag },
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    isCreator() {
      const creatorId = get(this.post, 'relationships.creator.id', null);

      return creatorId.toString() === this.userState.id.toString();
    },
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
