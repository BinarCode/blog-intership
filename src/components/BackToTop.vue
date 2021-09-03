<template>
  <div
    class="fixed right-1 bottom-1 sm:right-5 sm:bottom-5 cursor-pointer"
    v-show="scrollY > 300"
    @click="toTop"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4F46E5"
      stroke-width="1"
      stroke-linecap="square"
      stroke-linejoin="arcs"
    >
      <path d="M18 15l-6-6-6 6" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'BackToTop',
  data() {
    return {
      scrollY: 0,
    };
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY;
    });
  },
  methods: {
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
};
</script>
