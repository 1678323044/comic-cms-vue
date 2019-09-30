<template>
  <el-main>
    <div class="main-form">
      <div class="form-title">
        设备入库
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
        <el-form-item label="漫画名称" prop="project">
          <el-input v-model="ruleForm.project" placeholder="请填写漫画名称"></el-input>
          <span>2个字节的数字</span>
        </el-form-item>
        <el-form-item label="是否新番" prop="project">
          <el-input v-model="ruleForm.project" placeholder="请填写漫画名称"></el-input>
          <span>2个字节的数字</span>
        </el-form-item>
        <el-form-item label="上架状态" prop="project">
          <el-input v-model="ruleForm.project" placeholder="请填写漫画名称"></el-input>
          <span>2个字节的数字</span>
        </el-form-item>
        <el-form-item label="完结状态" prop="project">
          <el-input v-model="ruleForm.project" placeholder="请填写漫画名称"></el-input>
          <span>2个字节的数字</span>
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
        <el-form-item label="作者" prop="manufacturer">
          <el-input v-model="ruleForm.manufacturer" placeholder="请填写制造商编码"></el-input>
          <span>1个字节的数字</span>
        </el-form-item>
        <el-form-item label="漫画介绍" prop="year">
          <el-input v-model="ruleForm.year" placeholder="请填写年份的最后一位"></el-input>
          <span>1个字节的数字</span>
        </el-form-item>
        <el-form-item label="评分" prop="week">
          <el-input v-model="ruleForm.week" placeholder="请填写第几周"></el-input>
          <span>1或2个字节的不为0的数字</span>
        </el-form-item>
        <el-form-item label="标签" prop="startnumber">
          <el-input v-model="ruleForm.startnumber" placeholder="请填写起始编号"></el-input>
          <span>数字范围：0-9999</span>
        </el-form-item>
        <el-form-item label="封面图片" prop="endnumber">
          <el-input v-model="ruleForm.endnumber" placeholder="请填写截至编号"></el-input>
          <span>0-9999,截至编号必须大于起始编号</span>
        </el-form-item>
        <el-form-item label="详情图片" prop="endnumber">
          <el-input v-model="ruleForm.endnumber" placeholder="请填写截至编号"></el-input>
          <span>0-9999,截至编号必须大于起始编号</span>
        </el-form-item>
        <el-form-item label="VIP推荐" prop="endnumber">
          <el-input v-model="ruleForm.endnumber" placeholder="请填写截至编号"></el-input>
          <span>0-9999,截至编号必须大于起始编号</span>
        </el-form-item>
        <el-form-item label="畅销书" prop="endnumber">
          <el-input v-model="ruleForm.endnumber" placeholder="请填写截至编号"></el-input>
          <span>0-9999,截至编号必须大于起始编号</span>
        </el-form-item>
        <el-form-item label="漫画等级" prop="type">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
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
            let checkOne = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('输入框不能为空'));
                }
                if (!/^[0-9]+$/.test(value) || value.length !== 1) {
                    callback(new Error('请输入1位的数字'));
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
                    type: 0,
                    project: '',
                    manufacturer: '',
                    year: '',
                    week: '',
                    startnumber: '',
                    endnumber: ''
                },
                rules: {
                    type: [{ required: true }],
                    project: [ { required: true, validator: checkProject, trigger: 'blur' } ],
                    manufacturer: [ { required: true, validator: checkOne, trigger: 'blur' } ],
                    year: [ { required: true, validator: checkOne, trigger: 'blur' } ],
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
