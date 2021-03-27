<template>
<div class='create-or-Edit'>
  <el-steps :active="stepStatus" :simple='true'>
    <el-step
    v-for="item in stepData"
    :key="item.id"
    :title="item.title"
    :icon="item.icon"
    @click.native="stepStatus=item.id"
    >
    </el-step>
  </el-steps>
  <el-divider></el-divider>
  <div class="title">{{ title }}</div>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item v-if="stepStatus===0">
      <el-form-item label="名称" prop="courseName">
        <el-input v-model="form.courseName">
          <template slot="append">{{ form.courseName.length }}/20</template>
        </el-input>
      </el-form-item>
      <el-form-item label="简介" prop="brief">
        <el-input v-model="form.brief">
          <template slot="append">{{ form.brief.length }}/50</template>
        </el-input>
      </el-form-item>
      <el-form-item label="讲师姓名" prop="teacherName">
        <el-input v-model="form.teacherDTO.teacherName">
          <template slot="append">{{ form.teacherDTO.teacherName.length }}/10</template>
        </el-input>
      </el-form-item>
      <el-form-item label="职位" prop="position">
        <el-input v-model="form.teacherDTO.position">
          <template slot="append">{{ form.teacherDTO.position.length }}/10</template>
        </el-input>
      </el-form-item>
      <el-form-item label="讲师简介" prop="description">
        <el-input v-model="form.teacherDTO.description">
          <template slot="append">{{ form.teacherDTO.description.length }}/30</template>
        </el-input>
      </el-form-item>
      <el-form-item label="课程概述" prop="previewField">
        <el-input v-model="form.previewFirstField" style="width:45%;margin-right:10px">
          <template slot="append">{{ form.previewFirstField.length }}/20</template>
        </el-input>
        <el-input v-model="form.previewSecondField" style="width:45%">
          <template slot="append">{{ form.previewSecondField.length }}/20</template>
        </el-input>
      </el-form-item>
      <el-form-item label="课程排序">
        <el-input-number v-model="form.sortNum" :min="1" :max="1000"></el-input-number>
      </el-form-item>
    </el-form-item>
    <el-form-item v-if="stepStatus===1">
      <el-form-item label="课程封面" prop="courseListImg">
       <up-image v-model="form.courseListImg"></up-image>
      </el-form-item>
      <el-form-item label="解锁封面" prop="courseImgUrl">
        <up-image v-model="form.courseImgUrl"></up-image>
      </el-form-item>
    </el-form-item>
    <el-form-item v-if="stepStatus===2">
      <el-form-item label="售卖价格" prop="discounts">
        <el-input v-model="form.discounts">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="商品原价" prop="price">
        <el-input v-model="form.price">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="销量" prop="sales">
        <el-input v-model="form.sales">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="活动标签" prop="discountsTag">
        <el-input v-model="form.discountsTag">
          <template slot="append">{{ form.discountsTag.length }}/4</template>
        </el-input>
      </el-form-item>
    </el-form-item>
    <el-form-item v-if="stepStatus===3">
      <el-form-item label="限时秒杀开关" prop="activityCourse" label-width="100px">
        <el-switch
          v-model="form.activityCourse"
          style="width:100px"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
    </el-form-item>
      <el-form-item v-if="form.activityCourse">
        <el-form-item label="开始时间" prop="beginTime">
          <el-date-picker
            v-model="form.activityCourseDTO.beginTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="form.activityCourseDTO.endTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="秒杀价" prop="amount">
          <el-input v-model="form.activityCourseDTO.amount">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="库存" prop="stock">
          <el-input v-model="form.activityCourseDTO.stock">
            <template slot="append">个</template>
          </el-input>
        </el-form-item>
      </el-form-item>
    </el-form-item>
    <el-form-item v-if="stepStatus===4">
      <el-form-item  prorp="courseDescriptionMarkDown">
        <Editor v-model="form.courseDescriptionMarkDown"></Editor>
      </el-form-item>
    </el-form-item>
    <el-form-item >
        <span style="margin-right:10px;color:rgb(105, 103, 103)">是否上架:</span>
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="0"
          active-color="#13ce66"
          @change="updateStatus"
          inactive-color="#ff4949">
        </el-switch>
    </el-form-item >
    <el-form-item >
      <el-button @click="stepStatus--" v-if="stepStatus!==0">上一步</el-button>
      <el-button @click="stepStatus++" v-if="stepStatus!==4">下一步</el-button>
    </el-form-item>
    <el-form-item>
      <el-button @click="onSumit">提交</el-button>
      <el-button @click="offBack">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import UpImage from '@/components/upImage'
