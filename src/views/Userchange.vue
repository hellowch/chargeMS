<template>
  <div id="userchange">
    <Header></Header>
    <el-card style="margin-top: 10px" class="box-card">
      <div slot="header" class="clearfix">
        <span>信息修改界面</span>
      </div>
      <div class="text item">
        <strong>昵称：{{ruleForm.name}}</strong>
        <h4>用户名：{{ruleForm.username}}</h4>
        <strong>手机号：{{ruleForm.phoneNumber}}</strong>
      </div>
    </el-card>
    <el-form style="margin-top: 15px" ref="form" label-width="80px" size="mini">
      <el-form-item label="车的品牌">
        <el-input v-model="ruleForm.carBrand"></el-input>
      </el-form-item>
      <el-form-item label="车的型号">
        <el-input v-model="ruleForm.carModel"></el-input>
      </el-form-item>
      <el-form-item label="购入时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.buyTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button style="margin-left: -20%" type="primary" @click="setUserCar(ruleForm)">确认修改</el-button>
        <el-button @click="resetForm(ruleForm)">重置</el-button>
      </el-form-item>
    </el-form>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
export default {
// 电池管理界面
  components: {
    Header,
    Footer
  },
  name: 'Userchange',
  data(){
    return {
      ruleForm: {
        name: '',
        username: '',
        phoneNumber: '',
        carBrand: '',
        carModel: '',
        buyTime: '',
      },
    }
  },
  mounted:function(){
    this.getModel();
  },
  methods: {
    getModel() {
      var model = JSON.parse(localStorage.getItem('key'));
      console.log(model);
      this.ruleForm.name = model.Name;
      this.ruleForm.username = model.Username;
      this.ruleForm.phoneNumber = model.phoneNumber
    },
    setUserCar(formName) {
      var model = JSON.parse(localStorage.getItem('key'))
      this.axios.post('/carApi/setUserCar', {
        id: model.Carid,
        carBrand: formName.carBrand,
        carModel: formName.carModel,
        buyTime: formName.buyTime,
        userId : model.Id,
      })
        .then((response) => {
          console.log(response)
          if (response.data.code === 200 && response.data.data === 1) {
            this.open2();
            this.$router.replace({
              path: '/user'
            })
          }
          if (response.data.code != 200 || response.data.data != 1){
            this.open3()
          }
        })
        .catch((error) => {
          console.log(error)
          this.open3()
        })
    },
    resetForm(formName) {
        formName.carBrand = '',
        formName.carModel = '',
        formName.buyTime = ''
    },
    open2() {
      this.$message({
        message: '修改成功！',
        type: 'success'
      });
    },
    open3() {
      this.$message({
        message: '修改失败',
        type: 'warning'
      });
    },
    open4() {
      this.$message({
        message: '请完整填写信息',
        type: 'warning'
      });
    },
  }

}
</script>

<style scoped>

</style>
