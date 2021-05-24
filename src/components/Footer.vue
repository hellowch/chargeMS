<template>
  <div class="m-content">
    <el-footer class="f_footer">
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item class="menu-style" index="1"><el-link icon="el-icon-s-help" href="/#/Cell">电池</el-link></el-menu-item>
        <el-menu-item class="menu-style" index="2"><el-link icon="el-icon-s-opportunity" href="/#/Charger">充电</el-link></el-menu-item>
        <el-menu-item class="menu-style" index="3"><el-link icon="el-icon-s-home" href="/#/Community">社区</el-link></el-menu-item>
        <el-menu-item class="menu-style" index="4"><el-link icon="el-icon-s-custom" href="/#/User">我的</el-link></el-menu-item>
      </el-menu>
    </el-footer>
  </div>
</template>

<script>
export default {
  name: 'Footer'
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
.f_footer{
  height: 50px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  background-color: #FFFFFF;
}
.el-menu-demo{
  width: 100%;
}
.menu-style{
  padding-left: 10px;
  padding-right: 15px;
}
</style>
