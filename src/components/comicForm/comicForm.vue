<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
    <el-form-item label="漫画名称" prop="name">
      <el-input v-model="ruleForm.name" placeholder="请填写漫画名称"></el-input>
    </el-form-item>
    <el-form-item label="是否新番">
      <el-radio-group v-model="ruleForm.newProgram">
        <el-radio label="0">旧番</el-radio>
        <el-radio label="1">新番</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="上架状态">
      <el-radio-group v-model="ruleForm.state">
        <el-radio label="0">下架</el-radio>
        <el-radio label="1">上架</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="完结状态">
      <el-radio-group v-model="ruleForm.endState">
        <el-radio label="0">连载</el-radio>
        <el-radio label="1">完结</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="漫画种类" prop="sorts">
      <el-select v-model="ruleForm.sort" placeholder="请选择">
        <el-option
          v-for="item in sorts"
          :key="item.sort"
          :label="item.label"
          :value="item.sort">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="作者" prop="author">
      <el-input v-model="ruleForm.author" placeholder="请填写漫画作者"></el-input>
    </el-form-item>
    <el-form-item label="漫画介绍">
      <el-input type="textarea" v-model="ruleForm.introduction"></el-input>
    </el-form-item>
    <el-form-item label="评分" prop="avgScore">
      <el-input v-model="ruleForm.avgScore" placeholder="请填写分数"></el-input>
      <span>0~10之间的数字</span>
    </el-form-item>
    <el-form-item label="标签">
      <el-input v-model="ruleForm.startnumber" placeholder="请填写起始编号"></el-input>
      <span>多个标签使用$分隔</span>
    </el-form-item>
    <el-form-item label="主页封面图片">
      <el-upload
        class="avatar-uploader"
        action="/CoverImagePath"
        :show-file-list="false"
        :auto-upload="true"
        :http-request="uploadHomePic"
        :before-upload="beforeAvatarUpload">
        <img v-if="homePicUrl" width="100%" height="100%" :src="homePicUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="章节封面图片">
      <el-upload
        class="avatar-uploader"
        action="/BannerImagePath"
        :show-file-list="false"
        :auto-upload="true"
        :http-request="uploadChapterPic"
        :before-upload="beforeAvatarUpload">
        <img v-if="chapterPicUrl" width="100%" height="100%" :src="chapterPicUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="VIP推荐">
      <el-radio-group v-model="ruleForm.vipRecommendState">
        <el-radio label="0">不是VIP推荐</el-radio>
        <el-radio label="1">是VIP推荐</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="畅销书">
      <el-radio-group v-model="ruleForm.easySEllingState">
        <el-radio label="0">不是畅销书</el-radio>
        <el-radio label="1">畅销书</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="漫画等级">
      <el-select v-model="ruleForm.level" placeholder="请选择">
        <el-option
          v-for="item in levels"
          :key="item.level"
          :label="item.label"
          :value="item.level">
        </el-option>
      </el-select>
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
    props: ['bookId','page','comic'],
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
      let checkText = (rule, value, callback) => {
        if (value.length > 150){
          callback(new Error('文字不能超过50字'));
          return
        }
        callback()
      };
      // 验证输入内容是否是范围0~10的数字
      let checkNumber = (rule, value, callback) => {
        if (!/^[0-9]+$/.test(value) || value > 10 || value < 0){
          callback(new Error('请输入1到10的数字'));
          return
        }
        callback()
      };
      return{
        ruleForm: { },
        homePicUrl: '',     //主页封面图链接
        chapterPicUrl: '',  //章节封面图链接
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
          name: [{ required: true, validator: checkName, }],
          radio: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
          sorts: [{ message: '请选择漫画类型',trigger: 'change' }],
          author: [{ required: true, validator: checkName }],
          introduction: [{ validator: checkText }],
          avgScore: [{ required: true, validator: checkNumber }],
        },
      }
    },
    created(){
        this.ruleForm = this.comic
    },
    methods: {
      submitForm(formName){
        //表单验证
        this.$refs[formName].validate((valid) => {
          if (valid){
              this.ruleForm.CoverImagePath = this.homePicUrl
              this.ruleForm.BannerImagePath = this.chapterPicUrl
              this.ruleForm.Id = this.title
              console.log(this.ruleForm)
              //this.$emit('childFn',this.ruleForm)
          }else {
              alert('缺少必填内容')
              return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      async uploadPic(files,num){
          let formData = new FormData()
          let randomNum = Math.floor((Math.random()+Math.floor(Math.random()*9+1))*Math.pow(10,10-1));
          formData.append('temp', randomNum.toString()) // 随机十位数
          formData.append('bookid', this.bookId) // 漫画Id
          formData.append('file',files.file)    // 图片数据
          formData.append('actionType', num)   // 上传类型
          let config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }
          let result = await reqUploadPic(formData,config)
          if (result.state === 'ok'){
              if (files.action === '/CoverImagePath'){
                  this.homePicUrl = result.data
                  this.title = result.title
              }else {
                  this.chapterPicUrl = result.data
                  this.title = result.title
              }
          }
      },
      uploadHomePic(files){
          if (this.page === '添加漫画'){
              let num = 1
              this.uploadPic(files,num)
          }else {
              let num = 3
              this.uploadPic(files,num)
          }
      },
      uploadChapterPic(files){
          if (this.page === '添加漫画'){
              let num = 2
              this.uploadPic(files,num)
          }else {
              let num = 4
              this.uploadPic(files,num)
          }
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
