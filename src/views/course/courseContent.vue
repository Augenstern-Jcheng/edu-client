<template>
<div class='course-content'>
  <el-page-header @back="$router.push('/course')" :content="$route.params.courseName">
  </el-page-header>
  <el-button class="addBtn" @click="toAddSection" round type="primary">新建章节</el-button>
  <el-divider></el-divider>
  <el-tree
    :data="courseData"
    v-loading="isloading"
    :default-expand-all="true"
    :draggable="true"
    @node-drop="handelNodeDrop"
    :allow-drop="handelAllowDrop"
    :props="defaultProps">
     <span class="custom-tree-node" slot-scope="{ node, data }">
       <span>{{ node.label }}</span>
        <span class="btn" v-if="!data.theme">
          <el-button
            size="mini"
            @click="toEditSection(data)">
            编辑
          </el-button>
          <el-button
            type="info"
            size="mini"
            @click="tolessDataAdd(node, data)">
            添加课时
          </el-button>
          <el-select
            v-model="data.status"
            placeholder="请选择"
            @change="changeSection($event, node, data)"
            style="margin-left:10px">
            <el-option
              v-for="item in sectionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
        <span class="btn" v-else>
          <el-button
            size="mini"
            @click="toLessonData(node, data)">
            编辑
          </el-button>
          <el-button
            v-if="data.theme"
            size="mini"
            type="success"
            @click="upDataVideo(data)">
            上传视频
          </el-button>
          <el-select
            v-model="data.status"
            placeholder="请选择"
            @change="changeLesson($event, node, data)"
            style="margin-left:10px">
            <el-option
              v-for="item in lessonOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
      </span>
  </el-tree>
  <!-- 章节弹出框 -->
    <createOrEditSection
     :dialogVisible='dialogVisible'
     :isEdit='isEdit'
     :sectiondatas='sectiondatas'
     :courseNameValue="courseNameValue"
     @edit-dialogVisible='handleChild'>
    >
    </createOrEditSection>
    <!-- 课时弹出框 -->
    <edit-lesson
    :isEdit='isEditLesson'
    :dialogVisible='isDiaLess'
    :courseNameValue="courseNameValue"
    :nodeData="nodeData"
    :lessonRowData="lessonRowData"
    :sectionRowData="sectionRowData"
    :datas="lessonDatas"
    @close-lessonDis="lessonClose"
    >
    </edit-lesson>
</div>
</template>

