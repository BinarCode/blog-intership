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
                  name="Title"
                  label="Title"
                  rules="required"
                  placeholder="What is Lorem Ipsum?"
                />

                <base-input
                  v-model="blogData.tags"
                  name="Tags"
                  label="Tags"
                  rules="required"
                  placeholder="earthship, biotecture, sustainable"
                />
              </div>
              <div class="sm:w-11/12 sm:ml-auto">
                <label class="text-sm font-medium text-gray-700">
                  Cover Image
                </label>
                <img :src="previewImage" class="rounded" />
                <input
                  class="mt-2"
                  type="file"
                  accept="image/*"
                  @change="uploadImage"
                />
              </div>
            </div>

            <div id="tiptap">
              <label class="text-sm font-medium text-gray-700">
                Content
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
              Publish
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
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
    },
    createTagsArray() {
      let tags = this.blogData.tags.split(',');
      return tags.map((el, index) => {
        let value = el.trim();
        return {
          name: index,
          type: 'text',
          value: value,
        };
      });
    },
    async onSubmit() {
      try {
        this.loading = true;
        let tags = this.createTagsArray();
        let submitData = { ...this.blogData, tags };
        let res = await createBlog(submitData);
        console.log(res);
        if (has(res, 'message')) this.notifyErrors(res);
        else {
          this.$notify({
            title: 'Success',
            message: 'The blog was successfully created.', // need to add translate
            type: 'success',
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped></style>
