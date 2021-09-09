<template>
  <div>
    <div class="flex justify-between">
      <div class="text-5xl mb-10 sm:text-6xl">
        {{ $t('general.createBlog.title') }}
      </div>
    </div>
    <update-blog :blog="blog" :loading="loading"></update-blog>
  </div>
</template>

<script>
import { createBlog } from '@/api/blogService.js';
import UpdateBlog from '@/components/UpdateBlog';
import has from 'lodash/has';

export default {
  name: 'CreateBlog',
  components: { UpdateBlog },
  data() {
    return {
      blog: {
        title: '',
        tags: '',
        content: '',
        image: '',
      },
      loading: false,
      previewImage: null,
    };
  },
  methods: {
    showImage(event) {
      this.blog.image = event.target.files[0];
      this.previewImage = URL.createObjectURL(this.blog.image);
    },
    async onSubmit(blog) {
      try {
        this.loading = true;
        let res = await createBlog({ ...blog });
        if (has(res, 'message')) this.notifyErrors(res);
        else {
          this.$router.push(`/`);
          this.$notify({
            title: this.$t('general.notify.succesTitle'),
            message: `${this.$t(
              'createBlog.notify.succesMessage'
            )}<a class="text-indigo-600" href="/blogs/${
              res.data.id
            }" >${this.$t('createBlog.notify.clickHere')}</a>`,
            type: 'success',
            dangerouslyUseHTMLString: true,
          });
        }
      } catch (error) {
        this.notifyErrors(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped></style>
