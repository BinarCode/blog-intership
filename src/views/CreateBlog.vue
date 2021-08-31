<template>
  <div class="w-5/6 mx-auto max-h-full py-10">
    <div class="sm:mx-auto sm:w-full">
      <div class="px-4 py-8 bg-white shadow rounded-lg  sm:px-10">
        <ValidationObserver v-slot="{ valid }">
          <form @submit.prevent>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              <div class="md:col-span-2">
                <base-input
                  v-model="blogData.title"
                  :name="$t('createBlog.name.title')"
                  :label="$t('createBlog.name.title')"
                  rules="required"
                  placeholder="What is Lorem Ipsum?"
                />

                <base-input
                  v-model="blogData.tags"
                  :name="$t('createBlog.name.tags')"
                  :label="$t('createBlog.name.tags')"
                  rules="required"
                  placeholder="earthship, biotecture, sustainable"
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
                  <span v-if="blogData.image">({{ blogData.image.name }})</span>
                </label>
              </div>
            </div>

            <div id="tiptap">
              <label class="text-sm font-medium text-gray-700">
                {{ $t('createBlog.name.content') }}
              </label>
              <tiptap-editor
                classes="h-40 overflow-y-auto"
                v-model="blogData.content"
              />
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
import TiptapEditor from '@/components/TiptapEditor';
import { createBlog } from '@/api/blogService.js';
import has from 'lodash/has';

export default {
  name: 'CreateBlog',
  components: { TiptapEditor },
  data() {
    return {
      blogData: {
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
      this.blogData.image = event.target.files[0];
      this.previewImage = URL.createObjectURL(this.blogData.image);
    },
    async onSubmit() {
      try {
        this.loading = true;
        let res = await createBlog({ ...this.blogData });
        if (has(res, 'errorArr')) this.notifyErrors(res);
        else {
          this.$router.push(`/blogs/${res.data.id}`);
          this.$notify({
            title: this.$t('general.notify.succesTitle'),
            message: this.$t('createBlog.notify.succesMessage'),
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
};
</script>

<style scoped></style>
