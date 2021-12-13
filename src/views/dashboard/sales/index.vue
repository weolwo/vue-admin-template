<template>
  <div>
    <el-card class="box-card" style="margin: 10px 0">
      <div slot="header" class="clearfix">
        <!--头部左侧        -->
        <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
          <el-tab-pane label="销售额" name="销售额"></el-tab-pane>
          <el-tab-pane label="访问量" name="访问量"></el-tab-pane>
        </el-tabs>
        <!--头部右侧     -->
        <div class="right">
          <span @click="setDate(0)">今日</span>
          <span @click="setDate(1)">本周</span>
          <span @click="setDate(2)">本月</span>
          <span @click="setDate(3)">本年</span>
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            style="margin: 0 15px;width: 200px"
            value-format="yyyy-MM-DD"
          >
          </el-date-picker>
        </div>
      </div>
      <!--内容区域      -->
      <el-row :gutter="10">
        <el-col :span="18">
          <div class="charts" ref="charts">
          </div>
        </el-col>
        <el-col :span="6">
          <h3>门店销售额排名</h3>
          <ul>
            <li>
              <div class="center">
                <span class="zindex">1</span>
                <span>肯德基</span>
                <span>165611</span>
              </div>
            </li>
            <li>
              <div class="center">
                <span class="zindex">2</span>
                <span>肯德基</span>
                <span>165611</span>
              </div>
            </li>
            <li>
              <div class="center">
                <span class="zindex">3</span>
                <span>肯德基</span>
                <span>165611</span>
              </div>
            </li>
            <li>
              <div class="center">
                <span class="lindex">4</span>
                <span>肯德基</span>
                <span>165611</span>
              </div>
            </li>
            <li>
              <div class="center">
                <span class="lindex">5</span>
                <span>肯德基</span>
                <span>165611</span>
              </div>
            </li>
            <li>
              <div class="center">
                <span class="lindex">6</span>
                <span>肯德基</span>
                <span>165611</span>
              </div>
            </li>
            <li>
              <div class="center">
                <span class="lindex">7</span>
                <span>肯德基</span>
                <span>165611</span>
              </div>
            </li>
            <li>
              <div class="center">
                <span class="lindex">8</span>
                <span>肯德基</span>
                <span>165611</span>
              </div>
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-card>

  </div>
</template>

<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'

export default {
  name: 'Sales',
  data() {
    return {
      activeName: '销售额',
      date: []
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    setDate(index) {
      let start = ''
      let end = ''
      if (index === 0) {
        start = dayjs().format('YYYY-MM-DD')
        end = dayjs().format('YYYY-MM-DD')
      } else if (index === 1) {
        start = dayjs().day(1).format('YYYY-MM-DD')
        end = dayjs().day(7).format('YYYY-MM-DD')
      } else if (index === 2) {
        start = dayjs().startOf('month').format('YYYY-MM-DD')
        end = dayjs().endOf('month').format('YYYY-MM-DD')
      } else {
        start = dayjs().startOf('year').format('YYYY-MM-DD')
        end = dayjs().startOf('year').format('YYYY-MM-DD')
      }
      this.date = [start, end]
    }
  },
  mounted() {
    const myEcharts = echarts.init(this.$refs.charts)
    myEcharts.setOption({
      title: {
        text: `销售额变化图`
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220, 55, 88, 44, 88, 99]
        }
      ]
    })
  }
}
</script>

<style scoped>
.clearfix {
  position: relative;
  width: 100%;
}

.right {
  position: absolute;
  right: 0;
  top: 0;
}

.tab {
  width: 100%;
}

.right span {
  margin: 0 10px;
}

.charts {
  height: 300px;
}

ul {
  list-style: none;
  height: 300px;
  padding: 0;
}

ul li {
  height: 8%;
}

.zindex {
  float: left;
  width: 15px;
  height: 15px;
  background-color: black;
  color: #fff;
  border-radius: 50%;
  text-align: center;
}

.lindex {
  float: left;
  width: 15px;
  height: 15px;
  text-align: center;
}

.center {
  text-align: center;
  display: flex;
  justify-content: space-between;
}
</style>
