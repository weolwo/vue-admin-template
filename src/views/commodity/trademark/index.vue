<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="showDialog">添加</el-button>
    <el-table
      border
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        label="序号"
        type="index"
        width="50"
      >
      </el-table-column>
      <el-table-column
        property="tmName"
        label="品牌名称"
        width="width"
      >
      </el-table-column>
      <el-table-column
        property="logoUrl"
        label="LOGO"
        width="width"
      >
        <template slot-scope="{row,$index}">
          <img :src="row.logoUrl" style="width: 100px;height: 100px">
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="{row,$index}">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateDialog(row)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTrademark(row)">删除</el-button>
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
      @current-change="getTrademarkList"
    >
    </el-pagination>
    <!--  添加，修改对话框  -->
    <el-dialog title="新增品牌" :visible.sync="dialogFormVisible">
      <el-form style="width: 80%" :model="trademarkForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" prop="tmName">
          <el-input autocomplete="off" v-model="trademarkForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="trademarkForm.logoUrl" :src="trademarkForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTrademark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。
// 提交表单前，调用validate方法
export default {
  name: 'Trademark',
  data() {
    return {
      page: 1,
      limit: 3,
      total: 0,
      list: [],
      dialogFormVisible: false,
      trademarkForm: {
        logoUrl: '',
        tmName: '',
        id: ''
      },
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'change' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'change' }
        ],
        logoUrl: [
          { required: true, message: '请选择logo图片' }
        ]
      }
    }
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.getTrademarkList()
  },
  methods: {
    async getTrademarkList(pager) {
      this.page = pager
      const result = await this.$API.trademark.reqGetTrademarkList(this.page, this.limit)
      // eslint-disable-next-line no-empty
      if (result.code === 200) {
        console.log(result)
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    /*切换页大小*/
    handleSizeChange(sizes) {
      this.limit = sizes
      this.getTrademarkList(this.page)
    },
    /*新增品牌对话框*/
    showDialog() {
      this.dialogFormVisible = true
      this.trademarkForm.logoUrl = ''
      this.trademarkForm.tmName = ''
    },
    updateDialog(row) {
      this.dialogFormVisible = true
      this.trademarkForm.logoUrl = row.logoUrl
      this.trademarkForm.tmName = row.tmName
      this.trademarkForm.id = row.id
    },
    handleAvatarSuccess(res, file) {
      this.trademarkForm.logoUrl = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    /*添加或者修改品牌*/
    addOrUpdateTrademark() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          this.dialogFormVisible = false
          let result = await this.$API.trademark.reqAddOrUpdateTrademark(this.trademarkForm)
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: this.trademarkForm.id ? '修改成功' : '新增成功'
            })
            await this.getTrademarkList(this.page)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    deleteTrademark(row) {
      this.$confirm(`你确定要删除${row.tmName}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        //确定时触发
        let result = await this.$API.trademark.reqDeleteTrademark(row.id)
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          //处理页码问题，如果长度大于1 留在当前页，否则返回上一页
          await this.getTrademarkList(this.list.length > 1 ? this.page : this.page - 1)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
