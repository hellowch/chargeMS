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
            <span @click="getChargerDetails(model)">
              <el-card :body-style="{ padding: '0px' }" shadow="hover" >
                <div style="padding-bottom: 20px">
                  <span>距离：{{model.Distance}}</span>
                  <span>位置：{{model.address}}</span>
                  <span style="">评价：{{model.Details}}</span>
                  <span style="">使用：{{model.Usetype}}</span>
                </div>
              </el-card>
            </span>
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
      selectInput: '',
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
          this.ruleForms01 = res
        })
    }
  }
}
</script>

<style scoped>

</style>
