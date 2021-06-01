<template>
  <div class="resource">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
          <el-form-item label="资源名称" prop="name">
            <el-input v-model="form.name" placeholder="资源名称"></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop='url'>
            <el-input v-model="form.url" placeholder="资源路径"></el-input>
          </el-form-item>
          <el-form-item label="资源分类" prop="categoryId">
            <el-select v-model="form.categoryId" placeholder="资源分类">
              <el-option
                v-for="item in resourceCategorys"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm">重置</el-button>
            <el-button type="primary" @click="onSubmit" :disabled='isloading'>查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn">
        <el-button @click="addResource">添加</el-button>
        <el-button disabled>资源分类</el-button>
      </div>
      <el-divider></el-divider>
      <el-table
      :data="resourceData"
      style="width: 100%"
      v-loading="isloading"
      >
      <el-table-column
        type="index"
        label="序号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="资源名称">
      </el-table-column>
      <el-table-column
        prop="url"
        label="资源路径">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述">
      </el-table-column>
      <el-table-column
        label="添加时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createdTime | dataFormat }}</span>
        </template>
      </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="danger">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="form.current"
      :page-sizes="[10, 15, 20]"
      :page-size="form.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :disabled='isloading'
      >
    </el-pagination>
      <el-dialog
        :title="isEdit ? '编辑资源' : '新建资源'"
        :visible.sync="dialogVisible"
        width="30%">
        <el-form ref="saveForm" :model="saveForm" label-width="80px">
          <el-form-item label="资源名称">
            <el-input v-model="saveForm.name"></el-input>
          </el-form-item>
          <el-form-item label="资源分类">
            <el-select v-model="saveForm.categoryId" placeholder="资源分类">
              <el-option
                v-for="item in resourceCategorys"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="资源路径">
            <el-input v-model="saveForm.url"></el-input>
          </el-form-item>
          <el-form-item label="资源描述">
            <el-input type="textarea" :row="5" v-model="saveForm.description"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeEdit">取 消</el-button>
            <el-button type="primary" @click="saveOrEditResource">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getResourceCategory, getResourcePages, deleteResourcePages, saveOrUpdate, getResourceById } from '@/services/resource'
export default {
  name: 'resource',
  data () {
    return {
      form: {
        id: '',
        name: '',
        url: '',
        categoryId: '',
        current: 1,
        size: 10
      },
      saveForm: {
        id: '',
        name: '',
        categoryId: '',
        url: '',
        description: ''
      },
      tableData: [],
      resourceCategorys: [],
      resourceData: [],
      // 总数
      total: null,
      isloading: false,
      dialogVisible: false,
      isEdit: false
    }
  },
  created () {
    // 获取资源分类
    this.loadResourceCategory()
    // 获取列表信息
    this.loadResourcePages()
  },
  filters: {
    dataFormat (date) {
      date = new Date(date)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}
      ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }
  },
  methods: {
    closeEdit () {
      this.dialogVisible = false
      this.saveForm = {}
    },
    // 新建资源
    async saveOrEditResource () {
      this.saveForm = {}
      this.dialogVisible = false
      const { data } = await saveOrUpdate(this.saveForm)
      if (data.code === '000000') {
        this.$message.success('创建成功')
        this.loadResourcePages()
        this.saveForm = {}
      }
    },
    handleSizeChange (val) {
      this.form.size = val
      this.loadResourcePages()
    },
    handleCurrentChange (val) {
      this.form.current = val
      this.loadResourcePages()
    },
    // 查询功能
    onSubmit () {
      this.loadResourcePages()
    },
    // 新增
    addResource () {
      this.dialogVisible = true
      this.isEdit = false
    },
    // 编辑
    async handleEdit (rowData) {
      this.dialogVisible = true
      this.isEdit = true
      const { data } = await getResourceById(rowData.id)
      if (data.code === '000000') {
        this.saveForm = data.data
      }
    },
    handleDelete (rowData) {
      this.$confirm('此操作将永久删除该资源, 是否继续?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await deleteResourcePages(rowData.id)
        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.loadResourcePages()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    resetForm () {
      this.$refs.form.resetFields()
    },
    async loadResourceCategory () {
      const { data } = await getResourceCategory()
      if (data.code === '000000') {
        this.resourceCategorys = data.data
      }
    },
    async loadResourcePages () {
      this.isloading = true
      this.form.current = 1
      const { data } = await getResourcePages(this.form)
      if (data.code === '000000') {
        this.resourceData = data.data.records
        this.total = data.data.total
        this.isloading = false
      }
    }
  }
}
</script>
<style lang='scss' scoped></style>
