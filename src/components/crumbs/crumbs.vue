<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item>首页</el-breadcrumb-item>
    <slot name="one"></slot>
    <slot name="two"></slot>
    <slot name="three"></slot>
  </el-breadcrumb>
</template>

<script>
  export default {
      props: ['crumbs']
  }
</script>
