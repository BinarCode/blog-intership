<template>
  <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8">
    <div id="title" class="col-span-full my-3 font-medium text-indigo-600">
      <i class="el-icon-edit"></i>
      {{ $t('addComment.title') }}
    </div>
    <div id="user-area" class="h-full col-span-1">
      <div class="text-center">
        <img class="w-full rounded-full h-full" :src="getAvatar" />
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
        @click="addComment"
        outline
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
    };
  },
  computed: {
    getAvatar() {
      return this.userState.avatar
        ? 'https://api-internship.binarcode.com/storage/' +
            this.userState.avatar
        : 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg';
    },
  },
  methods: {
    async addComment() {
      try {
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
      }
    },
  },
};
</script>
