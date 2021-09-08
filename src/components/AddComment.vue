<template>
  <div>
    <div id="title" class="my-3 font-medium text-indigo-600">
      <i class="el-icon-edit"></i>
      {{ $t('addComment.title') }}
    </div>
    <div class="flex">
      <div id="user-area" class="flex flex-col items-center justify-center">
        <avatar class="w-16 h-16 md:w-20 md:h-20" :path="userState" />
        <div class="font-medium text-indigo-500 mt-2 text-center text-sm">
          @{{ getFullName(userState) }}
        </div>
      </div>
      <div id="comment-area" class="pl-4 w-full">
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
  </div>
</template>

<script>
import { createComment } from '@/api/commentsService';
import BaseTextArea from '@/components/BaseTextArea';
import has from 'lodash/has';

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
        const res = await createComment({
          blog_id: this.blogId,
          body: this.userComment,
        });

        if (has(res, 'message'))
          this.$notify({
            title: this.$t('general.notify.errorTitle'),
            message: this.$t('addComment.notify.longError'),
            type: 'error',
          });
        else {
          this.$notify({
            title: this.$t('general.notify.succesTitle'),
            message: this.$t('addComment.notify.succesMessage'),
            type: 'success',
          });
          this.userComment = '';
          this.$refs.observer.reset();
          await this.$parent.getComments();
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
