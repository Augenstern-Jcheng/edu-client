<template>
<div class='course-section'>
   <el-dialog
    :title="isEditOrAdd"
    :visible.sync="dialogVisible"
    width="30%"
    @opened ="handleOpen"
    :before-close="handleClose">
    <el-form :label-position="labelPosition" :rules="rules" label-width="80px" :model="form" style="padding:0 20px">
      <el-form-item label="课程名称">
        <el-input v-model="form.courseName" disabled></el-input>
      </el-form-item>
      <el-form-item label="章节名称">
        <el-input v-model="form.sectionName"></el-input>
      </el-form-item>
      <el-form-item label="章节描述">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="章节排序">
        <el-input type="number"  min="0" v-model="form.orderNum"></el-input>
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
import { saveOrUpdateSection } from '@/services/course'
export default {
  name: 'createOrEditSection',
  props: ['isEdit', 'dialogVisible', 'sectiondatas', 'courseNameValue'],
  data () {
    return {
      title: '',
      form: {
        courseId: '',
        courseName: '',
        sectionName: '',
        description: '',
        orderNum: null
      },
      labelPosition: 'top',
      rules: {
        courseName: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        sectionName: [
          { required: true, message: '请输入章节名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 弹出框打开时触发
    handleOpen () {
      if (this.isEdit) {
        // 如果为编辑，将值赋值给form
        this.form = this.sectiondatas
      }
      this.form.courseName = this.courseNameValue
    },
    handleClose () {
      this.$emit('edit-dialogVisible')
      this.form.sectionName = ''
      this.form.description = ''
      this.form.orderNum = null
    },
    async loadsaveOrUpdate () {
      this.form.courseId = this.$route.params.courseId
      // console.log(this.$route)
      const { data } = await saveOrUpdateSection(this.form)
      if (data.code === '000000') {
        this.$message.success('新建成功')
        this.$emit('edit-dialogVisible')
        this.form.sectionName = ''
        this.form.description = ''
        this.form.orderNum = null
      }
    }
  },
  computed: {
    isEditOrAdd () {
      return this.isEdit ? '编辑章节' : '新建章节'
    }
  }
}
</script>
<style  lang='scss' scoped></style>
