<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75" aria-hidden="true" @click="closeModal"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 my-auto">
        <div class="sm:flex sm:items-start">
          <div class="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-2xl leading-6 font-medium text-gray-900" id="modal-title">
              {{ $t('profile.uploadAvatar.title') }}
            </h3>
            <div class="mt-8">
                  <span class="text-sm text-gray-500">
                    {{ $t('profile.uploadAvatar.message') }}:
                  </span>

              <div v-show="preview" class="my-4 flex-col text-center" ref="preview">
                <img :src="src" class="h-32 w-32 rounded-full flex-shrink-0 object-cover mx-auto" :alt="$t('profile.avatar.alt')" ref="avatarPreview">
                <span>{{ filename }}</span>
              </div>

              <form ref="uploadAvatar">
                <input
                    type="file"
                    id="uploadAvatar"
                    hidden
                    @change="checkImage($event)"
                    accept="image/gif, image/png, image/jpg, image/jpeg"
                >
                <label
                    class="cursor-pointer flex items-center justify-center mt-2 font-medium text-white rounded-md shadow-sm w-full px-4 py-2 text-sm bg-indigo-600"
                    for="uploadAvatar"
                >
                  {{ $t('general.button.chooseFile') }}
                </label>
              </form>
            </div>
          </div>
        </div>
        <div class="mt-8 flex flex-row-reverse">
          <base-button size="md" class="ml-1" @click="uploadAvatar">
            {{ $t('profile.editProfile.save') }}
          </base-button>
          <base-button outline size="md" @click="closeModal">
            {{ $t('profile.editProfile.cancel') }}
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import get from 'lodash/get';
import userService from '@/api/userService';
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "UploadAvatar",

  data() {
    return {
      filename: '',
      src: '',
      preview: false
    }
  },

  computed: {
    ...mapGetters({
      user: 'userState'
    })
  },

  methods: {
    ...mapActions(['setProfileState']),

    get,

    checkImage(image) {
      const mimeTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

      try {
        if(!mimeTypes.includes(image.target.files[0].type)) {
          this.$refs.uploadAvatar.reset();
          throw new Error(this.$t('notifyMessage.error.avatarMime'));
        }

        this.preview = true;
        this.src = URL.createObjectURL(image.target.files[0]);
        this.filename = image.target.files[0].name;
      } catch (error) {
        this.notifyErrors(error);
      }
    },

    async uploadAvatar() {
      try {
        const formData = new FormData();
        formData.append('avatar', this.$refs.uploadAvatar[0].files[0]);

        const {data} = await userService.updateAvatar(formData);

        let tempUser = {};
        tempUser.first_name = this.user.first_name;
        tempUser.last_name = this.user.last_name;
        tempUser.avatar = get(data, 'attributes.avatar', '');
        await this.setProfileState(tempUser);

        this.showModal = false;
        this.edit = false;

        this.$notify({
          title: this.$t('notifyMessage.success.title'),
          message: this.$t('notifyMessage.success.updateAvatar'),
          type: 'success',
        });

        this.closeModal();
      } catch (error) {
        this.notifyErrors(error);
      }
    },

    closeModal() {
      this.$emit('closeModal');
    }
  }
}
</script>

<style scoped>

</style>