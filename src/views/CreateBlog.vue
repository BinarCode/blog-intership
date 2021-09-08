<template>
  <div>
    <div class="flex justify-between">
      <div class="text-5xl mb-10 sm:text-6xl">
        {{ $t('general.createBlog.title') }}
      </div>
    </div>
    <div class="sm:mx-auto sm:w-full">
      <div class="p-4 bg-white shadow rounded-lg  sm:px-10">
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
                <input
                  id="uploadImg"
                  hidden
                  type="file"
                  accept="image/*"
                  @change="showImage($event)"
                />
                <label
                  class=" cursor-pointer flex items-center justify-center mt-2 font-medium text-white rounded-md shadow-sm w-full px-4 py-2 text-sm bg-indigo-600"
                  for="uploadImg"
                >
                  {{ $t('general.button.chooseFile') }}
                  <span v-if="blog.image">&nbsp;({{ blog.image.name }})</span>
                </label>
              </div>
            </div>

            <div id="tiptap">
              <label class="text-sm font-medium text-gray-700">
                {{ $t('createBlog.name.content') }}
              </label>
              <tiptap-editor v-model="blog.content" />
            </div>

            <base-button
              @click="onSubmit"
              type="submit"
              :disabled="!valid"
              :loading="loading"
              class="mt-3"
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
import { createBlog } from '@/api/blogService.js';
import has from 'lodash/has';

export default {
  name: 'CreateBlog',
  components: { TiptapEditor },
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
    async onSubmit() {
      try {
        this.loading = true;
        let res = await createBlog({ ...this.blog });
        if (has(res, 'errorArr')) this.notifyErrors(res);
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
