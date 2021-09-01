<template>
  <div style="height:fit-content" class="w-5/6 mx-auto max-h-full py-10">
    <div class="flex justify-between">
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
    <div class="sm:mx-auto sm:w-full">
      <div class="p-4 my-10 bg-white shadow rounded-lg  sm:px-10">
        <ValidationObserver v-slot="{ valid }">
          <form @submit.prevent>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              <div class="md:col-span-2">
                <base-input
                  v-model="blog.title"
                  :name="$t('createBlog.name.title')"
                  :label="$t('createBlog.name.title')"
                  rules="required"
                  :placeholder="$t('createBlog.placeholder.title')"
                />

                <base-input
                  v-model="blog.tags"
                  :name="$t('createBlog.name.tags')"
                  :label="$t('createBlog.name.tags')"
                  rules="required"
                  :placeholder="$t('createBlog.placeholder.tags')"
                />
              </div>
              <div class="sm:w-11/12 sm:ml-auto">
                <label class="text-sm font-medium text-gray-700">
                  {{ $t('createBlog.name.coverImage') }}
                </label>
                <img :src="previewImage" class="rounded" />
                <div
                  v-if="!previewImage"
                  class="text-indigo-600 ml-2 font-medium"
                >
                  {{ $t('blog.noImage.text') }}
                </div>
              </div>
            </div>

            <div id="tiptap">
              <label class="text-sm font-medium text-gray-700">
                {{ $t('createBlog.name.content') }}
              </label>
              <tiptap-editor v-if="fetched" v-model="blog.content" />
            </div>
            <base-button
              @click="onSubmit"
              type="submit"
              :disabled="!valid"
              :loading="loading"
              class="w-full mt-3"
            >
              {{ $t('createBlog.button.publish') }}
            </base-button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import TiptapEditor from '@/components/TiptapEditor/TiptapEditor';
import { getBlog, updateBlog, deleteBlog } from '@/api/blogService.js';
import { getTagsArray, tagsArrToString } from '@/utility/tags';
import get from 'lodash/get';
import has from 'lodash/has';

export default {
  name: 'EditBlog',
  components: { TiptapEditor },
  data() {
    return {
      fetched: false,
      loading: false,
      blogId: null,
      blog: {},
      previewImage: '',
    };
  },
  methods: {
    async deleteBlog() {
      try {
        await deleteBlog(this.blogId);
        this.$notify({
          title: this.$t('general.notify.succesTitle'),
          message: this.$t('deleteBlog.notify.succesMessage'),
          type: 'info',
          iconClass: 'el-icon-delete-solid',
        });
        this.$router.push(`/`);
      } catch (error) {
        this.notifyErrors(error);
      }
    },
    async onSubmit() {
      try {
        this.loading = true;
        let res = await updateBlog({
          blogId: this.blogId,
          data: { ...this.blog },
        });
        if (has(res, 'errorArr')) {
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
      data.attributes.tags = tagsArrToString(
        getTagsArray(get(data, 'attributes.tags', ''))
      );
      this.blog = {
        title: get(data, 'attributes.title', ''),
        tags: get(data, 'attributes.tags', []),
        content: get(data, 'attributes.content', ''),
      };
      this.previewImage = get(data, 'attributes.image', false);
    } finally {
      this.fetched = true;
    }
  },
};
</script>
