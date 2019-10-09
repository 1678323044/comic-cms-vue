<template>
  <el-header>
    <h1>漫画后台管理系统</h1>
    <ul class="quit">
      <li>
        <a @click="handleShow(!isShow)" href="javascript:"><i class="el-icon-caret-bottom">admin</i></a>
        <ul v-show="isShow">
          <li><router-link to="/login">退出登录</router-link></li>
        </ul>
      </li>
    </ul>
  </el-header>
</template>

<script>
  export default {
      data(){
          return{
              isShow: false
          }
      },
      methods: {
          handleShow(isShow){
              this.isShow = isShow
          }
      }
  }
</script>

<style scoped>
  .el-header{
    height: 10%!important;
    background-color: rgb(50, 65, 87);
    color: #ffffff;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
  }
  .el-header h1{
    font-size: 22px;
    font-weight: normal;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-header .quit{
    line-height: 70px;
    margin: 0 40px 0 0;
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-header .quit ul{
    position: absolute;
    top: 65px;
    right: 0;
    background: #ffffff;
    width: 100px;
    color: #333333;
    line-height: 40px;
    font-size: 14px;
    border-radius: 4px;
    z-index: 99999;
  }
  .el-header .quit ul li{
    border-bottom: 1px #eeeeee solid;
  }
  .el-header .quit li a{
    color: #ffffff;
  }
  .el-header .quit li li a{
    color: #333333;
  }
</style>
