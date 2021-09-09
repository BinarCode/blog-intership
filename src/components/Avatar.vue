<template>
  <div>
    <img
      v-if="isAvatar"
      class="w-full h-full rounded-full object-cover object-center"
      :src="getAvatar()"
      :alt="$t('blog.avatar.alt')"
    />
    <div v-if="!isAvatar" v-html="getAvatar()"></div>
  </div>
</template>

<script>
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-initials-sprites';
import config from '@/api/config';

export default {
  name: 'Avatar',
  props: {
    path: Object,
  },
  computed: {
    isAvatar() {
      return this.path.avatar && this.first4Charachters !== 'data';
    },
    first4Charachters() {
      return this.path.avatar.slice(0, 4);
    },
  },
  methods: {
    getAvatar() {
      if (this.isAvatar) {
        return this.first4Charachters !== 'http'
          ? `${config.API_HOST}/storage/${this.path.avatar}`
          : this.path.avatar;
      }
      let svg = createAvatar(style, {
        seed: this.getFullName(this.path),
        radius: 50,
      });
      return svg;
    },
  },
};
</script>
