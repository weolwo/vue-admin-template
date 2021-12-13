<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="SPU名称">糇子手机</el-form-item>
      <el-form-item label="SKU名称" value="">
        <el-input label="" value="" placeholder="SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)" value="">
        <el-input label="" value="" placeholder="价格(元)"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)" value="">
        <el-input label="" value="" placeholder="重量(千克)"></el-input>
      </el-form-item>
      <el-form-item label="规格描述" value="">
        <el-input type="textarea" rows="3" label="" value="" placeholder="规格描述"></el-input>
      </el-form-item>
      <el-form-item label="平台属性" value="">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="屏幕尺寸">
            <el-select placeholder="屏幕尺寸">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="无线属性">
            <el-select placeholder="无线属性">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性" value="">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="屏幕尺寸">
            <el-select placeholder="屏幕尺寸">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="无线属性">
            <el-select placeholder="无线属性">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表" value="">
        <el-table border
                  ref="multipleTable"
                  tooltip-effect="dark"
                  style="width: 100%"
        >
          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            label="图片"
            width="120"
          >
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      attrInfoList: [],
      spuSaleAttrList: [],
      spuImageList: []

    }
  },
  methods: {
    // 初始化数据，请求平台属性，销售属性，图片列表
    async getData(category1Id, category2Id, category3Id, row) {
      let attrRet = await this.$API.sku.reqAttrInfoList(category1Id, category2Id, category3Id)
      if (attrRet.code === 200) {
        this.attrInfoList = attrRet.data
      }
      let spuRet = await this.$API.sku.reqSpuSaleAttrList(row.id)
      if (spuRet.code === 200) {
        this.spuSaleAttrList = spuRet.data
      }
      let imgRet = await this.$API.sku.reqSpuImageList(row.id)
      if (imgRet.code === 200) {
        this.spuImageList = imgRet.data
      }
    }
  }
}
</script>

<style scoped>

</style>
