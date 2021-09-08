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
      return this.text
        ? Math.ceil(this.text.split(/\s/g).length / this.WORDS_PER_MINUTE)
        : 1;
    },
  },
};
</script>

<style lang="scss" scoped></style>
