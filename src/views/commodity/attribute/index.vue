<template>
  <div>
    <el-card style="margin: 15px 0">
      <ClassificationSelect @getClassificationId="getClassificationId" :show="!isShowTable"></ClassificationSelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <!-- 只有选择了三级分类时，按钮才可以使用        -->
        <el-button type="primary" icon="el-icon-plus" :disabled="!classificationId3" @click="resetAttr">新增属性
        </el-button>
        <el-table :data="attributeList">
          <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
          <el-table-column label="属性名称" property="attrName" width="150" align="center"></el-table-column>
          <el-table-column label="属性值列表" width="width" align="center">
            <template slot-scope="{row,$index}">
              <el-tag v-for="attr in row.attrValueList" :key="attr.id" style="margin: 0 15px">{{ attr.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="{row,$index}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)">修改</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form inline="inline" :model="attributeInfo">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名称" v-model="attributeInfo.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attributeInfo.attrName" @click="addAttrValue">添加属性
        </el-button>
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table border style="margin: 20px 0" :data="attributeInfo.attrValueList">
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column label="属性值名称" width="width" property="valueName">
            <template slot-scope="{row,$index}">
              <!--    编辑模式和查看模式的相互切换，给每一个元素做一个标记 flag    :ref="$index"动态的拿到元素     -->
              <el-input v-if="row.flag" placeholder="请输入属性值名称" v-model="row.valueName" size="mini" :ref="$index"
                        @blur="updateFlag(row,$index)" @keyup.enter.native="row.flag=false"
              ></el-input>
              <span v-else-if="!row.flag" style="display: block" @click="goEdit(row,$index)">{{ row.valueName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="{row,$index}">
              <!--    气泡确认框          -->
              <el-popconfirm :title="`确定删除${row.valueName}吗？`" @confirm="deleteAttrValue(row,$index)">
                <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="saveOrUpdateAttribute" :disabled="attributeInfo.attrValueList.length<=0">保存
        </el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'Attribute',
  data() {
    return {
      classificationId1: '',
      classificationId2: '',
      classificationId3: '',
      attributeList: [],
      isShowTable: true,
      attributeInfo: {
        attrName: '',
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3
      }
    }
  },
  methods: {
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
        this.getAttributeInfoList()
      }
    },
    async getAttributeInfoList() {
      const result = await this.$API.attribute.reqGetAttributeInfoList(this.classificationId1, this.classificationId2, this.classificationId3)
      if (result.code === 200) {
        this.attributeList = result.data
      }
    },
    /*新增属性值*/
    addAttrValue() {
      this.attributeInfo.attrValueList.push({ valueName: '', attrId: this.attributeInfo.id, flag: true })
      // 新增的时候获取焦点
      this.$nextTick(() => {
        this.$refs[this.attributeInfo.attrValueList.length - 1].focus()
      })
    },
    /*删除属性值*/
    deleteAttrValue(row, index) {
      this.attributeInfo.attrValueList.splice(index, 1)
    },
    /*在新增和修改之前清楚之前的缓存*/
    resetAttr() {
      this.isShowTable = false
      // 清空缓存
      this.attributeInfo = {
        attrName: '',
        attrValueList: [],
        categoryId: this.classificationId3,
        categoryLevel: 3
      }
    },
    updateAttr(row) {
      this.isShowTable = false
      this.attributeInfo = cloneDeep(row)
      // 修改的时候，由于服务器请求来的数据，没有flag标记，导致无法进行编辑和查看模式的切换，需要手动给它添加flag属性，但是直接给数组里面某个对象
      // 添加属性，数据并不是响应式的，需要借助vue的set api
      this.attributeInfo.attrValueList.forEach(e => {
        this.$set(e, 'flag', false)
      })
    },
    updateFlag(row) {
      // 校验用户输入的数据是否为控股符
      if (row.valueName.trim() === '') {
        this.$message('请输入有效的属性值')
        return
      }
      // 校验用户输入的属性值是否有重复
      let isRepeat = this.attributeInfo.attrValueList.some(e => {
        //不是自己
        if (e !== row) {
          return e.valueName === row.valueName
        }
      })
      if (isRepeat) {
        this.$message('属性值已存在')
        return
      }
      row.flag = false
    },
    goEdit(row, index) {
      // 获取到当前的input元素
      row.flag = true
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    /*保存属性值*/
    async saveOrUpdateAttribute() {
      // 过滤掉空的数据和删除flag, 会返回一个新的数组
      this.attributeInfo.attrValueList = this.attributeInfo.attrValueList.filter((e) => {
        if (e.valueName !== '') {
          delete e.flag
          return true
        }
      })
      try {
        await this.$API.attribute.reqSaveOrUpdateAttributeInfo(this.attributeInfo)
        this.isShowTable = true
        await this.getAttributeInfoList()
        this.$message({ type: 'success', message: '保持成功' })
      } catch (Error) {
        this.$message('保持失败')
      }

    }
  }
}
</script>
<style scoped>

</style>
