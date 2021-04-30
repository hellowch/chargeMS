<template>
  <div class="m-content">
    <el-footer class="f_footer">
      <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item style="padding-left: 25px;padding-right: 25px" index="1"><el-link href="/#/Cell">电池</el-link></el-menu-item>
        <el-menu-item style="padding-left: 25px;padding-right: 25px" index="2"><el-link href="/#/Charger">充电桩</el-link></el-menu-item>
        <el-menu-item index="3"><el-link href="/#/Community">社区</el-link></el-menu-item>
        <el-menu-item style="padding-left: 34px;padding-right: 34px" index="4"><el-link href="/#/User">我</el-link></el-menu-item>
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
</style>