import Editor from '@/components/wangEditor'
import { saveOrUpdateCourse, getCourseById, changeState } from '@/services/course'
export default {
  name: 'CreateOrEdit',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    UpImage,
    Editor
  },
  data () {
    return {
      // 标题
      title: '基本信息',
      dialogImageUrl: '',
      dialogVisible: false,
      // 步骤条进度
      stepStatus: 0,
      // 步骤条数据
      stepData: [
        { id: 0, title: '基本信息', icon: 'el-icon-user' },
        { id: 1, title: '课程封面', icon: 'el-icon-picture' },
        { id: 2, title: '销售信息', icon: 'el-icon-phone-outline' },
        { id: 3, title: '秒杀活动', icon: 'el-icon-s-goods' },
        { id: 4, title: '课程详情', icon: 'el-icon-s-promotion' }
      ],
      num: 1,
      form: {
        id: null,
        courseName: '',
        brief: '',
        teacherDTO: {
          id: null,
          teacherName: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '',
        price: '',
        discounts: '',
        sales: '',
        discountsTag: '',
        previewFirstField: '',
        previewSecondField: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: '',
        status: '',
        activityCourse: false,
        activityCourseDTO: {
          id: null,
          courseId: '',
          beginTime: '',
          endTime: '',
          amount: '',
          stock: ''
        },
        autoOnlineTime: ''
      },
      // 校验规则
      rules: {
        courseName: [
          { required: true, message: '请输入课程名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        brief: [
          { required: true, message: '请输入课程简介', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        teacherName: [
          { required: true, message: '请输入讲师姓名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请输入讲师职位', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入讲师简介', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        previewField: [
          { required: true, message: '请输入课程概述', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        discounts: [
          { required: true, message: '请输入售卖价格', trigger: 'blur' }
        ],
        discountsTag: [
          { min: 0, max: 4, message: '长度在 0 到 4 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    // 标题显示
    stepStatus: function () {
      switch (this.stepStatus) {
        case 0:
          this.title = '基本信息'
          break
        case 1:
          this.title = '课程封面'
          break
        case 2:
          this.title = '销售信息'
          break
        case 3:
          this.title = '秒杀活动'
          break
        case 4:
          this.title = '课程详情'
          break
      }
    }
  },
  created () {
    if (this.courseId) {
      this.loadCourseInfo()
    }
  },
  methods: {
    // 上架状态发生改变
    async updateStatus () {
      await changeState(this.courseId, this.form.status)
    },
    // 编辑进入请求数据
    async loadCourseInfo () {
      const { data } = await getCourseById(this.courseId)
      if (data.code === '000000') {
        if (!data.data.activityCourse) {
          data.data.activityCourseDTO = {
            beginTime: '',
            endTime: '',
            amount: '',
            stock: ''
          }
        }
        this.form = data.data
      }
    },
    // 提交
    async onSumit () {
      // 改变上下架状态
      this.updateStatus()
      const { data } = await saveOrUpdateCourse(this.form)
      if (data.code === '000000') {
        this.$message.success('提交成功')
        this.$router.push({ name: 'course' })
      }
    },
    // 取消按钮
    offBack () {
      this.$router.push({ name: 'course' })
    }
  }
}
</script>

<style  lang='scss' scoped>
.el-step:hover{
  cursor: pointer;
}
.el-form-item{
  margin-bottom: 20px;
  // padding: 0 50px;
}
::v-deep .el-select .el-input {
    width: 130px;
  }
::v-deep .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
.title{
  font-size: 20px;
  font-weight: bold;
  padding: 0 0 20px 10px;
  color: rgb(105, 103, 103);
}
</style>
