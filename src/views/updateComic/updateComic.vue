<template>
  <el-main class="form-bg">
    <div class="main-form">
      <div class="form-title">
        设备入库
      </div>
      <comic-form :bookId="bookId" :comic="comic" @childFn="updateComic"></comic-form>
    </div>
  </el-main>
</template>

<script>
  import comicForm from '../../components/comicForm/comicForm'
  import {reqUpdateComic} from '../../api/index'
  import {mapState} from 'vuex'
  export default {
    data(){
      return{
          bookId: ''
      }
    },
    components: {
      comicForm
    },
    created() {
        this.bookId = this.$route.query.Bookid
        this.$store.dispatch('getComic',{"Bookid": this.bookId})
    },
    methods: {
        async updateComic(data){
            let result = await reqUpdateComic(data)
            if(result.state === 'ok'){
                alert('修改漫画成功')
            }else {
                alert('修改漫画失败')
            }
        }
    },
    computed: {
        ...mapState(['comic'])
    }
  }
</script>