<script>
import { getSectionAndLesson, saveOrUpdateSection, saveOrUpdateLesson, getBySectionId, getBylessonId } from '@/services/course'
import createOrEditSection from './components/createOrEditSection'
import EditLesson from './components/editLesson'
export default {
  props: ['courseId', 'courseName'],
  name: 'CourseContent',
  components: {
    createOrEditSection,
    EditLesson
  },
  data () {
    return {
      isloading: false,
      // 课程信息
      courseData: [],
      defaultProps: {
        children: 'lessonDTOS',
        label (data) {
          return data.sectionName || data.theme
        }
      },
      lessonform: {
        id: null,
        status: null
      },
      sectionform: {
        id: null,
        status: null
      },
      dialogVisible: false,
      isEdit: false,
      sectiondatas: [],
      // 课程名称
      courseNameValue: '',
      // 课时弹出框控制
      isDiaLess: false,
      // nodeData
      nodeData: '',
      lessonRowData: '',
      sectionRowData: '',
      // 课时信息
      lessonDatas: {},
      isEditLesson: true,
      lessonOptions: [{
        value: '0',
        label: '隐藏'
      }, {
        value: '1',
        label: '未发布'
      }, {
        value: '2',
        label: '已发布'
      }],
      sectionOptions: [{
        value: '0',
        label: '隐藏'
      }, {
        value: '1',
        label: '待更新'
      }, {
        value: '2',
        label: '已发布'
      }]
    }
  },
  created () {
    this.loadSectionAndLesson()
  },
  methods: {
    // Lesson状态改变
    async changeLesson (val, node, rowData) {
      // console.log(val, node, rowData)
      this.lessonform.id = rowData.id
      this.lessonform.status = rowData.status
      const { data } = await saveOrUpdateLesson(this.lessonform)
      if (data.code === '000000') {
        this.$message.success('状态更新成功')
        this.loadSectionAndLesson()
      }
    },
    // section状态改变
    async changeSection (val, node, rowData) {
      // console.log(val, node, rowData)
      this.sectionform.id = rowData.id
      this.sectionform.status = rowData.status
      const { data } = await saveOrUpdateSection(this.sectionform)
      if (data.code === '000000') {
        this.$message.success('状态更新成功')
        this.loadSectionAndLesson()
      }
    },
    // 新增课时
    tolessDataAdd (node, rowData) {
      // console.log(node, rowData)
      this.isDiaLess = true
      this.isEditLesson = false
      this.sectionRowData = rowData
    },
    // 关闭课时弹窗
    lessonClose () {
      this.isDiaLess = false
      this.loadSectionAndLesson()
    },
    // 编辑课时
    async toLessonData (node, rowData) {
      // console.log(node, rowData)
      this.isEditLesson = true
      this.isDiaLess = true
      this.nodeData = node
      this.lessonRowData = rowData
      this.courseNameValue = this.$route.params.courseName
      const { data } = await getBylessonId(rowData.id)
      if (data.code === '000000') {
        this.lessonDatas = data.data
      }
    },
    // 编辑章节
    async toEditSection (rowData) {
      this.dialogVisible = true
      this.isEdit = true
      this.courseNameValue = this.$route.params.courseName
      // console.log(rowData)
      const { data } = await getBySectionId(rowData.id)
      if (data.code === '000000') {
        this.sectiondatas = data.data
        // console.log(this.sectiondatas)
      }
    },
    // 新增章节
    toAddSection () {
      this.dialogVisible = true
      this.courseNameValue = this.$route.params.courseName
    },
    handleChild () {
      this.dialogVisible = false
      this.loadSectionAndLesson()
    },
    // 拖拽完成
    async handelNodeDrop (draggingNode, dropNode, type, event) {
      // console.log(dropNode.parent.childNodes)
      this.isloading = true
      try {
        await Promise.all(dropNode.parent.childNodes.map((ele, index) => {
          if (ele.data.sectionId) {
            return saveOrUpdateLesson({
              id: ele.data.id,
              orderNum: index
            })
          } else {
            // console.log(1)
            return saveOrUpdateSection({
              id: ele.data.id,
              orderNum: index
            })
          }
        }))
        this.$message.success('更新成功')
      } catch (err) {
        this.$message.error('更新错误', err)
      }
      this.isloading = false
    },
    // 拖拽时事件
    handelAllowDrop (draggingNode, dropNode, type) {
      // console.log(draggingNode, dropNode, type)
      return type !== 'inner' && draggingNode.data.sectionId === dropNode.data.sectionId
    },
    // 上传视频
    upDataVideo (val) {
      // console.log(val)
      this.$router.push({
        name: 'UpDataVideo',
        params: {
          courseId: this.courseId,
          lessonId: val.id
        }
      })
    },
    remove2 (node, rowData) {
      // console.log(node, rowData)
    },
    remove (node, rowData) {
      // console.log(node, rowData)
    },
    append (rowData) {

    },
    // 获取课程内容
    async loadSectionAndLesson () {
      const { data } = await getSectionAndLesson(this.courseId)
      if (data.code === '000000') {
        this.courseData = data.data
      }
    }
  }
}
</script>
<style  lang='scss' scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  ::v-deep .el-tree-node__content {
      margin-bottom: 10px;
  }
  ::v-deep .el-input--suffix .el-input__inner{
    width: 100px;
    height: 30px;
    line-height: 30px;
  }
  .addBtn{
    margin: 20px 10px  0 10px;
  }
</style>
