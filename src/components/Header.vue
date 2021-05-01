<template>
  <div class="m-content">
    <el-header class="h_header element.style">
      <el-row class="demo-avatar demo-basic">
        <el-col :span="1">
          <div class="demo-basic--circle">
            <div class="block"><el-avatar :size="35" :src="circleUrl"></el-avatar></div>
          </div>
        </el-col>
<!--        <div class="icon-warp">-->
<!--          <i class="el-icon-search"></i>-->
<!--          <i style="margin-left: 10px" class="el-icon-message"></i>-->
<!--        </div>-->
      </el-row>

    </el-header>
  </div>

</template>

<script>
// 引入element-ui依赖
export default {
  name: 'Header',
  data () {
    return {
      circleUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }
  },
  mounted:function(){
    this.getavatar();//需要触发的函数
  },
  methods: {
    getavatar(){
      if (this.$route.path != '/register' && this.$route.path != '/'){
        var model = JSON.parse(localStorage.getItem('key'))
        // console.log(model.Avatar)
        this.circleUrl = model.Avatar
      }
    }
  }

}
</script>

<style scoped>
.m-content {
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
}
.maction {
  margin: 10px 0;
}
.h_header{
  height: 60px !important;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 1;
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.el-divider{
  margin: 5px 0;
}
.el-avatar{
  margin-top: 5px;
}
.icon-warp{
  position: relative;
  margin-top: 15px;
  text-align: right;
  font-size: 50px;
}
</style>
