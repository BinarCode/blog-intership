<template>
  <div class="container w-full my-20 mr-0 flex justify-center">
    <div
      class="content w-3/4 flex flex-col items-start justify-center h-content"
    >
      <div class="title text-5xl mt-10 mb-10 text-center w-full">
        {{ get(blog, "data.attributes.title", "") }}
      </div>
      <div class="tags flex flex-row items-start cursor-pointer flex-wrap">
        <div
          class="inline-flex items-center px-4 py-2.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-10 mx-2"
          v-for="(tag, index) in blog.data.attributes.tags"
          :key="index"
        >
          {{ get(tag, "name", "") }}
        </div>
      </div>
      <div
        v-html="blog.data.attributes.content"
        class="description text-2xl tracking-normal mb-5"
      ></div>
    </div>
  </div>
</template>

<script>
import authService from "@/api/authService";
import blogService from "@/api/blogService";
import get from "lodash/get";

export default {
  data() {
    return {
      blog: "",
    };
  },
  async mounted() {
    this.token = authService.getToken();

    try {
      this.blog = await blogService.getBlog(this.$route.params.id, this.token);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    get,
  },
};
</script>

<style></style>
