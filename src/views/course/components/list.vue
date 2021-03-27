<template>
<div class='course-list'>
    <el-card>
      <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="课程名称">
            <el-input v-model="form.courseName" placeholder="课程名称"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="请选择状态">
              <el-option label="全部" value="" selected></el-option>
              <el-option label="下架" value="0"></el-option>
              <el-option label="上架" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-button type="info" @click="createCourse" class="el-icon-plus createBtn">新建课程</el-button>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-table
      :data="courseData"
      isloading='isloading'
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="courseName"
        label="课程名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="discounts"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="sortNum"
        label="排序">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            @change="updateStatus(scope.row)"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)">编辑</el-button>
          <el-button @click="handleMenage(scope.row)">内容管理</el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="form.currentPage"
      :page-sizes="[10, 20, 30]"
      :page-size="form.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
</div>
</template>

<script>
import { getQueryCourses, changeState } from '@/services/course'
export default {
  name: 'courseList',
  data () {
    return {
      form: {
        courseName: '',
        pageSize: 10,
        currentPage: 1,
        status: null
      },
      courseData: [],
      isloading: false,
      total: null
    }
  },
  created () {
    // 获取课程信息
    this.loadQueryCourses()
  },
  methods: {
    // 获取课程信息
    async loadQueryCourses () {
      const { data } = await getQueryCourses(this.form)
      if (data.code === '000000') {
        this.courseData = data.data.records
        this.total = data.data.total
      }
    },
    // 新建课程
    createCourse () {
      this.$router.push({ name: 'CreateOrEdit', params: { courseId: '' } })
    },
    // 上架状态发生改变
    async updateStatus (rowData) {
      this.form.status = rowData.status
      const { data } = await changeState(rowData.id, this.form.status)
      if (data.code === '000000') {
        if (this.form.status === 1) {
          this.$message.success('上架成功')
        } else {
          this.$message.success('下架成功')
        }
      }
    },
    // 改变页码
    handleCurrentChange (val) {
      this.form.currentPage = val
      this.loadQueryCourses()
    },
    // 改变当页数据
    handleSizeChange (val) {
      this.form.currentPage = 1
      this.form.pageSize = val
      this.loadQueryCourses()
    },
    // 内容管理
    handleMenage (rowData) {
      this.$router.push({
        name: 'CourseContent',
        params: {
          courseId: rowData.id,
          courseName: rowData.courseName
        }
      })
    },
    // 编辑
    async handleEdit (rowData) {
      this.$router.push({ name: 'CreateOrEdit', params: { courseId: rowData.id } })
    },
    onSubmit () {
      this.form.currentPage = 1
      this.form.pageSize = 10
      this.loadQueryCourses()
    }
  }
}

</script>
<style  lang='scss' scoped></style>
