<template>
  <router-link :to="getId">
    <div
      class="flex flex-col overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow h-full"
    >
      <div class="flex-shrink-0">
        <img class="object-cover w-full h-60" :src="getCover" />
      </div>
      <div class="flex flex-col justify-between h-full p-5 bg-white">
        <div class="flex flex-col justify-between h-full">
          <div class="flex flex-wrap">
            <base-tag
              v-for="(tag, index) in tagList"
              :key="index"
              size="sm"
              class="mb-1 mr-1"
            >
              {{ tag.value }}
            </base-tag>
          </div>
          <div
            class="text-xl font-medium hover:underline text-gray-900 mt-4 mb-5"
          >
            {{ get(post, 'attributes.title', '') }}
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex">
            <avatar class="w-10 h-10" :path="getPath" />
            <div class="ml-3">
              <div class="text-sm font-medium text-gray-900">
                {{ getFullName(getPath) }}
              </div>
              <div
                class="flex flex-col xl:flex-row xl:space-x-3 text-sm text-gray-500"
              >
                <div>
                  {{
                    $tc(
                      'blog.views',
                      get(post, 'attributes.views', false) || get(post, 'views')
                    )
                  }}
                </div>
                <reading-time
                  :text="get(post, 'attributes.content', '')"
                ></reading-time>
              </div>
            </div>
          </div>
          <router-link v-if="goToEdit" :to="getEditBlogLink">
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
import BaseTag from '@/components/BaseTag';

export default {
  name: 'BaseCard',
  components: { ReadingTime, BaseTag },
  props: {
    post: {
      type: [Object, String],
      default: () => {},
    },
  },
  computed: {
    isCreator() {
      return (
        get(this.post, 'relationships.creator.id', null).toString() ===
        this.userState.id.toString()
      );
    },
    tagList() {
      const tags = get(this.post, 'attributes.tags', []);
      return typeof tags === 'string' ? JSON.parse(tags) : tags;
    },
    getAvatar() {
      return get(
        this.post,
        'relationships.creator.attributes.avatar',
        'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg'
      );
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
    goToEdit() {
      const userId = get(this.post, 'relationships.creator.id', null);
      return userId == this.userState.id || this.$route.path == '/myblogs';
    },
    getPath() {
      return (
        this.get(this.post, 'relationships.creator.attributes', false) ||
        this.userState
      );
    },
  },
  methods: { get },
};
</script>

<style scoped></style>
