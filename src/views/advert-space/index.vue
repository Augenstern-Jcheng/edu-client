<template>
  <div class="advent-space">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="handleAdd">添加广告位</el-button>
      </div>
       <el-table
          :data="adverSpacetDatas"
          style="width: 100%">
          <el-table-column
            prop="spaceKey"
            label="spaceKey"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="广告位名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="更新时间">
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
          :title="isEdit ? '编辑广告位' : '新增广告位'"
          :visible.sync="dialogVisible"
          width="30%">
          <el-form ref="form" :model="adverSpacetForm" label-width="100px">
            <el-form-item label="广告位名称">
              <el-input v-model="adverSpacetForm.name"></el-input>
            </el-form-item>
            <el-form-item label="spaceKey">
              <el-input v-model="adverSpacetForm.spaceKey"></el-input>
            </el-form-item>
            <el-form-item label="创建日期">
              <el-date-picker type="date" placeholder="选择日期" v-model="adverSpacetForm.createTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="更新日期">
              <el-date-picker type="date" placeholder="选择日期" v-model="adverSpacetForm.updateTime" style="width: 100%;"></el-date-picker>
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
import { getAllSpaces, saveOrUpdateAdvertSpace, getSpaceById } from '@/services/advert'
export default {
  name: 'advent-space',
  data () {
    return {
      adverSpacetDatas: [],
      dialogVisible: false,
      isEdit: false,
      adverSpacetForm: {
        id: null,
        name: '',
        spaceKey: '',
        createTime: '',
        updateTime: ''
      }
    }
  },
  created () {
    this.loadAlldList()
  },
  methods: {
    // 确定
    async onSubmit () {
      this.dialogVisible = false
      const { data } = await saveOrUpdateAdvertSpace(this.adverSpacetForm)
      // console.log(data)
      if (data.success) {
        this.$message.success('操作成功')
      }
      this.loadAlldList()
    },
    // 新增广告位handleAdd
    handleAdd () {
      this.dialogVisible = true
    },
    // 编辑广告位
    async handleEdit (rowData) {
      this.dialogVisible = true
      this.isEdit = true
      // console.log(rowData)
      const { data } = await getSpaceById(rowData.id)
      if (data.success) {
        this.adverSpacetForm = data.content
      }
    },
    async loadAlldList () {
      const { data } = await getAllSpaces()
      if (data.success) {
        this.adverSpacetDatas = data.content
      }
    }
  }
}
</script>
<style lang='scss' scoped></style>
