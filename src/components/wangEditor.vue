<template>
<div class='E' ref="editor"></div>
</template>

<script>
import E from 'wangeditor'
import { uploadImage } from '@/services/course'
export default {
  name: 'Editor',
  props: ['value'],
  mounted () {
    this.initWangeditor()
  },
  methods: {
    // 创建E
    initWangeditor () {
      const editor = new E(this.$refs.editor)
      // 当E内容发生改变，把数据传回父组件
      editor.config.onchange = newHtml => {
        this.$emit('input', newHtml)
      }
      // 配置触发 onchange 的时间频率，默认为 200ms
      editor.config.onchangeTimeout = 200 // 修改为 500ms
      // 自定义上传图片功能
      editor.config.customUploadImg = async (resultFiles, insertImgFn) => {
      // resultFiles 是 input 中选中的文件列表
      // insertImgFn 是获取图片 url 后，插入到编辑器的方法
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        const { data } = await uploadImage(fd)
        if (data.code === '000000') {
          this.$message.success('图片上传成功')
          // 上传图片，返回结果，将图片插入到编辑器中
          insertImgFn(data.data.name)
        }
      }
      editor.create()
      // 初始化内容
      editor.txt.html(this.value)
    }
  }
}

</script>
<style  lang='scss' scoped></style>
