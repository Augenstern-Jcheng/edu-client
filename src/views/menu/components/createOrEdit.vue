<template>
<div class='create-or-edit'>
  <div slot="header" class="clearfix">
    <el-button type="text" icon="el-icon-arrow-left" @click="goBack()">返回</el-button>
    <span style="margin:0 10px">|</span>
    <span>{{ isEdit ? '创建菜单' : '编辑菜单' }}</span>
  </div>
  <el-divider></el-divider>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="菜单名称" prop='name'>
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="菜单路径">
        <el-input v-model="form.href"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单">
        <el-select v-model="form.parentId" placeholder="请选择上级菜单" prop='parentId'>
          <el-option label="无上级菜单" value="-1"></el-option>
          <el-option
          v-for="item in parentMenus"
          :key="item.id"
          :label="item.name"
          :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop='description'>
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="前端图标" prop='icon'>
        <el-input v-model="form.icon"></el-input>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-radio-group v-model="form.shown">
          <el-radio label="true">是</el-radio>
          <el-radio label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.orderNum"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="$router.push('/menu')">取消</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
import { getParentMenu, createOrEditMenu, editMenuPage } from '@/services/menu'
export default {
  name: 'CreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        id: '',
        name: '',
        href: '',
        icon: '',
        orderNum: '',
        description: '',
        shown: false,
        parentId: ''
      },
      parentMenus: [],
      rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入菜单描述', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请输入菜单图标', trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: '请选择上级菜单', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.loadParentMenu()
    this.loadEditMenuPage()
  },
  methods: {
    onSubmit () {
      createOrEditMenu(this.form)
      this.loadParentMenu()
      this.$router.push('/menu')
    },
    goBack () {
      this.$router.push('/menu')
    },
    async loadParentMenu () {
      const { data } = await getParentMenu()
      if (data.code === '000000') {
        this.parentMenus = data.data.parentMenuList
      }
    },
    async loadEditMenuPage () {
      const id = this.$route.params.id || -1
      const { data } = await editMenuPage(id)
      if (data.data.menuInfo) {
        this.form = data.data.menuInfo
      }
    }
  }
}

</script>
<style  lang='scss' scoped></style>
