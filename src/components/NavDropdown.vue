<template>
  <el-dropdown trigger="click" class="p-2">
      <span class="el-dropdown-link flex items-center">
        <img class="h-5 rounded-full bg-black mr-1" src="https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg" alt="Avatar">My User Name<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item><router-link to="/">Profile</router-link></el-dropdown-item>
      <el-dropdown-item>My articles</el-dropdown-item>
      <el-dropdown-item divided>Log out</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: "BaseNavDropdown"
}
</script>

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
  }
</style>