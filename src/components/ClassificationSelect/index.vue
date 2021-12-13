<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select placeholder="请选择" v-model="cForm.classificationId1" @change="handled1" :disabled="show">
          <el-option :label="c1.name" v-model="c1.id" v-for="c1 in list1" :key="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择" v-model="cForm.classificationId2" @change="handled2" :disabled="show">
          <el-option :label="c2.name" v-model="c2.id" v-for="c2 in list2" :key="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" v-model="cForm.classificationId3" @change="handled3" :disabled="show">
          <el-option :label="c3.name" v-model="c3.id" v-for="c3 in list3" :key="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'ClassificationSelect',
  props: ['show'],
  data() {
    return {
      cForm: {
        classificationId1: '',
        classificationId2: '',
        classificationId3: ''
      },
      list1: [],
      list2: [],
      list3: []
    }
  },
  mounted() {
    this.getClassification1List()
  },
  methods: {
    async getClassification1List() {
      const result = await this.$API.attribute.reqGetClassification1List()
      if (result.code === 200) {
        this.list1 = result.data
      }
    },
    async handled1() {
      this.$emit('getClassificationId', { classificationId: this.cForm.classificationId1, level: 1 })
      // 清除2级和3级的数据和id
      this.list2 = []
      this.list3 = []
      this.cForm.classificationId2 = ''
      this.cForm.classificationId3 = ''
      const result = await this.$API.attribute.reqGetClassification2List(this.cForm.classificationId1)
      if (result.code === 200) {
        this.list2 = result.data
      }
    },
    async handled2() {
      this.$emit('getClassificationId', { classificationId: this.cForm.classificationId2, level: 2 })
      // 清除3级的数据和id
      this.list3 = []
      this.cForm.classificationId3 = ''
      const result = await this.$API.attribute.reqGetClassification3List(this.cForm.classificationId2)
      if (result.code === 200) {
        this.list3 = result.data
      }
    },
    handled3() {
      this.$emit('getClassificationId', { classificationId: this.cForm.classificationId3, level: 3 })
    }
  }
}
</script>

<style scoped>

</style>
