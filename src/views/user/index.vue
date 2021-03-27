<template>
  <div class="user">
    <el-card class="box-card">
      <el-form :inline="true" :model="form" ref="form" class="demo-form-inline" label-position='top'>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" clearable></el-input>
        </el-form-item>
        <el-form-item label="注册时间" prop='value'>
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item class="btn">
          <el-button :disabled='isloading' @click="handleReset" style="width:100px">重置</el-button>
          <el-button type="primary" @click="handleSelect" :disabled='isloading' style="width:100px">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
     <el-card class="box-card">
        <el-table
          :data="datas"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="用户ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="portrait"
            label="头像"
            width="180">
            <template slot-scope="scope">
              <div class="block">
                <el-avatar size="medium" :src="scope.row.portrait ? scope.row.portrait : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'">
                </el-avatar>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="注册时间">
          </el-table-column>
          <el-table-column
            prop="status"
            label="是否启用">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-value="ENABLE"
                inactive-value="DISABLE"
                active-color="#13ce66"
                :disabled="isdisabled"
                @change="updateStatus(scope.row)"
                inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="allocateRole(scope.row)">分配角色</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.currentPage"
          :page-sizes="[10, 15, 20]"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
     </el-card>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
          <el-select v-model="allocate.roleIdList" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveRole">确 定</el-button>
        </span>
        </el-dialog>
  </div>
</template>

<script>
import { getUserPages, setEnableUser, setForbidUser } from '@/services/user'
import { getRoleall, setAllocateUserRoles, getUserRoles } from '@/services/role'
export default {
  name: 'user',
  data () {
    return {
      form: {
        phone: '',
        startCreateTime: '',
        endCreateTime: '',
        pageSize: 10,
        currentPage: 1
      },
      value: '',
      isloading: false,
      datas: [],
      total: null,
      isenable: '',
      updateData: [],
      // 禁用启用按钮
      isdisabled: true,
      dialogVisible: false,
      options: [],
      allocate: {
        userId: null,
        roleIdList: []
      }
    }
  },
  created () {
    this.loadUserPages()
  },
  methods: {
    async saveRole () {
      this.dialogVisible = false
      const { data } = await setAllocateUserRoles(this.allocate)
      if (data.code === '000000') {
        this.$message.success('分配成功')
        this.loadUserPages()
      }
    },
    async allocateRole (rowData) {
      this.allocate.userId = rowData.id
      this.dialogVisible = true
      const { data } = await getRoleall()
      if (data.code === '000000') {
        this.options = data.data
      }
      const { data: data2 } = await getUserRoles(this.allocate.userId)
      console.log(data2)
      if (data2.code === '000000') {
        this.allocate.roleIdList = data2.data.map(item => item.id)
      }
    },
    // 功能禁用
    async updateStatus (rowData) {
      console.log(rowData)
      if (rowData.status === 'DISABLE') {
        this.updateData = await setEnableUser(rowData.id)
      } else {
        this.updateData = await setForbidUser(rowData.id)
      }
      if (this.updateData.code === '000000') {
        this.loadUserPages()
      }
    },
    handleSizeChange (val) {
      this.form.pageSize = val
      this.form.currentPage = 1
      this.loadUserPages()
    },
    handleCurrentChange (val) {
      this.form.currentPage = val
      this.loadUserPages()
    },
    async loadUserPages () {
      this.isloading = true
      const { data } = await getUserPages(this.form)
      if (data.code === '000000') {
        this.datas = data.data.records
        this.total = data.data.total
      }
      this.isloading = false
    },
    handleReset () {
      this.$refs.form.resetFields()
      this.loadUserPages()
    },
    handleSelect () {
      this.loadUserPages()
    }
  }
}
</script>
<style lang='scss' scoped>
  .user{
    .box-card{
      .el-form{
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        .btn{
          margin-top: 50px;
        }
      }
  }
}
</style>
