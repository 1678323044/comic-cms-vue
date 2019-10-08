<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
    <el-form-item label="章节名称" prop="name">
      <el-input v-model="ruleForm.name" placeholder="请填写章节名称"></el-input>
    </el-form-item>
    <el-form-item label="章节标题" required>
      <el-input v-model="ruleForm.name" placeholder="请填写章节标题"></el-input>
    </el-form-item>
    <el-form-item label="章节序号" required>
      <el-input v-model="ruleForm.name" placeholder="请填写章节序号"></el-input>
    </el-form-item>
    <el-form-item label="封面图片">
      <el-input v-model="ruleForm.name" placeholder="请填写章节序号"></el-input>
    </el-form-item>
    <el-form-item label="章节图片">
      <el-input v-model="ruleForm.name" placeholder="请填写章节序号"></el-input>
    </el-form-item>
    <el-form-item label="发布状态" prop="author">
      <el-radio-group v-model="ruleForm.vipRecommendState">
        <el-radio label="1">库存</el-radio>
        <el-radio label="2">发布</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="阅读权限" required>
      <el-radio-group v-model="ruleForm.vipRecommendState">
        <el-radio label="0">免费</el-radio>
        <el-radio label="1">vip/金币</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="购买所需阅读币" prop="avgScore">
      <el-input v-model="ruleForm.avgScore" placeholder="请填写分数"></el-input>
      <span>0~10之间的数字</span>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="ruleForm.startnumber" placeholder="请填写起始编号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
      <el-button @click="resetForm('ruleForm')">重新输入</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
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
        ruleForm: {},
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
          author: [{ required: true, validator: checkName }],
          introduction: [{ validator: checkText }],
          avgScore: [{ required: true, validator: checkNumber }],
        }
      }
    },
    methods: {
      submitForm(formName){
        //表单验证
        this.$refs[formName].validate((valid) => {
          console.log(this.ruleForm)
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
