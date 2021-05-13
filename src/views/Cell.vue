<template>
  <div class="cell">
    <Header></Header>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: large">汽车展示</span>
      </div>
      <div>
        <img src="../assets/car.png" style="float:left;height: auto;width: 50%;margin-top: 20%"/>
        <img src="../assets/carDetails.png" style="height: auto;width: 50%"/>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: large">健康状态</span>
      </div>
      <div style="width: auto;height: 250px;cursor: default" id="first"></div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: large">损耗情况</span>
      </div>
      <div style="width: auto;height: 400px;cursor: default" id="second"></div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: large">改进建议</span>
      </div>
      {{cellForm.advice}}
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: large">低耗设置</span>
      </div>
      <div class="block">
        <span class="demonstration">引擎</span>
        <el-slider v-model="setForm.exengine"></el-slider>
      </div>
      <div class="block">
        <span class="demonstration">空调</span>
        <el-slider v-model="setForm.exair"></el-slider>
      </div>
      <div class="block">
        <span class="demonstration">芯片</span>
        <el-slider v-model="setForm.exchip"></el-slider>
      </div>
      <div class="block">
        <span class="demonstration">导航</span>
        <el-slider v-model="setForm.exnav"></el-slider>
      </div>
      <div class="block">
        <span class="demonstration">照明</span>
        <el-slider v-model="setForm.exlamp"></el-slider>
      </div>
    </el-card>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import * as echarts from 'echarts';

export default {
// 电池管理界面
  components: {
    Header,
    Footer
  },
  name: 'Cell',
  data(){
    return {
      cellForm: {
        id: '',
        health: '',
        exengine: '',
        exair: '',
        exchip: '',
        exnav: '',
        exlamp: '',
        advice: '',
        electricity: '',
      },
      setForm: {
        exengine: 50,
        exair: 50,
        exchip: 36,
        exnav: 48,
        exlamp: 42
      }
    }
  },
  mounted:function(){
    this.dataInit()
  },
  methods: {
    dataInit () {
      var model = JSON.parse(localStorage.getItem('key'))
      this.axios.get('/cell/getCell', {
        params: {
          cellId: model.Cellid
        }
      })
        .then((responce) => {
          // console.log(responce.data.data)
          var res = responce.data.data
          this.cellForm.id = res.Id;
          this.cellForm.health = res.Health;
          this.cellForm.exengine = res.Exengine;
          this.cellForm.exair = res.Exair;
          this.cellForm.exchip = res.Exchip;
          this.cellForm.exnav = res.Exnav;
          this.cellForm.exlamp = res.Exlamp;
          this.cellForm.advice = res.Advice;
          this.cellForm.electricity = res.Electricity;
          this.echartsInit01()
          this.echartsInit02()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    echartsInit01 () {
      var chartDom = document.getElementById('first');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        series: [{
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          center:['50%','70%'],
          radius:'100%',
          min: 0,
          max: 1,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0.25, '#FF6E76'],
                [0.5, '#FDDD60'],
                [0.75, '#58D9F9'],
                [1, '#7CFFB2']
              ]
            }
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '12%',
            width: 20,
            offsetCenter: [0, '-60%'],
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: 'auto',
              width: 2
            }
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: 'auto',
              width: 5
            }
          },
          axisLabel: {
            color: '#464646',
            fontSize: 20,
            distance: -60,
            formatter: function (value) {
              if (value === 0.875) {
                return '优';
              }
              else if (value === 0.625) {
                return '中';
              }
              else if (value === 0.375) {
                return '良';
              }
              else if (value === 0.125) {
                return '差';
              }
            }
          },
          title: {
            offsetCenter: [0, '-20%'],
            fontSize: 20
          },
          detail: {
            fontSize: 25,
            offsetCenter: [0, '20%'],
            valueAnimation: true,
            formatter: function (value) {
              return Math.round(value * 100) + '分';
            },
            color: 'auto'
          },
          data: [{
            value: this.cellForm.health/100,
            name: '成绩评定'
          }],
        }]
      };

      option && myChart.setOption(option);
    },
    echartsInit02 () {
      var chartDom = document.getElementById('second');
      var myChart = echarts.init(chartDom);
      var option;
      var form = this.cellForm

      option = {
        legend: {
          data: ['常规耗电 ', '实际耗电 ']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '引擎 ', max: 40},
            { name: '空调 ', max: 40},
            { name: '芯片 ', max: 40},
            { name: '导航 ', max: 40},
            { name: '照明 ', max: 40},
          ]
        },
        series: [{
          name: '预算 vs 实际 ',
          type: 'radar',
          data: [
            {
              value: [20, 20, 20, 20, 20],
              name: '常规耗电 '
            },
            {

              value: [form.exengine, form.exair, form.exchip, form.exnav, form.exlamp],
              name: '实际耗电 '
            }
          ]
        }]
      };

      option && myChart.setOption(option);
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 375px;
}
</style>
