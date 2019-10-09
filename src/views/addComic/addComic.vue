<template>
  <el-main class="form-bg">
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
            comicForm
        },
        methods: {
            async addComic(data){
              let result = await reqAddComic(data)
              if(result.state === 'ok'){
                  alert('添加漫画成功')
              }else {
                  alert('添加漫画失败')
              }
            }
        }
    }
</script>

