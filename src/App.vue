<template>
  <div id="app" class="w-full">
    <div id="nav" class="flex justify-around w-full fixed top-0 left-0">
      <BaseNavbar/>
    
    </div>
    <router-view />
  </div>
</template>

<script>
import BaseNavbar from '@/components/BaseNavbar.vue'

export default ({
  components: {BaseNavbar} 
    
 
})
</script>


<style scoped>

#app {
  height: calc(100vh - 4rem);
}
</style>

   