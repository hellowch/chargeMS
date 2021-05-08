<template>
  <div style="width: auto;height: 400px" id="main"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'ChargingEcharts',
  data() {
    return {
      chargingRun: false,
    }
  },
  mounted:function(){
    this.chargingEchartsInit()
  },
  methods: {
    chargingEchartsInit() {
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        series: [{
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              borderWidth: 1,
              borderColor: '#464646'
            }
          },
          axisLine: {
            lineStyle: {
              width: 40
            }
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 50
          },
          data: [
            {
              value: 60,
              title: {
                offsetCenter: ['0%', '0%']
              },
              detail: {
                offsetCenter: ['0%', '0%']
              }
            },

          ],
          title: {
            fontSize: 14
          },
          detail: {
            width: 50,
            height: 14,
            fontSize: 14,
            color: 'auto',
            borderColor: 'auto',
            borderRadius: 20,
            borderWidth: 1,
            formatter: '{value}%',
          }
        }]
      };

      var interval = setInterval(function () {
        option.series[0].pointer.show = false;
        option.series[0].data[0].value += 5;
        if (option.series[0].data[0].value === 100) {
          clearInterval(interval)
        }
        myChart.setOption(option, true);
      }, 2000);
      option && myChart.setOption(option);
    },

  }
}
</script>

<style scoped>

</style>
