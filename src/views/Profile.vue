<template>
  <div>
    <div class="mt-20 transition-height" :class="[edit ? 'h-1/2' : 'h-1/2 sm:h-1/3']">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-auto">
        <div class="flex justify-between">
          <div class="flex flex-col justify-center">
            <img class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 flex-shrink-0" :src="avatar" alt="">
            <transition name="fade-in-left">
              <span v-if="edit">
                <a href="#" class="text-blue-500 hover:underline sm:ml-4">Upload</a>&nbsp;
                <a href="#" class="text-red-500 hover:underline" @click="onClear">Clear</a>
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
    <hr class="mt-2"/>

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
                Commented in <span class="font-bold">{{ comment.attributes.blog_name }}</span>
              </p>
              <p class="text-sm text-gray-500 truncate">
                {{ comment.attributes.body }}
              </p>
            </a>
          </div>
        </div>
      </div>

    </div>
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
      comments: []
    }
  },

  computed: {
    ...mapGetters({
      user: 'userState'
    }),
  },

  methods: {
    ...mapActions(['setUserState']),

    get,

    async getUserRelated() {
      try {
        const userProfile = await userService.getProfile();

        this.blogs = get(userProfile, 'data.relationships.blogs', []);
        this.comments = get(userProfile, 'data.relationships.comments', []);
        this.media = get(userProfile, 'data.relationships.media', []);

        let blog = {};
        for (let i = 0; i < this.comments.length; i++) {
          blog = await userService.getBlog(this.comments[i].attributes.blog_id);
          this.comments[i].attributes.blog_name = blog.data.attributes.title;
        }

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
    }
  },

  created() {
    this.getUserRelated();

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
</style>
