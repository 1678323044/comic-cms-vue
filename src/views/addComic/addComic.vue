<template>
  <el-main class="form-bg">
    <crumbs>
      <el-breadcrumb-item slot="one" :to="{ path: '/comicList' }">漫画列表</el-breadcrumb-item>
      <el-breadcrumb-item slot="two">添加漫画</el-breadcrumb-item>
    </crumbs>
    <div class="main-form">
      <div class="form-title">
        添加漫画
      </div>
      <comic-form @childFn="addComic" :bookId="bookId" :comic="comic" :page="page"></comic-form>
    </div>
  </el-main>
</template>

<script>
    import comicForm from '../../components/comicForm/comicForm'
    import crumbs from "../../components/crumbs/crumbs";
    import {reqAddComic} from '../../api/index'
    export default {
        data(){
            return{
                page: '添加漫画',
                comic: {},
                bookId: ''
            }
        },
        components: {
            comicForm,
            crumbs
        },
        methods: {
            async addComic(data){
              let result = await reqAddComic(data)
              if(result.state === 'ok'){
                  alert('添加漫画成功')
                  this.$router.replace('/comicList')
              }else {
                  alert('添加漫画失败')
              }
            }
        }
    }
</script>

