<template>
  <div class="line-echarts" ref="charts"></div>
</template>
<script>
import * as echarts from 'echarts'

export default {
  name: 'LineCharts',
  mounted() {
    let lineEcharts = echarts.init(this.$refs.charts)
    // 指定图表的配置项和数据
    const option = {
      xAxis: {
        type: 'category',
        show: false
      },
      yAxis: { show: false },
      series: [
        {
          type: 'line',
          data: [6, 25, 23, 15, 19, 13, 20, 66],
          smooth: true,
          grid: {
            right: 0,
            left: 0,
            top: 0,
            bottom: 0
          },
          /*去除点*/
          itemStyle: {
            opacity: 0,
            color: 'purple'
          },
          /*实现渐变色*/
          areaStyle: {
            opacity: 0.5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'purple'
              },
              {
                offset: 1,
                color: '#fff'
              }
            ])
          }
        }
      ]
    }
    lineEcharts.setOption(option)
  }
}
</script>

<style scoped>
.line-echarts {
  width: 100%;
  height: 100%;
}
</style>
