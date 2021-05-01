<template>
  <div id="user">
    <Header></Header>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人信息</span>
        <el-button style="float: right; padding: 3px 0" type="text">修改</el-button>
      </div>
      <div class="text item">
        <div>昵称：{{ruleForm.name}}</div>
        <div>用户名：{{ruleForm.username}}</div>
        <div>手机号：{{ruleForm.phoneNumber}}</div>
        <div>车品牌：{{ruleForm.carBrand}}</div>
        <div>车型号：{{ruleForm.carModel}}</div>
        <div>购入时间：{{ruleForm.buyTime}}</div>
      </div>
    </el-card>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
export default {
  // 用户界面
  components: {
    Header,
    Footer
  },
  name: 'User',
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
    this.getUserCar();
  },
  methods: {
    getModel() {
      var model = JSON.parse(localStorage.getItem('key'));
      console.log(model);
      this.ruleForm.name = model.Name;
      this.ruleForm.username = model.Username;
      this.ruleForm.phoneNumber = model.phoneNumber
    },
    getUserCar() {
      var model = JSON.parse(localStorage.getItem('key'))
      this.axios.get('/carApi/getUserCar', {
        params: {
          carId: model.Carid
        }
      })
      .then((responce) => {
        console.log(responce.data.data)
        this.ruleForm.carBrand = responce.data.data.Carbrand
        this.ruleForm.carModel = responce.data.data.Carmodel
        this.ruleForm.buyTime = responce.data.data.Buytime
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 375px;
}
</style>
