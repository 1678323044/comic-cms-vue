<template>
  <el-main>
    <div class="main-form">
      <div class="form-title">
        设备入库
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
        <el-form-item label="漫画名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请填写漫画名称"></el-input>
        </el-form-item>
        <el-form-item label="是否新番" prop="newProgram">
          <el-radio-group v-model="ruleForm.newProgram">
            <el-radio label="旧番"></el-radio>
            <el-radio label="新番"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上架状态" prop="state">
          <el-radio-group v-model="ruleForm.state">
            <el-radio label="下架"></el-radio>
            <el-radio label="上架"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="完结状态" prop="endState">
          <el-radio-group v-model="ruleForm.endState">
            <el-radio label="下架"></el-radio>
            <el-radio label="上架"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="漫画种类" prop="type">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="ruleForm.author" placeholder="请填写漫画作者"></el-input>
        </el-form-item>
        <el-form-item label="漫画介绍" prop="introduction">
          <el-input type="textarea" v-model="ruleForm.introduction"></el-input>
        </el-form-item>
        <el-form-item label="评分" prop="avgScore">
          <el-input v-model="ruleForm.avgScore" placeholder="请填写分数"></el-input>
          <span>0~10之间的数字</span>
        </el-form-item>
        <el-form-item label="标签" prop="startnumber">
          <el-input v-model="ruleForm.startnumber" placeholder="请填写起始编号"></el-input>
          <span>数字范围：0-9999</span>
        </el-form-item>

        <!-- 改动地方 -->
        <el-form-item label="封面图片" prop="endnumber">
          <el-upload
            class="avatar-uploader"
            action="/manager/uploadaddimage.do"
            :show-file-list="false"
            :auto-upload="true"
            :http-request="uploadPic"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="详情图片" prop="endnumber">
          <input type="file">
        </el-form-item>
        <el-form-item label="VIP推荐" prop="endnumber">
          <el-radio-group v-model="ruleForm.vipRecommendState">
            <el-radio label="是VIP推荐"></el-radio>
            <el-radio label="不是VIP推荐"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="畅销书" prop="easySEllingState">
          <el-radio-group v-model="ruleForm.easySEllingState">
            <el-radio label="畅销书"></el-radio>
            <el-radio label="不是畅销书"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="漫画等级" prop="level">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in level"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
          <el-button @click="resetForm('ruleForm')">重新输入</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-main>
</template>

<script>
    import {reqUploadPic} from '../../api/index'
    export default {
        data(){
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
            let checkWeek = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('输入框不能为空'));
                }
                if (!/^[0-9]+$/.test(value) || value.length !== 1 && value.length !== 2 || value === "0") {
                    callback(new Error('请输入1或2位的不为0的数字'));
                    return
                }
                callback();
            };
            let checkProject = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('输入框不能为空'));
                }
                if (!/^[0-9]+$/.test(value) || value.length !== 2) {
                    callback(new Error('请输入2个数字'));
                    return
                }
                callback();
            };
            let checkRange = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('输入框不能为空'));
                }
                if (!/^[0-9]+$/.test(value) || value < 0 || value > 9999) {
                    callback(new Error('请输入0-9999范围的数字'));
                    return
                }
                callback()
            };
            return{
                ruleForm: {
                    level: [
                        {label: '1级', value: 1},
                        {label: '2级', value: 2},
                        {label: '3级', value: 3}
                    ],
                    project: '',
                    manufacturer: '',
                    year: '',
                    week: '',
                    startnumber: '',
                    endnumber: ''
                },
                rules: {
                    name: [{ required: true, validator: checkName }],
                    author: [{ required: true, validator: checkName }],
                    type: [{ required: true }],
                    project: [ { required: true, validator: checkProject, trigger: 'blur' } ],
                    week: [ { required: true, validator: checkWeek, trigger: 'blur' } ],
                    startnumber: [ { required: true, validator: checkRange, trigger: 'blur' } ],
                    endnumber: [ { required: true, validator: checkRange, trigger: 'blur' } ]
                },
                options: [{
                    value: 1,
                    label: '韩漫'
                }, {
                    value: 2,
                    label: '日漫'
                }, {
                    value: 3,
                    label: '国漫'
                }],
                value: '',
                dialogVisible: false,
                imageUrl: ''
            }
        },
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            /* 新增地方 */
            async uploadPic(files){
                let formData = new FormData()
                formData.append('file',files.file)
                formData.append('actionType', 1)
                formData.append('temp','8111391296')
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                let result = await reqUploadPic(formData,config)
                console.log(result)
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
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
</style>
