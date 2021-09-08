<template>
  <img class="rounded-full object-cover" :src="getAvatar(path)" :alt="$t('profile.avatar.alt')" />
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    path: Object,
  },
  methods: {
    getAvatar(path) {
      return path.avatar || '/no-avatar.jpg';
    },
  },
};
</script>
