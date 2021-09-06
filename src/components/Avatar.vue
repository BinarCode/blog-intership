<template>
  <img class="rounded-full" :src="getAvatar(path)" alt="Avatar" />
</template>

<script>
export default {
  name: 'Avatar',
  props: ['path'],
  methods: {
    getAvatar(path) {
      return path.avatar || '/no-avatar.jpg';
    },
  },
};
</script>
