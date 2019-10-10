<template>
  <el-main class="form-bg">
    <crumbs>
      <el-breadcrumb-item slot="one" :to="{ path: '/comicList' }">漫画列表</el-breadcrumb-item>
      <el-breadcrumb-item slot="two" :to="{ path: '/chapterList?Bookid='+this.comicId }">章节列表</el-breadcrumb-item>
      <el-breadcrumb-item slot="three">添加章节</el-breadcrumb-item>
    </crumbs>
    <div class="main-form">
      <div class="form-title">
        添加章节
      </div>
      <chapter-form :page="page" :chapterId="chapterId" :isShow="isShow" :chapter="chapter" @childFn="addChapter"></chapter-form>
    </div>
  </el-main>
</template>

<script>
  import chapterForm from "../../components/chapterForm/chapterForm";
  import {reqAddChapter} from '../../api/index'
  import crumbs from "../../components/crumbs/crumbs";
  export default {
      data(){
          return{
              page: '添加章节',
              chapterId: '',
              chapter: {},
              isShow: false,
              comicId: ''
          }
      },
      components: {
          chapterForm,
          crumbs
      },
      created(){
        this.comicId = this.$route.query.bookid
      },
      methods: {
          async addChapter(data){
              let result = await reqAddChapter(data)
              if(result.state === 'ok'){
                  alert('添加章节成功')
                  this.$router.replace(`/chapterList?Bookid=${this.comicId}`)
              }else {
                  alert("添加章节失败")
              }
          }
      }
  }
</script>
