<template>
  <div>
    <h1 class="text-6xl">{{ $t('profile.title') }}</h1>

    <div class="px-6 sm:px-10 py-12 sm:py-16 my-10 bg-white shadow rounded-lg">
      <div class="max-w-5xl mx-auto h-auto">
        <div class="flex justify-center sm:justify-end w-full">
          <div class="flex flex-col flex-shrink-0 mt-0 sm:-mt-32">
            <avatar class="h-32 w-32 mx-auto" :path="user" />
            <span v-if="edit" class="flex justify-center mt-2">
              <base-button
                  class="mr-1"
                  outline
                  size="sm"
                  color="primary"
                  @click="showModal = true"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </base-button>
              <base-button
                  outline
                  size="sm"
                  color="danger"
                  @click="onClear"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </base-button>
            </span>
          </div>
        </div>

        <div class="mt-10">
          <div class="flex flex-wrap justify-between">
            <div class="flex w-full sm:w-3/4">
              <div v-if="edit" class="w-full flex -mt-4 sm:-mt-7">
                <base-input
                    class="w-full sm:w-1/3 mr-1"
                    v-model="profile.first_name"
                    :label="$t('register.name.firstName')"
                />
                <base-input
                    class="w-full sm:w-1/3"
                    v-model="profile.last_name"
                    :label="$t('register.name.lastName')"
                />
              </div>
              <span v-else class="text-3xl self-center">{{ user.first_name }} {{ user.last_name }}</span>
            </div>
            <div>
              <span v-if="!edit">
                <base-button
                    class="mb-1"
                    outline
                    size="sm"
                    @click="edit = !edit"
                >
                  {{ $t('profile.editProfile.title') }}
                </base-button>
              </span>
              <span v-else class="sm:min-w-0 inline-flex">
                <base-button
                    outline
                    size="sm"
                    @click="edit = !edit"
                >
                  {{ $t('profile.editProfile.cancel') }}
                </base-button>
                <base-button class="ml-1" size="sm" @click="onSave">
                  {{ $t('profile.editProfile.save') }}
                </base-button>
              </span>
            </div>
          </div>
          <div class="mt-6 px-6 sm:px-10">
            <div class="divide-y divide-gray-200">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <span class="text-sm font-medium text-gray-500">
                  {{ $t('profile.email.text') }}
                </span>
                <span class="flex-grow mt-1 ml-auto flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ user.email }}
                </span>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                <span class="text-sm font-medium text-gray-500">
                  {{ $t('profile.createdAt.text') }}
                </span>
                <span class="mt-1 ml-auto flex text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex-grow">
                  {{ getCreatedAt }}
                </span>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                <span class="text-sm font-medium text-gray-500">
                  {{ $t('profile.updatedAt.text') }}
                </span>
                <span class="flex-grow mt-1 ml-auto flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ getUpdatedAt }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <transition name="fade">
      <upload-avatar v-if="showModal" @closeModal="showModal = false" />
    </transition>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import userService from '@/api/userService';
import get from 'lodash/get';
import format from 'date-fns/format';
import formatDistance from 'date-fns/formatDistance'
import UploadAvatar from '@/components/UploadAvatar';

export default {
  name: "Profile",

  components: {
    UploadAvatar
  },

  data() {
    return {
      edit: false,
      profile: {
        first_name: '',
        last_name: ''
      },
      blogs: [],
      comments: [],
      showModal: false
    }
  },

  computed: {
    ...mapGetters({
      user: 'userState'
    }),

    getCreatedAt() {
      const date = this.user.created_at.substring(0, 10).split('-');

      return date[0]
          ? format(new Date(date), 'dd MMM yyyy')
          : "";
    },

    getUpdatedAt() {
      const date = this.user.updated_at.substring(0, 10).split('-');

      return date[0]
          ? formatDistance(
              new Date(date),
              new Date(),
              { addSuffix: true }
          )
          : ""
    }
  },

  methods: {
    ...mapActions(['setUserState', 'setProfileState']),

    get, format, formatDistance,

    async onSave() {
      try {
        if (!this.profile.first_name || !this.profile.last_name) {
          this.edit = false;

          this.profile.first_name = this.user.first_name;
          this.profile.last_name = this.user.last_name;

          throw new Error(this.$t('notifyMessage.error.requiredNames'));
        }

        await userService.updateProfile(this.profile);
        const profile = await userService.getProfile();

        let tempProfile = {};
        tempProfile.first_name = get(
            profile,
            'data.attributes.first_name',
            this.user.first_name
        );
        tempProfile.last_name = get(
            profile,
            'data.attributes.last_name',
            this.user.last_name
        );
        tempProfile.avatar = get(
            profile,
            'data.attributes.avatar',
            'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg'
        );
        this.setProfileState(tempProfile);

        this.$notify({
          title: this.$t('notifyMessage.success.title'),
          message: this.$t('notifyMessage.success.updateProfile'),
          type: 'success',
        });

        this.edit = false;
      } catch (error) {
        this.notifyErrors(error);
      }
    },

    async onClear() {
      try {
        await userService.clearAvatar();
        const profile = await userService.getProfile();

        let tempProfile = {};
        tempProfile.first_name = get(
            profile,
            'data.attributes.first_name',
            this.user.first_name
        );
        tempProfile.last_name = get(
            profile,
            'data.attributes.last_name',
            this.user.last_name
        );
        tempProfile.avatar = get(
            profile,
            'data.attributes.avatar',
            'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg'
        );
        await this.setProfileState(tempProfile);

        this.$notify({
          title: this.$t('notifyMessage.success.title'),
          message: this.$t('notifyMessage.success.clearAvatar'),
          type: 'success',
        });
      } catch (error) {
        this.notifyErrors(error);
      }
    },
  },

  created() {
    this.profile.first_name = this.user.first_name;
    this.profile.last_name = this.user.last_name;
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
