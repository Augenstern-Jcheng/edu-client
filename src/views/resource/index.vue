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
        <el-button>添加</el-button>
        <el-button>资源分类</el-button>
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
        prop="createdTime"
        label="添加时间">
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
    </el-card>
  </div>
</template>

<script>
import { getResourceCategory, getResourcePages } from '@/services/resource'
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
      tableData: [],
      resourceCategorys: [],
      resourceData: [],
      // 总数
      total: null,
      isloading: false
    }
  },
  created () {
    // 获取资源分类
    this.loadResourceCategory()
    // 获取列表信息
    this.loadResourcePages()
  },
  methods: {
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
    handleEdit (rowData) {

    },
    handleDelete (rowData) {

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
