<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h2 class="text-red-500 font-bold">Check tailwind</h2>
    <HelloWorld msg="Blog Project" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: "App",
  components: {
    HelloWorld,
  },
};
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
