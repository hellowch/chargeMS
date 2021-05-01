<template>
  <div class="cell">
    <Header></Header>
    <a>cell cell cell cell</a>
    <el-button type="primary" @click="clickTest()">主要按钮</el-button>
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

  name: 'Cell',
  methods: {
    //按钮点击测试
    clickTest () {
      this.axios
        .get("/api/v2/banners")
        .then(function (response) {
          console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);
          console.log(response.config);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}
</script>

<style scoped>

</style>
