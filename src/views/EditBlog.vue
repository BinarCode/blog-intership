<template>
  <div class="w-5/6 mx-auto max-h-full py-10">
    <div class="sm:mx-auto sm:w-full">
      <div class="px-4 py-8 bg-white shadow rounded-lg  sm:px-10">
        <ValidationObserver v-slot="{ valid }">
          <form @submit.prevent>
            <div class="grid grid-cols-1 sm:grid-cols-2">
              <base-input
                v-model="blogData.title"
                :name="$t('createBlog.name.title')"
                :label="$t('createBlog.name.title')"
                rules="required"
                placeholder="What is Lorem Ipsum?"
                class="sm:mr-3"
              />

              <base-input
                v-model="blogData.tags"
                :name="$t('createBlog.name.tags')"
                :label="$t('createBlog.name.tags')"
                rules="required"
                placeholder="earthship, biotecture, sustainable"
                class="sm:ml-3"
              />
            </div>

            <div id="tiptap">
              <label class="text-sm font-medium text-gray-700">
                {{ $t('createBlog.name.content') }}
              </label>
              <tiptap-editor
                classes="h-40 overflow-y-auto"
                v-if="fetched"
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
import { getEditBlog, updateBlog } from '@/api/blogService.js';
import get from 'lodash/get';
import has from 'lodash/has';

export default {
  name: 'EditBlog',
  components: { TiptapEditor },
  data() {
    return {
      fetched: false,
      loading: false,
      blogData: {},
    };
  },
  methods: {
    createTagsArray() {
      let tags = this.blogData.tags.split(',');
      tags = tags.map((el, index) => {
        let tagValue = el.trim();
        return {
          name: index,
          type: 'text',
          value: tagValue,
        };
      });
      return JSON.stringify(tags);
    },
    async onSubmit() {
      try {
        this.loading = true;
        let tags = this.createTagsArray();
        let submitData = { ...this.blogData, tags };
        let res = await updateBlog({ blogId: this.blogId, data: submitData });
        if (has(res, 'message')) {
          this.notifyErrors(res);
        } else {
          this.$notify({
            title: this.$t('general.notify.succesTitle'),
            message: this.$t('editBlog.notify.succesMessage'),
            type: 'success',
          });
        }
        await this.getBlogData(this.blogId);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async getBlogData(blogId) {
      this.blogData = await getEditBlog(blogId);
    },
  },
  async mounted() {
    this.blogId = get(this.$route, 'params.blogId', '');
    try {
      await this.getBlogData(this.blogId);
    } finally {
      this.fetched = true;
    }
  },
};
</script>
