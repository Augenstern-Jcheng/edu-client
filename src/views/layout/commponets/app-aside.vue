<template>
<div class='app-aside'>
  <el-menu
    :default-active="this.$route.path"
    router
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    unique-opened
    active-text-color="#ffd04b">
    <el-submenu index="permissions">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>权限管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="role">
          <i class="el-icon-document"></i>
          角色列表
          </el-menu-item>
        <el-menu-item index="menu">
          <i class="el-icon-document"></i>
          菜单列表
          </el-menu-item>
        <el-menu-item index="resource">
          <i class="el-icon-document"></i>
          资源列表
          </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="course">
      <i class="el-icon-menu"></i>
      <span slot="title">课程管理</span>
    </el-menu-item>
    <el-menu-item index="user">
      <i class="el-icon-document"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-submenu index="advert-management">
      <template slot="title">
      <i class="el-icon-setting"></i>
      <span>广告管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="advert">
          <i class="el-icon-document"></i>
          广告管理
          </el-menu-item>
        <el-menu-item index="advert-space">
          <i class="el-icon-document"></i>
          广告位管理
          </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</div>
</template>

<script>
export default {
  name: 'app-aside'
}

</script>
<style  lang='scss' scoped>
  .el-menu{
    border-right: 0 none;
  }
</style>
