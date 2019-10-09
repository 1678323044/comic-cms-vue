<template>
  <el-main class="form-bg">
    <div class="main-form">
      <div class="form-title">
        编辑章节
      </div>
      <chapter-form :chapterId="chapterId" :chapter="chapter" @childFn="updateChapter"></chapter-form>
    </div>
  </el-main>
</template>

<script>
  import chapterForm from '../../components/chapterForm/chapterForm'
  import {reqUpdateChapter} from '../../api/index'
  import {mapState} from 'vuex'
  export default {
    data(){
        return{
            chapterId: ''
        }
    },
    components: {
      chapterForm
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


