<template>
  <div id="community">
    <Header></Header>
    <el-tabs v-model="activeName" >
      <el-tab-pane label="同城交流" name="first">
        <el-row :gutter="5">
          <el-col :span="12"  v-for="(model,key) in models" :key="key" style="margin-top: 10px">
            <span @click="gameDetail(model)">
              <el-card :body-style="{ padding: '0px' }" shadow="hover" >
                <img :src="model.url" class="image">
                <div style="padding: 10px;">
                  <span>{{ model.name }}</span>
                  <span style="margin-left: 10px">{{model.price}}</span>
                </div>
              </el-card>
            </span>

          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="同车分享" name="second">同车分享</el-tab-pane>
      <el-tab-pane label="老司机贴" name="thrid">老司机贴</el-tab-pane>
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
      ruleForm: {

      },
      activeName: 'first',
    }
  },
  mounted:function () {

  },
  methods: {

  }

}
</script>

<style scoped>

</style>
