<template>
  <div class="flex flex-col overflow-hidden rounded-lg shadow-md">
    <div class="flex-shrink-0">
      <img class="object-cover w-full h-48" :src="getImage" />
    </div>
    <div class="flex flex-col justify-between flex-1 p-6 bg-white">
      <div class="flex-1">
        <p class="text-sm font-medium text-indigo-600">
          <span
            v-for="(tag, index) in tagList"
            :key="index"
            class="mr-2 hover:underline"
          >
            {{ tag.name }}
          </span>
        </p>
        <router-link :to="getSlug" class="block mt-2">
          <p class="text-xl font-semibold text-gray-900">
            {{ get(post, 'attributes.title', '') }}
          </p>
          <p class="mt-3 text-base text-gray-500">
            {{ get(post, 'attributes.content', '') }}
          </p>
        </router-link>
      </div>
      <div class="flex items-center mt-6">
        <div class="flex-shrink-0">
          <img class="w-10 h-10 rounded-full" :src="getAvatar" alt="Avatar" />
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">
            <a href="#" class="hover:underline">
              {{ get(post, 'relationships.creator.attributes.first_name', '') }}
            </a>
          </p>
          <span class="flex space-x-1 text-sm text-gray-500">
            {{ $tc('general.views.text', get(post, 'attributes.views', 0)) }}
            <!-- &middot; {{ $t('minutes_read') }}-->
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import get from 'lodash/get';

export default {
  name: 'BaseCard',
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    tagList() {
      return get(this.post, 'attributes.tags', []);
    },
    getImage() {
      return get(
        this.post,
        'attributes.src',
        'https://i.stack.imgur.com/y9DpT.jpg'
      );
    },
    getAvatar() {
      return get(
        this.post,
        'relationships.creator.avatar',
        'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg'
      );
    },
    getSlug() {
      return `blogs/${get(this.post, 'attributes.slug', 'not-found')}`;
    },
  },
  methods: {
    get,
  },
};
</script>

<style scoped></style>
