<template>
  <div class="mb-5" v-if="get(comments, 'length', 0)">
    <div id="title" class=" font-medium text-indigo-600 pb-2">
      <i class="el-icon-s-comment"></i>
      {{ $t('comments.title') }}
    </div>
    <div
      v-for="(comment, index) in comments"
      :key="index"
      class="py-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 border-b"
      :class="index === comments.length - 1 ? 'border-none pb-0' : ''"
    >
      <div id="user-area" class="h-full col-span-1">
        <img
          class="w-full rounded-full"
          :src="getAvatar(get(comment, 'relationships.creator[0].avatar'))"
        />
      </div>
      <div
        id="comment-area"
        class="pl-4 col-span-full col-start-2 place-content-start"
      >
        <div class="font-medium text-indigo-500 flex justify-between">
          <span>
            {{ getFullName(get(comment, 'relationships.creator[0]')) }}
            <span class="text-gray-500">
              {{ $t('comments.userCommented.text') }}
            </span>
          </span>
          <el-dropdown
            v-if="
              get(comment, 'relationships.creator[0].id', null) === userState.id
            "
          >
            <span>
              <i
                class="el-icon-more text-indigo-500 text-lg transform rotate-90"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown" class="p-0">
              <el-dropdown-item>
                <span
                  class="text-red-600 cursor-pointer text-sm"
                  @click="deleteComm(comment.id)"
                >
                  <i class="el-icon-delete-solid text-lg"></i>
                  {{ $t('comments.deleteBtn.label') }}
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="break-words text-sm pr-5">
          {{ get(comment, 'attributes.body', 'No comment') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import get from 'lodash/get';
import { deleteComment } from '@/api/commentsService';

export default {
  name: 'Comments',
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    get,
    getFullName(user) {
      return `@${this.get(user, 'first_name', 'Unknown')} ${this.get(
        user,
        'first_name'
      )}`;
    },
    getAvatar(avatar) {
      return (
        avatar ||
        'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg'
      );
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
