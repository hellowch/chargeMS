<template>
  <div class="cell">
    <Header></Header>
    <a>cell cell cell cell</a>
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
  // data(){
  //
  // },
  created(){
    // const key = JSON.parse(localStorage.getItem('key'));

  },
  methods: {

  }
}
</script>

<style scoped>

</style>
