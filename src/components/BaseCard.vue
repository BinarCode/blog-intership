<template>
  <div class="flex flex-col overflow-hidden rounded-lg shadow-md">
    <div class="flex-shrink-0">
      <img
        class="object-cover w-full h-48"
        :src="
          get(post, 'attributes.image', false) ||
            'https://i.stack.imgur.com/y9DpT.jpg'
        "
      />
    </div>
    <div class="flex flex-col justify-between flex-1 p-6 bg-white">
      <div class="flex-1">
        <p class="text-sm font-medium text-indigo-600">
          <span v-for="(tag, index) in tagList" :key="index" class="mr-2 ">
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
          <div class="flex-shrink-0">
            <img class="w-10 h-10 rounded-full" :src="getAvatar" alt="Avatar" />
          </div>
          <div class="ml-3">
            <span class="text-sm font-medium text-gray-900">
              <a href="#" class="hover:underline">
                {{
                  get(post, 'relationships.creator.attributes.first_name', '')
                }}
              </a>
            </span>
            <span class="flex space-x-1 text-sm text-gray-500">
              {{ post.attributes.views || '0' }}
              {{ $t('general.views.text') }}
              <!-- &middot; {{ $t('minutes_read') }}-->
            </span>
          </div>
        </div>
        <router-link
          v-if="+get(post, 'relationships.creator.id', null) === +userState.id"
          :to="getEditBlogLink"
        >
          <base-button size="sm" class="self-center" outline>
            {{ $t('general.editBlog.title') }}
          </base-button>
        </router-link>
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
      const tags = get(this.post, 'attributes.tags', []);
      return typeof tags === 'string' ? JSON.parse(tags) : tags;
    },
    getAvatar() {
      if (!this.userState.avatar)
        return 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg';
      return (
        'https://api-internship.binarcode.com/storage/' + this.userState.avatar
      );
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

<style scoped>
#content {
  overflow: hidden;
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
}
</style>
