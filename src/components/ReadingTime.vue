<template>
  <span class="reading-time">{{ time }} {{ $tc('reading-time', time) }}</span>
</template>

<script>
export default {
  name: 'ReadingTime',
  data() {
    return {
      WORDS_PER_MINUTE: 250,
    };
  },
  props: {
    text: {
      default: '',
      type: String,
    },
  },
  computed: {
    time() {
      const words = this.text.split(/\s/g).length;
      return Math.ceil(words / this.WORDS_PER_MINUTE);
    },
  },
};
</script>

<style lang="scss" scoped></style>
