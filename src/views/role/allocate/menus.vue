<template>
<div class='allocate-menus'>
  <el-page-header @back="goBack" content="分配菜单">
  </el-page-header>
  <el-divider></el-divider>
  <el-tree
   :data="menus"
   :props="menusProps"
   ref="tree"
   :default-checked-keys='datas'
   default-expand-all
   node-key='id'
   :show-checkbox="show"></el-tree>
   <el-divider></el-divider>
   <el-button type="info" @click="saveMenus">保存</el-button>
   <el-button @click="resetCheck">清空</el-button>
</div>
</template>

<script>
import { getMenuNodeList, setAllocateRoleMenus, getRoleMenus } from '@/services/menu'
export default {
  name: 'AllocateMenus',
  data () {
    return {
      menus: [],
      menusProps: {
        children: 'subMenuList',
        label: 'name'
      },
      show: true,
      form: {
        roleId: null,
        menuIdList: []
      },
      datas: []
    }
  },
  created () {
    // 获取roleid
    this.form.roleId = this.$route.params.roleId
    // 获取所有菜单
    this.loadMenuNodeList()
    // 获取角色用于的菜单
    this.loadRoleMenus()
  },
  methods: {
    filters (menus) {
      menus.forEach(menu => {
        if (menu.subMenuList) {
          return this.filters(menu.subMenuList)
        }
        if (menu.selected) {
          this.datas = [...this.datas, menu.id]
        }
      })
    },
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.form.roleId)
      if (data.code === '000000') {
        this.filters(data.data)
      }
    },
    goBack () {
      this.$router.push('/role')
    },
    resetCheck () {
      this.$refs.tree.setCheckedKeys([])
    },
    async saveMenus () {
      this.form.menuIdList = this.$refs.tree.getCheckedKeys()
      const { data } = await setAllocateRoleMenus(this.form)
      if (data.code === '000000') {
        this.$message.success('保存成功')
        this.$router.push({ name: 'role' })
      }
    },
    async loadMenuNodeList () {
      const { data } = await getMenuNodeList()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    handleNodeClick (data) {
      // console.log(data)
    }
  }
}

</script>
<style  lang='scss' scoped></style>
