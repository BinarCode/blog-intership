<template>
  <div>
    <div class="mt-20 transition-height" :class="[edit ? 'h-1/2' : 'h-1/4 sm:h-1/3']">
      <div class="max-w-5xl mx-auto px-4 px-8 h-auto">
        <div class="flex justify-between">
          <div class="flex flex-col justify-center">
            <img class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 flex-shrink-0" :src="getAvatar" alt="Avatar">
            <transition name="fade-in-left">
              <span v-if="edit">
                <a href="#" class="text-blue-500 hover:underline sm:ml-4" @click="showModal = true">Upload</a>
                <a href="#" class="text-red-500 hover:underline ml-1" @click="onClear">Clear</a>
              </span>
            </transition>
          </div>
          <transition name="fade-in-right" mode="out-in">
            <div v-if="!edit" class="sm:min-w-0 flex flex-col self-center" :key="edit">
                <base-button size="sm" @click="edit = !edit">
                  Edit profile
                </base-button>
            </div>
            <div v-if="edit" class="sm:min-w-0 flex flex-col self-center" :key="edit">
                <base-button size="sm" @click="onSave">
                  Save
                </base-button>
                <base-button size="sm" @click="edit = !edit">
                  Cancel
                </base-button>
            </div>
          </transition>
        </div>
        <transition name="fade-in-top" mode="out-in">
          <div v-if="edit" class="sm:block mt-6 min-w-0" :key="edit">
            <base-input type="text" :label="$t('register.name.firstName')" v-model="profile.first_name" />
            <base-input type="text" :label="$t('register.name.firstName')" v-model="profile.last_name" />
          </div>
          <div v-else class="text-2xl sm:block mt-6 min-w-0" :key="edit">
            <span>{{ user.first_name }} {{ user.last_name }}</span>
          </div>
        </transition>
      </div>
    </div>
    <hr class="mt-0 md:mt-2"/>

    <!-- Description list -->
    <div class="mt-4 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">
            Email
          </dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ user.email }}
          </dd>
        </div>

        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">
            Last updated at
          </dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ user.updated_at }}
          </dd>
        </div>
      </dl>
    </div>

    <!-- Latest comments -->
    <div class="mt-4 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
      <h2 class="text-sm font-medium text-gray-500">Latest comments</h2>

      <div
          v-for="(comment, index) in comments"
          :key="index"
          :comment="comment"
          class="mt-1"
      >
        <div class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
          <div class="flex-1 min-w-0">
            <a href="#" class="focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true"></span>
              <p class="text-sm font-medium text-gray-900">
                Commented in <span class="font-bold">blog_name</span>
              </p>
              <p class="text-sm text-gray-500 truncate">
                {{ comment.attributes.body }}
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>






    <!-- Modal -->
    <!-- This example requires Tailwind CSS v2.0+ -->
    <transition name="fade">
      <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" v-if="showModal">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <!--
            Background overlay, show/hide based on modal state.

            Entering: "ease-out duration-300"
              From: "opacity-0"
              To: "opacity-100"
            Leaving: "ease-in duration-200"
              From: "opacity-100"
              To: "opacity-0"
          -->
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <!--
            Modal panel, show/hide based on modal state.

            Entering: "ease-out duration-300"
              From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              To: "opacity-100 translate-y-0 sm:scale-100"
            Leaving: "ease-in duration-200"
              From: "opacity-100 translate-y-0 sm:scale-100"
              To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          -->
          <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Upload avatar
                </h3>
                <div class="mt-2">
                  <span class="text-sm text-gray-500">
                    Please select an image from your computer:
                  </span>
                  <form ref="uploadAvatar">
                    <input
                        type="file"
                        @change="checkImage($event)"
                        accept="image/gif, image/png, image/jpg, image/jpeg"
                    >
                  </form>
                  <div class="mt-6 flex justify-center hidden" ref="preview">
                    <img src="#" class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 flex-shrink-0" alt="Avatar preview" ref="avatarPreview">
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <base-button class="ml-2" @click="uploadAvatar">
                Save
              </base-button>
              <base-button @click = "showModal = false">
                Cancel
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
      loading: false,
      edit: false,
      profile: {
        first_name: '',
        last_name: ''
      },
      avatar: String,
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
      if (!this.user.avatar)
        return 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg';
      return this.user.avatar;
    },
  },

  methods: {
    ...mapActions(['setUserState']),

    get,

    async getUserProfile() {
      try {
        const userProfile = await userService.getProfile();

        this.blogs = get(userProfile, 'data.relationships.blogs', []);
        this.comments = get(userProfile, 'data.relationships.comments', []);
        this.media = get(userProfile, 'data.relationships.media', []);

        console.log(this.comments);
      } catch (error) {
        this.notifyErrors(error);
      }
    },

    async onSave() {
      this.loading = true;

      try {
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
      } finally {
        this.loading = false;
      }
    },

    async onClear() {
      this.loading = true;

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
      } finally {
        this.loading = false;
      }
    },

    checkImage(image) {
      const mimeTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

      try {
        if(!mimeTypes.includes(image.target.files[0].type)) {
          this.$refs.uploadAvatar.reset();
          throw new Error('Only JPG, JPEG, PNG or GIF files are permitted. Please try again');
        }

        this.$refs.preview.classList.toggle("hidden");
        this.$refs.avatarPreview.src = URL.createObjectURL(image.target.files[0]);
      } catch (error) {
        this.notifyErrors(error);
      }
    },

    async uploadAvatar() {
      const formData = new FormData();
      formData.append('avatar', this.$refs.uploadAvatar[0].files[0]);

      const {data} = await userService.updateAvatar(formData);

      this.user.avatar = get(data, 'attributes.avatar', '');
      await this.setUserState(this.user);

      this.showModal = false;

      this.$notify({
        title: this.$t('notifyMessage.success.title'),
        message: 'Your avatar has successfully been updated!',
        type: 'success',
      });
    }
  },

  created() {
    this.getUserProfile();
    this.profile.first_name = this.user.first_name;
    this.profile.last_name = this.user.last_name;
    this.avatar = this.user.avatar || 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg';
  }
}
</script>

<style scoped>
.transition-height {
  transition: height 0.45s;
}

.fade-in-top-enter-active {
  animation: fadeintop 0.2s;
}

.fade-in-top-leave-active {
  animation: fadeintop 0.2s reverse;
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
