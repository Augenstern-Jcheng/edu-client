<template>
<div class='allocate-resurces'>
  <el-page-header @back="goBack" content="分配资源">
  </el-page-header>
  <el-card
   style="margin-top:10px;"
   v-for="item in datas"
   :key="item.id"
    >
    <div class="allSelect">
      <el-checkbox :indeterminate="item.isIndeterminate" v-model="item.selected" @change="handleCheckAllChange(item.selected,item.id)" :label="item.name"></el-checkbox>
    </div>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="item.checkedCities" @change="handleCheckedCitiesChange(item.id,item.checkedCities)">
      <el-checkbox v-for="ele in item.children" :label="ele.id" :key="ele.id">{{ ele.name }}</el-checkbox>
    </el-checkbox-group>
  </el-card>
    <el-divider></el-divider>
    <div class="btn">
      <el-button @click="onSubmit">提交</el-button>
      <el-button @click="onBack">返回</el-button>
    </div>
</div>
</template>

<script>
import { getAllResource, getAllcategory, getRoleResources, setAllocateRoleResources } from '@/services/resource'
export default {
  name: 'AllocateRes',
  data () {
    return {
      datas: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      checkedCount: null,
      resourcesList: []
    }
  },
  created () {
    this.loadAllcategory()
    this.loadAllResource()
    this.loadRoleResources()
  },
  methods: {
    // 根据role获取对应资源
    async loadRoleResources () {
      const { data } = await getRoleResources(this.$route.params.roleId)
      if (data.code === '000000') {
        this.datas.forEach(ele => {
          // 开始之前把所有的全选全部关闭
          ele.isIndeterminate = false
          ele.selected = false
          for (let i = 0; i < data.data.length; i++) {
            if (ele.id === data.data[i].id) {
              // 将selected为true的子元素id赋值给checkedCities
              ele.checkedCities = data.data[i].resourceList.filter(res => res.selected).map(res => res.id)
              // console.log(ele.checkedCities.length, ele.children.length)
              // 设置全选按钮状态
              if (ele.checkedCities.length === ele.children.length) {
                // 当所有子元素被选中  全选
                ele.selected = true
              } else if (ele.checkedCities.length !== 0) {
                // 当存在子元素被选中  半选
                ele.isIndeterminate = true
              }
            }
          }
        })
      }
    },
    // 返回
    onBack () {
      this.$router.push('/role')
      this.datas.forEach(ele => {
        ele.checkedCities = []
      })
    },
    // 提交
    async onSubmit () {
      this.datas.forEach(ele => {
        if (ele.checkedCities.length !== 0) {
          this.resourcesList = this.resourcesList.concat(ele.checkedCities)
        }
      })
      const { data } = await setAllocateRoleResources({
        roleId: this.$route.params.roleId,
        resourceIdList: this.resourcesList
      })
      if (data.code === '000000') {
        this.$message.success('添加成功')
        this.$router.push('/role')
      }
    },
    // 单选按钮
    handleCheckedCitiesChange (id, checkedCities) {
      this.datas.forEach(ele => {
        if (ele.id === id) {
          if (ele.children.length === checkedCities.length) {
            ele.isIndeterminate = false
            ele.selected = true
          } else {
            ele.isIndeterminate = true
            ele.selected = false
          }
          if (checkedCities.length === 0) {
            ele.isIndeterminate = false
          }
        }
      })
    },
    // 全选按钮
    handleCheckAllChange (selected, id) {
      this.datas.forEach(ele => {
        if (ele.id === id) {
          ele.isIndeterminate = false
          ele.checkedCities = selected ? ele.children.map(ele => ele.id) : []
        }
      })
    },
    // 获取资源分类id
    async loadAllcategory () {
      const { data } = await getAllcategory()
      if (data.code === '000000') {
        data.data.forEach(ele => {
          ele.children = []
          ele.checkedCities = []
          ele.isIndeterminate = false
        })
        this.datas = data.data
      }
    },
    // 获取所有资源
    async loadAllResource () {
      const { data } = await getAllResource()
      if (data.code === '000000') {
        this.datas.forEach(ele => {
          for (let i = 0; i < data.data.length; i++) {
            if (ele.id === data.data[i].categoryId) {
              ele.children.push(data.data[i])
            }
          }
        })
      }
    },
    goBack () {
      this.$router.push('/role')
    }
  }
}

</script>
<style  lang='scss' scoped>
::v-deep .el-card .el-card__body{
  padding: 0 0 20px 0;
}
.allSelect{
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  margin-bottom: 20px;
  background-color: #ccddf7;
}
.el-checkbox-group{
  padding:0 20px;
  display: flex;
  flex-wrap: wrap;
  .el-checkbox{
    width: 25%;
    padding: 5px 30px 0 0;
  }
}
.btn{
  padding: 20px;
}
</style>
