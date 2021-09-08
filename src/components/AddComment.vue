<template>
  <div class="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-8">
    <div id="title" class="col-span-full my-3 font-medium text-indigo-600">
      <i class="el-icon-edit"></i>
      {{ $t('addComment.title') }}
    </div>
    <div id="user-area" class="h-full col-span-1 flex items-center">
      <div class="text-center">
        <avatar :path="userState" />
        <div class="font-medium text-indigo-500">
          @{{ userState.first_name }}
        </div>
      </div>
    </div>
    <div id="comment-area" class=" grid pl-4 col-span-full col-start-2">
      <ValidationObserver ref="observer" v-slot="{ valid }">
        <form @submit.prevent="addComment" class="grid">
          <base-text-area
            rules="required"
            v-model="userComment"
            :name="$t('addComment.commentBtn.label')"
            :label="$t('addComment.commentBtn.label')"
          ></base-text-area>
          <base-button
            type="submit"
            size="sm"
            class="h-9 my-2 justify-self-end"
            :disabled="!valid"
            :loading="loading"
          >
            {{ $t('addComment.commentBtn.label') }}
          </base-button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { createComment } from '@/api/commentsService';
import BaseTextArea from '@/components/BaseTextArea';

export default {
  name: 'AddComent',
  components: { BaseTextArea },
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
        this.$refs.observer.reset();
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
