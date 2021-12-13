<template>
  <div>
    <el-card style="margin: 20px 0">
      <ClassificationSelect @getClassificationId="getClassificationId" :show="scene!==0"></ClassificationSelect>
    </el-card>
    <el-card>
      <div v-show="scene===0">
        <el-button type="primary" icon="el-icon-plus" :disabled="!classificationId3" @click="addSpu">添加SPU</el-button>
        <el-table border :data="spuList">
          <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
          <el-table-column property="spuName" width="width" label="SPU名称"></el-table-column>
          <el-table-column property="description" width="width" label="SPU描述"></el-table-column>
          <el-table-column property="index" width="width" label="操作">
            <template slot-scope="{row,$index}">
              <HintButton @click="addSku(row)" type="success" icon="el-icon-plus" size="mini" title="添加sku"
              ></HintButton>
              <HintButton type="warning" icon="el-icon-edit" size="mini" title="修改spu" @click="editSpu(row)"
              ></HintButton>
              <HintButton type="info" icon="el-icon-info" size="mini" title="查看当前spu的全部sku"></HintButton>
              <el-popconfirm
                :title="`确定删除${row.spuName}吗？`"
                @confirm="deleteSpu(row)"
              >
                <HintButton type="danger" icon="el-icon-delete" slot="reference" size="mini"
                            title="删除spu"
                ></HintButton>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          :total="total"
          :current-page="page"
          :page-size="limit"
          :page-sizes="[3, 5, 10]"
          layout="prev, pager, next,sizes,total"
          style="text-align: center;margin-top: 20px"
          @size-change="handleSizeChange"
          @current-change="getSpuList"
        >
        </el-pagination>
      </div>
      <SpuForm v-show="scene===1" @changeScene="changeScene" ref="spu"></SpuForm>
      <sku-form v-show="scene===2" ref="sku"></sku-form>
    </el-card>
  </div>
</template>

<script>
import SkuForm from './skuForm'
import SpuForm from './spuForm'
import { reqDeleteSpu } from '@/api/commodity/spu'

export default {
  name: 'Spu',
  // 注册组件
  components: { SkuForm, SpuForm },
  data() {
    return {
      scene: 0, // 0 默认显示主界面，1显示修改编辑spu,2 显示添加sku
      total: 10,
      page: 1,
      limit: 3,
      spuList: [],
      isShowTable: true,
      classificationId1: '',
      classificationId2: '',
      classificationId3: ''
    }
  },
  methods: {
    /*添加sku*/
    addSku(row) {
      this.scene = 2
      this.$refs.sku.getData(this.classificationId1, this.classificationId2, this.classificationId3, row)
    },
    /*删除spu*/
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id)
      if (result.code === 200) {
        this.$message({ type: 'success', message: '删除成功' })
      }
      // 刷新列表
      await this.getSpuList(this.spuList.length > 1 ? this.page : this.page - 1)
    },
    getClassificationId({ classificationId, level }) {
      if (level === 1) {
        this.classificationId1 = classificationId
        // 清空 2级和3级缓存
        this.classificationId2 = ''
        this.classificationId3 = ''
      } else if (level === 2) {
        this.classificationId2 = classificationId
        this.classificationId3 = ''
      } else {
        // 3个id都有了的时候，就可以发起请求
        this.classificationId3 = classificationId
        // 发起请求
        this.getSpuList()
      }
    },
    async getSpuList(page = 1) {
      this.page = page
      let result = await this.$API.spu.reqSpuList(this.page, this.limit, this.classificationId3)
      if (result.code === 200) {
        this.spuList = result.data.records
        this.total = result.data.total
      }
    },
    /*切换页大小*/
    handleSizeChange(sizes) {
      this.limit = sizes
      this.getSpuList(this.page)
    },
    addSpu() {
      this.scene = 1
      this.$refs.spu.addSpuInfo(this.classificationId3)
    },
    /*点击编辑的时候，需要在子组件 spuForm种发送请求，一级当当前编辑的对象传递给子组件*/
    editSpu(row) {
      this.scene = 1
      this.$refs.spu.initSpuFormDate(row)
    },
    changeScene({ scene, flag }) {
      this.scene = scene
      // 刷新列表, 如果是新增，回到首页，否则停留在当页
      if (flag === 0) {
        this.getSpuList(this.page)
      } else {
        this.getSpuList()
      }
    }
  }
}
</script>

<style scoped>

</style>
