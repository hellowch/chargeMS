<template>
  <div style="width: auto;height: 400px" id="main"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'orderEcharts',
  data() {
    return {

    }
  },
  mounted:function(){
    this.echartsInit()
    this.echartsInit2()
  },
  methods: {
    echartsInit() {
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }]
      };

      option && myChart.setOption(option);
    },
    echartsInit2(){
      var model = JSON.parse(localStorage.getItem('key'))
      var myDate = new Date();
      console.log(myDate.getFullYear()+'-'+myDate.getMonth())
      this.axios.get('/charger/getSumOrder', {
        params: {
          timeDate: myDate.getFullYear()+'-'+myDate.getMonth()
        }
      })
        .then((responce) => {
          console.log(responce.data.data)
          var res = responce.data.data

        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

}
</script>

<style scoped>

</style>
