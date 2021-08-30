<template>
  <div>
    <div class="mt-20 transition-height" :class="[edit ? 'h-1/2' : 'h-1/3']">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-auto">
        <div class="flex justify-between">
          <div class="flex flex-col justify-center">
            <img class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32" src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="">
            <transition name="fade-in-left">
              <span v-if="edit">
                <a href="#" class="text-blue-500 hover:underline sm:ml-4">upload</a>&nbsp;
                <a href="#" class="text-red-500 hover:underline">clear</a>
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
                <base-button size="sm">
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
            <base-input type="text" :label="$t('register.name.firstName')" :value="user.first_name" v-model="model.first_name" />
            <base-input type="text" :label="$t('register.name.firstName')" :value="user.last_name" v-model="model.last_name" />
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
      <div class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
          </div>
          <div class="flex-1 min-w-0">
            <a href="#" class="focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true"></span>
              <p class="text-sm font-medium text-gray-900">
                Leslie Alexander
              </p>
              <p class="text-sm text-gray-500 truncate">
                Co-Founder / CEO
              </p>
            </a>
          </div>
        </div>

        <div class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
          </div>
          <div class="flex-1 min-w-0">
            <a href="#" class="focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true"></span>
              <p class="text-sm font-medium text-gray-900">
                Michael Foster
              </p>
              <p class="text-sm text-gray-500 truncate">
                Co-Founder / CTO
              </p>
            </a>
          </div>
        </div>

        <div class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
          </div>
          <div class="flex-1 min-w-0">
            <a href="#" class="focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true"></span>
              <p class="text-sm font-medium text-gray-900">
                Dries Vincent
              </p>
              <p class="text-sm text-gray-500 truncate">
                Manager, Business Relations
              </p>
            </a>
          </div>
        </div>

        <div class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
          </div>
          <div class="flex-1 min-w-0">
            <a href="#" class="focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true"></span>
              <p class="text-sm font-medium text-gray-900">
                Lindsay Walton
              </p>
              <p class="text-sm text-gray-500 truncate">
                Front-end Developer
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Latest blogs -->
    <div class="mt-4 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
      <h2 class="text-sm font-medium text-gray-500">Latest blogs</h2>
      <div class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
          </div>
          <div class="flex-1 min-w-0">
            <a href="#" class="focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true"></span>
              <p class="text-sm font-medium text-gray-900">
                Leslie Alexander
              </p>
              <p class="text-sm text-gray-500 truncate">
                Co-Founder / CEO
              </p>
            </a>
          </div>
        </div>

        <div class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
          </div>
          <div class="flex-1 min-w-0">
            <a href="#" class="focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true"></span>
              <p class="text-sm font-medium text-gray-900">
                Michael Foster
              </p>
              <p class="text-sm text-gray-500 truncate">
                Co-Founder / CTO
              </p>
            </a>
          </div>
        </div>

        <div class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
          </div>
          <div class="flex-1 min-w-0">
            <a href="#" class="focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true"></span>
              <p class="text-sm font-medium text-gray-900">
                Dries Vincent
              </p>
              <p class="text-sm text-gray-500 truncate">
                Manager, Business Relations
              </p>
            </a>
          </div>
        </div>

        <div class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
          </div>
          <div class="flex-1 min-w-0">
            <a href="#" class="focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true"></span>
              <p class="text-sm font-medium text-gray-900">
                Lindsay Walton
              </p>
              <p class="text-sm text-gray-500 truncate">
                Front-end Developer
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Profile",

  data() {
    return {
      edit: false,
      model: {
        first_name: String,
        last_name: String,
        avatar: String
      }
    }
  },

  computed: {
    ...mapGetters({
      user: 'userState'
    })
  },

  methods: {
    save() {

    }
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
