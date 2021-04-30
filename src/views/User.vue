<template>
  <div id="user">
    <Header></Header>
    <a>user</a>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
export default {
  // 用户界面
  components: {
    Header,
    Footer
  },
  name: 'User'
}
</script>

<style scoped>

</style>
