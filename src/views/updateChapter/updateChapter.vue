<template>
  <el-main class="form-bg">
    <crumbs>
      <el-breadcrumb-item slot="one" :to="{ path: '/comicList' }">漫画列表</el-breadcrumb-item>
      <el-breadcrumb-item slot="two" :to="{ path: '/chapterList?Bookid='+this.comicId }">章节列表</el-breadcrumb-item>
      <el-breadcrumb-item slot="three">编辑章节</el-breadcrumb-item>
    </crumbs>
    <div class="main-form">
      <div class="form-title">
        编辑章节
      </div>
      <chapter-form :chapterId="chapterId" :isShow="isShow" :chapter="chapter" @childFn="updateChapter"></chapter-form>
    </div>
  </el-main>
</template>

<script>
  import chapterForm from '../../components/chapterForm/chapterForm'
  import {reqUpdateChapter} from '../../api/index'
  import crumbs from "../../components/crumbs/crumbs";
  import {mapState} from 'vuex'
  export default {
    data(){
        return{
            chapterId: '',
            isShow: true
        }
    },
    components: {
      chapterForm,
      crumbs
    },
    created() {
        this.chapterId = this.$route.query.Id
        this.$store.dispatch('getChapter', {"Chapterid": this.chapterId})
    },
    methods: {
      async updateChapter(){
        let result = await reqUpdateChapter()
        if (result.state === 'ok'){
            alert('编辑章节成功')
        }else {
            alert('编辑章节失败')
        }
      }
    },
    computed: {
        ...mapState(['chapter'])
    }
  }
</script>


