<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spuInfo">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spuInfo.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spuInfo.tmId">
          <el-option :label="tm.tmName" :value="tm.id" v-for="tm in trademarkList" :key="tm.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" rows="3" placeholder="SPU描述" v-model="spuInfo.description"></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
          :on-success="uploadSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unusedSaleAttrList.length}未选择`" v-model="saleAttrIdName">
          <el-option :label="saleAttr.name" :value="`${saleAttr.id}:${saleAttr.name}`"
                     v-for="saleAttr in unusedSaleAttrList"
                     :key="saleAttr.id"
          >
          </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!saleAttrIdName" @click="addSaleAttr">添加销售属性
        </el-button>
        <el-table border style="margin: 20px 0" :data="spuInfo.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column label="属性名称" width="width" property="saleAttrName">
          </el-table-column>
          <el-table-column label="属性值名称" width="width" property="saleAttrValueName">
            <template slot-scope="{row,$index}">
              <el-tag
                :key="tag.id"
                v-for="(tag,index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index,1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">新增</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="{row,$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini"
                         @click="spuInfo.spuSaleAttrList.splice($index,1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      saleAttrIdName: '',
      dialogImageUrl: '',
      dialogVisible: false,
      spuInfo: {
        spuName:'',
        description:'',
        tmId:'',
        spuSaleAttrList:[]
      },
      trademarkList: [],
      saleAttrList: [],
      spuImageList: []
    }
  },
  computed: {
    /*过滤未使用的销售属性*/
    unusedSaleAttrList() {
      return this.saleAttrList.filter((e) => {
        // 如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。
        return this.spuInfo.spuSaleAttrList.every((e2) => {
          return e.name !== e2.saleAttrName
        })
      })
    }
  },
  methods: {
    cancel() {
      this.$emit('changeScene', { scene: 0, flag: this.spuInfo.id ? 0 : 1 })
      // 清空缓存
      Object.assign(this._data, this.$options.data())
    },
    async addSpuInfo(category3Id) {
      this.spuInfo.category3Id = category3Id

      // 请求商标和 销售属性数据
      let retTrademark = await this.$API.spu.reqTrademarkList()
      if (retTrademark.code === 200) {
        this.trademarkList = retTrademark.data
      }
      let retSaleAttrList = await this.$API.spu.reqBaseSaleAttrList()
      if (retSaleAttrList.code === 200) {
        this.saleAttrList = retSaleAttrList.data
      }
    },
    async addOrUpdateSpu() {
      // 整理图片数据
      this.spuImageList.forEach((e) => {
        e.imgName = e.name
        if (e.response) {
          e.imgUrl = e.response.data || e.url
        } else {
          e.imgUrl = e.url
        }
      })
      this.spuInfo.spuImageList = this.spuImageList

      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spuInfo)
      if (result.code === 200) {
        this.$emit('changeScene', { scene: 0, flag: this.spuInfo.id ? 0 : 1 })
        this.$message({ type: 'success', message: '操作成功' })
      }
      // 清空缓存
      Object.assign(this._data, this.$options.data())
    },
    addSaleAttr() {
      // 解构销售属性id和name
      let [baseSaleAttrId, saleAttrName] = this.saleAttrIdName.split(':')
      let spuSaleAttr = { baseSaleAttrId, saleAttrName, spuId: '', spuSaleAttrValueList: [], inputVisible: false }
      this.spuInfo.spuSaleAttrList.push(spuSaleAttr)
      this.saleAttrIdName = ''
    },

    showInput(row) {
      row.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm(row) {
      if (row.inputValue === '') {
        return this.$message('属性值名称不能为空')
      }
      let { baseSaleAttrId, saleAttrName } = row
      let newValue = { baseSaleAttrId, saleAttrName, saleAttrValueName: row.inputValue }
      // 校验是否重复添加
      let ret = row.spuSaleAttrValueList.some((e) => e.saleAttrValueName === row.inputValue)
      if (ret) {
        return this.$message('属性值名称不能重复')
      }
      row.spuSaleAttrValueList.push(newValue)
      row.inputVisible = false
      row.inputValue = ''
    },
    handleRemove(file, fileList) {
      this.spuImageList = fileList
    },
    uploadSuccess(response, file, fileList) {
      this.spuImageList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    async initSpuFormDate(row) {
      // 获取spu信息
      let retSpu = await this.$API.spu.reqSpuInfo(row.id)
      if (retSpu.code === 200) {
        this.spuInfo = retSpu.data
        this.spuInfo.spuSaleAttrList.forEach((e) => {
          this.$set(e, 'inputVisible', false)
        })
      }
      let retTrademark = await this.$API.spu.reqTrademarkList()
      if (retTrademark.code === 200) {
        this.trademarkList = retTrademark.data
      }
      let retSaleAttrList = await this.$API.spu.reqBaseSaleAttrList()
      if (retSaleAttrList.code === 200) {
        this.saleAttrList = retSaleAttrList.data
      }
      let retImageList = await this.$API.spu.reqSpuImageList(row.id)
      if (retImageList.code === 200) {
        // 根据官方文档要求处理图片名称和url
        let tempImageList = retImageList.data
        tempImageList.forEach((e) => {
          e.name = e.imgName
          e.url = e.imgUrl
        })
        this.spuImageList = tempImageList
      }
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

