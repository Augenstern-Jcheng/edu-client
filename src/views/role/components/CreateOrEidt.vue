<template>
<div class='create-or-edit'>
  <el-dialog
    :title="isEditOrAdd"
    :visible.sync="dialogVisible"
    width="30%"
    @opened ="handleOpen"
    :before-close="handleClose">
    <el-form :label-position="labelPosition" :rules="rules" label-width="80px" :model="form" style="padding:0 20px">
      <el-form-item label="角色名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="角色编码">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="loadsaveOrUpdate">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import { saveOrUpdate } from '@/services/role'
export default {
  name: 'CreateOrEdit',
  props: {
    isEdit: {
      type: Boolean
    },
    dialogVisible: {
      type: Boolean
    },
    datas: {}
  },
  data () {
    return {
      title: '',
      form: {
        name: '',
        code: '',
        description: ''
      },
      labelPosition: 'top',
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入角色编码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleOpen () {
      if (this.isEdit) {
        this.form = this.datas
        // this.form.name = this.datas.name
        // this.form.code = this.datas.code
        // this.form.description = this.datas.description
        // console.log(this.datas)
      }
    },
    handleClose () {
      this.$emit('edit-dialogVisible')
      this.form = {}
    },
    async loadsaveOrUpdate () {
      const { data } = await saveOrUpdate(this.form)
      if (data.code === '000000') {
        this.$emit('edit-dialogVisible')
        this.form = {}
      }
    }
  },
  computed: {
    isEditOrAdd () {
      return this.isEdit ? '编辑角色' : '新增角色'
    }
  }
}

</script>
<style  lang='scss' scoped>
</style>
