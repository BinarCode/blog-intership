<template>
  <div class="sm:mx-auto sm:w-full">
    <div class="p-4 bg-white shadow rounded-lg  sm:p-10">
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
                <span v-if="get(blog, 'image.name', false)">
                  &nbsp;({{ blog.image.name }})
                </span>
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
            @click="$parent.onSubmit(blog)"
            type="submit"
            :disabled="!(valid && isContent)"
            :loading="loading"
            class="w-full mt-3"
          >
            {{ $t('createBlog.button.publish') }}
          </base-button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import TiptapEditor from '@/components/TiptapEditor/TiptapEditor';
import get from 'lodash/get';

export default {
  name: 'UpdateBlog',
  components: { TiptapEditor },
  props: ['blog', 'loading'],
  data() {
    return {
      previewImage: this.blog.image,
    };
  },
  computed: {
    isContent() {
      return this.blog.content.length - 7 > 0;
    },
  },
  methods: {
    get,
    showImage(event) {
      this.blog.image = event.target.files[0];
      this.previewImage = URL.createObjectURL(this.blog.image);
    },
  },
};
</script>
