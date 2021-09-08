<template>
  <div class="rounded-full">
    <img
      v-if="isAvatar"
      class="rounded-full w-full h-full object-cover object-center"
      :src="getAvatar()"
      :alt="$t('blog.avatar.alt')"
    />
    <div v-if="!isAvatar" class="rounded-full" v-html="getAvatar()"></div>
  </div>
</template>

<script>
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-initials-sprites';

export default {
  name: 'Avatar',
  props: {
    path: Object,
  },
  computed: {
    isAvatar() {
      return this.path.avatar && this.path.avatar.slice(0, 4) !== 'data';
    },
  },
  methods: {
    getAvatar() {
      console.log(this.getFullName(this.path) || 'none');
      if (this.isAvatar) {
        return this.path.avatar.slice(0, 5) !== 'https'
          ? 'https://api-internship.binarcode.com/storage/' + this.path.avatar
          : this.path.avatar;
      }
      let svg = createAvatar(style, {
        seed: this.path.email,
        radius: 50,
      });
      return svg;
    },
  },
};
</script>
