<template>
  <el-aside>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>漫画书管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="goto('/comicList')">漫画书列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script>
  export default {
    methods: {
      goto(path){
        this.$router.replace(path)
      }
    }
  }
</script>

<style>
  .el-aside{
    background: rgb(84, 92, 100);
    width: 220px!important;
  }
  .el-menu{
    border-right: none;
  }
</style>
