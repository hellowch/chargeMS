<template>
  <div id="community">
    <Header></Header>
    <el-tabs v-model="activeName" >
      <el-tab-pane label="同城交流" name="first">
        <el-row :gutter="5">
          <el-col :span="24"  v-for="(model,key) in ruleForms01" :key="key" style="margin-top: 10px">
            <span>
              <el-card :body-style="{ padding: '0px' }" shadow="hover" >
                <div style="padding: 10px;text-align: left;width: 25%">
                  <el-avatar size="small" :src="model.Avatar"></el-avatar>
                  <div style="float: right;width: 50%">
                    <span style="float: left">{{model.Name}}</span>
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
      <el-tab-pane label="同车分享" name="second">
        <el-row :gutter="5">
          <el-col :span="24"  v-for="(model,key) in ruleForms02" :key="key" style="margin-top: 10px">
            <span>
              <el-card :body-style="{ padding: '0px' }" shadow="hover" >
                <div style="padding: 10px;text-align: left;width: 25%">
                  <el-avatar size="small" :src="model.Avatar"></el-avatar>
                  <div style="float: right;width: 50%">
                    <span style="float: left">{{model.Name}}</span>
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
      <el-tab-pane label="老司机贴" name="thrid">
        <el-row :gutter="5">
          <el-col :span="24"  v-for="(model,key) in ruleForms01" :key="key" style="margin-top: 10px">
            <span>
              <el-card :body-style="{ padding: '0px' }" shadow="hover" >
                <div style="padding: 10px;text-align: left;width: 25%">
                  <el-avatar size="small" :src="model.Avatar"></el-avatar>
                  <div style="float: right;width: 50%">
                    <span style="float: left">{{model.Name}}</span>
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
    </el-tabs>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
export default {
  // 社区界面
  components: {
    Header,
    Footer
  },
  name: 'Community',
  data(){
    return {
      ruleForms01: [],
      ruleForms02: [],
      ruleForms03: [],
      activeName: 'first',
    }
  },
  mounted:function () {
    this.getCommunity01()
    this.getCommunity02()
  },
  methods: {
    getCommunity01() {
      this.axios.get('/community/getCommunity', {
        params: {
        }
      })
      .then((response) => {
        var res = response.data.data
        this.ruleForms01 = res
      })
    },
    getCommunity02() {
      var model = JSON.parse(localStorage.getItem('key'))
      var resCar
      this.axios.get('/carApi/getUserCar', {
        params: {
          carId: model.Carid
        }
      })
        .then((response) => {
          resCar = response.data.data.Carbrand
          console.log(resCar)
          this.axios.get('/community/getCarCommunity', {
            params: {
              userCar: resCar
            }
          })
            .then((response) => {
              var res = response.data.data
              console.log(res)
              this.ruleForms02 = res
            })
        })
    },
  }

}
</script>

<style scoped>

</style>
