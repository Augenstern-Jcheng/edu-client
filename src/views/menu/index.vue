<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
          <el-button
          @click="$router.push({name:'MenuCreate'})"
          >添加菜单</el-button>
      </div>
       <el-table
          :data="menuData"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="菜单名称">
          </el-table-column>
          <el-table-column
            prop="level"
            label="菜单级数"
            width="180">
          </el-table-column>
          <el-table-column
            prop="icon"
            label="前端图标"
            width="180">
          </el-table-column>
          <el-table-column
            prop="orderNum"
            label="排序">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)">编辑</el-button>
              <el-button @click="handleDelete(scope.row)" type="danger">删除</el-button>
            </template>
          </el-table-column>
       </el-table>
    </el-card>
  </div>
</template>

<script>
import { getAllMenu, deleteMenu } from '@/services/menu'
export default {
  name: 'menus',
  data () {
    return {
      menuData: []
    }
  },
  created () {
    this.getMenuData()
  },
  methods: {
    // 修改
    handleEdit (rowData) {
      this.$router.push({
        name: 'MenuEdit',
        params: {
          id: rowData.id
        }
      })
    },
    // 删除
    handleDelete (rowData) {
      this.$confirm('是否确认呢删除?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await deleteMenu(rowData.id)
        if (data.code === '000000') {
          this.getMenuData()
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 获取menu数据
    async getMenuData () {
      const { data } = await getAllMenu()
      if (data.data) {
        this.menuData = data.data
      }
    }
  }
}
</script>
<style lang='scss' scoped></style>
