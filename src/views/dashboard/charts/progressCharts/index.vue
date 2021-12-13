<template>
  <div class="echarts" ref="charts"></div>
</template>
<script>
import * as echarts from 'echarts'

export default {
  name: 'ProgressCharts',
  mounted() {
    let charts = echarts.init(this.$refs.charts)
    // 指定图表的配置项和数据
    const option = {
      xAxis: {
        show: false,
        /*进度条效果*/
        min: 0,
        max: 100
      },
      grid: {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0
      },
      yAxis: {
        show: false, /*y轴均分*/
        type: 'category'
      },
      series: [
        {
          type: 'bar',
          data: [75],
          barWidth: 20,
          color: 'yellowgreen',
          /*背景设置*/
          showBackground: true,
          backgroundStyle: {
            color: '#eee'
          },
          label: {
            show: true,
            formatter: '|',
            position: 'right'
          }
        }
      ]
    }
    charts.setOption(option)
  }
}
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
