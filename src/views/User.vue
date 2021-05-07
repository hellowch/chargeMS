<template>
  <div id="user">
    <Header></Header>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人信息</span>
        <el-button style="float: left; padding: 3px 0" type="text" @click="dialogFormVisible = true">发帖</el-button>
        <el-dialog width="90%" title="发帖内容" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item :label-width="formLabelWidth">
              <el-input v-model="form.detail" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="setCommunity(form)">确 定</el-button>
          </div>
        </el-dialog>
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
      <el-tab-pane label="社区管理" name="first">
        <el-row :gutter="5">
          <el-col :span="24"  v-for="(model,key) in ruleForms01" :key="key" style="margin-top: 10px">
            <span>
              <el-card :body-style="{ padding: '0px' }" shadow="hover" >
                <el-button size="mini" style="float: right;margin: 10px" type="danger" icon="el-icon-delete" circle @click="delCommunity(model)"></el-button>
                <div style="padding: 10px;text-align: left;width: 25%">
                  <el-avatar size="small" :src="avatar"></el-avatar>
                  <div style="float: right;width: 50%">
                    <span style="float: left">{{ruleForm.name}}</span>
                  </div>
                </div>
                <div style="padding-bottom: 20px">
                  <span style="">{{model.Details}}</span>
                </div>
              </el-card>
            </span>
          </el-col>
        </el-row>
      </el-tab-pane>
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
      ruleForms01: [],
      ruleForm: {
        name: '',
        username: '',
        phoneNumber: '',
        carBrand: '',
        carModel: '',
        buyTime: '',
      },
      avatar: '',
      activeName: 'first',
      tableData: [],
      dialogFormVisible: false,
      form: {
        detail: '',
      },
      formLabelWidth: '0px',
    }
  },
  mounted:function(){
    this.getCommunity01()
    this.getModel();
    this.getUserCar();
    this.getChargerOrder()
  },
  methods: {
    getCommunity01() {
      var model = JSON.parse(localStorage.getItem('key'));
      this.axios.get('/community/getCommunity', {
        params: {
          userid: model.Id
        }
      })
        .then((response) => {
          var res = response.data.data
          // console.log(res)
          this.ruleForms01 = res
          this.avatar = model.Avatar
        })
    },
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
    setCommunity(form01) {
      var model = JSON.parse(localStorage.getItem('key'))
      this.axios
        .post('/community/setCommunity', {//用post方法传 输入框输入的用户名和密码findindex
          userId: model.Id,
          details: form01.detail,
          detailsid: 0,
        })
        .then((response) => {//回调函数当post成功后执行
          console.log(response)
          if (response.data.code === 200 && response.data.data === 1) {//如果后端返回的状态码是200
            this.dialogFormVisible = false
            this.getCommunity01()
          }
        })
        .catch((error) => {
          console.log(error)
        });
    },
    delCommunity(model) {
      this.axios.get('/community/delCommunity', {
        params: {
          communityId: model.Id
        }
      })
        .then((response) => {
          this.getCommunity01()
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
