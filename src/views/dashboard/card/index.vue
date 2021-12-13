<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Details title="销售额" count="￥ 14554554">
            <template slot="charts">
              <span>周同比 54.44% <span style="color: green;font-size: 18px">▾</span></span>
              &nbsp;&nbsp;&nbsp;
              <span>日同比 54.44% <span style="color: red;font-size: 18px">▴</span></span>
            </template>
            <template slot="footer">
              <span>目前销售额￥ 14554554</span>
            </template>
          </Details>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Details title="访问量" count="455655">
            <template slot="charts">
              <LineCharts></LineCharts>
            </template>
            <template slot="footer">
              <span>日访问量 2222</span>
            </template>
          </Details>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Details title="支付笔数" count="435346">
            <template slot="charts">
              <BarCharts></BarCharts>
            </template>
            <template slot="footer">
              <span>转化率 44%</span>
            </template>
          </Details>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Details title="活动运营效果" count="78%">
            <template slot="charts">
              <ProgressCharts></ProgressCharts>
            </template>
            <template slot="footer">
              <span>周同比 54.44% <span style="color: green;font-size: 18px">▾</span></span>
              &nbsp;&nbsp;&nbsp;
              <span>日同比 54.44% <span style="color: red;font-size: 18px">▴</span></span>
            </template>
          </Details>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Details from './details'
import LineCharts from '../charts/lineCharts'
import BarCharts from '../charts/barCharts'
import ProgressCharts from '../charts/progressCharts'

export default {
  name: 'Card',
  components: { Details, LineCharts, BarCharts, ProgressCharts }
}
</script>

<style scoped>

</style>
