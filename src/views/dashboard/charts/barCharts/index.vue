<template>
  <div class="echarts" ref="charts"></div>
</template>
<script>
import * as echarts from 'echarts'

export default {
  name: 'BarCharts',
  mounted() {
    let barCharts = echarts.init(this.$refs.charts)
    // 指定图表的配置项和数据
    const option = {
      xAxis: {
        /*均分*/
        type: 'category',
        show: false
      },
      grid: {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0
      },
      yAxis: { show: false },
      series: [
        {
          type: 'bar',
          data: [17, 15, 16, 25, 23, 15, 19, 13, 20, 66]
        }
      ]
    }
    barCharts.setOption(option)
  }
}
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
