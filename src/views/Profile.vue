<template>
  <div>
    <div class="flex justify-between">
      <h1 class="text-6xl">{{ $t('profile.title') }}</h1>
    </div>

    <div class="px-4 py-12 sm:py-16 my-10 bg-white shadow rounded-lg sm:px-10">
      <div class="max-w-5xl mx-auto h-auto">
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-y-8">
          <div class="relative w-full col-span-1 sm:col-span-3 font-light">
            <span class="block mb-1">
              <span class="font-medium">Email</span>: {{ user.email }}
            </span>
            <span class="block mb-1">
              <span class="font-medium">Created at</span>: {{ getCreatedAt }}
            </span>
            <span class="block">
              <span class="font-medium">Last updated</span>: {{ getUpdatedAt }}
            </span>

            <div v-if="edit" class="relative flex sm:absolute -bottom-4 text-3xl mt-0 sm:mt-5 w-full sm:w-5/6">
              <base-input class="w-full sm:w-1/2 mr-1" v-model="profile.first_name" :label="$t('register.name.firstName')" />
              <base-input class="w-full sm:w-1/2" v-model="profile.last_name" :label="$t('register.name.lastName')" />
            </div>
            <div v-else class="relative sm:absolute bottom-0 text-3xl mt-5">
              <span>{{ user.first_name }} {{ user.last_name }}</span>
            </div>
          </div>
          <div class="flex flex-col">
            <img class="rounded-full h-32 w-32 object-cover mx-auto" :src="getAvatar" :alt="$t('profile.avatar.alt')">
            <span v-if="!edit" class="flex justify-center mt-2 sm:mt-0">
              <base-button outline size="sm" @click="edit = !edit">
                {{ $t('profile.editProfile.title') }}
              </base-button>
            </span>
            <span v-else class="flex justify-center mt-2 sm:mt-0">
              <base-button class="mr-1" color="secondary" outline size="sm" @click="showModal = true">{{ $t('profile.changeAvatar.title') }}</base-button>
              <base-button color="danger" outline size="sm" @click="onClear">{{ $t('profile.clearAvatar.title') }}</base-button>
            </span>
          </div>
        </div>
        <div v-if="edit" class="sm:min-w-0 mt-6 inline-flex flex-row-reverse w-full">
          <base-button class="ml-1" size="md" @click="onSave">
            {{ $t('profile.editProfile.save') }}
          </base-button>
          <base-button outline size="md" @click="edit = !edit">
            {{ $t('profile.editProfile.cancel') }}
          </base-button>
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

    getAvatar() {
      return this.user.avatar
          ? this.user.avatar
          : 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg';
    },

    getCreatedAt() {
      const date = this.user.created_at.substring(0, 10).split('-');

      return format(new Date(date), 'dd MMM yyyy');
    },

    getUpdatedAt() {
      const date = this.user.updated_at.substring(0, 10).split('-');

      return formatDistance(
          new Date(date),
          new Date(),
          { addSuffix: true }
      );
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

        let tempUser = {};
        tempUser.first_name = get(
            profile,
            'data.attributes.first_name',
            this.user.first_name
        );
        tempUser.last_name = get(
            profile,
            'data.attributes.last_name',
            this.user.last_name
        );
        tempUser.avatar = get(
            profile,
            'data.attributes.avatar',
            'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg'
        );
        this.setProfileState(tempUser);

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

        let tempUser = {};
        tempUser.first_name = get(
            profile,
            'data.attributes.first_name',
            this.user.first_name
        );
        tempUser.last_name = get(
            profile,
            'data.attributes.last_name',
            this.user.last_name
        );
        tempUser.avatar = get(
            profile,
            'data.attributes.avatar',
            'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg'
        );
        await this.setProfileState(tempUser);

        this.edit = false;

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
.nameInput {
  border:none;
  background-image:none;
  background-color:transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  -o-box-shadow: none;
  box-shadow: none;
  padding: 0;
  margin: 0;
  width: auto;
}

.fade-in-top-enter-active {
  animation: fadeintop 0.3s;
}

.fade-in-top-leave-active {
  animation: fadeintop 0.3s reverse;
}

@keyframes fadeintop {
  from {
    transform: translateY(-20px);
    opacity: 0%;
  }
  to {
    transform: translateY(0px);
    opacity: 100%;
  }
}


.fade-in-left-enter-active {
  animation: fadeinleft 0.2s;
}

.fade-in-left-leave-active {
  animation: fadeinleft 0.2s reverse;
}

@keyframes fadeinleft {
  from {
    transform: translateX(-20px);
    opacity: 0%;
  }
  to {
    transform: translateX(0px);
    opacity: 100%;
  }
}


.fade-in-right-enter-active {
  animation: fadeinright 0.2s;
}

.fade-in-right-leave-active {
  animation: fadeinright 0.2s reverse;
}

@keyframes fadeinright {
  from {
    transform: translateX(20px);
    opacity: 0%;
  }
  to {
    transform: translateX(0px);
    opacity: 100%;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
