<template>
  <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8">
    <div id="title" class="col-span-full my-3 font-medium text-indigo-600">
      <i class="el-icon-edit"></i>
      {{ $t('addComment.title') }}
    </div>
    <div id="user-area" class="h-full col-span-1">
      <div class="text-center">
        <avatar :path="userState" />
        <div class="font-medium text-indigo-500">
          @{{ userState.first_name }}
        </div>
      </div>
    </div>
    <div id="comment-area" class=" grid pl-4 col-span-full col-start-2">
      <textarea
        name="comment"
        v-model="userComment"
        class="border-gray-400 text-sm h-28 mb-1"
      ></textarea>
      <base-button
        size="sm"
        class="h-9 my-2 justify-self-end"
        :disabled="!userComment.length"
        :loading="loading"
        @click="addComment"
      >
        {{ $t('addComment.commentBtn.label') }}
      </base-button>
    </div>
  </div>
</template>

<script>
import { createComment } from '@/api/commentsService';

export default {
  name: 'AddComent',
  props: ['blogId'],
  data() {
    return {
      userComment: '',
      loading: false,
    };
  },
  methods: {
    async addComment() {
      try {
        this.loading = true;
        await createComment({
          blog_id: this.blogId,
          body: this.userComment,
        });
        this.userComment = '';
        this.$notify({
          title: this.$t('general.notify.succesTitle'),
          message: this.$t('addComment.notify.succesMessage'),
          type: 'success',
        });
        await this.$parent.getComments();
      } catch (error) {
        this.notifyErrors(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
