<template>
  <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
    <div class="flex-shrink-0">
      <img class="h-48 w-full object-cover" :src="img.href" alt="Blog post photo">
    </div>
    <div class="flex-1 bg-white p-6 flex flex-col justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-indigo-600">
          <a
              v-for="tag in post.tags"
              :key="tag"
              class="hover:underline mr-2">{{ tag }}</a>
        </p>
        <a :href="post.link" class="block mt-2">
          <p class="text-xl font-semibold text-gray-900">
            {{ post.title }}
          </p>
          <p class="mt-3 text-base text-gray-500">
            {{ post.content }}
          </p>
        </a>
      </div>
      <div class="mt-6 flex items-center">
        <div class="flex-shrink-0">
          <a href="#">
            <span class="sr-only">{{ author.name }}</span>
            <img class="h-10 w-10 rounded-full" :src="author.avatar" alt="Author avatar">
          </a>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">
            <a href="#" class="hover:underline">
              {{ author.name }}
            </a>
          </p>
          <div class="flex space-x-1 text-sm text-gray-500">
            <span>
                {{ post.views }} views
              </span>
            <span aria-hidden="true">
                &middot;
              </span>
            <span>
                x min read
              </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseCard",
  props: {
    img: {
      href: String
    },
    post: {
      link: String,
      title: String,
      content: String,
      tags: Array,
      views: Number
    },
    author: {
      name: String,
      avatar: String
    }
  }
}
</script>

<style scoped>

</style>