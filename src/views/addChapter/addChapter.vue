<template>
  <el-main class="form-bg">
    <div class="main-form">
      <div class="form-title">
        添加章节
      </div>
      <chapter-form :page="page" :chapterId="chapterId" :chapter="chapter" @childFn="addChapter"></chapter-form>
    </div>
  </el-main>
</template>

<script>
  import chapterForm from "../../components/chapterForm/chapterForm";
  import {reqAddChapter} from '../../api/index'
  export default {
      data(){
          return{
              page: '添加章节',
              chapterId: '',
              chapter: {}
          }
      },
      components: {
          chapterForm
      },
      methods: {
          async addChapter(){
              let result = await reqAddChapter()
              if(result.state === 'ok'){
                  alert('添加章节成功')
              }else {
                  alert("添加章节失败")
              }
          }
      }
  }
</script>
