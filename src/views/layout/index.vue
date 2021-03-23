<template>
    <div class='layout'>
        <el-container>
            <el-aside width="200px">
               <app-aside />
               </el-aside>
            <el-container>
                <el-header>
                  <app-header />
                </el-header>
                <el-main>
                  <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import appAside from './commponets/app-aside'
import appHeader from './commponets/app-header'
export default {
  components: { appAside, appHeader },
  name: 'layout'
}

</script>
<style  lang='scss' scoped>
  .layout{
    height: 100vh;
    min-width: 800px;
    .el-container{
      height: 100%;
      .el-aside{
        background-color: rgb(128, 124, 124);
        .el-menu{
          height: 100%;
        }
      }
      .el-header{
        background-color: rgb(202, 190, 190);
      }
      .el-main{
        background-color: #fff;
      }
    }
  }
</style>
