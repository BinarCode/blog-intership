<template>
  <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
    <div class="flex-shrink-0">
      <img class="h-48 w-full object-cover" :src="src">
    </div>
    <div class="flex-1 bg-white p-6 flex flex-col justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-indigo-600">
          <a
              v-for="tag in tags"
              :key="tag"
              class="hover:underline mr-2">{{ tag }}</a>
        </p>
        <a :href="link" class="block mt-2">
          <p class="text-xl font-semibold text-gray-900">
            {{ title }}
          </p>
          <p class="mt-3 text-base text-gray-500">
            {{ content }}
          </p>
        </a>
      </div>
      <div class="mt-6 flex items-center">
        <div class="flex-shrink-0">
          <a href="#">
            <span class="sr-only">{{ author }}</span>
            <img class="h-10 w-10 rounded-full" :src="avatar">
          </a>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">
            <a href="#" class="hover:underline">
              {{ author }}
            </a>
          </p>
          <div class="flex space-x-1 text-sm text-gray-500">
              <span>
                  {{ views }} {{ $t('views') }}
                </span>
            <span aria-hidden="true">
                  &middot;
                </span>
            <span>
                  x {{ $t('minutes') }} {{ $t('read') }}
                </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    src: {
      type: String,
      default: 'https://i.stack.imgur.com/y9DpT.jpg'
    },
    link: {
      type: String,
      default: '#'
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    tags: {
      type: String,
      default: () => ['']
    },
    views: {
      type: Number,
      default: 0
    },
    author: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg'
    }
  }
}
</script>

<style scoped>

</style>