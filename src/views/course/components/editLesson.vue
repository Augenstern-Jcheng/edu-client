<template>
<div class='edit-lesson'>
    <el-dialog
    :title="isEditOrAdd()"
    :visible.sync="dialogVisible"
    width="30%"
    @opened ="handleOpen"
    :before-close="handleClose">
    <el-form label-width="100px" :model="lessonForm" style="padding:0 20px">
      <el-form-item label="课程名称">
        <el-input v-model="courseName" disabled></el-input>
      </el-form-item>
      <el-form-item label="章节名称">
        <el-input v-model="sectionName" disabled></el-input>
      </el-form-item>
      <el-form-item label="课时名称">
        <el-input v-model="lessonForm.theme" :disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="时长">
        <el-input type="number"  min="0" v-model="lessonForm.duration"></el-input>
      </el-form-item>
      <el-form-item label="是否开放试听">
        <el-switch
          v-model="lessonForm.isFree"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="课程排序">
        <el-input type="number"  min="0" v-model="lessonForm.orderNum"></el-input>
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
import { saveOrUpdateLesson } from '@/services/course'
export default {
  name: 'EditLesson',
  props: ['dialogVisible', 'nodeData', 'lessonRowData', 'datas', 'courseNameValue', 'isEdit', 'sectionRowData'],
  data () {
    return {
      lessonForm: {
        id: null,
        sectionId: null,
        courseId: null,
        theme: '',
        duration: '',
        isFree: false,
        orderNum: null,
        status: null
      },
      courseName: '',
      sectionName: ''
    }
  },
  methods: {
    // 是否编辑
    isEditOrAdd () {
      return this.isEdit ? '编辑课时内容' : '新增课时内容'
    },
    // 弹窗打开时，初始化form
    handleOpen () {
      // 编辑
      this.lessonForm = {
        id: null,
        sectionId: null,
        courseId: null,
        theme: '',
        duration: '',
        isFree: false,
        orderNum: null,
        status: null
      }
      if (this.isEdit) {
        this.lessonForm = this.datas
        this.sectionName = this.nodeData.parent.data.sectionName
        this.lessonForm.id = this.lessonRowData.id
      } else {
        // 新增
        this.sectionName = this.sectionRowData.sectionName
        this.lessonForm.sectionId = this.sectionRowData.id
        this.lessonForm.courseId = this.sectionRowData.courseId
      }
      this.courseName = this.courseNameValue
    },
    // 关闭时触发
    handleClose () {
      this.$emit('close-lessonDis')
    },
    // 保存/更新课时内容
    async loadsaveOrUpdate () {
      // console.log(this.lessonRowData)
      const { data } = await saveOrUpdateLesson(this.lessonForm)
      if (data.code === '000000') {
        this.$message.success('更新成功')
        this.$emit('close-lessonDis')
      }
    }
  }
}

</script>
<style  lang='scss' scoped></style>
