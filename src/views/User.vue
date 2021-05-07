<template>
  <div id="user">
    <Header></Header>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" ><el-link href="/#/userchange">修改</el-link></el-button>
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
    <el-tabs v-model="activeName" >
      <el-tab-pane label="社区管理" name="first">社区管理</el-tab-pane>
      <el-tab-pane label="历史订单" name="second">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
        size="mini">
          <el-table-column
            prop="Amount"
            label="金额"
            width="100">
          </el-table-column>
          <el-table-column
            prop="Time"
            label="时间"
            width="100">
          </el-table-column>
          <el-table-column
            prop="Length"
            label="使用时长">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="月度消费" name="thrid">
        <SumOrder></SumOrder>
      </el-tab-pane>
    </el-tabs>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import SumOrder from '../components/SumOrder'
export default {
  // 用户界面
  components: {
    Header,
    Footer,
    SumOrder,
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
      activeName: 'first',
      tableData: [],
    }
  },
  mounted:function(){
    this.getModel();
    this.getUserCar();
    this.getChargerOrder()
  },
  methods: {
    getModel() {
      var model = JSON.parse(localStorage.getItem('key'));
      // console.log(model);
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
      .then((response) => {
        // console.log(responce.data.data)
        var res = response.data.data
        this.ruleForm.carBrand = res.Carbrand
        this.ruleForm.carModel = res.Carmodel
        this.ruleForm.buyTime = res.Buytime.slice(0,10)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    getChargerOrder() {
      var model = JSON.parse(localStorage.getItem('key'))
      this.axios.get('/charger/getChargerOrder', {
        params: {
          userId: model.Id
        }
      })
        .then((responce) => {
          // console.log(responce.data.data)
          var res = responce.data.data
          this.tableData = res
        })
        .catch((error) => {
          console.log(error)
        })
    },
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
