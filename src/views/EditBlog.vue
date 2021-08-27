<template></template>

<script>
export default {
  name: 'EditBlog',
  data() {
    return {
      model: {
        title: '',
        author: '',
        publishDate: '',
        categories: '',
        tags: '',
        summary: '',
        image: '',
        imageAlt: '',
        content: '',
      },
    };
  },
};
</script>

<style scoped></style>
