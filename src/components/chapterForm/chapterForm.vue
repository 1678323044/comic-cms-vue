<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
    <el-form-item label="章节标题" prop="title">
      <el-input v-model="ruleForm.title" placeholder="请填写章节标题"></el-input>
    </el-form-item>
    <el-form-item label="章节名称" prop="name">
      <el-input v-model="ruleForm.name" placeholder="请填写章节名称"></el-input>
    </el-form-item>
    <el-form-item label="章节序号" prop="SerialNumber" v-if="isShow">
      <el-input-number v-model="ruleForm.SerialNumber" :min="0" :max="100"></el-input-number>
      <span>0~100之间的数字</span>
    </el-form-item>
    <el-form-item label="章节封面图片">
      <el-upload
        class="avatar-uploader"
        action="/coverImagePath"
        :show-file-list="false"
        :auto-upload="true"
        :http-request="uploadChapterPic"
        :before-upload="beforeAvatarUpload">
        <img v-if="chapterPicUrl" width="100%" height="100%" :src="chapterPicUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="章节内容图片">
      <el-upload
        class="avatar-uploader"
        action="/ContentImagePath"
        :show-file-list="false"
        :auto-upload="true"
        :http-request="uploadContentPic"
        :before-upload="beforeAvatarUpload">
        <img v-if="contentPicUrl" width="100%" height="100%" :src="contentPicUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="发布状态" prop="State">
      <el-radio-group v-model="ruleForm.State">
        <el-radio label="1">库存</el-radio>
        <el-radio label="2">发布</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="阅读权限" prop="ReadPermission">
      <el-radio-group v-model="ruleForm.ReadPermission">
        <el-radio label="0">免费</el-radio>
        <el-radio label="1">vip/金币</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="购买所需阅读币" prop="ReadingCoin">
      <el-input-number v-model="ruleForm.ReadingCoin" :min="0" :max="120"></el-input-number>
      <span>0~120之间的数字</span>
    </el-form-item>
    <el-form-item label="备注">
      <el-input type="textarea" v-model="ruleForm.Sign" placeholder="请填写备注信息"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
      <el-button @click="resetForm('ruleForm')">重新输入</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {reqUploadPic} from '../../api/index'
  export default {
    props: ['chapterId','page','chapter','isShow'],
    data(){
      // 验证输入内容是否超过指定长度
      let checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('输入框不能为空'));
        }
        if (value.length > 15) {
          callback(new Error('漫画名称过长！'));
          return
        }
        callback();
      };
      return{
        ruleForm: {},
        chapterPicUrl: '',  //章节封面图
        contentPicUrl: '',  //章节内容图
        title: '',          //临时ID
        levels: [   //设置漫画等级
          {label: '1级', level: 1},
          {label: '2级', level: 2},
          {label: '3级', level: 3}
        ],
        sorts: [  //漫画分类
          {
            label: '韩漫',
            sort: 1
          }, {
            label: '日漫',
            sort: 2
          }, {
            label: '国漫',
            sort: 3
          }
        ],
        rules: {   //表单验证
          name: [{ required: true, validator: checkName, trigger: 'blur' }],
          title: [{ required: true, message: '请填写漫画章节', trigger: 'blur' }],
          SerialNumber: [{ required: true, message: '请填写章节序号', trigger: 'blur' }],
          State: [{ required: true, message: '请选择章节发布状态', trigger: 'change' }],
          ReadPermission: [{ required: true, message: '请选择阅读权限', trigger: 'change' }],
          ReadingCoin: [{ required: true, message: '请填写阅读币数量', trigger: 'blur' }],
        },
        comicId: '',  //漫画ID
      }
    },
    created(){
      this.ruleForm = this.chapter
    },
    methods: {
      submitForm(formName){
        //表单验证
        this.$refs[formName].validate((valid) => {
          if (valid){
              this.ruleForm.coverImagePath = this.chapterPicUrl
              this.ruleForm.ContentImagePath = this.contentPicUrl
              this.ruleForm.Id = this.title
              this.$emit('childFn',this.ruleForm)
          }else {
            alert('缺少必填信息')
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      beforeAvatarUpload(file){
          const isJPG = file.type === 'image/jpeg' || 'image/png';
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isJPG) {
              this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
      },
      async uploadPic(files,num){
          let formData = new FormData()
          let randomNum = Math.floor((Math.random()+Math.floor(Math.random()*9+1))*Math.pow(10,10-1));
          this.comicId = this.$route.query.bookid
          formData.append('bookid', this.comicId)
          formData.append('temp', randomNum.toString()) // 随机十位数
          formData.append('chapterid', this.chapterId) // 漫画Id
          formData.append('file',files.file)    // 图片数据
          formData.append('actionType', num)   // 上传类型
          let config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }
          let result = await reqUploadPic(formData,config)
          console.log(result)
          if (result.state === 'ok'){
              if (files.action === '/coverImagePath'){
                  this.chapterPicUrl = result.data
                  this.title = result.title
              }else {
                  this.contentPicUrl = result.data
                  this.title = result.title
              }
          }
      },
      uploadChapterPic(files){
          let num
          if (this.page === '添加章节'){
              num = 5  // 添加章节封面
              this.uploadPic(files,num)
          }else {
              num = 7  //修改章节封面
              this.uploadPic(files,num)
          }
      },
      uploadContentPic(files){
          let num
          if (this.page === '添加章节'){
              num = 6  //添加内容封面
              this.uploadPic(files,num)
          }else {
              num = 8  //修改内容封面
              this.uploadPic(files,num)
          }
      }
    }
  }
</script>

<style scoped>
  .el-input >>> input,.el-select >>> .el-input input{
    height: 45px;
    border: solid 1px #c2cede;
  }
  .el-select >>> .el-input{
    width: 100%;
  }
  .el-button+.el-button{
    margin-left: 40px;
  }
  .el-input{
    width: 60%;
  }
  .el-form-item span{
    padding: 0 0 0 10px;
    color: lightcoral;
    font-size: 13px;
  }
  .el-form{
    width: 65%;
    margin: 45px auto 0;
  }
  .avatar-uploader >>> .el-upload{
    font-size: 28px;
    width: 140px;
    height: 140px;
    line-height: 140px;
    border: 1px dashed #d9d9d9;
    color: #999999;
  }
</style>
