<template>
  <div class="login-page">
    <div class="login-bgImg"></div>
    <div class="login-box">
      <div class="login-left">
        <div class="login-title">
          <img src="" alt="">
          <h1>漫画后台管理系统</h1>
        </div>
      </div>
      <div class="login-right">
        <div class="login-form">
          <el-input
            v-model="username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user">
          </el-input>
          <el-input
            v-model="password"
            placeholder="请输入密码"
            show-password
            prefix-icon="el-icon-unlock"
            @keyup.enter.native="handleLogin">
          </el-input>
          <el-checkbox v-model="checked">记住密码</el-checkbox>
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {reqLoginInfo} from '../../api/index'
  import cookieUtil from '../../util/cookieUtil'
  export default {
      data(){
          return{
              username: '',
              password: '',
              checked: true,
              cookie: ''
          }
      },
      methods: {
          async handleLogin(){
              if (!this.username || !this.password){
                  alert('请输入用户名或密码')
                  return
              }
              const val = {"Username" : this.username,"Password": this.password}
              const result = await reqLoginInfo(val)
              if (result.state === 'failed'){
                  alert(result.message)
              }
              if (result.state === 'ok') {
                cookieUtil.setCookie(result.data)
                this.$router.replace('/comicList')
              }
          }
      },

  }
</script>

<style>
  .login-page{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .login-page .login-bgImg{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
/*    background: url("") no-repeat 50%;*/
    background-size: cover;
    z-index: 0;
  }
  .login-page .login-box{
    width: 900px;
    height: 400px;
    background-color: #ffffff;
    border-radius: 5px;
    z-index: 10;
    position: absolute;
    left: 50%;
    top: 20%;
    margin: 0 0 0 -450px;
    box-shadow: 0 0 5px #999999;
    overflow: hidden;
  }
  .login-page .login-box .login-left{
    width: 60%;
    height: 100%;
    float: left;
    background-color: cadetblue;
    text-align: center;
    color: #ffffff;
  }
  .login-page .login-box .login-left img{
    width: 200px;
    margin: 80px 0 15px 0;
  }
  .login-page .login-box .login-right{
    width: 40%;
    height: 100%;
    float: right;
    padding: 20px;
    box-sizing: border-box;
  }
  .login-page .login-box .login-right .login-form{
    margin: 50px 0 0 0;
  }
  .login-page .login-box .login-right .login-form .el-input{
    margin: 0 0 20px 0;
  }
  .login-page .login-box .login-right .login-form i{
    font-size: 18px;
  }
  .login-page .login-box .login-right .login-form button{
    width: 100%;
  }
  .el-button{
    margin: 5px 0;
  }
</style>
