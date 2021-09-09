<template>
  <div v-if="fetched">
    <div class="flex mb-10 justify-between">
      <div class="text-5xl sm:text-6xl">
        {{ $t('editBlog.page.title') }}
      </div>
      <base-button
        size="md"
        color="danger"
        class="self-end"
        @click="deleteBlog"
        outline
      >
        {{ $t('general.button.deleteBlog') }}
      </base-button>
    </div>
    <update-blog :loading="loading" :blog="blog"></update-blog>
  </div>
</template>

<script>
import { getBlog, updateBlog, deleteBlog } from '@/api/blogService.js';
import { getTagsArray, tagsArrToString } from '@/utility/tags';
import get from 'lodash/get';
import has from 'lodash/has';
import UpdateBlog from '@/components/UpdateBlog';

export default {
  name: 'EditBlog',
  components: { UpdateBlog },
  data() {
    return {
      fetched: false,
      loading: false,
      blogId: null,
      blog: {},
    };
  },
  methods: {
    async deleteBlog() {
      try {
        let res = await deleteBlog(this.blogId);
        if (has(res, 'message')) {
          this.notifyErrors(res);
        } else {
          this.$notify({
            title: this.$t('general.notify.succesTitle'),
            message: this.$t('deleteBlog.notify.succesMessage'),
            type: 'info',
            iconClass: 'el-icon-delete-solid',
          });
          this.$router.push(`/`);
        }
      } catch (error) {
        this.notifyErrors(error);
      }
    },
    async onSubmit(blog) {
      try {
        this.loading = true;
        let res = await updateBlog({
          blogId: this.blogId,
          data: { ...blog },
        });
        if (has(res, 'message')) {
          this.notifyErrors(res);
        } else {
          this.$router.push(`/blogs/${res.data.id}`);
          this.$notify({
            title: this.$t('general.notify.succesTitle'),
            message: this.$t('editBlog.notify.succesMessage'),
            type: 'success',
          });
        }
      } catch (error) {
        this.notifyErrors(error);
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted() {
    this.blogId = get(this.$route, 'params.blogId', '');
    try {
      let data = await getBlog(this.blogId);
      if (
        this.userState.id.toString() !== get(data, 'relationships.creator.id')
      ) {
        throw new Error(this.$t('editBlog.notify.unauthorizedEditError'));
      }
      data.attributes.tags = tagsArrToString(
        getTagsArray(get(data, 'attributes.tags', ''))
      );
      this.blog = {
        title: get(data, 'attributes.title', ''),
        tags: get(data, 'attributes.tags', []),
        content: get(data, 'attributes.content', ''),
        image: get(data, 'attributes.image', false),
      };
      this.fetched = true;
    } catch (error) {
      this.$router.push(`/`);
      this.notifyErrors(error);
    }
  },
};
</script>
