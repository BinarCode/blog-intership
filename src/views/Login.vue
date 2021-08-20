<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-800">
         {{ $t('register.button.label.signIn') }}
      </h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
           <ValidationObserver v-slot="{ valid }">
        <form class="space-y-6"  @submit.prevent="handleSubmit">
              <base-input
              v-model="model.email"
              type="email"
              :name="$t('general.name.email')"
              :label="$t('general.name.email')"
              rules="required|email"
              :placeholder="$t('general.placeholder.email')"
            />                     
             <base-input 
              v-model="model.password"
              type="password"
              :name="$t('general.name.password')"
              :label="$t('general.name.password')"
              rules="required|min:6"
              :placeholder="$t('password')"
            />
             <router-link class="font-medium text-indigo-600 hover:text-indigo-500 text-sm" to="/forgot-password">
                  {{ $t('forgotPassword.text') }}
              </router-link>
          <div class="w-full flex justify-center">
            <base-button 
             type="submit"
             :disabled="loading === valid"
             size="lg"
             color="primary" >
                   <i
                v-if="loading"
                class="text-lg leading-none el-icon-loading"
              ></i>
               {{ $t('register.button.label.signIn') }}
               </base-button>
          </div>
        </form>
         </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';
import authService from '@/api/authService';
import { get } from 'lodash';

export default {
  components: { BaseButton },
  name: 'Login',
  data() {
    return {
    loading: false,
     model: {
     email:'',
     password:''
     },
    }
  },
  methods: {
    async handleSubmit() {
 try {
      this.loading = true;
        let {data} =  await authService.login(this.model)
        const token = get(data, 'token', '')
        authService.setToken(token)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false;
      }
      this.$router.push('/');
    }
  },
}
</script>