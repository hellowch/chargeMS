<template>
  <div id="charger">
    <Header></Header>
    <div style="margin-top: 10px">
      <el-input style="float: left;width: 89%" v-model="selectInput" placeholder="请输入内容"></el-input>
      <el-button style="margin-left: 1px" icon="el-icon-search" circle @click="selCharger(selectInput)"></el-button>
    </div>
    <div>
      <el-row :gutter="5">
        <el-col :span="24"  v-for="(model,key) in ruleForms01" :key="key" style="margin-top: 10px">
            <span>
              <el-card :body-style="{ padding: '0px' }" shadow="hover" >
                <div style="padding: 20px">
                  <h3>位置：{{model.address}}</h3>
                  <h3>距离：{{model.Distance}}</h3>
                  <h3>详情：{{model.Details}}</h3>
                  <div style="float: right;margin-bottom: 10%;margin-top: -30%">
                    <el-button style="margin-bottom: 10px" icon="el-icon-tickets" @click="getChargerDetails(model);dialogTableVisible = true" circle></el-button>
                    <div v-if="model.Usetype===0"><el-button type="success" icon="el-icon-check" @click="chargerUrl(model)" circle></el-button></div>
                    <div v-else>
                      <el-button type="danger" icon="el-icon-close" circle @click="open3">
                      </el-button>
                    </div>
                  </div>
                </div>
              </el-card>
            </span>

          <el-dialog title="用户评价" :visible.sync="dialogTableVisible" width="90%">
            <el-card :span="24"  v-for="(model,key) in ruleForms02" :key="key">
              <h3>{{model.Details}}</h3>
            </el-card>
          </el-dialog>

        </el-col>
      </el-row>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
export default {
  // 充电桩界面
  components: {
    Header,
    Footer
  },
  name: 'Charger',
  data(){
    return {
      ruleForms01: [],
      ruleForms02: [],
      selectInput: '',
      dialogTableVisible: false,
    }
  },
  mounted:function () {
    this.getAllCharger()
  },
  methods: {
    selCharger(input) {
      this.axios.get('/charger/getCharger', {
        params: {
          addLike: input
        }
      })
        .then((response) => {
          var res = response.data.data
          this.ruleForms01 = res
        })
    },
    getAllCharger() {
      this.axios.get('/charger/getCharger', {
        params: {
        }
      })
        .then((response) => {
          var res = response.data.data
          // console.log(res)
          this.ruleForms01 = res
          })
    },
    getChargerDetails(model) {
      this.axios.get('/charger/getChargerDetails', {
        params: {
          chargerId: model.id
        }
      })
        .then((response) => {
          var res = response.data.data
          this.ruleForms02 = res
        })
    },
    chargerUrl(model) {
      this.$router.push({
        path: '/chargerTrue',
        name: 'ChargerTrue',
        params: {
          id: model.id,
          model: model
        }
      })
    },
    open3() {
      this.$message({
        message: '该设备已被占用',
        type: 'warning'
      });
    },
  }
}
</script>

<style scoped>

</style>
