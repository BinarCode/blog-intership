<template>
  <div class="container w-full mx-auto flex justify-center">
    <div
      class="content w-3/4 flex flex-col items-start justify-center"
      style="height:fit-content"
    >
      <img
        class="object-cover w-full my-5 rounded-lg max-h-80"
        :src="
          get(blog, 'attributes.image', false) ||
            'https://i.stack.imgur.com/y9DpT.jpg'
        "
        :alt="$t('blog.image.alt')"
      />
      <div ref="blog">
        <div class="tags cursor-pointer flex flex-wrap mx-auto space-x-4">
          <div
            class="inline-flex px-4 py-2.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-2"
            v-for="(tag, index) in get(blog, 'attributes.tags', [])"
            :key="index"
          >
            {{ get(tag, 'value', '') }}
          </div>
        </div>
        <div class="title text-5xl my-5 text-center w-full">
          {{ get(blog, 'attributes.title', '') }}
        </div>

        <div class="mb-20" v-html="get(blog, 'attributes.content', '')" />
      </div>

      <base-button @click="getPDF">{{ $t('blog.getAsPDF.text') }}</base-button>
    </div>

    <div class="hidden">
      <div ref="pdfContent" style="width: 768px"></div>
    </div>

    <vue-scroll-progress-bar
      backgroundColor="linear-gradient(to right, #BFDBFE,#4F46E5)"
      height=".3rem"
    />
    <back-to-top />
  </div>
</template>

<script>
import { getTagsArray } from '@/utility/tags';
import get from 'lodash/get';
import { getBlog, addViewOnBlog } from '@/api/blogService';
import BackToTop from '@/components/BackToTop';
import { VueScrollProgressBar } from '@guillaumebriday/vue-scroll-progress-bar';
import jsPDF from 'jspdf';

export default {
  name: 'Blog',
  components: { VueScrollProgressBar, BackToTop },
  data() {
    return {
      blogId: this.$route.params.blogId,
      blog: null,
    };
  },
  async mounted() {
    try {
      let data = await getBlog(this.blogId);
      data.attributes.tags = getTagsArray(get(data, 'attributes.tags', ''));
      await addViewOnBlog(this.blogId);
      this.blog = data;

    } catch (error) {
      this.notifyErrors(error);
    }
  },
  methods: {
    get,
    jsPDF,
    async getPDF() {
      this.$refs.pdfContent.innerHTML = this.$refs.blog.innerHTML;
      const page = this.$refs.pdfContent;
      const filename = get(this.blog, 'attributes.title', 'blog');

      var doc = new jsPDF({
        orientation: "p",
        format: "a4",
        unit: "px"
      });

      await doc.html(page, {
        html2canvas: {
          scale: 0.54
        },
        callback: function (doc) {
          doc.save(`${filename}.pdf`);
        },
        x: 15,
        y: 20
      });

      this.$refs.pdfContent.innerHTML = "";
    }
  },
};
</script>

<style scoped></style>
