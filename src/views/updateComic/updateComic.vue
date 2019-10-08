<template>
  <el-main class="form-bg">
    <div class="main-form">
      <div class="form-title">
        设备入库
      </div>
      <comic-form></comic-form>
    </div>
  </el-main>
</template>

<script>
  import comicForm from '../../components/comicForm/comicForm'
  export default {
    components: {
      comicForm
    }
  }
</script>
