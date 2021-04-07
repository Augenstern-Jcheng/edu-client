<template>
  <div class='app-header'>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">课程管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-col :span="12">
          <div class="demo-basic--circle">
            <div class="block" v-for="size in sizeList" :key="size">
              <el-avatar :size="size" :src="userInfo.portrait || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
            </div>
          </div>
        </el-col>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item divided @click.native="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getUserInfo } from '@/services/user'
export default {
  name: 'app-header',
  data () {
    return {
      sizeList: ['large'],
      userInfo: {}
    }
  },
  created () {
    this.loadUserInfo()
    // console.log(this.$route)
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.content
    },
    // 退出
    logout () {
      this.$confirm('是否确定退出', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        this.$store.commit('addUser', null)
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取取消退出'
        })
      })
    }
  }
}
</script>
<style lang='scss' scoped>
  .app-header {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
      .el-breadcrumb__item:last-child .el-breadcrumb__inner,
      .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover,
      .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
      .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover {
        cursor: pointer;
      }
        .el-dropdown-link {
          cursor: pointer;
          color: #3a3f44;
          display: flex;
          align-items: center;
        }
        .el-icon-arrow-down {
          font-size: 12px;
        }
      ::v-deep .el-icon-arrow-right:before {
          color:rgb(25, 85, 155)
        }
  }
</style>
