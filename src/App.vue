<template>
  <div id="app">
    <public-header v-show="$route.meta.showComponent"></public-header>
    <el-container>
      <side-menu v-show="$route.meta.showComponent"></side-menu>
      <router-view/>
    </el-container>
  </div>
</template>

<script>
  import publicHeader from './components/header/header'
  import sideMenu from "./components/sideMenu/sideMenu"
  import './common/css/comm.css'
  export default {
      name: 'App',
      components: {
          publicHeader,
          sideMenu
      }
  }
</script>

<style>
  .el-container{
    height: 90%;
  }
</style>
