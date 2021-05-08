<template>
  <div>
    <Header></Header>
    <div>
      <ChargingEcharts v-if="childrun" ref="children"></ChargingEcharts>
      <div v-else class="baidumap" id="allmap"></div>
    </div>

    <el-button icon="el-icon-full-screen" circle @click="childRun"></el-button>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import ChargingEcharts from '../components/ChargingEcharts'
export default {
  components: {
    Header,
    Footer,
    ChargingEcharts,
  },
  name: 'ChargerTrue',
  data() {
    return {
      childrun: false,
      position_NKYYGS: {
        Name: '新能源充电桩',
        address: '浙江省杭州市江干区2号大街1158号',
        bdLNG: 120.350437,
        bdLAT: 30.321616,
      },
      chargerId: '',
    }
  },
  created () {
    this.chargerId = this.$route.params.id
  },
  mounted:function () {
    this.getChargerId()

  },
  methods: {
    childRun () {
      this.childrun = true
    },
    getChargerId() {
      this.axios.get('/charger/getCharger', {
        params: {
          id: this.chargerId
        }
      })
        .then((response) => {
          var res = response.data.data[0]
          var position = this.position_NKYYGS
          position.address = res.address
          position.bdLAT = parseFloat(res.Bdlab)
          position.bdLNG = parseFloat(res.Bdlng)
          this.baiduMap();
        })
    },
    baiduMap() {
      var map = new BMap.Map('allmap'); // 创建地图实例
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      map.addControl(new BMap.NavigationControl());
      map.addControl(new BMap.ScaleControl());
      map.addControl(new BMap.OverviewMapControl());
      map.addControl(new BMap.MapTypeControl());
      // map.setMapStyle({ style: 'midnight' }) //地图风格

      map.clearOverlays();
      //将数据遍历
      //自定义信息窗口内容
      var sContent =
        '<div style="width:300px;"><p style="font-size:16px;font-weight:bold;margin-top: 10px;color:#D07852">' +
        this.position_NKYYGS.Name +
        '</p><p style="font-size:13px;margin: 5px 0;">地址：' +
        this.position_NKYYGS.address +
        '</p><p style="font-size:13px;margin: 5px 0;">坐标：' +
        this.position_NKYYGS.bdLNG +
        ',' +
        this.position_NKYYGS.bdLAT;
      ('</div>');
      var point = new BMap.Point(this.position_NKYYGS.bdLNG, this.position_NKYYGS.bdLAT); // 创建点坐标
      var marker = new BMap.Marker(point);
      map.addOverlay(marker);
      map.centerAndZoom(point, 18); // 初始化地图，设置中心点坐标和地图级别
      // //点击图标时候调用信息窗口
      var infoWindow = new BMap.InfoWindow(sContent);
      marker.addEventListener('click', function() {
        this.openInfoWindow(infoWindow);
      });
    }
  }

}
</script>

<style scoped>
.baidumap {
  width: 390px;
  height: 400px
}

</style>
