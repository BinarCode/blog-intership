<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Blog Project"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
// import authService from './api/authService';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
//     data() {
//     return {
//       model: {
//         first_name: 'register',
//         last_name: 'new last name',
//         email: 'mihai.andrei@binarcode.com',
//         password: 'secret!',
//         password_confirmation: 'secret!',
//       }
//     };
//   },
//   async mounted() {
//      try {
//     const result = await authService.register(this.model);
//     console.log(result);
//      } catch (error)  {console.log(error)}
//   }
// }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
