<template>
<div class='role-list'>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div class="top">
        筛选搜索
      </div>
      <el-form :inline="true" :model="form" ref='form' class="demo-form-inline">
        <el-form-item label="输入搜索:" prop='name' class="selectRole">
          <el-input v-model="form.name" placeholder="角色名称" clearable></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button @click="resetForm">重置</el-button>
          <el-button type="primary" class="selectBtn" @click="onSubmit" :disabled='isloading'>查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button  @click="addRole">添加角色</el-button>
    <create-or-edit
     :dialogVisible='dialogVisible'
     :isEdit='isEdit'
     :datas='datas'
     @edit-dialogVisible='handleChild'>
     </create-or-edit>
    <el-divider></el-divider>
    <el-table
      :data="roleData"
      isloading='isloading'
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名称"
        width="180">
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
        <template slot-scope="scope" class="textBtn">
          <div class="assit">
          <el-button type="text" @click="allocateMenus(scope.row)">分配菜单</el-button>
          <el-button type="text" @click="allocateRes(scope.row)">分配资源</el-button>
          <router-view></router-view>
          </div>
          <div class="rowBtn">
          <el-button @click="handleEdit(scope.row)" type="text">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="text">删除</el-button>
          </div>
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
      :total="total">
    </el-pagination>
  </el-card>
</div>
</template>

<script>
import { getRolePages, deleteRole, getRole } from '@/services/role'
import CreateOrEdit from './components/CreateOrEidt'
export default {
  components: { CreateOrEdit },
  name: 'RoleList',
  data () {
    return {
      form: {
        id: '',
        name: '',
        current: 1,
        size: 10
      },
      isloading: false,
      roleData: [],
      total: null,
      dialogVisible: false,
      isEdit: false,
      datas: []
    }
  },
  created () {
    this.loadRolePages()
  },
  filters: {
    dataFormat (date) {
      date = new Date(date)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}
      ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }
  },
  methods: {
    allocateMenus (rowData) {
      this.$router.push({
        name: 'AllocateMenus',
        params: {
          roleId: rowData.id
        }
      })
    },
    allocateRes (rowData) {
      this.$router.push({
        name: 'AllocateRes',
        params: {
          roleId: rowData.id
        }
      })
    },
    handleChild () {
      this.dialogVisible = false
      this.loadRolePages()
    },
    addRole () {
      this.dialogVisible = true
      this.isEdit = false
    },
    handleSizeChange (val) {
      this.form.size = val
      this.form.current = 1
      this.loadRolePages()
    },
    handleCurrentChange (val) {
      this.form.current = val
      this.loadRolePages()
    },
    async loadRolePages () {
      this.isloading = true
      const { data } = await getRolePages(this.form)
      if (data.code === '000000') {
        this.roleData = data.data.records
        this.total = data.data.total
        this.isloading = false
      }
    },
    async handleEdit (rowData) {
      this.dialogVisible = true
      this.isEdit = true
      const { data } = await getRole(rowData.id)
      if (data.code === '000000') {
        this.datas = data.data
      }
    },
    handleDelete (rowData) {
      this.$confirm('是否确认删除？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await deleteRole(rowData.id)
        if (data.code === '000000') {
          this.form.current = 1
          this.loadRolePages()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    onSubmit () {
      this.form.current = 1
      this.loadRolePages()
    },
    resetForm () {
      this.$refs.form.resetFields()
    }
  }
}

</script>
<style  lang='scss' scoped>
  .top{
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 20px;
  }
  .demo-form-inline{
    display: flex;
    justify-content: space-between;
    .selectRole{
      padding-left: 60px;
    }
    .btn{
      margin-top: -40px;
      .selectBtn{
        width: 100px;
      }
    }
  }
  .textBtn{
    display: flex;
    flex-wrap: wrap;
  }
</style>
