<template>
  <div class="container">
    <div class="block">
      <span class="demonstration"></span>
      <el-date-picker
        v-model="orderMouth"
        type="month"
        placeholder="选择月"
        format="yyyy-MM"
        value-format="yyyy-MM">
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" @click="orderSum(orderMouth)">搜索</el-button>
    </div>
    <a style="font-size: large">总金额:{{sumAmount}}</a>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      size="mini">
      <el-table-column
        prop="Amount"
        label="金额"
        width="100">
      </el-table-column>
      <el-table-column
        prop="Time"
        label="时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="Length"
        label="使用时长">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
name: "SumOrder",
  data() {
    return {
      orderMouth: '',
      tableData: [],
      sumAmount: '',
    }
  },
  mounted:function(){

  },
  methods: {
    orderSum(thisTime) {
      var model = JSON.parse(localStorage.getItem('key'))
      this.axios.get('/charger/getSumOrder', {
        params: {
          userId: model.Id,
          useTime: thisTime
        }
      })
        .then((responce) => {
          console.log(responce.data.data)
          var res = responce.data.data
          this.tableData = res.chargerOrder
          this.sumAmount = res.sumAmount
        })
        .catch((error) => {
          console.log(error)
        })

    },

  }
}
</script>

<style scoped>

</style>
