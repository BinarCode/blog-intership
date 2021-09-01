<template>
  <div class="w-5/6 mx-auto py-10">
    <div class="flex justify-between">
      <h1 class="text-6xl">{{ $t('profile.title') }}</h1>
      <base-button outline size="md" @click="edit = !edit">
        {{ $t('profile.editProfile.title') }}
      </base-button>
    </div>

    <div class="p-4 my-10 bg-white shadow rounded-lg sm:px-10">
      <div class="max-w-5xl mx-auto h-auto">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-y-5">
          <div class="w-full col-span-2">
            <span class="block">Email: {{ user.email }}</span>
            <span class="block">Created at: {{ getCreatedAt }}</span>
            <span class="block">Last updated at: {{ getUpdatedAt }}</span>

            <div v-if="edit" class="text-3xl min-w-0 mt-5">
              <!--input type="text" class="nameInput text-2xl w-auto" v-model="profile.first_name" />
              <input type="text" class="nameInput text-2xl" v-model="profile.last_name" /-->
              <span class="outline-none border-b-2" contenteditable="true" ref="firstName">{{ user.first_name }}</span> <span class="outline-none border-b-2" contenteditable="true" ref="lastName">{{ user.last_name }}</span>
            </div>
            <div v-else class="text-3xl min-w-0 mt-5">
              <span>{{ user.first_name }} {{ user.last_name }}</span>
            </div>
          </div>
          <div class="flex flex-col">
            <img class="rounded-full h-32 w-32 object-cover mx-auto" :src="getAvatar" :alt="$t('profile.avatar.alt')">
            <span v-if="edit" class="flex flex-col justify-center">
              <base-button outline size="sm" @click="showModal = true">{{ $t('profile.changeAvatar.title') }}</base-button>
              <base-button outline size="sm" @click="onClear">{{ $t('profile.clearAvatar.title') }}</base-button>
            </span>
          </div>
        </div>
        <div v-if="edit" class="sm:min-w-0 inline-flex w-full">
          <base-button class="w-1/2 mr-px" size="md" @click="onSave">
            {{ $t('profile.editProfile.save') }}
          </base-button>
          <base-button class="w-1/2 ml-px" size="md" @click="edit = !edit">
            {{ $t('profile.editProfile.cancel') }}
          </base-button>
        </div>
      </div>
    </div>

    <transition name="fade">
      <!-- Modal -->
      <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" v-if="showModal">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75" aria-hidden="true" @click="showModal = false"></div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {{ $t('profile.uploadAvatar.title') }}
                </h3>
                <div class="mt-2">
                  <span class="text-sm text-gray-500">
                    {{ $t('profile.uploadAvatar.message') }}:
                  </span>
                  <form ref="uploadAvatar">
                    <input
                        type="file"
                        @change="checkImage($event)"
                        accept="image/gif, image/png, image/jpg, image/jpeg"
                    >
                  </form>
                  <div class="mt-6 flex justify-center hidden" ref="preview">
                    <img src="#" class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 flex-shrink-0 object-cover" :alt="$t('profile.avatar.alt')" ref="avatarPreview">
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5 flex flex-row-reverse">
              <base-button outline size="md" class="ml-2" @click="uploadAvatar">
                {{ $t('profile.editProfile.save') }}
              </base-button>
              <base-button size="md" @click = "showModal = false">
                {{ $t('profile.editProfile.cancel') }}
              </base-button>
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import userService from '@/api/userService';
import get from 'lodash/get';

export default {
  name: "Profile",

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
      return this.user.created_at.substring(0, 10);
    },

    getUpdatedAt() {
      return this.user.updated_at.substring(0, 10);
    }
  },

  methods: {
    ...mapActions(['setUserState']),

    get,

    async getUserProfile() {
      try {
        const userProfile = await userService.getProfile({
          related: 'comments,blogs,media'
        });

        this.blogs = get(userProfile, 'data.relationships.blogs', []);
        this.comments = get(userProfile, 'data.relationships.comments', []);
        this.media = get(userProfile, 'data.relationships.media', []);
      } catch (error) {
        this.notifyErrors(error);
      }
    },

    async onSave() {
      try {
        this.profile.first_name = this.$refs.firstName.innerHTML;
        this.profile.last_name = this.$refs.lastName.innerHTML;

        await userService.updateProfile(this.profile);

        this.user.first_name = this.profile.first_name;
        this.user.last_name = this.profile.last_name;
        await this.setUserState(this.user);

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

        this.user.avatar = null;
        await this.setUserState(this.user);

        this.$notify({
          title: this.$t('notifyMessage.success.title'),
          message: this.$t('notifyMessage.success.clearAvatar'),
          type: 'success',
        });
      } catch (error) {
        this.notifyErrors(error);
      }
    },

    checkImage(image) {
      const mimeTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

      try {
        if(!mimeTypes.includes(image.target.files[0].type)) {
          this.$refs.uploadAvatar.reset();
          throw new Error(this.$t('notifyMessage.error.avatarMime'));
        }

        this.$refs.preview.classList.toggle("hidden");
        this.$refs.avatarPreview.src = URL.createObjectURL(image.target.files[0]);
      } catch (error) {
        this.notifyErrors(error);
      }
    },

    async uploadAvatar() {
      try {
        const formData = new FormData();
        formData.append('avatar', this.$refs.uploadAvatar[0].files[0]);

        const {data} = await userService.updateAvatar(formData);

        this.user.avatar = get(data, 'attributes.avatar', '');
        await this.setUserState(this.user);

        this.showModal = false;
        this.edit = false;

        this.$notify({
          title: this.$t('notifyMessage.success.title'),
          message: this.$t('notifyMessage.success.updateAvatar'),
          type: 'success',
        });
      } catch (error) {
        this.notifyErrors(error);
      }
    }
  },

  created() {
    //this.getUserProfile();
    console.log(this.user);
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
