<template>
  <div class="flex flex-col rounded-lg shadow-md overflow-hidden">
    <div class="flex-shrink-0">
      <img class="h-48 w-full object-cover" :src="post.attributes.src || 'https://i.stack.imgur.com/y9DpT.jpg'">
    </div>
    <div class="flex-1 bg-white p-6 flex flex-col justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-indigo-600">
          <span
              v-for="(tag, index) in post.attributes.tags || []"
              :key="index"
              class="hover:underline mr-2">{{ tag.name }}</span>
        </p>
        <router-link :to="'blogs/' + post.attributes.slug" class="block mt-2">
          <p class="text-xl font-semibold text-gray-900">
            {{ post.attributes.title }}
          </p>
          <p class="mt-3 text-base text-gray-500">
            {{ post.attributes.content }}
          </p>
        </router-link>
      </div>
      <div class="mt-6 flex items-center">
        <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" :src="post.relationships.creator.avatar || 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg'" alt="Avatar">
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">
            <a href="#" class="hover:underline">
              {{ post.relationships.creator.attributes.first_name }}
            </a>
          </p>
          <span class="flex space-x-1 text-sm text-gray-500">
            {{ $tc('views', post.attributes.views) }}<!-- &middot; {{ $t('minutes_read') }}-->
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    post: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped>

</style>