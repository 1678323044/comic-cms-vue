<template>
  <el-main class="form-bg">
    <div class="main-form">
      <div class="form-title">
        设备入库
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
        <el-form-item label="漫画名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请填写漫画名称"></el-input>
        </el-form-item>
        <el-form-item label="是否新番" prop="newProgram" required>
          <el-radio-group v-model="ruleForm.newProgram">
            <el-radio label="旧番"></el-radio>
            <el-radio label="新番"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上架状态" prop="state" required>
          <el-radio-group v-model="ruleForm.state">
            <el-radio label="下架"></el-radio>
            <el-radio label="上架"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="完结状态" prop="endState" required>
          <el-radio-group v-model="ruleForm.endState">
            <el-radio label="下架"></el-radio>
            <el-radio label="上架"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="漫画种类" prop="categoryId">
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
        <el-form-item label="标签" prop="tags">
          <el-input v-model="ruleForm.startnumber" placeholder="请填写起始编号"></el-input>
          <span>多个标签使用$分隔</span>
        </el-form-item>
        <el-form-item label="封面图片" prop="endnumber">
          <el-input v-model="ruleForm.endnumber" placeholder="请填写截至编号"></el-input>
        </el-form-item>
        <el-form-item label="详情图片" prop="endnumber">
          <el-input v-model="ruleForm.endnumber" placeholder="请填写截至编号"></el-input>
        </el-form-item>
        <el-form-item label="VIP推荐" prop="vipRecommendState" required>
          <el-radio-group v-model="ruleForm.vipRecommendState">
            <el-radio label="是VIP推荐"></el-radio>
            <el-radio label="不是VIP推荐"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="畅销书" prop="easySEllingState" required>
          <el-radio-group v-model="ruleForm.easySEllingState">
            <el-radio label="畅销书"></el-radio>
            <el-radio label="不是畅销书"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="漫画等级" prop="level" required>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in ruleForm.level"
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
        ruleForm: {
          level: [
            {label: '1级', value: ''},
            {label: '2级', value: ''},
            {label: '3级', value: ''}
          ]
        },
        rules: {
          name: [{ required: true, validator: checkName }],
          author: [{ required: true, validator: checkName }],
          introduction: [{ validator: checkText }],
          avgScore: [{ required: true, validator: checkNumber }],
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
        dialogVisible: false
      }
    },
    methods: {
      submitForm(formName){
        //表单验证
        this.$refs[formName].validate(async (valid) => {
          if (valid && this.ruleForm.endnumber > this.ruleForm.startnumber) {
            //处理提交
            const data = {type: this.value,project: this.ruleForm.project,
              manufacturer: parseInt(this.ruleForm.manufacturer),
              year: parseInt(this.ruleForm.year),week: parseInt(this.ruleForm.week),
              startnumber: parseInt(this.ruleForm.startnumber),
              endnumber: parseInt(this.ruleForm.endnumber)}
            console.log(data)
            const result = await reqCreateReceivers(data)
            if (result.errcode === 0){
              //清空输入框
              this.ruleForm.type = 0
              this.ruleForm.project = ''
              this.ruleForm.manufacturer = ''
              this.ruleForm.year = ''
              this.ruleForm.week = ''
              this.ruleForm.startnumber = ''
              this.ruleForm.endnumber = ''
              this.dialogVisible = true
              this.$store.dispatch('getCreateReceivers',result)
            }else {
              alert(result.msg)
            }
          }else {
            alert("信息填写错误")
            return false
          }
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
