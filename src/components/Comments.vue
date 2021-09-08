<template>
  <div class="mt-8" v-if="get(comments, 'length', 0)">
    <div id="title" class=" font-medium text-indigo-600 pb-2">
      <i class="el-icon-s-comment"></i>
      {{ $t('comments.title') }}
    </div>
    <transition-group name="fade" mode="out-in" tag="div">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="py-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 border-b last:pb-0 last:border-b-0"
      >
        <div id="user-area" class="h-full col-span-1">
          <avatar :path="get(comment, 'relationships.creator[0]')" />
        </div>
        <div
          id="comment-area"
          class="pl-4 col-span-full col-start-2 place-content-start"
        >
          <div class="font-medium text-indigo-500 flex justify-between">
            <span>
              @{{ getFullName(get(comment, 'relationships.creator[0]')) }}
              <span class="text-gray-500">
                {{ $t('comments.userCommented.text') }}
              </span>
            </span>
            <el-dropdown
              v-if="isAuthor(get(comment, 'relationships.creator[0].id', null))"
            >
              <span>
                <i
                  class="el-icon-more text-indigo-500 text-lg transform rotate-90"
                ></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="p-0">
                <el-dropdown-item class="p-0">
                  <div
                    @click="deleteComm(comment.id)"
                    class="text-red-600 cursor-pointer text-sm py-1 px-3"
                  >
                    <i class="el-icon-delete-solid text-lg"></i>
                    {{ $t('comments.deleteBtn.label') }}
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="break-words text-sm pr-5">
            {{ get(comment, 'attributes.body', $t('comments.noComment.text')) }}
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { deleteComment } from '@/api/commentsService';
import Avatar from '@/components/Avatar.vue';

export default {
  components: { Avatar },
  name: 'Comments',
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    isAuthor(commentAuthorId) {
      return commentAuthorId === this.userState.id;
    },
    async deleteComm(commId) {
      try {
        await deleteComment(commId);
        this.$notify({
          title: this.$t('general.notify.succesTitle'),
          message: this.$t('deleteComment.notify.succesMessage'),
          type: 'info',
          iconClass: 'el-icon-delete-solid',
        });
        await this.$parent.getComments();
      } catch (error) {
        this.notifyErrors(error);
      }
    },
  },
};
</script>
