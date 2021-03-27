<template>
<div class='up-image'>
  <el-upload
    action="https://jsonplaceholder.typicode.com/posts/"
    list-type="picture-card"
    :auto-upload="true"
    :http-request="handleUpdateImage"
    :on-preview="handlePictureCardPreview">
    <i class="el-icon-plus"></i>
  </el-upload>
  <el-dialog v-if="value">
    <img width="100%" :src="value">
  </el-dialog>
</div>
</template>

<script>
import { uploadImage } from '@/services/course'
export default {
  props: ['value'],
  name: 'UpImage',
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    // 上传图片
    async handleUpdateImage (options) {
      // console.log(options)
      // 创建fromData实例   请求需要formdata类型
      const fd = new FormData()
      // 将数据放去formdata实例种
      fd.append('file', options.file)
      const { data } = await uploadImage(fd)
      if (data.code === '000000') {
        this.$message.success('图片上传成功')
        this.$emit('input', data.data.name)
        // console.log(data.data.name)
      }
    },
    // 图片上传的钩子
    handlePictureCardPreview (file) {
      // this.value = file.url
    }
  }
}

</script>
<style  lang='scss' scoped></style>
