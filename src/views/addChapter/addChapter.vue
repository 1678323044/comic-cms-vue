<template>
  <el-main class="form-bg">
    <div class="main-form">
      <div class="form-title">
        设备入库
      </div>
      <chapter-form :page="page" @childFn="addChapter"></chapter-form>
    </div>
  </el-main>
</template>

<script>
  import chapterForm from "../../components/chapterForm/chapterForm";
  import {reqAddChapter} from '../../api/index'
  export default {
      data(){
          return{
              page: '添加章节'
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
