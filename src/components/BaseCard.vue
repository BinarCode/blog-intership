<template>
  <router-link
      :to="getId"
  >
    <div
      class="flex flex-col overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow h-full"
    >
      <div class="flex-shrink-0">
        <img
          class="object-cover w-full h-60 sm:h-48"
          :src="getImage"
          :alt="$t('blog.image.alt')"
        />
      </div>
      <div class="flex flex-col justify-between flex-1 p-6 bg-white">
        <div class="flex-1">
          <p class="text-sm font-medium text-indigo-600">
            <span v-for="(tag, index) in tagList" :key="index" class="inline-flex px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 mb-2 mr-1">
              {{ tag.value }}
            </span>
          </p>
            <p class="text-xl font-semibold hover:underline text-gray-900">
              {{ get(post, 'attributes.title', '') }}
            </p>
        </div>
        <div class="flex items-center justify-between mt-6">
          <div class="flex">
            <div class="flex-shrink-0">
              <img class="w-10 h-10 rounded-full" :src="getAvatar" />
            </div>
            <div class="ml-3">
              <span class="text-sm font-medium text-gray-900">
                  {{
                    get(post, 'relationships.creator.attributes.first_name', '')
                  }}
              </span>
              <span class="flex space-x-1 text-sm text-gray-500">
                {{ $tc('blog.views', post.attributes.views) }}
                <reading-time
                  :text="get(post, 'attributes.content', '')"
                  class="ml-3"
                ></reading-time>
              </span>
            </div>
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
  </router-link>
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
    isCreator() {
      return get(this.post, 'relationships.creator.id', null).toString() === this.userState.id.toString();
    },
    tagList() {
      const tags = get(this.post, 'attributes.tags', []);
      return typeof tags === 'string' ? JSON.parse(tags) : tags;
    },
    getImage() {
      return (
        get(this.post, 'attributes.image', false) ||
        'https://i.stack.imgur.com/y9DpT.jpg'
      );
    },
    getAvatar() {
      return this.post.relationships.creator.attributes.avatar
        ? this.post.relationships.creator.attributes.avatar
        : 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg';
    },

    getId() {
      return `/blogs/${get(this.post, 'id', 'not-found')}`;
    },
    getEditBlogLink() {
      return `/edit-blog/${get(this.post, 'id', 'not-found')}`;
    },
  },

  methods: {
    get,
  },
};
</script>

<style scoped></style>
