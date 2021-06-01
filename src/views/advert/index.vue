<template>
  <div class="advent">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="handleAdd">添加广告</el-button>
      </div>
       <el-table
          :data="advertDatas"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="广告名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="spaceId"
            label="广告位置">
          </el-table-column>
          <el-table-column
            label="图片">
            <template slot-scope="scope">
              <img width="200px" :src="scope.row.img" :alt="scope.row.name">
            </template>
          </el-table-column>
          <el-table-column
            label="时间">
            <template slot-scope="scope" >
              <div>{{ scope.row.startTimeFormatString }}</div>
              <div>{{ scope.row.endTimeFormatString }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="上线/下线">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatus(scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
          </el-table-column>
          <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
          </el-table-column>
       </el-table>
        <el-dialog
          :title="isEdit ? '编辑广告' : '新增广告'"
          :visible.sync="dialogVisible"
          width="30%">
          <el-form ref="form" :model="advertForm" label-width="100px">
            <el-form-item label="广告名称">
              <el-input v-model="advertForm.name"></el-input>
            </el-form-item>
            <el-form-item label="广告位置">
              <el-input v-model="advertForm.spaceId"></el-input>
            </el-form-item>
            <el-form-item label="广告图片">
              <up-image v-model="advertForm.img"></up-image>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker type="date" placeholder="选择日期" v-model="advertForm.startTimeFormatString" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker type="date" placeholder="选择日期" v-model="advertForm.endTimeFormatString" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="上线/下线">
              <el-switch
                v-model="advertForm.status"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确 定</el-button>
          </span>
        </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getAlldList, updateStatus, getAdById, saveOrUpdateAdvert } from '@/services/advert'
import upImage from '@/components/upImage'
export default {
  components: { upImage },
  name: 'advent',
  data () {
    return {
      advertDatas: [],
      dialogVisible: false,
      isEdit: false,
      advertForm: {
        id: null,
        name: '',
        spaceId: null,
        img: '',
        startTimeFormatString: '',
        endTimeFormatString: '',
        status: ''
      }
    }
  },
  created () {
    this.loadAlldList()
  },
  methods: {
    // 确定
    async onSubmit () {
      this.advertForm = {}
      this.dialogVisible = false
      const { data } = await saveOrUpdateAdvert(this.advertForm)
      console.log(data)
      if (data.success) {
        this.$message.success('操作成功')
      }
      this.loadAlldList()
    },
    // 新增广告
    handleAdd () {
      this.dialogVisible = true
    },
    // 编辑广告
    async handleEdit (rowData) {
      this.dialogVisible = true
      this.isEdit = true
      const { data } = await getAdById(rowData.id)
      console.log(data)
      if (data.success) {
        this.advertForm = data.content
      }
    },
    // 更新广告状态
    async handleStatus (rowData) {
      // console.log(rowData)
      const { data } = await updateStatus({
        id: rowData.id,
        status: rowData.status
      })
      // console.log(data)
      if (data.success) {
        if (rowData.status === 1) {
          this.$message.success('上线成功')
        } else {
          this.$message.success('下线成功')
        }
      }
    },
    async loadAlldList () {
      const { data } = await getAlldList()
      if (data.success) {
        this.advertDatas = data.content
      }
    }
  }
}
</script>
<style lang='scss' scoped></style>
