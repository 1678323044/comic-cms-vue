<template>
  <el-header>
    <h1>漫画后台管理系统</h1>
    <ul class="quit">
      <li>
        <a href="javascript:"><i class="el-icon-caret-bottom"></i></a>
        <ul>
          <li><router-link to="javascript:">个人中心</router-link></li>
          <li><router-link to="/login">退出登录</router-link></li>
        </ul>
      </li>
    </ul>
  </el-header>
</template>

<script>

</script>

<style scoped>
  .el-header{
    width: 100%;
    height: 10%!important;
    line-height: 70px;
    background-color: rgb(50, 65, 87);
    color: #ffffff;
    padding: 0 40px;
  }
  .el-header h1{
    font-size: 22px;
    font-weight: normal;
    width: 220px;
    float: left;
  }
  .el-header .quit{
    float: right;
    width: 200px;
    line-height: 70px;
    margin: 0 40px 0 0;
    text-align: center;
    position: relative;
  }
  .el-header .quit ul{
    position: absolute;
    top: 65px;
    left: 70px;
    background: #ffffff;
    width: 100px;
    color: #333333;
    line-height: 40px;
    font-size: 14px;
    border-radius: 4px;
  }
  .el-header .quit ul li{
    border-bottom: 1px #eeeeee solid;
  }
  .el-header .quit ul li a{
    color: #333333;
  }
</style>
